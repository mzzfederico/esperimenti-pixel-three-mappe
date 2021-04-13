import React, { Suspense, useMemo, useRef } from 'react';
import regioni from "./regioni.svg";

import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Unit } from '../../components/Unit';

export default function Bars() {
    const group = useRef();
    return (
        <Suspense fallback={<></>}>
            <SVGFile groupRef={group} file={regioni} />
        </Suspense>
    );
}

function SVGFile({ groupRef, file }) {
    const { paths } = useLoader(SVGLoader, file);
    const shapes = useMemo(
        () =>
            paths.flatMap((path, index) =>
                path.toShapes(true).map(shape => ({ index, shape, color: path.color }))
            ),
        [paths]
    );

    return (
        <group ref={groupRef}>(
            <>
                {shapes.map((props, key) => (
                    <SVGShape key={key} {...props} />
                ))}
            </>
        )</group>
    )
}

const SVGShape = ({ shape, color, index }) => (
    <mesh>
        <meshLambertMaterial
            attach="material"
            color={color}
            polygonOffset
            polygonOffsetFactor={index * -0.1}
        />
        <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
)