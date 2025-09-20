import React, { useEffect, useRef } from 'react';

const RainbowZappersBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL 2 not supported');
      return;
    }

    const vertexShaderSource = `#version 300 es
in vec4 aPosition;
void main() {
    gl_Position = aPosition;
}`;

    const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec4 iMouse;
out vec4 fragColor;

vec4 getMainImage(vec2 fragCoord) {
    vec2 u = fragCoord;
    vec2 v = iResolution.xy;
    u = .2*(u+u-v)/v.y;
    vec4 z = vec4(1,2,3,0);
    vec4 o = z;
     
    for (float a = .5, t = iTime, i; 
         ++i < 19.; 
         o += (1. + cos(z+t)) 
            / length((1.+i*dot(v,v)) 
                   * sin(1.5*u/(.5-dot(u,u)) - 9.*u.yx + t))
         )  
    {
        v = cos(++t - 7.*u*pow(a += .03, i)) - 5.*u;
        u += tanh(40. * dot(u *= mat2(cos(i + .02*t - vec4(0,11,33,0))), u) * cos(1e2*u.yx + t)) / 2e2
           + .2 * a * u
           + cos(4./exp(dot(o,o)/1e2) + t) / 3e2;
    }
              
    o = 25.6 / (min(o, 13.) + 164. / o) 
      - dot(u, u) / 250.;

    return o;
}

vec4 getMainImage2(vec2 I) {
    float i = 0., z = 0., d, s;
    vec4 O = vec4(0.0);
    for(; i<1e2; i++) {
        vec3 v, p = z * normalize(vec3(I+I,0) - iResolution.xyy);
        p.z += 3.;
        p.zx *= mat2(cos(.5*iTime + vec4(0,11,33,0)));
        v = p;
        for(d = 1.; d<i; d += d)
            p += sin(p * d).yzx / d;
        z += d = .2 * max(.02 + abs(s = cos(p.y*3.)) / 7., length(v - clamp(v, -1., 1.)));
        O += (cos(2.*p.y + s + s - vec4(9,4,5,0)) + 1.5) / d;
    }
    return tanh(O * O / 2e8);
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec4 img1 = getMainImage(fragCoord);
    vec4 img2 = getMainImage2(fragCoord);
    
    // Mix the two results
    vec4 mixedColor = mix(img1, img2, 0.3);
    
    // Apply NeuroSphere color palette (blue, purple, cyan)
    vec3 neuralColors = vec3(
        mixedColor.b * 1.2 + mixedColor.r * 0.3,  // Enhanced blue with purple hints
        mixedColor.g * 0.8 + mixedColor.b * 0.6,  // Purple-tinted green
        mixedColor.r * 0.7 + mixedColor.g * 1.1   // Cyan enhancement
    );
    
    // Smooth color transitions and reduce harsh whites
    neuralColors = smoothstep(0.15, 0.75, neuralColors);
    neuralColors = mix(neuralColors, vec3(0.2, 0.3, 0.6), 0.1); // Light base neural blue tint
    neuralColors = clamp(neuralColors * 0.85, 0.0, 0.8); // Cap maximum brightness
    
    fragColor = vec4(neuralColors, mixedColor.a);
}
`;

    function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'iResolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'iTime');
    const mouseUniformLocation = gl.getUniformLocation(program, 'iMouse');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    let mouseX = 0, mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    resizeCanvas();

    let animationId: number;

    function render(time: number) {
      gl.uniform3f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height, 1.0);
      gl.uniform1f(timeUniformLocation, time * 0.0005); // Slower animation for smoother effect
      gl.uniform4f(mouseUniformLocation, mouseX, mouseY, 0.0, 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
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

export default RainbowZappersBackground;
