import express from "express";
import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import { Buffer } from "buffer";

dotenv.config();

const router = express.Router();

const hfApiKey = process.env.HUGGING_FACE_ACCESS_TOKEN;
if (!hfApiKey) {
    throw new Error("Hugging Face API Key is required in .env");
}
const hfClient = new HfInference(hfApiKey);

// Input validation middleware
const validateRequest = (req, res, next) => {
    const { prompt, model } = req.body;

    if (!model || !prompt) {
        return res.status(400).json({
            success: false,
            message: "Model and prompt are required",
            error: "MISSING_PARAMETERS",
        });
    }

    if (prompt.length > 500) {
        return res.status(400).json({
            success: false,
            message: "Prompt is too long. Maximum 500 characters allowed.",
            error: "PROMPT_TOO_LONG",
        });
    }

    next();
};

router.post("/", validateRequest, async (req, res) => {
    const startTime = Date.now();

    try {
        const { prompt, model } = req.body;

        console.log(`[${new Date().toISOString()}] Processing request:`, {
            prompt: prompt.substring(0, 50) + (prompt.length > 50 ? "..." : ""),
            model,
            requestId: req.ip + "_" + startTime,
        });

        // Call Hugging Face's text-to-image API with optimized parameters
        const response = await hfClient.textToImage({
            model,
            inputs: prompt,
            parameters: {
                num_inference_steps: 10, // Increased for better quality
                guidance_scale: 7.5, // Better prompt adherence
                width: 512, // Standardized size for consistency
                height: 512,
            },
        });

        // Convert the image to base64 string
        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString("base64");

        const processingTime = Date.now() - startTime;
        console.log(
            `[${new Date().toISOString()}] Request processed successfully in ${processingTime}ms`
        );

        // Send optimized response
        res.status(200).json({
            success: true,
            photo: `data:image/png;base64,${base64Image}`,
            metadata: {
                processingTime,
                model,
                imageSize: {
                    width: 512,
                    height: 512,
                },
            },
        });
    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error(
            `[${new Date().toISOString()}] Error after ${processingTime}ms:`,
            {
                message: error.message,
                stack:
                    process.env.NODE_ENV === "development"
                        ? error.stack
                        : undefined,
            }
        );

        // Send structured error response
        res.status(500).json({
            success: false,
            message: "Failed to generate image",
            error: error.message,
            processingTime,
        });
    }
});

export default router;
