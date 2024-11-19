import { Router, Request, Response } from 'express';
import Attendee from '../models/Attendee';
import generateUniqueCode from '../utils/generateCode';
import generateEmailTemplate from '../utils/emailTemplate';
import nodemailer from 'nodemailer';
import { IConferenceDetails, IRegistrationRequest } from '../types';

const router = Router();

// Conference details
const conferenceDetails: IConferenceDetails = {
  name: "Tech Conference 2024",
  date: "December 15-16, 2024",
  time: "9:00 AM - 5:00 PM",
  venue: "Tech Convention Center, Lagos",
  theme: "Innovating for Tomorrow"
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/register', async (req: Request<{}, {}, IRegistrationRequest>, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      occupation,
      gender,
      phoneNumber,
      state,
      hearAboutUs
    } = req.body;

    // Generate unique code
    let registrationCode: string = generateUniqueCode(); // Initialize with first generated code;
    let isCodeUnique = false;
    
    while (!isCodeUnique) {
      registrationCode = generateUniqueCode();
      const existingCode = await Attendee.findOne({ registrationCode });
      if (!existingCode) {
        isCodeUnique = true;
      }
    }

    // Create new attendee
    const attendee = new Attendee({
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
    const emailHtml = generateEmailTemplate(attendee.toObject(), conferenceDetails);
    
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

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router;