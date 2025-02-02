/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
    const shadow = useRef();
    return (
        <AccumulativeShadows
            ref={shadow}
            temporal
            frames={60}
            alphaTest={0.15}
            scale={4}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
        >
            <RandomizedLight
                amount={4}
                radius={9}
                intensity={0.55}
                ambient={0.25}
                position={[-5, 5, -9]}
            />
        </AccumulativeShadows>
    );
};

export default Backdrop;
