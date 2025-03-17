// EarthSpinner.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Earth = ({ latitude, longitude }) => {
    const earthRef = useRef();
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
        "/earth-texture.jpg",
        () => {
            console.log("Texture loaded successfully");
        },
        undefined,
        (error) => {
            console.error("Error loading texture", error);
        }
    );

    // Create target rotation state
    const targetRotation = useRef(new THREE.Euler());

    useEffect(() => {
        const latRad = THREE.MathUtils.degToRad(latitude - 20);
        const lonRad = THREE.MathUtils.degToRad(longitude - 175);
        targetRotation.current.set(latRad, -lonRad + Math.PI / 2, 0);
    }, [latitude, longitude]);

    useFrame(() => {
        if (earthRef.current) {
            // Smoothly interpolate the rotation towards the target rotation
            earthRef.current.rotation.x += (targetRotation.current.x - earthRef.current.rotation.x) * 0.1;
            earthRef.current.rotation.y += (targetRotation.current.y - earthRef.current.rotation.y) * 0.1;
        }
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[2.5, 100, 100]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const EarthSpinner = ({ latitude, longitude }) => {
    return (
        <Canvas className="earth-canvas" camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={7} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={7} />
            <Earth latitude={latitude} longitude={longitude} />
            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        </Canvas>
    );
};

export default EarthSpinner;
