import { useEffect, useRef } from 'react';

const STAR_COUNT = 450;
const PERSPECTIVE_FACTOR = 0.85;
const SPEED_Z = 0.0035;
const TILT_FACTOR = 0.06;
const BLUE_WHITE = '#c0dfff';
const ORANGE = '#ffa634';
const BG_COLOR = 'rgba(4,24,43,0.25)';
const ORANGE_RATIO = 0.08;

export default function Starfield({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{
    x: Float32Array;
    y: Float32Array;
    z: Float32Array;
    isOrange: Uint8Array;
  } | null>(null);
  const initializedRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const initStars = (displayWidth: number, displayHeight: number) => {
    const virtualWidth = displayWidth * 2;
    const virtualHeight = displayHeight * 2;
    const x = new Float32Array(STAR_COUNT);
    const y = new Float32Array(STAR_COUNT);
    const z = new Float32Array(STAR_COUNT);
    const isOrange = new Uint8Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      x[i] = (Math.random() - 0.5) * virtualWidth;
      y[i] = (Math.random() - 0.5) * virtualHeight;
      z[i] = Math.random() * 0.9 + 0.1;
      isOrange[i] = Math.random() < ORANGE_RATIO ? 1 : 0;
    }
    starsRef.current = { x, y, z, isOrange };
    initializedRef.current = true;
  };

  const updateCanvasSize = (displayWidth: number, displayHeight: number, dpr: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current!;
    const newWidth = displayWidth * dpr;
    const newHeight = displayHeight * dpr;
    if (newWidth !== canvas.width || newHeight !== canvas.height) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };

  const draw = (displayWidth: number, displayHeight: number, mouseX: number, mouseY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    updateCanvasSize(displayWidth, displayHeight, dpr, ctx);

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const stars = starsRef.current;
    if (!stars) return;

    // Star x/y live in screen units at z=1; dividing by z pushes them outward
    // as they approach, which is the whole warp effect. The generated version
    // multiplied by displayHeight as well, so every star left the viewport on
    // frame one at alpha 0 — a blank canvas.
    const virtualWidth = displayWidth;
    const virtualHeight = displayHeight;
    const offsetX = (mouseX - displayWidth / 2) * TILT_FACTOR;
    const offsetY = (mouseY - displayHeight / 2) * TILT_FACTOR;
    const halfWidth = displayWidth / 2;
    const halfHeight = displayHeight / 2;

    for (let i = 0; i < STAR_COUNT; i++) {
      let zi = stars.z[i];
      zi -= SPEED_Z;
      if (zi < 0.1) {
        zi = 1.0;
        stars.x[i] = (Math.random() - 0.5) * virtualWidth;
        stars.y[i] = (Math.random() - 0.5) * virtualHeight;
      }
      stars.z[i] = zi;

      const scale = PERSPECTIVE_FACTOR / zi;
      const sx = stars.x[i] * scale + halfWidth + offsetX * (1 - zi);
      const sy = stars.y[i] * scale + halfHeight + offsetY * (1 - zi);
      if (sx < -20 || sx > displayWidth + 20 || sy < -20 || sy > displayHeight + 20) continue;

      // Near stars are brighter and bigger; far ones fade into the navy.
      const near = 1 - zi;
      const alpha = 0.15 + near * near * 0.85;
      const radius = 0.5 + near * 1.7;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = stars.isOrange[i] ? ORANGE : BLUE_WHITE;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const loop = () => {
    const container = containerRef.current;
    if (!container) return;
    const displayWidth = container.clientWidth;
    const displayHeight = container.clientHeight;
    if (displayWidth === 0 || displayHeight === 0) {
      animationFrameRef.current = requestAnimationFrame(loop);
      return;
    }
    const mouse = mouseRef.current;
    draw(displayWidth, displayHeight, mouse.x, mouse.y);
    if (!reducedMotionRef.current) {
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  };

  const startLoop = () => {
    if (reducedMotionRef.current) return;
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  const stopLoop = () => {
    cancelAnimationFrame(animationFrameRef.current);
  };

  const drawOnce = () => {
    const container = containerRef.current;
    if (!container) return;
    const displayWidth = container.clientWidth;
    const displayHeight = container.clientHeight;
    if (displayWidth === 0 || displayHeight === 0) return;
    if (!initializedRef.current) {
      initStars(displayWidth, displayHeight);
    }
    draw(displayWidth, displayHeight, displayWidth / 2, displayHeight / 2);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const displayWidth = rect.width || container.clientWidth;
    const displayHeight = rect.height || container.clientHeight;
    if (displayWidth > 0 && displayHeight > 0 && !initializedRef.current) {
      initStars(displayWidth, displayHeight);
      mouseRef.current = { x: displayWidth / 2, y: displayHeight / 2 };
    }

    if (reducedMotionRef.current) {
      drawOnce();
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const c = containerRef.current;
      if (c) {
        const { left, top, width, height } = c.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        mouseRef.current.x = Math.max(0, Math.min(width, x));
        mouseRef.current.y = Math.max(0, Math.min(height, y));
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    startLoop();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observerRef.current.observe(container);

    return () => {
      stopLoop();
      window.removeEventListener('mousemove', onMouseMove);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
