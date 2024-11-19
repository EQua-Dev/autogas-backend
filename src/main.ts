import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import conferenceRoutes from './routes/conference';
import { config } from 'dotenv';
import cors from 'cors';




import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5002;

// CORS Configuration
const corsOptions: cors.CorsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies if you're using them
  maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
};

// Apply CORS middleware
app.use(cors(corsOptions));


app.use(express.json());
app.use(helmet()); 


// Connect to MongoDB
connectDB();
// connectToDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Autogas!');
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
  });
  
  app.use('/api/', apiLimiter);
  // Routes
app.use('/api/conference', conferenceRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


config();



