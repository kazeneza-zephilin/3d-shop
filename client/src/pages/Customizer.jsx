/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
    AIPicker,
    ColorPicker,
    CustomButton,
    FIlePicker,
    Tab,
} from "../components";

const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState("");
    const [prompt, setPrompt] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    // Memoize the API URL to prevent unnecessary re-computations
    const apiUrl = useMemo(
        () => "http://localhost:8080/api/v1/huggingface",
        []
    );
    const modelName = useMemo(() => "black-forest-labs/FLUX.1-dev", []);

    const handleDecals = useCallback(
        (type, result) => {
            const decalType = DecalTypes[type];
            state[decalType.stateProperty] = result;
            if (!activeFilterTab[decalType.filterTab]) {
                setActiveFilterTab((prevState) => ({
                    ...prevState,
                    [decalType.filterTab]: !prevState[decalType.filterTab],
                }));
            }
        },
        [activeFilterTab]
    );

    const handleActiveFilterTab = useCallback(
        (tabName) => {
            switch (tabName) {
                case "logoShirt":
                    state.isLogoTexture = !activeFilterTab[tabName];
                    break;
                case "stylishShirt":
                    state.isFullTexture = !activeFilterTab[tabName];
                    break;
                default:
                    state.isLogoTexture = true;
                    state.isFullTexture = false;
            }
            setActiveFilterTab((prevState) => ({
                ...prevState,
                [tabName]: !prevState[tabName],
            }));
        },
        [activeFilterTab]
    );

    // Memoize callbacks to prevent unnecessary re-renders
    const handleSubmit = useCallback(
        async (type) => {
            if (!prompt.trim()) {
                alert("Please enter a prompt");
                return;
            }

            console.log("Sending request to API", {
                prompt,
                model: modelName,
            });

            try {
                setGeneratingImg(true);

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: prompt.trim(),
                        model: modelName,
                    }),
                });

                const data = await response.json();
                console.log("Response data:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || `HTTP error! status: ${response.status}`
                    );
                }

                if (data.success && data.photo) {
                    handleDecals(type, data.photo);
                    console.log(
                        `Image generated successfully in ${data.metadata?.processingTime}ms`
                    );
                } else {
                    throw new Error(data.message || "Failed to generate image");
                }
            } catch (error) {
                console.error("AI Generation Error:", error);
                alert(`Error generating image: ${error.message}`);
            } finally {
                setGeneratingImg(false);
                setActiveEditorTab("");
            }
        },
        [prompt, modelName, apiUrl, handleDecals]
    );

    const readFile = useCallback(
        (type) => {
            reader(file).then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            });
        },
        [file, handleDecals]
    );

    const handleGoBack = useCallback(() => {
        state.intro = true;
    }, []);

    //showing tab content depending on active tab
    const generateTabContent = useCallback(() => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />;
            case "filepicker":
                return (
                    <FIlePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case "aipicker":
                return (
                    <AIPicker
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    }, [activeEditorTab, file, prompt, generatingImg, handleSubmit, readFile]);
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation("left")}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {
                                            setActiveEditorTab(tab.name);
                                        }}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="absolute top-5 right-5 z-10"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go back"
                            handleClick={() => (state.intro = true)}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    <motion.div
                        className="filtertabs-container tabs"
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() =>
                                    handleActiveFilterTab(tab.name)
                                }
                            />
                        ))}
                        <button
                            className="download-btn"
                            onClick={downloadCanvasToImage}
                        >
                            <img
                                src={download}
                                alt="download_image"
                                className="w-3/5 h-3/5 object-contain"
                            />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
