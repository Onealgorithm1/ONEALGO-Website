"use client";

import { useEffect, useRef } from "react";

/* WebGLShader — from 21st.dev (three.js original). Ported to raw WebGL because
 * this repo removed three.js on purpose (720 kB, ~14 Lighthouse points): the
 * scene is one full-screen quad and one fragment shader, so the library was
 * doing nothing the browser cannot. Same shader, same picture, no dependency.
 * Sized to its container (not the window) so it can live inside a slide;
 * stops when offscreen and renders one frame under reduced motion. */

const VERT = `attribute vec3 position; void main(){ gl_Position = vec4(position, 1.0); }`;
const FRAG = `
precision highp float;
uniform vec2 resolution; uniform float time; uniform float xScale; uniform float yScale; uniform float distortion;
void main(){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float d = length(p) * distortion;
  float rx = p.x * (1.0 + d); float gx = p.x; float bx = p.x * (1.0 - d);
  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

export function WebGLShader({ className = "absolute inset-0 h-full w-full block" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false }); if (!gl) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("resolution"), uTime = u("time");
    gl.uniform1f(u("xScale"), 1.0); gl.uniform1f(u("yScale"), 0.5); gl.uniform1f(u("distortion"), 0.05);

    let time = 0, raf = 0, visible = true;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr), h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h); }
    };
    const frame = () => {
      size(); time += 0.01; gl.uniform1f(uTime, time); gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { size(); if (reduced) frame(); }); ro.observe(canvas);
    frame();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); gl.deleteBuffer(buf); gl.deleteProgram(prog); };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
