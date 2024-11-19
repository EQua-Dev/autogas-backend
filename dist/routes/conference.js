"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Attendee_1 = __importDefault(require("../models/Attendee"));
const generateCode_1 = __importDefault(require("../utils/generateCode"));
const emailTemplate_1 = __importDefault(require("../utils/emailTemplate"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
// Conference details
const conferenceDetails = {
    name: "Tech Conference 2024",
    date: "December 15-16, 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "Tech Convention Center, Lagos",
    theme: "Innovating for Tomorrow"
};
// Configure nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, occupation, gender, phoneNumber, state, hearAboutUs } = req.body;
        // Generate unique code
        let registrationCode = (0, generateCode_1.default)(); // Initialize with first generated code;
        let isCodeUnique = false;
        while (!isCodeUnique) {
            registrationCode = (0, generateCode_1.default)();
            const existingCode = await Attendee_1.default.findOne({ registrationCode });
            if (!existingCode) {
                isCodeUnique = true;
            }
        }
        // Create new attendee
        const attendee = new Attendee_1.default({
            firstName,
            lastName,
            email,
            occupation,
            gender,
            phoneNumber,
            state,
            hearAboutUs,
            registrationCode
        });
        // Save to database
        await attendee.save();
        // Generate and send email
        const emailHtml = (0, emailTemplate_1.default)(attendee.toObject(), conferenceDetails);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Registration Confirmation - ${conferenceDetails.name}`,
            html: emailHtml
        });
        // Return response
        res.status(201).json({
            success: true,
            data: attendee,
            message: 'Registration successful. Please check your email for details.'
        });
    }
    catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.default = router;
