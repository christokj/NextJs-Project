"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Box component
const Box = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2, // Rotate 360 degrees along the X axis
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-container',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
        rotation: 360,
      });
    }
    return () => {

    };
  }, []);


  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial attach="material-0" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/FF5733/FFFFFF?text=Side+1')} />
      <meshStandardMaterial attach="material-1" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/33FF57/FFFFFF?text=Side+2')} />
      <meshStandardMaterial attach="material-2" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/3357FF/FFFFFF?text=Side+3')} />
      <meshStandardMaterial attach="material-3" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/FF33A6/FFFFFF?text=Side+4')} />
      <meshStandardMaterial attach="material-4" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/FFFF33/FFFFFF?text=Side+5')} />
      <meshStandardMaterial attach="material-5" map={new THREE.TextureLoader().load('https://via.placeholder.com/300x300/33FFFF/FFFFFF?text=Side+6')} />
    </mesh>
  );
};

// Canvas to hold the 3D scene
const Box3D = () => {

  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Detect scroll position
    };

    // Attach event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full" >
        <h2>Scroll Position: {scrollPosition}</h2>
        <div className="flex justify-center items-center h-96 ">
          <div className="w-12 h-34">
            <div className="w-12 h-12 ml-6 mb-2 flex items-center justify-center bg-peach rotate-45"></div>
            <div className="w-12 h-12 flex items-center justify-center bg-peach "></div>
          </div>
          <div className="w-12 h-34 ml-8 ">
            <div className="w-12 h-12 mb-8 flex items-center justify-center bg-peach "></div>
            <div className="w-12 h-12 mb-6 flex items-center justify-center bg-peach "></div>
          </div>
          <div className="ml-8">
            <div className="w-12 h-12 -ml-6 mb-2 flex items-center justify-center bg-peach rotate-45"></div>
            <div className="w-12 h-12 flex items-center justify-center bg-peach "></div>
          </div>
        </div>
      </div>
      <div className={`justify-center items-center w-1/2 mx-auto text-center -mt-32 ${scrollPosition > 50 ? "blur-xs" : ""} `}>
        <h1 className="text-6xl leading-none font-normal text-white">The first media company crafted for the digital first generation</h1>
      </div>
      <div className="scroll-container " style={{ height: '80vh', display: `none`, overflow: 'scroll' }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-4, 0, 0]} />
          <Box position={[-2, 0, 0]} />
          <Box position={[0, 0, 0]} />
          <Box position={[2, 0, 0]} />
          <Box position={[4, 0, 0]} />
          <Box position={[-4, 2, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default Box3D;
