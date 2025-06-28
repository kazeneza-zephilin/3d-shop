// Simple test for imageUtils
import { validateImageFile } from "../config/imageUtils.js";

// Test function to validate our utilities
export const testImageUtils = () => {
    console.log("Testing Image Utilities...");

    // Test validation function
    try {
        validateImageFile(null);
    } catch (error) {
        console.log("✅ Null validation working:", error.message);
    }

    try {
        validateImageFile({});
    } catch (error) {
        console.log("✅ Invalid object validation working:", error.message);
    }

    // Create a mock file for testing
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });

    try {
        const result = validateImageFile(mockFile);
        console.log("✅ Valid file validation working:", result);
    } catch (error) {
        console.log("❌ Valid file validation failed:", error.message);
    }

    console.log("Image utilities test completed");
};

// Only run tests in development
if (import.meta.env.DEV) {
    console.log("ImageUtils module loaded successfully");
}
