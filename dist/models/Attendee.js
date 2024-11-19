"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendeeSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    occupation: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
    hearAboutUs: { type: String, required: true },
    registrationCode: { type: String, required: true, unique: true },
    registeredAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Attendee', attendeeSchema);
