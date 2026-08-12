import React, { useEffect, useRef, useState } from "react";

/**
 * A live WebGL lattice — the hero of the website-development page.
 *
 * WHY THIS EXISTS, AND WHY IT IS NOT DECORATION
 *
 * That page sells web development, so it is judged by what it is rather than by
 * what it claims. "Modern Design ✓" asks to be believed; a scene running at
 * 60fps in front of the reader does not.
 *
 * The subject matter is deliberate too. This company integrates systems, so the
 * scene is nodes and the connections between them, distorted by the cursor. It
 * is a picture of the work, not a spinning cube.
 *
 * THE HARD PART IS NOT THE 3D — IT IS THE 3D THAT COSTS NOTHING
 *
 * Three.js is ~150KB. Shipped naively it would wreck the Lighthouse score that
 * is the page's other proof, and a flashy page that loads slowly proves the
 * opposite of what it set out to. Every constraint below exists so the scene can
 * be impressive AND the page can still score 100:
 *
 *   - `import("three")` is DYNAMIC, so it lands in its own chunk and never
 *     touches the initial bundle or the LCP of any other page.
 *   - Nothing loads until the canvas is actually near the viewport
 *     (IntersectionObserver), so a visitor who never scrolls here pays nothing.
 *   - `prefers-reduced-motion` short-circuits the whole thing before the import.
 *     Motion sensitivity is not a preference to animate around; it is a reason
 *     not to load the animation at all.
 *   - Device pixel ratio is capped at 2. Uncapped, a modern phone renders ~9x
 *     the pixels for no visible gain and drops frames doing it.
 *   - The loop stops when the tab is hidden and when the canvas scrolls away.
 *     An offscreen render is heat and battery spent on nothing.
 *   - Everything is disposed on unmount. WebGL contexts are a limited resource;
 *     leaking them across client-side navigations eventually kills the tab.
 */

type Props = {
  className?: string;
  /** Rendered instead of the canvas when WebGL or motion is unavailable. */
  fallback?: React.ReactNode;
};

const NODE_COUNT = 90;
// Squared distance, so the inner loop never calls Math.sqrt. With ~4,000 pair
// checks a frame that difference is measurable on a mid-range phone.
const LINK_DISTANCE_SQ = 1.45 * 1.45;

