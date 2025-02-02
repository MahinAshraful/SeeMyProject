import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import path from "path";
import links from './routes/links.js';

// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({origin: "http://localhost:5173", credentials: true}));

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes for authentication, all under "/api/auth"
app.use("/api/auth", authRoutes);
app.use("/api/links", links);  // Changed to /api/links

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Connect to DB first, then start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });