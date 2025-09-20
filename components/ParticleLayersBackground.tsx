import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleLayersBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera?: THREE.Camera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    uniforms?: any;
    animationId?: number;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create noise texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value;     // R
      imageData.data[i + 1] = value; // G
      imageData.data[i + 2] = value; // B
      imageData.data[i + 3] = 255;   // A
    }
    ctx.putImageData(imageData, 0, 0);

    const noiseTexture = new THREE.CanvasTexture(canvas);
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;
    noiseTexture.minFilter = THREE.LinearFilter;

    // Initialize Three.js components
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_noise: { type: "t", value: noiseTexture },
      u_mouse: { type: "v2", value: new THREE.Vector2() }
    };

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader - modified for NeuroSphere colors
    const fragmentShader = `
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform sampler2D u_noise;
      
      #define PI 3.141592653589793
      #define TAU 6.
      
      const float multiplier = 15.5;
      const float zoomSpeed = 10.;
      const int layers = 10;
      const int octaves = 5;

      vec2 hash2(vec2 p) {
        vec2 o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).xy;
        return o;
      }
      
      mat2 rotate2d(float _angle){
          return mat2(cos(_angle),sin(_angle),
                      -sin(_angle),cos(_angle));
      }
      
      vec3 hsb2rgb( in vec3 c ){
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                               6.0)-3.0)-1.0,
                         0.0,
                         1.0 );
        rgb = rgb*rgb*(3.0-2.0*rgb);
        return c.z * mix( vec3(1.0), rgb, c.y);
      }
      
      float hash(vec2 p) {
        float o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).x;
        return o;
      }
      
      float noise(vec2 uv) {
        vec2 id = floor(uv);
        vec2 subuv = fract(uv);
        vec2 u = subuv * subuv * (3. - 2. * subuv);
        float a = hash(id);
        float b = hash(id + vec2(1., 0.));
        float c = hash(id + vec2(0., 1.));
        float d = hash(id + vec2(1., 1.));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }
      
      float fbm(in vec2 uv) {
        float s = .0;
        float m = .0;
        float a = .5;
        for(int i = 0; i < octaves; i++) {
          s += a * noise(uv);
          m += a;
          a *= .5;
          uv *= 2.;
        }
        return s / m;
      }
      
      vec3 domain(vec2 z){
        return vec3(hsb2rgb(vec3(atan(z.y,z.x)/TAU,1.,1.)));
      }
      
      vec3 colour(vec2 z) {
          return domain(z);
      }
      
      vec3 render(vec2 uv, float scale, vec3 colour) {
        vec2 id = floor(uv);
        vec2 subuv = fract(uv);
        vec2 rand = hash2(id);
        float bokeh = abs(scale) * 1.;
        
        float particle = 0.;
        
        if(length(rand) > 1.3) {
          vec2 pos = subuv-.5;
          float field = length(pos);
          particle = smoothstep(.3, 0., field);
          particle += smoothstep(.4 * bokeh, 0.34 * bokeh, field);
        }
        return vec3(particle*2.);
      }
      
      vec3 renderLayer(int layer, int layers, vec2 uv, inout float opacity, vec3 colour, float n) {
        vec2 _uv = uv;
        float scale = mod((u_time + zoomSpeed / float(layers) * float(layer)) / zoomSpeed, -1.);
        uv *= 20.;
        uv *= scale*scale;
        uv = rotate2d(u_time / 10.) * uv;
        uv += vec2(25. + sin(u_time*.1)) * float(layer);

        vec3 pass = render(uv * multiplier, scale, colour) * .2;

        opacity = 1. + scale;
        float _opacity = opacity;
        
        float endOpacity = smoothstep(0., 0.4, scale * -1.);
        opacity += endOpacity;

        return pass * _opacity * endOpacity;
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy);

          if(u_resolution.y < u_resolution.x) {
            uv /= u_resolution.y;
          } else {
            uv /= u_resolution.x;
          }
        
          float n = fbm((uv + vec2(sin(u_time*.1), u_time*.1)) * 2. - 2.);

          vec3 colour = vec3(0.);
          
          // NeuroSphere color palette - black background with purple ashes
          colour = n * mix(vec3(0.0, 0.0, 0.0), vec3(0.3, 0.1, 0.5), n); // Black to purple ashes
          
          // Keep background mostly black with subtle purple hints
          colour = mix(colour, vec3(0.05, 0.01, 0.08), 0.1); // Very dark purple base
          colour = clamp(colour, 0.0, 0.4); // Controlled brightness for ashes effect

          float opacity = 1.;
          float opacity_sum = 1.;

          for(int i = 1; i <= layers; i++) {
            colour -= renderLayer(i, layers, uv, opacity, colour, n);
            opacity_sum += opacity;
          }

          colour /= opacity_sum;
          
          // Final NeuroSphere color adjustment - purple ashes on black
          vec3 neuralColors = vec3(
            colour.r * 0.6 + colour.b * 0.9,  // Purple-red ashes
            colour.g * 0.2 + colour.r * 0.4,  // Minimal green, purple tint
            colour.b * 1.2 + colour.r * 0.6   // Enhanced purple-blue ashes
          );
          
          // Keep background black, make ashes visible but not too bright
          neuralColors = clamp(neuralColors * 12., 0., 0.5); // Moderate intensity for ash effect

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
      uniforms
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const ratio = window.innerHeight / window.innerWidth;
      uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    };

    // Resize function
    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    };

    // Animation loop
    const animate = (delta: number) => {
      uniforms.u_time.value = -10000 + delta * 0.0005;
      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Initialize
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("pointermove", handleMouseMove);
    sceneRef.current.animationId = requestAnimationFrame(animate);

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("pointermove", handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      noiseTexture.dispose();
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

export default ParticleLayersBackground;
