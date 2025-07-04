/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import { validateImageFile, compressImage } from "../config/imageUtils";

const FIlePicker = ({ file, setFile, readFile }) => {
    const handleFileChange = useCallback(
        async (e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;

            try {
                // Validate the file
                validateImageFile(selectedFile);

                // Compress large images
                if (selectedFile.size > 1024 * 1024) {
                    // 1MB
                    console.log("Compressing large image...");
                    const compressedFile = await compressImage(selectedFile);
                    setFile(compressedFile);
                } else {
                    setFile(selectedFile);
                }
            } catch (error) {
                alert(error.message);
                e.target.value = ""; // Reset input
            }
        },
        [setFile]
    );

    return (
        <div className="filepicker-container">
            <div className="flex flex-1 flex-col">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="filepicker-label">
                    Upload Image
                </label>
                <p className="mt-2 text-gray-500 text-xs truncate">
                    {file === ""
                        ? "No file selected"
                        : file.name || "Compressed image"}
                </p>
                {file && (
                    <p className="text-xs text-gray-400 mt-1">
                        Size:{" "}
                        {file.size
                            ? (file.size / 1024).toFixed(1) + "KB"
                            : "N/A"}
                    </p>
                )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => readFile("logo")}
                    customStyles="text-sm"
                    disabled={!file}
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => readFile("full")}
                    customStyles="text-sm"
                    disabled={!file}
                />
            </div>
        </div>
    );
};
FIlePicker.propTypes = {
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setFile: PropTypes.func.isRequired,
    readFile: PropTypes.func.isRequired,
};

export default FIlePicker;
