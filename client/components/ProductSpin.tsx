import React, { useEffect, useRef, useState } from "react";

/* A hand-built product configurator rendered on a 2D canvas.
 *
 * Like WovenLight, this keeps the 3D maths local: procedural geometry,
 * perspective projection, flat lighting and painter's sorting, with no WebGL
 * dependency. Scratch buffers are allocated once, DPR is capped at 2, and the
 * loop sleeps whenever the scene is offscreen or the tab is hidden.
 */

type Props = {
  className?: string;
  /** Controlled mode (the Kettle & Kiln prototype drives these); leave unset for standalone use. */
  glaze?: number;
  band?: boolean;
  onGlaze?: (index: number) => void;
  onBand?: (band: boolean) => void;
};

export type MugMesh = {
  vertices: Float32Array;
  triangles: Uint32Array;
  /** 0 glaze, 1 inner, 2 lip/bottom, 3 optional rim band. */
  surfaces: Uint8Array;
};

const GLAZES = [
  { name: "Ember", hex: "#F26522", rgb: [242, 101, 34] },
  { name: "Harbor", hex: "#005EAA", rgb: [0, 94, 170] },
  { name: "Soot", hex: "#1B1B1B", rgb: [27, 27, 27] },
  { name: "Bone", hex: "#F4EEDD", rgb: [244, 238, 221] },
  { name: "Sage", hex: "#6F7F5A", rgb: [111, 127, 90] },
] as const;

const TAU = Math.PI * 2;

/** Build a watertight-looking lathed cup and a swept C-shaped handle. */
export function buildMugMesh(segments: number): MugMesh {
  const sides = Math.max(12, Math.floor(segments));
  const vertices: number[] = [];
  const triangles: number[] = [];
  const surfaces: number[] = [];

  const vertex = (x: number, y: number, z: number) => {
    vertices.push(x, y, z);
    return vertices.length / 3 - 1;
  };

  const ring = (radius: number, y: number) => {
    const start = vertices.length / 3;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * TAU;
      vertex(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    }
    return start;
  };

  const join = (a: number, b: number, surface: number, inward = false) => {
    for (let i = 0; i < sides; i++) {
      const n = (i + 1) % sides;
      if (inward) triangles.push(a + i, b + n, a + n, a + i, b + i, b + n);
      else triangles.push(a + i, a + n, b + n, a + i, b + n, b + i);
      surfaces.push(surface, surface);
    }
  };

  // Outer profile: a weighted foot, slight taper, shoulder and rolled lip.
  const outer: [number, number][] = [
    [0.78, -1.24],
    [0.82, -1.18],
    [0.83, -0.72],
    [0.85, -0.12],
    [0.87, 0.5],
    [0.9, 0.9],
    [0.93, 1.08],
    [0.98, 1.18],
    [0.98, 1.24],
  ];
  const outerRings = outer.map(([r, y]) => ring(r, y));
  for (let i = 0; i < outerRings.length - 1; i++) {
    const band = outer[i][1] >= 0.82 || outer[i + 1][1] >= 1.08;
    join(outerRings[i], outerRings[i + 1], band ? 3 : 0);
  }

  // The inner wall stops above the base, so the mug reads as hollow from above.
  const inner: [number, number][] = [
    [0.79, 1.24],
    [0.76, 1.15],
    [0.73, 0.94],
    [0.71, 0.66],
    [0.7, 0.38],
  ];
  const innerRings = inner.map(([r, y]) => ring(r, y));
  join(outerRings[outerRings.length - 1], innerRings[0], 2);
  for (let i = 0; i < innerRings.length - 1; i++) join(innerRings[i], innerRings[i + 1], 1, true);

  const innerFloor = vertex(0, 0.34, 0);
  const base = vertex(0, -1.24, 0);
  for (let i = 0; i < sides; i++) {
    const n = (i + 1) % sides;
    triangles.push(innerRings[innerRings.length - 1] + i, innerFloor, innerRings[innerRings.length - 1] + n);
    triangles.push(outerRings[0] + i, outerRings[0] + n, base);
    surfaces.push(1, 2);
  }

  // Handle: a torus arc swept in the X/Y plane, intersecting the body at both ends.
  const arcSteps = Math.max(12, Math.round(sides * 0.75));
  const tubeSteps = Math.max(8, Math.round(sides / 4));
  const handleStart = vertices.length / 3;
  for (let a = 0; a <= arcSteps; a++) {
    const angle = -1.16 + (a / arcSteps) * 2.32;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    for (let t = 0; t < tubeSteps; t++) {
      const around = (t / tubeSteps) * TAU;
      const tube = 0.16;
      vertex(
        0.68 + nx * (0.72 + Math.cos(around) * tube),
        ny * (0.72 + Math.cos(around) * tube),
        Math.sin(around) * tube,
      );
    }
  }
  for (let a = 0; a < arcSteps; a++) {
    const first = handleStart + a * tubeSteps;
    const next = first + tubeSteps;
    for (let t = 0; t < tubeSteps; t++) {
      const n = (t + 1) % tubeSteps;
      triangles.push(first + t, first + n, next + n, first + t, next + n, next + t);
      surfaces.push(0, 0);
    }
  }
  const capA = vertex(0.68 + Math.cos(-1.16) * 0.72, Math.sin(-1.16) * 0.72, 0);
  const capB = vertex(0.68 + Math.cos(1.16) * 0.72, Math.sin(1.16) * 0.72, 0);
  for (let t = 0; t < tubeSteps; t++) {
    const n = (t + 1) % tubeSteps;
    triangles.push(handleStart + t, capA, handleStart + n);
    const end = handleStart + arcSteps * tubeSteps;
    triangles.push(end + t, end + n, capB);
    surfaces.push(0, 0);
  }

  return {
    vertices: new Float32Array(vertices),
    triangles: new Uint32Array(triangles),
    surfaces: new Uint8Array(surfaces),
  };
}

