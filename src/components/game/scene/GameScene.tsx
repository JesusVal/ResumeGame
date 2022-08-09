import React from "react";
import { Canvas } from "@react-three/fiber";

/**
 * 
 *  OrthographicCamera(left?: number | undefined, right?: number | undefined, top?: number | undefined, bottom?: number | undefined, near?: number | undefined, far?: number | undefined):
 * 
 */
const GameScene = ({ children }: any) => {

    return (
        <Canvas>
            {children}
        </Canvas>
    );
}

export default GameScene;