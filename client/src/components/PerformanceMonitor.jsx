import { useState } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";

const PerformanceMonitor = ({ showStats = false }) => {
    const snap = useSnapshot(state);
    const [fps, setFps] = useState(0);
    const [frameTime, setFrameTime] = useState(0);

    useFrame((state, delta) => {
        // Update FPS every 60 frames for smoother display
        if (state.clock.elapsedTime % 1 < delta) {
            setFps(Math.round(1 / delta));
            setFrameTime(Math.round(delta * 1000 * 100) / 100);
        }
    });

    // Only show on customizer page (when not in intro mode) and when showStats is true
    if (!showStats || snap.intro) return null;

    return (
        <Html
            transform={false}
            style={{
                position: "fixed",
                bottom: 32,
                right: 110, // Adjust this value to match the spacing of the download button
                background: "rgba(255, 255, 255, 0.95)",
                color: "#374151",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "Inter, monospace",
                zIndex: 10000,
                minWidth: "110px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(8px)",
                pointerEvents: "none",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                textAlign: "center",
                userSelect: "none",
            }}
        >
            <div>FPS: {fps}</div>
            <div>Frame: {frameTime}ms</div>
        </Html>
    );
};

PerformanceMonitor.propTypes = {
    showStats: PropTypes.bool,
};

export default PerformanceMonitor;
