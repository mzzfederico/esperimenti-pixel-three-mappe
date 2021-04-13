import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import { Unit } from '../../components/Unit';

import * as data from "./colors.json";

export default function ItaliaPixel() {
    const group = useRef();

    useFrame((state, delta) => {
        group.current.rotation.z += 0.003;
        group.current.rotation.y += 0.003;
    });

    const colors = data.default;
    const colorKeys = Object.keys(colors);

    const offset = {
        x: 4, y: -7.5
    }

    return (
        <group ref={group} rotation={[6, 0.2, 0.1]}>
            {colorKeys.filter(key => key !== "255, 255, 255").map((color) => {
                const positions = colors[color];
                return positions.map(pos => {
                    const hor = ((pos[0] / 10)) - offset.x;
                    const ver = ((pos[1] / 10) * -1) - offset.y;
                    return <>
                        <Unit
                            color={`rgb(${color})`}
                            position={[hor, ver, -3]}
                        />
                    </>;
                })
            })}
        </group>
    );
}