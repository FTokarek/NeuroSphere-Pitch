import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CoswarpShaderBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera?: THREE.Camera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    clock?: THREE.Clock;
    uniforms?: any;
    animationId?: number;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Three.js components
    const clock = new THREE.Clock();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
    };

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() { 
        gl_Position = vec4(position, 1.0);
        vUv = uv;
      }
    `;

    // Fragment shader - modified for NeuroSphere colors
    const fragmentShader = `
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      varying vec2 vUv;
       
      const float PI = 3.1415926535897932384626433832795;
      const float TAU = PI * 2.;
       
      void coswarp(inout vec3 trip, float warpsScale ){
        trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .15));
        trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .15));
        trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .15));
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy + 0.5;
        
        float t = (u_time *.1) + length(fract((uv-.5) *10.));
        float t2 = (u_time *.05) + length(fract((uv-.5) *20.));
        
        vec2 uv2 = uv;
        vec2 uv3 = uv;
        
        vec3 w = vec3(uv.x, uv.y, 1.);
        coswarp(w, 3.);
        
        uv.x+= w.r;
        uv.y+= w.g;
        
        // NeuroSphere color palette - bright purple theme matching first section
        vec3 color = vec3(0.3, 0.1, 0.5); // Bright purple base
        
        color.r = sin(u_time *.1) + sin(length(uv-.5) * 10.);
        color.g = sin(u_time *.15) + sin(length(uv-.5) * 20.);
        color.b = sin(u_time *.08) + sin(length(uv-.5) * 15.) + 0.4; // Enhanced purple
        
        coswarp(color, 2.5);
        
        // Apply NeuroSphere color enhancement with controlled brightness
        color = vec3(smoothstep(color.r, sin(t2), sin(t)));
        
        // Color mixing for NeuroSphere purple theme - bright like first section
        vec3 neuralColors = vec3(
          color.r * 0.6 + color.b * 0.8,  // Purple-red mix
          color.g * 0.4 + color.r * 0.6,  // Purple-green mix
          color.b * 1.2 + color.r * 0.7   // Enhanced purple-blue
        );
        
        // Bright clamp - match first section brightness
        neuralColors = clamp(neuralColors, 0.0, 0.8);
        neuralColors = mix(neuralColors, vec3(0.2, 0.1, 0.4), 0.1); // Bright purple base tint
        
        gl_FragColor = vec4(neuralColors, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      clock,
      uniforms
    };

    // Resize function
    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    };

    // Animation loop
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Initialize
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener("resize", onWindowResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default CoswarpShaderBackground;
