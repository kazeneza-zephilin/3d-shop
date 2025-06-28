/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import React, { useMemo } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

// Preload the GLTF model for better performance
useGLTF.preload("/shirt_baked.glb");

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("/shirt_baked.glb");

    // Memoize textures to prevent unnecessary re-loading
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) =>
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
    );

    // Memoize the decals to prevent unnecessary re-renders
    const logoDecal = useMemo(() => {
        if (!snap.isLogoTexture) return null;
        return (
            <Decal
                position={[0, 0.04, 0.15]}
                rotation={[0, 0, 0]}
                scale={0.15}
                map={logoTexture}
                depthTest={false}
                depthWrite={true}
            />
        );
    }, [snap.isLogoTexture, logoTexture]);

    const fullDecal = useMemo(() => {
        if (!snap.isFullTexture) return null;
        return (
            <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1}
                map={fullTexture}
            />
        );
    }, [snap.isFullTexture, fullTexture]);

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {fullDecal}
                {logoDecal}
            </mesh>
        </group>
    );
};

export default Shirt;
