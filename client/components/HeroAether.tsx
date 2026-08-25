import React, { useEffect, useRef, useState } from "react";

/* Aether — WebGL2 shader background.
 *
 * Component: "AetherHero" by @rahil1202 on 21st.dev, retrieved 2026-08-16.
 * Kept as-is apart from four deliberate changes:
 *
 *  1. BRAND. The original shader writes a different pattern into each of R, G
 *     and B, which produces rainbow ribbons. We take its luminance and run it
 *     through the OneAlgorithm ramp (navy → brand blue → white → brand orange),
 *     so the same motion arrives in our colours. That is the whole recolour:
 *     one function and one line in main().
 *  2. Background only. The original ships its own headline, buttons and Google
 *     font; the page already has those in the site's own type and components,
 *     so this renders just the canvas.
 *  3. Respects the reader. prefers-reduced-motion draws one still frame and
 *     starts no loop; the loop also stops while the hero is scrolled out of
 *     view. The original ran requestAnimationFrame forever.
 *  4. Cleanup. Frees the shader program and buffer, and drops the WebGL context
 *     on unmount, so navigating away does not leak a context.
 */

type Props = { className?: string; fallback?: React.ReactNode };

const VERT = `#version 300 es
precision highp float;
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

/* Original pattern maths, unchanged. Only `brand()` and the last two lines of
   main() are ours. */
const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)

float pattern(vec2 uv) {
  float d=.0;
  for (float i=.0; i<3.; i++) {
    uv.x+=sin(T*(1.+i)+uv.y*1.5)*.2;
    d+=.005/abs(uv.x);
  }
  return d;
}

vec3 scene(vec2 uv) {
  vec3 col=vec3(0);
  uv=vec2(atan(uv.x,uv.y)*2./6.28318,-log(length(uv))+T);
  for (float i=.0; i<3.; i++) {
    int k=int(mod(i,3.));
    col[k]+=pattern(uv+i*6./MN);
  }
  return col;
}

/* OneAlgorithm ramp: deep navy base, brand blue mid, white core, orange tip. */
vec3 brand(float t) {
  vec3 navy   = vec3(0.016, 0.094, 0.169);  // #04182b
  vec3 blue   = vec3(0.000, 0.369, 0.667);  // #005eaa
  vec3 white  = vec3(1.000, 1.000, 1.000);
  vec3 orange = vec3(1.000, 0.651, 0.204);  // #ffa634
  t = clamp(t, 0.0, 1.0);
  if (t < 0.42) return mix(navy,  blue,   t / 0.42);
  if (t < 0.78) return mix(blue,  white, (t - 0.42) / 0.36);
  return mix(white, orange, (t - 0.78) / 0.22);
}

void main() {
  vec2 uv=(FC-.5*R)/MN;
  vec3 col=vec3(0);
  float s=12., e=9e-4;
  col+=e/(sin(uv.x*s)*cos(uv.y*s));
  uv.y+=R.x>R.y?.5:.5*(R.y/R.x);
  col+=scene(uv);

  // Ours: collapse the rainbow to one intensity, then paint it in brand.
  float lum = clamp(dot(col, vec3(0.36, 0.42, 0.22)), 0.0, 1.6);
  O = vec4(brand(pow(lum, 0.85)), 1.0);
}`;

export default function HeroAether({ className, fallback }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: true, powerPreference: "low-power" });
    if (!gl) {
      setFailed(true);
      return;
    }
    host.appendChild(canvas);

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type);
      if (!sh) throw new Error("shader");
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(sh) ?? "shader error";
        gl.deleteShader(sh);
        throw new Error(info);
      }
      return sh;
    };

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    try {
      const v = compile(VERT, gl.VERTEX_SHADER);
      const f = compile(FRAG, gl.FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!program) throw new Error("program");
      gl.attachShader(program, v);
      gl.attachShader(program, f);
      gl.linkProgram(program);
      gl.deleteShader(v);
      gl.deleteShader(f);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "link error");
      }
    } catch {
      canvas.remove();
      setFailed(true);
      return;
    }

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "time");
    const uRes = gl.getUniformLocation(program, "resolution");
    gl.clearColor(0.016, 0.094, 0.169, 1);

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(host.clientWidth * dpr));
      const h = Math.max(1, Math.floor(host.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();

    const render = (t: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;

    const loop = (now: number) => {
      render(now * 1e-3);
      if (running) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      render(2.4); // one considered frame
    } else {
      running = true;
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);

    const ro = new ResizeObserver(() => {
      fit();
      if (reduced) render(2.4);
    });
    ro.observe(host);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  if (failed) return <>{fallback ?? null}</>;
  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
