import { useEffect, useRef } from "react";

type ParticleKind = "dot" | "four-point" | "five-point";

type Particle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  rotation: number;
  spin: number;
  age: number;
  lifetime: number;
  color: string;
  kind: ParticleKind;
};

const MAX_PARTICLES = 84;
const EMIT_DISTANCE = 5;
const EMIT_INTERVAL = 18;
const PARTICLE_COLORS = [
  "255 255 255",
  "218 223 232",
  "168 184 255",
  "194 204 255",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function drawFourPointStar(
  context: CanvasRenderingContext2D,
  size: number,
) {
  context.beginPath();
  context.moveTo(0, -size);
  context.quadraticCurveTo(size * 0.14, -size * 0.14, size, 0);
  context.quadraticCurveTo(size * 0.14, size * 0.14, 0, size);
  context.quadraticCurveTo(-size * 0.14, size * 0.14, -size, 0);
  context.quadraticCurveTo(-size * 0.14, -size * 0.14, 0, -size);
  context.closePath();
  context.fill();
}

function drawFivePointStar(
  context: CanvasRenderingContext2D,
  size: number,
) {
  const innerSize = size * 0.43;
  context.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const radius = point % 2 === 0 ? size : innerSize;
    const angle = -Math.PI / 2 + (point * Math.PI) / 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (point === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
}

export function GlitterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    let enabled = finePointer.matches && !reducedMotion.matches;
    let animationFrame = 0;
    let lastFrameTime = performance.now();
    let lastEmitTime = 0;
    let lastX = -100;
    let lastY = -100;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      particles.length = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      canvas.hidden = true;
    };

    const drawFrame = (time: number) => {
      const delta = Math.min((time - lastFrameTime) / 16.67, 2);
      lastFrameTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        if (!particle) continue;

        particle.age += 16.67 * delta;
        if (particle.age >= particle.lifetime) {
          particles.splice(index, 1);
          continue;
        }

        particle.x += particle.velocityX * delta;
        particle.y += particle.velocityY * delta;
        particle.velocityY += 0.012 * delta;
        particle.rotation += particle.spin * delta;

        const progress = particle.age / particle.lifetime;
        const opacity = Math.sin(progress * Math.PI) * (1 - progress * 0.28);
        const scale = 0.72 + Math.sin(progress * Math.PI) * 0.36;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.scale(scale, scale);
        context.fillStyle = `rgb(${particle.color} / ${opacity})`;
        context.shadowColor = `rgb(${particle.color} / ${opacity * 0.72})`;
        context.shadowBlur = particle.kind === "dot" ? 5 : 9;

        if (particle.kind === "dot") {
          context.beginPath();
          context.arc(0, 0, particle.size * 0.42, 0, Math.PI * 2);
          context.fill();
        } else if (particle.kind === "four-point") {
          drawFourPointStar(context, particle.size);
        } else {
          drawFivePointStar(context, particle.size);
        }
        context.restore();
      }

      if (particles.length > 0 && enabled) {
        animationFrame = requestAnimationFrame(drawFrame);
      } else {
        animationFrame = 0;
      }
    };

    const startAnimation = () => {
      if (animationFrame || particles.length === 0) return;
      lastFrameTime = performance.now();
      animationFrame = requestAnimationFrame(drawFrame);
    };

    const addParticle = (x: number, y: number, kind: ParticleKind) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x: x + randomBetween(-6, 6),
        y: y + randomBetween(-6, 6),
        velocityX: randomBetween(-0.42, 0.42),
        velocityY: randomBetween(-0.58, 0.14),
        size: kind === "dot" ? randomBetween(1.8, 3.6) : randomBetween(3.2, 6.4),
        rotation: randomBetween(0, Math.PI * 2),
        spin: randomBetween(-0.055, 0.055),
        age: 0,
        lifetime: randomBetween(420, 760),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? PARTICLE_COLORS[0],
        kind,
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType === "touch") return;

      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance < EMIT_DISTANCE || now - lastEmitTime < EMIT_INTERVAL) return;

      canvas.hidden = false;
      const particleCount = distance > 36 ? 3 : 2;
      for (let index = 0; index < particleCount; index += 1) {
        const roll = Math.random();
        const kind: ParticleKind = roll < 0.48 ? "dot" : roll < 0.82 ? "four-point" : "five-point";
        addParticle(event.clientX, event.clientY, kind);
      }

      lastX = event.clientX;
      lastY = event.clientY;
      lastEmitTime = now;
      startAnimation();
    };

    const updatePreference = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      if (!enabled) stop();
      else canvas.hidden = false;
    };

    resizeCanvas();
    canvas.hidden = !enabled;
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    finePointer.addEventListener("change", updatePreference);
    reducedMotion.addEventListener("change", updatePreference);

    return () => {
      stop();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      finePointer.removeEventListener("change", updatePreference);
      reducedMotion.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      data-glitter-cursor="true"
    />
  );
}