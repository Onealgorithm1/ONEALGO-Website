"use client";

import { useEffect, useRef } from "react";

/* FragmentCanvas — one full-screen triangle + a fragment shader, raw WebGL.
 * The house replacement for the three.js "one quad, one shader" pattern that
 * several 21st.dev heroes use (this repo removed three.js on purpose). Passes
 * `iTime` (seconds) and `iResolution` (w, h, 1) like ShaderToy, sized to its
 * container, DPR capped at 2, paused offscreen / hidden, one frame under
 * reduced motion. `speed` scales time. */

export function FragmentCanvas({ frag, className = "absolute inset-0 h-full w-full block", speed = 1, maxPixels = 1_600_000, vec3 }: { frag: string; className?: string; speed?: number; maxPixels?: number; /** vec3 uniforms set once, e.g. palette colours as [r,g,b] 0..1 */ vec3?: Record<string, [number, number, number]> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false }); if (!gl) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sh = (t: number, s: string) => { const x = gl.createShader(t)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, "precision highp float;\n" + frag));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, "iTime"), uR = gl.getUniformLocation(prog, "iResolution");
    if (vec3) for (const [k, v] of Object.entries(vec3)) gl.uniform3f(gl.getUniformLocation(prog, k), v[0], v[1], v[2]);
    let raf = 0, visible = true, last = 0, t = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      const k = Math.min(1, Math.sqrt(maxPixels / (w * h))); w = Math.round(w * k); h = Math.round(h * k);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform3f(uR, w, h, 1);
    };
    const frame = (now: number) => {
      raf = 0; if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0; last = now; t += dt * speed;
      size(); gl.uniform1f(uT, t); gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) { last = 0; kick(); } });
    io.observe(canvas);
    const vis = () => { visible = !document.hidden; if (visible) { last = 0; kick(); } };
    document.addEventListener("visibilitychange", vis);
    const ro = new ResizeObserver(() => { size(); kick(); }); ro.observe(canvas);
    kick();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); gl.deleteBuffer(buf); gl.deleteProgram(prog); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frag, speed, maxPixels]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* Tunnel Hero — 21st.dev (m.umairwaheedansari), shader kept verbatim, three.js removed. */
export const TUNNEL_FRAG = `
uniform float iTime; uniform vec3 iResolution;
#define TAU 6.2831853071795865
#define TUNNEL_LAYERS 96
#define RING_POINTS 128
#define POINT_SIZE 1.8
#define POINT_COLOR_A vec3(1.0)
#define POINT_COLOR_B vec3(0.7)
#define SPEED 0.7
float sq(float x){ return x*x; }
vec2 AngRep(vec2 uv, float angle){ vec2 polar = vec2(atan(uv.y, uv.x), length(uv)); polar.x = mod(polar.x + angle/2.0, angle) - angle/2.0; return polar.y * vec2(cos(polar.x), sin(polar.x)); }
float sdCircle(vec2 uv, float r){ return length(uv) - r; }
vec3 MixShape(float sd, vec3 fill, vec3 target){ float blend = smoothstep(0.0, 1.0/iResolution.y, sd); return mix(fill, target, blend); }
vec2 TunnelPath(float x){ vec2 offs = vec2(0.2 * sin(TAU * x * 0.5) + 0.4 * sin(TAU * x * 0.2 + 0.3), 0.3 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1)); offs *= smoothstep(1.0, 4.0, x); return offs; }
void main(){
  vec2 res = iResolution.xy / iResolution.y;
  vec2 uv = gl_FragCoord.xy / iResolution.y - res/2.0;
  vec3 color = vec3(0.0);
  float repAngle = TAU / float(RING_POINTS);
  float pointSize = POINT_SIZE / (2.0 * iResolution.y);
  float camZ = iTime * SPEED;
  vec2 camOffs = TunnelPath(camZ);
  for(int i = 1; i <= TUNNEL_LAYERS; i++){
    float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
    pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
    vec2 offs = TunnelPath(camZ + pz) - camOffs;
    float ringRad = 0.15 * (1.0 / sq(pz * 0.8 + 0.4));
    if(abs(length(uv + offs) - ringRad) < pointSize * 1.5){
      vec2 aruv = AngRep(uv + offs, repAngle);
      float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);
      vec3 ptColor = (mod(float(i/2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
      float shade = (1.0 - pz);
      color = MixShape(pdist, ptColor * shade, color);
    }
  }
  gl_FragColor = vec4(color, 1.0);
}`;

/* Silk — 21st.dev Shader Builder ("Silk" style, zero-dependency). Reduced to the
   parts this site uses: the domain-warped palette wave with grain; the cursor
   modes and OKLab option are dropped. Palette is passed as 4 colours. */
export const SILK_FRAG = `
uniform float iTime; uniform vec3 iResolution;
uniform vec3 c0; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3;
float grainHash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 palette(float x){ float f = clamp(x, 0.0, 1.0) * 3.0; vec3 col = c0; col = mix(col, c1, smoothstep(0.0,1.0,clamp(f,0.0,1.0))); col = mix(col, c2, smoothstep(0.0,1.0,clamp(f-1.0,0.0,1.0))); col = mix(col, c3, smoothstep(0.0,1.0,clamp(f-2.0,0.0,1.0))); return col; }
vec3 shade(vec2 p, float t){ vec2 q = p * 1.6; float amp = 0.25 + 0.55 * 0.85; for (float i = 1.0; i < 5.0; i += 1.0){ q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + 1.0); q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6); } return palette(0.5 + 0.5 * sin(q.x + q.y)); }
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
  p *= 1.5;
  float t = iTime * 0.309;
  vec3 col = shade(p, t) * 0.36;
  float e = 0.012 * 1.5;
  col += shade(p + vec2(e, 0.0), t) * 0.16; col += shade(p - vec2(e, 0.0), t) * 0.16; col += shade(p + vec2(0.0, e), t) * 0.16; col += shade(p - vec2(0.0, e), t) * 0.16;
  col = (col - 0.5) * 1.005 + 0.5 - 0.03;
  col += (grainHash(gl_FragCoord.xy + vec2(17.0, 31.0)) - 0.5) * 0.042;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;
