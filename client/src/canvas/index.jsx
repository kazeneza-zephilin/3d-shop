/* eslint-disable react/no-unknown-property */
 
import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";

import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import Shirt from "./Shirt";

const CanvasModel = () => {
    return (
        <Canvas
        shadows
        camera={{position:[0, 0, 0], fov: 25}}
        gl={{preserveDrawingBuffer: true}}
        className="w-full max-w-full h-full transition-all ease-in"
        >
            <ambientLight intensity={0.4} />
            <Environment preset="city" />
            <CameraRig>
                <Backdrop />
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;
