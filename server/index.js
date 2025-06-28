import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();

const app = express();

// Optimized CORS configuration
const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? ["https://your-production-domain.com"] // Replace with your actual domain
            : ["http://localhost:5173", "http://localhost:3000"], // Vite and Create React App ports
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Reduced from 50mb for security

// Add request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

app.use("/api/v1/huggingface", dalleRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "3D Shop API Server",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            huggingface: "/api/v1/huggingface",
        },
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        path: req.path,
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