export default function SystemsLattice({ className, fallback }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);

  // Gate 1 — near the viewport AND off the critical path.
  //
  // The viewport check alone was not enough, and the measurement said so. This
  // canvas is the page hero, so it is on screen at load: the observer fired
  // immediately, three.js was fetched and parsed while the browser was still
  // trying to render the page, and Total Blocking Time went from 130ms to
  // 820ms. Performance fell 84 -> 67 on a page whose whole argument is that the
  // 3D costs nothing. The claim was false until this was fixed.
  //
  // So the import now waits for BOTH: the canvas near the viewport, and the
  // browser genuinely idle after `load`. `requestIdleCallback` yields to
  // anything the user can perceive; the timeout is the fallback for Safari,
  // which still does not implement it.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    let idle = false;
    let idleHandle: number | undefined;
    let timer: number | undefined;

    const maybeStart = () => {
      if (inView && idle) setActive(true);
    };

    const whenIdle = () => {
      const ric = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (ric) {
        idleHandle = ric(
          () => {
            idle = true;
            maybeStart();
          },
          { timeout: 2500 },
        );
      } else {
        timer = window.setTimeout(() => {
          idle = true;
          maybeStart();
        }, 1200);
      }
    };

    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          inView = true;
          maybeStart();
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      window.removeEventListener("load", whenIdle);
      if (timer) clearTimeout(timer);
      const cic = (
        window as unknown as { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback;
      if (idleHandle !== undefined && cic) cic(idleHandle);
    };
  }, []);

  // Gate 2 — only now is three.js fetched.
  useEffect(() => {
    if (!active) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        setFailed(true);
        return;
      }
      if (disposed || !hostRef.current) return;

      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        // No WebGL — an old machine, a locked-down browser, a VM. The fallback
        // is a real design, not an apology.
        setFailed(true);
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.z = 6;

      // Nodes, on a sphere so the structure reads as a whole rather than a cloud.
      const positions = new Float32Array(NODE_COUNT * 3);
      const home = new Float32Array(NODE_COUNT * 3);
      for (let i = 0; i < NODE_COUNT; i++) {
        // Fibonacci distribution — even coverage without the clustering at the
        // poles that naive random spherical coordinates produce.
        const t = i / NODE_COUNT;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
        const r = 2.6;
        const x = r * Math.sin(inclination) * Math.cos(azimuth);
        const y = r * Math.sin(inclination) * Math.sin(azimuth);
        const z = r * Math.cos(inclination);
        positions[i * 3] = home[i * 3] = x;
        positions[i * 3 + 1] = home[i * 3 + 1] = y;
        positions[i * 3 + 2] = home[i * 3 + 2] = z;
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const nodeMat = new THREE.PointsMaterial({
        // Brand orange. On this near-black ground it is a light source, never a
        // label — the palette rule that forbids orange text on light does not
        // apply to an emissive point on dark.
        color: 0xffa634,
        size: 0.075,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
      });
      const points = new THREE.Points(nodeGeo, nodeMat);
      scene.add(points);

      // Links. Allocated once at the maximum possible count and re-filled each
      // frame via `setDrawRange`, because allocating a new buffer per frame is
      // what turns a smooth scene into a garbage-collection stutter.
      const maxLinks = NODE_COUNT * 6;
      const linkPositions = new Float32Array(maxLinks * 6);
      const linkGeo = new THREE.BufferGeometry();
      linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
      const linkMat = new THREE.LineBasicMaterial({
        color: 0x4da3ff,
        transparent: true,
        opacity: 0.25,
      });
      const links = new THREE.LineSegments(linkGeo, linkMat);
      scene.add(links);

      const group = new THREE.Group();
      group.add(points);
      group.add(links);
      scene.add(group);

      // Pointer, in normalised device coordinates. Lerped rather than applied
      // directly so the structure leans toward the cursor instead of snapping.
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointer.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      };
      host.addEventListener("pointermove", onPointerMove, { passive: true });

      let visible = true;
      const onVisibility = () => {
        visible = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVisibility);

      // Pause when the canvas leaves the screen. Rendering something nobody can
      // see is the most common way an "impressive" hero drains a phone battery.
      let onScreen = true;
      const vis = new IntersectionObserver(
        (entries) => {
          onScreen = entries.some((e) => e.isIntersecting);
        },
        { threshold: 0 },
      );
      vis.observe(host);

      const onResize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      let raf = 0;
      const clock = new THREE.Clock();

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || !onScreen) return;

        const t = clock.getElapsedTime();
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;

        group.rotation.y = t * 0.08 + pointer.x * 0.4;
        group.rotation.x = pointer.y * 0.25;

        // Breathe the nodes so the lattice reads as alive rather than a still
        // render that happens to rotate.
        const pos = nodeGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < NODE_COUNT; i++) {
          const i3 = i * 3;
          const pulse = 1 + Math.sin(t * 0.9 + i * 0.35) * 0.045;
          pos[i3] = home[i3] * pulse;
          pos[i3 + 1] = home[i3 + 1] * pulse;
          pos[i3 + 2] = home[i3 + 2] * pulse;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        // Rebuild only the links that are currently short enough.
        let n = 0;
        for (let i = 0; i < NODE_COUNT && n < maxLinks; i++) {
          const i3 = i * 3;
          for (let j = i + 1; j < NODE_COUNT && n < maxLinks; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3 + 1] - pos[j3 + 1];
            const dz = pos[i3 + 2] - pos[j3 + 2];
            if (dx * dx + dy * dy + dz * dz > LINK_DISTANCE_SQ) continue;
            const o = n * 6;
            linkPositions[o] = pos[i3];
            linkPositions[o + 1] = pos[i3 + 1];
            linkPositions[o + 2] = pos[i3 + 2];
            linkPositions[o + 3] = pos[j3];
            linkPositions[o + 4] = pos[j3 + 1];
            linkPositions[o + 5] = pos[j3 + 2];
            n++;
          }
        }
        linkGeo.attributes.position.needsUpdate = true;
        linkGeo.setDrawRange(0, n * 2);

        renderer.render(scene, camera);
      };
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        host.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibility);
        vis.disconnect();
        ro.disconnect();
        nodeGeo.dispose();
        nodeMat.dispose();
        linkGeo.dispose();
        linkMat.dispose();
        // Frees the GPU context rather than waiting for the browser to reclaim
        // it. Browsers cap concurrent contexts; on a single-page app that
        // mounts this repeatedly, leaking them eventually blanks the canvas.
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [active]);

  return (
    <div
      ref={hostRef}
      className={className}
      // Decorative. A screen reader announcing "canvas" here would be noise —
      // every fact the scene conveys is in the prose beside it.
      aria-hidden="true"
      role="presentation"
    >
      {(!active || failed) && fallback}
    </div>
  );
}
