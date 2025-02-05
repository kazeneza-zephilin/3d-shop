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
        console.log(req.body); //line to check if prompt and model are properly received


        if (!model || !prompt) {
            return res
                .status(400)
                .json({ message: "Model and prompt are required" });
        }

        // Call Hugging Face's text-to-image API
        const response = await hfClient.textToImage({
            model,
            inputs: prompt,
            parameters: { num_inference_steps: 50 },
            provider: "hf-inference",
        });
        // Debugging to ensure we're getting the expected data
        console.log("Hugging Face API response:", response);

        // Convert the image to base64 string
        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString("base64");

        // Debugging: Log the base64 image to ensure it's a valid image
        console.log("Base64 Image Data:", base64Image);

        // Send the image as a base64-encoded string
        res.status(200).json({ photo: `data:image/png;base64,${base64Image}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on server" });
    }
});

export default router;
