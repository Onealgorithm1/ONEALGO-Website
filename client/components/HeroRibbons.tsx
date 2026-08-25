import { useEffect, useRef } from 'react';

type Ribbon = {
  baseY: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  thickness: number;
  alpha: number;
};

const BACKGROUND_COLOR = '#04182b';
const RIBBON_COUNT = 5;
const MAX_DPR = 2;
const POINTER_STRENGTH = 0.35;
const SIGMA_FACTOR = 0.18;
const SAMPLING_STEP = 4;

function setRibbonSize(ribbons: Ribbon[], width: number, height: number): void {
  for (let i = 0; i < ribbons.length; i++) {
    const r = ribbons[i];
    const t = i / (ribbons.length - 1);
    r.baseY = height * (0.12 + t * 0.76);
    r.amplitude = height * (0.07 + t * 0.20);
    r.frequency = (Math.PI * 2) / (width * (0.25 + i * 0.05));
    r.thickness = height * (0.02 + i * 0.018);
  }
}

function createRibbons(width: number, height: number): Ribbon[] {
  const ribbons: Ribbon[] = [];
  for (let i = 0; i < RIBBON_COUNT; i++) {
    ribbons.push({
      baseY: 0,
      amplitude: 0,
      frequency: 0,
      phase: i * 1.7,
      speed: (0.15 + i * 0.12) * (i % 2 === 0 ? 1 : -1),
      thickness: 0,
      alpha: 0.16 + i * 0.07,
    });
  }
  setRibbonSize(ribbons, width, height);
  return ribbons;
}

function ribbonY(
  r: Ribbon,
  x: number,
  time: number,
  pointerWorldX: number,
  pointerWorldY: number,
  sigma: number,
  strength: number
): number {
  const wave = r.amplitude * Math.sin(r.frequency * x + r.phase + time * r.speed);
  const dx = x - pointerWorldX;
  // Gaussian falloff pulls the ribbon towards the pointer's y position
  const gaussian = Math.exp(-(dx * dx) / (2 * sigma * sigma));
  const bend = (pointerWorldY - r.baseY) * strength * gaussian;
  return r.baseY + wave + bend;
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  ribbons: Ribbon[],
  time: number,
  pointerX: number,
  pointerY: number,
  gradient: CanvasGradient
): void {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, width, height);

  const pointerWorldX = (pointerX + 1) * 0.5 * width;
  const pointerWorldY = (pointerY + 1) * 0.5 * height;
  const sigma = width * SIGMA_FACTOR;
  const segments = Math.ceil(width / SAMPLING_STEP);

  for (let i = 0; i < ribbons.length; i++) {
    const r = ribbons[i];
    ctx.globalAlpha = r.alpha;
    ctx.fillStyle = gradient;
    ctx.beginPath();

    const x0 = 0;
    const yTop0 = ribbonY(r, x0, time, pointerWorldX, pointerWorldY, sigma, POINTER_STRENGTH);
    ctx.moveTo(x0, yTop0);

    for (let s = 1; s <= segments; s++) {
      const x = Math.min(s * SAMPLING_STEP, width);
      const y = ribbonY(r, x, time, pointerWorldX, pointerWorldY, sigma, POINTER_STRENGTH);
      ctx.lineTo(x, y);
    }

    const xRight = width;
    const yBottomRight = ribbonY(r, xRight, time, pointerWorldX, pointerWorldY, sigma, POINTER_STRENGTH) + r.thickness;
    ctx.lineTo(xRight, yBottomRight);

    for (let s = segments - 1; s >= 0; s--) {
      const x = s * SAMPLING_STEP;
      const yBottom = ribbonY(r, x, time, pointerWorldX, pointerWorldY, sigma, POINTER_STRENGTH) + r.thickness;
      ctx.lineTo(x, yBottom);
    }

    ctx.closePath();
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

export default function Ribbons({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    host.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.remove();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let ribbons: Ribbon[] = [];
    let gradient: CanvasGradient | null = null;
    let currentWidth = 0;
    let currentHeight = 0;
    let rafId = 0;
    let running = false;
    let pointerX = 0;
    let pointerY = 0;

    const resizeCanvas = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newGradient = ctx.createLinearGradient(0, 0, 0, height);
      newGradient.addColorStop(0, '#005eaa');
      newGradient.addColorStop(0.5, '#ffffff');
      newGradient.addColorStop(1, '#ffa634');
      gradient = newGradient;

      if (ribbons.length === 0) {
        ribbons = createRibbons(width, height);
      } else {
        setRibbonSize(ribbons, width, height);
      }

      currentWidth = width;
      currentHeight = height;
    };

    const drawFrame = () => {
      if (currentWidth === 0 || currentHeight === 0 || !gradient || ribbons.length === 0) return;
      drawScene(
        ctx,
        currentWidth,
        currentHeight,
        ribbons,
        performance.now() / 1000,
        pointerX,
        pointerY,
        gradient
      );
    };

    resizeCanvas();

    if (reducedMotion) {
      // Draw one frame, no loop, no listeners, no observer
      drawFrame();
      return () => {
        canvas.remove();
      };
    }

    const loop = () => {
      drawFrame();
      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const handleResize = () => {
      resizeCanvas();
      if (!running) {
        drawFrame(); // redraw immediately while paused
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;
      pointerX = ((e.clientX - rect.left) / w) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / h) * 2 - 1;
    };

    startLoop();

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(host);

    return () => {
      stopLoop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
}
