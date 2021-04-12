import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

export function Unit({ color = "red", ...props }) {
    const mesh = useRef()

    const { planePosition } = props;

    const box_size_den = 12;

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={[1 / box_size_den, 1 / box_size_den, 1 / box_size_den]}>
            <boxBufferGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}