function shadeTable(rgb: readonly number[], multiplier = 1) {
  return Array.from({ length: 32 }, (_, i) => {
    const light = (0.24 + (i / 31) * 0.76) * multiplier;
    return `rgb(${Math.min(255, Math.round(rgb[0] * light))} ${Math.min(255, Math.round(rgb[1] * light))} ${Math.min(255, Math.round(rgb[2] * light))})`;
  });
}

export default function ProductSpin({ className, glaze: glazeProp, band: bandProp, onGlaze, onBand }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glazeRef = useRef(glazeProp ?? 0);
  const bandRef = useRef(bandProp ?? false);
  const redrawRef = useRef<() => void>(() => undefined);
  const [glaze, setGlaze] = useState(glazeProp ?? 0);
  const [band, setBand] = useState(bandProp ?? false);

  // Controlled mode: follow the props (the quote form can change the glaze too).
  useEffect(() => {
    if (glazeProp === undefined && bandProp === undefined) return;
    if (glazeProp !== undefined) { glazeRef.current = glazeProp; setGlaze(glazeProp); }
    if (bandProp !== undefined) { bandRef.current = bandProp; setBand(bandProp); }
    redrawRef.current();
  }, [glazeProp, bandProp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mesh = buildMugMesh(48);
    const vertexCount = mesh.vertices.length / 3;
    const triangleCount = mesh.triangles.length / 3;

    // ---- Preallocated render data ------------------------------------------
    const tx = new Float32Array(vertexCount);
    const ty = new Float32Array(vertexCount);
    const tz = new Float32Array(vertexCount);
    const sx = new Float32Array(vertexCount);
    const sy = new Float32Array(vertexCount);
    const depth = new Float32Array(triangleCount);
    const light = new Uint8Array(triangleCount);
    const order = new Uint32Array(triangleCount);
    for (let i = 0; i < triangleCount; i++) order[i] = i;
    const tables = GLAZES.map((item) => shadeTable(item.rgb));
    const innerTables = GLAZES.map((item) => shadeTable(item.rgb, 0.58));
    const bandTable = shadeTable([244, 238, 221]);
    const darkBandTable = shadeTable([27, 27, 27]);

    let width = 1;
    let height = 1;
    let dpr = 1;
    let yaw = -0.55;
    let tilt = 0.3;
    let hoverTilt = 0;
    let velocity = 0;
    let dragging = false;
    let pointerX = 0;
    let pointerTime = 0;
    let visible = false;
    let running = false;
    let raf = 0;
    let lastTime = performance.now();
    let displayedGlaze = glazeRef.current;
    let previousGlaze = displayedGlaze;
    let transitionStart = 0;
    let transitionMix = 1;

    const sortFarToNear = (a: number, b: number) => depth[a] - depth[b];

    const draw = (now: number) => {
      const targetGlaze = glazeRef.current;
      if (targetGlaze !== displayedGlaze) {
        previousGlaze = displayedGlaze;
        displayedGlaze = targetGlaze;
        transitionStart = now;
      }
      transitionMix = reduced ? 1 : Math.min(1, (now - transitionStart) / 180);

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const rx = tilt + hoverTilt;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const scale = Math.min(width, height) * 0.42;
      const centerX = width * 0.48;
      const centerY = height * 0.44;
      const cameraZ = 5.1;

      for (let i = 0, v = 0; i < vertexCount; i++, v += 3) {
        const x = mesh.vertices[v];
        const y = mesh.vertices[v + 1];
        const z = mesh.vertices[v + 2];
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const perspective = 2.8 / (cameraZ - z2);
        tx[i] = x1;
        ty[i] = y2;
        tz[i] = z2;
        sx[i] = centerX + x1 * perspective * scale;
        sy[i] = centerY - y2 * perspective * scale;
      }

      for (let i = 0, p = 0; i < triangleCount; i++, p += 3) {
        const a = mesh.triangles[p];
        const b = mesh.triangles[p + 1];
        const c = mesh.triangles[p + 2];
        depth[i] = (tz[a] + tz[b] + tz[c]) / 3;
        const abx = tx[b] - tx[a];
        const aby = ty[b] - ty[a];
        const abz = tz[b] - tz[a];
        const acx = tx[c] - tx[a];
        const acy = ty[c] - ty[a];
        const acz = tz[c] - tz[a];
        const nx = aby * acz - abz * acy;
        const ny = abz * acx - abx * acz;
        const nz = abx * acy - aby * acx;
        const length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        const intensity = Math.max(0, (nx * -0.42 + ny * 0.72 + nz * 0.55) / length);
        light[i] = Math.round((0.28 + intensity * 0.72) * 31);
      }
      order.sort(sortFarToNear);

      ctx.fillStyle = "#04182B";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 0.75;
      ctx.lineJoin = "round";

      // Ground contact shadow: layered ellipses avoid allocating a gradient per frame.
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.beginPath();
      ctx.ellipse(centerX, height * 0.76, scale * 0.48, scale * 0.1, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.ellipse(centerX, height * 0.76, scale * 0.34, scale * 0.055, 0, 0, TAU);
      ctx.fill();

      for (let k = 0; k < triangleCount; k++) {
        const face = order[k];
        const p = face * 3;
        const a = mesh.triangles[p];
        const b = mesh.triangles[p + 1];
        const c = mesh.triangles[p + 2];
        const signedArea = (sx[b] - sx[a]) * (sy[c] - sy[a]) - (sy[b] - sy[a]) * (sx[c] - sx[a]);
        if (signedArea >= 0) continue;

        const surface = mesh.surfaces[face];
        const shade = light[face];
        const currentBand = displayedGlaze === 3 ? darkBandTable : bandTable;
        const previousBand = previousGlaze === 3 ? darkBandTable : bandTable;
        const current = surface === 1 ? innerTables[displayedGlaze][shade] : surface === 3 && bandRef.current ? currentBand[shade] : tables[displayedGlaze][shade];
        const previous = surface === 1 ? innerTables[previousGlaze][shade] : surface === 3 && bandRef.current ? previousBand[shade] : tables[previousGlaze][shade];

        ctx.beginPath();
        ctx.moveTo(sx[a], sy[a]);
        ctx.lineTo(sx[b], sy[b]);
        ctx.lineTo(sx[c], sy[c]);
        ctx.closePath();
        if (transitionMix < 1 && previous !== current) {
          ctx.fillStyle = previous;
          ctx.globalAlpha = 1;
          ctx.fill();
        }
        ctx.fillStyle = current;
        ctx.globalAlpha = transitionMix;
        ctx.fill();
        // Hairline stroke in the same colour hides the anti-aliasing seams between neighbouring triangles.
        ctx.strokeStyle = current;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const shouldAnimate = () => visible && !document.hidden && !reduced;
    const loop = (now: number) => {
      const dt = Math.min(32, now - lastTime);
      lastTime = now;
      if (!dragging && !reduced) {
        yaw += (Math.abs(velocity) > 0.0001 ? velocity : 0.00013) * dt;
        velocity *= Math.pow(0.94, dt / 16.67);
      }
      draw(now);
      if (shouldAnimate()) raf = requestAnimationFrame(loop);
      else running = false;
    };

    const start = () => {
      if (running || !shouldAnimate()) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const drawOnce = () => draw(performance.now());
    redrawRef.current = reduced ? drawOnce : start;

    const resize = () => {
      width = host.clientWidth || 1;
      height = host.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawOnce();
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      pointerX = event.clientX;
      pointerTime = event.timeStamp;
      velocity = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      start();
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverTilt = ((event.clientY - rect.top) / rect.height - 0.5) * -0.14;
      if (dragging) {
        const elapsed = Math.max(8, event.timeStamp - pointerTime);
        const delta = event.clientX - pointerX;
        yaw += delta * 0.009;
        velocity = reduced ? 0 : (delta * 0.009) / elapsed;
        pointerX = event.clientX;
        pointerTime = event.timeStamp;
      }
      if (reduced) drawOnce();
    };
    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
      if (reduced) drawOnce();
      else start();
    };
    const onPointerLeave = () => {
      if (!dragging) {
        hoverTilt = 0;
        if (reduced) drawOnce();
      }
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (reduced) drawOnce();
        else start();
      } else {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    intersectionObserver.observe(host);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      redrawRef.current = () => undefined;
    };
  }, []);

  const chooseGlaze = (index: number) => {
    glazeRef.current = index;
    setGlaze(index);
    redrawRef.current();
    onGlaze?.(index);
  };
  const toggleBand = () => {
    bandRef.current = !bandRef.current;
    setBand(bandRef.current);
    redrawRef.current();
    onBand?.(bandRef.current);
  };

  const label = `${GLAZES[glaze].name} glaze${band ? " with contrasting band" : ""}`;

  return (
    <section className={className} aria-label="Interactive coffee mug configurator">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#04182B]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Rotatable low-poly ceramic coffee mug in ${label}`}
          className="block h-full w-full cursor-grab touch-none"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-3 bg-[#04182B]/90 px-4 py-3 text-white backdrop-blur-sm sm:px-5">
          <fieldset className="flex items-center gap-2" aria-label="Glaze colour">
            <legend className="sr-only">Glaze colour</legend>
            {GLAZES.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`${item.name} glaze`}
                aria-pressed={glaze === index}
                onClick={() => chooseGlaze(index)}
                className="h-11 w-11 rounded-full border-2 border-white/35 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04182B] aria-pressed:border-white aria-pressed:shadow-[0_0_0_2px_#04182B,0_0_0_4px_white]"
                style={{ backgroundColor: item.hex }}
              />
            ))}
          </fieldset>
          <button
            type="button"
            aria-pressed={band}
            onClick={toggleBand}
            className="min-h-11 border border-white/35 px-4 text-sm font-medium tracking-wide text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04182B] aria-pressed:border-[#F4EEDD] aria-pressed:bg-[#F4EEDD] aria-pressed:text-[#04182B]"
          >
            Band
          </button>
          <span role="status" aria-live="polite" className="ml-auto text-xs tracking-wide text-white/80">
            {label}
          </span>
        </div>
      </div>
    </section>
  );
}
