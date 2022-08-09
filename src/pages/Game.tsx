import { Box, OrbitControls, OrthographicCamera } from '@react-three/drei';
import { createRoot } from 'react-dom/client'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import GameScene from '../components/game/scene/GameScene';
import Player from '../components/game/mesh/Player';
//import * as PLAYER from '../components/game/mesh/Player';

function Game(props: ThreeElements['mesh']) {
    const distance = 500;
    const cameraRotationX = 50 * Math.PI / 180;
    const cameraRotationY = 20 * Math.PI / 180;
    const cameraRotationZ = -10 * Math.PI / 180;
    const initialCameraPositionY = -Math.tan(cameraRotationX) * distance;
    const initialCameraPositionX = Math.tan(cameraRotationY) * Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
    //const columns = 17;
    //const mountRef = useRef(null);

    /*
    const [lanes, setLanes] = useState();
    const [currentLane, setCurrentLane] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(Math.floor(columns / 2));

    const [previousTimestamp, setPreviousTimestamp] = useState<number | null>(null);
    const [startMoving, setStartMoving] = useState(false);
    const [moves, setMoves] = useState([]);
    const [stepStartTimestamp, setStepStartTimestamp] = useState<number | undefined>();
    */

    /*

    useEffect(() => {

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        (mountRef.current as any).appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        camera.position.z = 5;

        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener("resize", onWindowResize, false);

        animate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => (mountRef.current as any).removeChild(renderer.domElement);



    }, []);
*/
    //const a = new THREE.OrthographicCamera()
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <GameScene>
                <color attach={"background"} args={["#fffff3"]} />
                <OrthographicCamera

                    //position={new THREE.Vector3(initialCameraPositionX, initialCameraPositionY, distance)}
                    position={new THREE.Vector3(0, 0, 0)}
                    rotation={new THREE.Euler(cameraRotationX, cameraRotationY, cameraRotationZ, 'XYZ')}
                    //rotation={new THREE.Euler(cameraRotationX, cameraRotationY, cameraRotationZ, 'XYZ')}
                    left={window.innerWidth / -2}
                    right={window.innerWidth / 2}
                    top={window.innerHeight / 2}
                    bottom={window.innerHeight / -2}
                //near={0.1}
                //far={10000}
                //zoom={40} 
                >

                    {/* <OrthographicCamera
                    left={window.innerWidth / -2}
                    right={window.innerWidth / 2}
                    top={window.innerHeight / 2}
                    bottom={window.innerHeight / -2}
                    near={0.1}
                    far={10000}
                    rotation={[cameraRotationX, cameraRotationY, cameraRotationZ]}
                    position={[initialCameraPositionX, initialCameraPositionX, distance]}
                /> */}
                    <gridHelper args={[100, 100, `grey`, `gray`]} />
                    <Player />

                </OrthographicCamera>
                <ambientLight />
                <OrbitControls />
            </GameScene>
        </div>
    )
}

export default Game;
