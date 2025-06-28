import { useState } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const PerformanceMonitor = ({ showStats = false }) => {
    const [fps, setFps] = useState(0);
    const [frameTime, setFrameTime] = useState(0);

    useFrame((state, delta) => {
        // Update FPS every 60 frames for smoother display
        if (state.clock.elapsedTime % 1 < delta) {
            setFps(Math.round(1 / delta));
            setFrameTime(Math.round(delta * 1000 * 100) / 100);
        }
    });

    if (!showStats) return null;

    return (
        <Html
            position={[0, 0, 0]}
            style={{
                position: "fixed",
                top: 10,
                right: 10,
                background: "rgba(255, 255, 255, 0.9)",
                color: "#374151",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "monospace",
                zIndex: 1000,
                minWidth: "120px",
                border: "1px solid rgba(156, 163, 175, 0.3)",
                backdropFilter: "blur(8px)",
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
