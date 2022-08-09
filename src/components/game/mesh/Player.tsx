import React from 'react';
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

export const Player = () => {
    /*
    const player = new THREE.Group();

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(playerDefaultSize * zoom, playerDefaultSize * zoom, 20 * zoom),
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
    );
    body.position.z = 10 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;
    player.add(body);

    const rowel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 4 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: 0xF0619A})
    );
    rowel.position.z = 21 * zoom;
    rowel.castShadow = true;
    rowel.receiveShadow = false;
    player.add(rowel);

    return player;*/
    //const a = new THREE.BoxBufferGeometry()
    //BoxBufferGeometry(width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined): THREE.BoxGeometry
    const playerRef = useRef<Mesh>(null!);
    const playerDefaultSize: number = 15;
    const zoom = 2;



    useFrame(() => {
        //playerRef.current.position.z = 10 * zoom;
        playerRef.current.position.z = 0;
        playerRef.current.rotation.x += 0.005;
        playerRef.current.rotation.y += 0.01;
    })

    return (

        <mesh ref={playerRef}>
            <boxGeometry attach="geometry" args={[playerDefaultSize * zoom, playerDefaultSize * zoom, 20 * zoom]} />
            <meshNormalMaterial attach="material" />
        </mesh>

    )
}

export default Player;

