import express from "express";
import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import { Buffer } from "buffer"; // For converting image to base64

dotenv.config();

const router = express.Router();

const hfApiKey = process.env.HUGGING_FACE_ACCESS_TOKEN;
if (!hfApiKey) {
    throw new Error("Hugging Face API Key is required in .env");
}
const hfClient = new HfInference(hfApiKey); // Use the API key

router.post("/", async (req, res) => {
    try {
        const { prompt, model } = req.body;

        if (!model || !prompt) {
            return res
                .status(400)
                .json({ message: "Model and prompt are required" });
        }

        // Call Hugging Face's text-to-image API
        const response = await hfClient.textToImage({
            model,
            inputs: prompt,
            parameters: { num_inference_steps: 5 },
            provider: "hf-inference",
        });

        // Convert the image to base64 string
        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        // Send the image as a base64-encoded string
        res.status(200).json({ photo: base64Image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on server" });
    }
});

export default router;
