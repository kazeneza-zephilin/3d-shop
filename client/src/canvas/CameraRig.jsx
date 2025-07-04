/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame((state, delta) => {
        const isBreakPoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        //set the initial position of the model
        let targetPosition = [-0.4, 0, 2];
        if (snap.intro) {
            if (isBreakPoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }
        //set the model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        //set the model to rotate smoothly
        if (snap.intro) {
            // In intro mode (homepage), add automatic rotation to showcase
            group.current.rotation.y += delta * 0.8; // Auto-rotate on Y axis
            // Add subtle mouse interaction for X axis
            easing.dampE(
                group.current.rotation,
                [state.pointer.y / 10, group.current.rotation.y, 0],
                0.25,
                delta
            );
        } else {
            // In customizer mode, follow mouse pointer only
            easing.dampE(
                group.current.rotation,
                [state.pointer.y / 10, -state.pointer.x / 5, 0],
                0.25,
                delta
            );
        }
    });

    return <group ref={group}>{children}</group>;
};

CameraRig.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CameraRig;
