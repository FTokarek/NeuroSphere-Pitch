import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FractalGlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    composer?: any;
    animationId?: number;
  }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Three.js modules import (for runtime)
    const loadThreeModules = async () => {
      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
      });

      // Set NeuroSphere background color (dark blue)
      renderer.setClearColor(0x0a0f1a);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create scene
      const scene = new THREE.Scene();

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);

      // Add NeuroSphere themed fog (dark blue)
      scene.fog = new THREE.FogExp2(0x0a0f1a, 0.3);

      // Create NeuroSphere colored material
      const neuralMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2563eb, // NeuroSphere blue
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0x1e40af,
        emissiveIntensity: 0.3
      });

      // Create geometric objects for neural network feel
      const geometries = [
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.TorusGeometry(1, 0.3, 16, 100),
        new THREE.ConeGeometry(0.8, 2, 8),
        new THREE.OctahedronGeometry(1.2)
      ];

      // Add multiple objects in neural network arrangement
      geometries.forEach((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, neuralMaterial.clone());
        mesh.material.color.setHex([0x2563eb, 0x7c3aed, 0x0891b2, 0x4338ca][index]);
        
        const angle = (index / geometries.length) * Math.PI * 2;
        mesh.position.set(
          Math.cos(angle) * 3,
          Math.sin(angle * 0.5) * 2,
          Math.sin(angle) * 3
        );
        mesh.scale.setScalar(0.8);
        scene.add(mesh);
      });

      // Create displacement shader with NeuroSphere colors
      const displacementShader = {
        uniforms: {
          tDiffuse: { value: null },
          displacement: { value: null },
          scale: { value: 0.02 },
          tileFactor: { value: 3 },
          time: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform sampler2D displacement;
          uniform float scale;
          uniform float tileFactor;
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            vec2 tiledUv = mod(vUv * tileFactor + time * 0.1, 1.0);
            vec2 disp = texture2D(displacement, tiledUv).rg * scale;
            vec2 distUv = vUv + disp;
            
            vec4 color = texture2D(tDiffuse, distUv);
            
            // Apply NeuroSphere color enhancement
            color.rgb = mix(color.rgb, vec3(0.15, 0.4, 0.8), 0.1);
            color.rgb *= 1.2;
            
            gl_FragColor = color;
          }
        `
      };

      // Create displacement texture (procedural)
      const displacementTexture = new THREE.DataTexture(
        new Uint8Array(256 * 256 * 4).map(() => Math.random() * 255),
        256,
        256,
        THREE.RGBAFormat
      );
      displacementTexture.needsUpdate = true;
      displacementTexture.minFilter = THREE.NearestFilter;

      // Store references
      sceneRef.current = {
        renderer,
        scene,
        camera
      };

      // Animation variables
      let theta = 0;
      const clock = new THREE.Clock();

      // Animation loop
      const animate = () => {
        const animationId = requestAnimationFrame(animate);
        sceneRef.current.animationId = animationId;

        theta += 0.008;
        const time = clock.getElapsedTime();

        // Rotate camera around scene
        camera.position.set(
          Math.sin(theta) * 8,
          Math.sin(theta * 0.7) * 3,
          Math.cos(theta) * 8
        );
        camera.lookAt(scene.position);

        // Animate objects
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.015;
            child.material.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.3;
          }
        });

        renderer.render(scene, camera);
      };

      animate();

      // Window resize handler
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    loadThreeModules();

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default FractalGlassBackground;
