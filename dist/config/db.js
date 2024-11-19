"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = async () => {
    try {
        console.log("connecting to database");
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(mongoUri);
        console.log('MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
