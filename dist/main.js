"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = __importDefault(require("./config/db"));
const conference_1 = __importDefault(require("./routes/conference"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const dotenv_2 = __importDefault(require("dotenv"));
dotenv_2.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5002;
// CORS Configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies if you're using them
    maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
};
// Apply CORS middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// Connect to MongoDB
(0, db_1.default)();
// connectToDatabase();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello Autogas!');
});
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);
// Routes
app.use('/api/conference', conference_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, dotenv_1.config)();
