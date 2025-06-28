// Image optimization utilities
export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            try {
                // Calculate new dimensions
                const ratio = Math.min(
                    maxWidth / img.width,
                    maxWidth / img.height
                );
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                // Draw and compress
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(
                    (blob) => {
                        // Clean up
                        URL.revokeObjectURL(img.src);
                        resolve(blob);
                    },
                    "image/jpeg",
                    quality
                );
            } catch (error) {
                URL.revokeObjectURL(img.src);
                reject(error);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error("Failed to load image"));
        };

        img.src = URL.createObjectURL(file);
    });
};

export const resizeImage = (dataUrl, maxSize = 512) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            try {
                // Calculate new dimensions maintaining aspect ratio
                let { width, height } = img;
                if (width > height) {
                    if (width > maxSize) {
                        height = (height * maxSize) / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = (width * maxSize) / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/png"));
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error("Failed to load image"));
        };

        img.src = dataUrl;
    });
};

export const validateImageFile = (file) => {
    // Check if file exists
    if (!file) {
        throw new Error("No file provided");
    }

    // Check if it's actually a File object
    if (!(file instanceof File)) {
        throw new Error("Invalid file object");
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        throw new Error(
            "Please upload a valid image file (JPEG, PNG, or WebP)"
        );
    }

    if (file.size > maxSize) {
        throw new Error(
            "Image file is too large. Please upload an image smaller than 5MB"
        );
    }

    if (file.size === 0) {
        throw new Error("File appears to be empty");
    }

    return true;
};
