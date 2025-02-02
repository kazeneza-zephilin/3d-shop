/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className="aipicker-container">
            <textarea
                placeholder="Ask AI.."
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="aipicker-textarea"
            />
            <div className="flex flex-wrap gap-3">
                {generatingImg ? (
                    <CustomButton
                        type="outline"
                        title="Asking AI"
                        customStyles="text-xs"
                    />
                ) : (
                    <>
                        <CustomButton
                            type="outline"
                            title="AI logo"
                            handleClick={() => handleSubmit("logo")}
                            customStyles="text-xm"
                        />
                        <CustomButton
                            type="filled"
                            title="AI full"
                            handleClick={() => handleSubmit("full")}
                            customStyles="text-xm"
                        />
                    </>
                )}
            </div>
        </div>
    );
};
AIPicker.propTypes = {
    prompt: PropTypes.string.isRequired,
    setPrompt: PropTypes.func.isRequired,
    generatingImg: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default AIPicker;
