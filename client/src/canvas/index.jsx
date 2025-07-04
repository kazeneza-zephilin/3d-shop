/* eslint-disable react/no-unknown-property */

import { Canvas } from "@react-three/fiber";
import { Center, Preload, Html } from "@react-three/drei";
import { Suspense } from "react";

import CameraRig from "./CameraRig";
import Shirt from "./Shirt";

const CanvasLoader = () => (
    <Html center>
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
    </Html>
);

const CanvasModel = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{
                preserveDrawingBuffer: true,
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
            }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            className="w-full max-w-full h-full transition-all ease-in"
        >
            <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <directionalLight position={[-10, -10, -5]} intensity={0.4} />
                <hemisphereLight
                    skyColor="#ffffff"
                    groundColor="#444444"
                    intensity={0.6}
                />
                <CameraRig>
                    <Center>
                        <Shirt />
                    </Center>
                </CameraRig>
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default CanvasModel;
