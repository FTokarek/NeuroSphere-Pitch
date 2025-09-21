"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Import Three.js modules
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeJsAnimationProps {
  className?: string;
}

export const ThreeJsAnimation: React.FC<ThreeJsAnimationProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: true 
    });
    renderer.setClearColor(0x11151c, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    rendererRef.current = renderer;

    // Create a new Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create a new camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 10);

    // Add controls to the camera/orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = true;
    controls.dampingFactor = 1;
    controls.enablePan = false;

    // Limit the angle that the camera can move
    const angleLimit = Math.PI / 7;
    controls.minPolarAngle = Math.PI / 2 - angleLimit;
    controls.maxPolarAngle = Math.PI / 2 + angleLimit;

    // Add a gradient HDR background
    const hdrEquirect = new RGBELoader()
      .setPath('https://miroleon.github.io/daily-assets/')
      .load('GRADIENT_01_01_comp.hdr', function () {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    // Add the HDR to the scene
    scene.environment = hdrEquirect;

    // Add some fog to the scene for moodyness
    scene.fog = new THREE.FogExp2(0x11151c, 0.4);

    // Load a texture for the 3d model
    const surfaceImperfection = new THREE.TextureLoader().load('https://miroleon.github.io/daily-assets/surf_imp_02.jpg');
    surfaceImperfection.wrapT = THREE.RepeatWrapping;
    surfaceImperfection.wrapS = THREE.RepeatWrapping;

    // Create a new MeshPhysicalMaterial for the 3d model
    const hands_mat = new THREE.MeshPhysicalMaterial({
      color: 0x808080, // Lighter color for the hands
      roughness: 0.2,
      metalness: 1,
      roughnessMap: surfaceImperfection,
      envMap: hdrEquirect,
      envMapIntensity: 1.5
    });

    // Load the 3d model as FBX
    const fbxloader = new FBXLoader();
    fbxloader.load('https://miroleon.github.io/daily-assets/two_hands_01.fbx', function (object) {
      // Traverse through the object to apply the material to all the meshes
      object.traverse(function (child) {
        // Apply the material to the 3d model
        if (child.isMesh) {
          child.material = hands_mat;
        }
      });

      // Set the position and scale of the 3d model
      object.position.set(0, 0, 0);
      object.scale.setScalar(0.05);

      // Add the 3d model to the scene
      scene.add(object);
    });

    // POST PROCESSING
    // Create a new render pass
    const renderScene = new RenderPass(scene, camera);

    // Create a new afterimage pass
    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms['damp'].value = 0.9;

    // Set bloom parameters
    const bloomparams = {
      exposure: 1,
      bloomStrength: 1.75,
      bloomThreshold: 0.1,
      bloomRadius: 1
    };

    // Create a new bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvasRef.current.clientWidth, canvasRef.current.clientHeight), 
      1.5, 
      0.4, 
      0.85
    );
    bloomPass.threshold = bloomparams.bloomThreshold;
    bloomPass.strength = bloomparams.bloomStrength;
    bloomPass.radius = bloomparams.bloomRadius;

    // Create the displacement shader with vertexShader and fragmentShader
    const displacementShader = {
      uniforms: {
        tDiffuse: { value: null },
        displacement: { value: null },
        scale: { value: 0.1 },
        tileFactor: { value: 2 }
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
        varying vec2 vUv;
        void main() {
          if (vUv.x < 0.5 && vUv.x > 0.0 && vUv.y < 1.0 && vUv.y > 0.0) {
            vec2 tiledUv = mod(vUv * tileFactor, 1.0);
            vec2 disp = texture2D(displacement, tiledUv).rg * scale;
            vec2 distUv = vUv + disp;
            gl_FragColor = texture2D(tDiffuse, distUv);
          } else {
            gl_FragColor = texture2D(tDiffuse, vUv);
          }
        }
      `
    };

    // Load the displacement texture
    const displacementTexture = new THREE.TextureLoader().load('/textures/ml-dpt-21-1K_normal.jpeg', function (texture) {
      texture.minFilter = THREE.NearestFilter;
    });

    // Create a new ShaderPass with the displacementShader
    const displacementPass = new ShaderPass(displacementShader);
    displacementPass.uniforms['displacement'].value = displacementTexture;
    displacementPass.uniforms['scale'].value = 0.05;
    displacementPass.uniforms['tileFactor'].value = 2;

    // Create a new EffectComposer to add all the passes to the scene
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(afterimagePass);
    composer.addPass(bloomPass);
    composer.addPass(displacementPass);
    composerRef.current = composer;

    // Easing function to smoothen the transition
    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    // Variables to control the transition
    let isUserInteracting = false;
    let transitionProgress = 0;
    const transitionTime = 2;
    const transitionIncrement = 1 / (60 * transitionTime);
    const transitionStartCameraPosition = new THREE.Vector3();
    const transitionStartCameraQuaternion = new THREE.Quaternion();

    let theta = 0;
    const update = function () {
      theta += 0.005;

      const targetPosition = new THREE.Vector3(
        Math.sin(theta) * 3,
        Math.sin(theta),
        Math.cos(theta) * 3
      );

      const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -theta, 0));

      if (isUserInteracting) {
        if (transitionProgress > 0) {
          transitionProgress = 0;
        }
        transitionStartCameraPosition.copy(camera.position);
        transitionStartCameraQuaternion.copy(camera.quaternion);
      } else {
        if (transitionProgress < 1) {
          transitionProgress += transitionIncrement;
          const easedProgress = easeInOutCubic(transitionProgress);

          camera.position.lerpVectors(transitionStartCameraPosition, targetPosition, easedProgress);
          camera.quaternion.slerp(transitionStartCameraQuaternion, targetQuaternion, easedProgress);
        } else {
          camera.position.copy(targetPosition);
          camera.quaternion.copy(targetQuaternion);
        }
      }

      camera.lookAt(scene.position);
    };

    // Event listeners for OrbitControls
    controls.addEventListener('start', function () {
      isUserInteracting = true;
    });

    controls.addEventListener('end', function () {
      isUserInteracting = false;
      transitionStartCameraPosition.copy(camera.position);
      transitionStartCameraQuaternion.copy(camera.quaternion);
      transitionProgress = 0;
    });

    // Resize function to adjust camera and renderer on window resize
    const onWindowResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      composer.render();
      update();
    };

    animate();

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', onWindowResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (composerRef.current) {
        composerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          borderRadius: '8px',
          border: '1px solid rgba(128, 128, 128, 0.2)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
};
