import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Watercolour palette — each completed painting moves to the next hue. */
const PALETTE = [
  { h: 24, s: 42, l: 46 }, 
  { h: 12, s: 78, l: 52 }, // vermilion
  { h: 205, s: 72, l: 48 }, // cobalt
  { h: 142, s: 55, l: 40 }, // viridian
  { h: 42, s: 90, l: 52 }, // ochre
  { h: 292, s: 55, l: 50 }, // violet
  { h: 340, s: 70, l: 55 }, // rose madder
] as const;

type Stamp = { x: number; y: number; r: number; grow: number; born: number; c: number };

export function PaintWordmark({
  text = "Painttheory",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const baseRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const paintRef = useRef<HTMLCanvasElement | null>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const textPixelsRef = useRef(1);
  const colorRef = useRef(0);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const doneRef = useRef(false);
  const rafRef = useRef(0);
  const dirtyRef = useRef(true);

  useEffect(() => {
    const wrap = wrapRef.current;
    const base = baseRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !base || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const BLEED_MS = 2600;

    const buildMask = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (canvas.width === w * dpr && canvas.height === h * dpr) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const paint = paintRef.current ?? document.createElement("canvas");
      const mask = maskRef.current ?? document.createElement("canvas");
      paintRef.current = paint;
      maskRef.current = mask;
      paint.width = mask.width = canvas.width;
      paint.height = mask.height = canvas.height;

      const cs = getComputedStyle(base);
      const fontSize = parseFloat(cs.fontSize);
      const mctx = mask.getContext("2d");
      if (!mctx) return;
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, w, h);
      mctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
      if ("letterSpacing" in mctx) {
        (mctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      }
      mctx.textAlign = "left";
      mctx.textBaseline = "alphabetic";
      mctx.fillStyle = "#000";

      const bRect = base.getBoundingClientRect();
      const m = mctx.measureText(text);
      const ascent = m.fontBoundingBoxAscent || fontSize * 0.8;
      const descent = m.fontBoundingBoxDescent || fontSize * 0.2;
      const lineH = bRect.height;
      const y = bRect.top - rect.top + (lineH - (ascent + descent)) / 2 + ascent;
      mctx.fillText(text, bRect.left - rect.left, y);

      const step = 4;
      let count = 0;
      const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
      for (let i = 3; i < data.length; i += 4 * step) if ((data[i] ?? 0) > 40) count++;
      textPixelsRef.current = Math.max(1, count);

      stampsRef.current = [];
      doneRef.current = false;
      lastRef.current = null;
      dirtyRef.current = true;
    };

    const drawStamp = (ctx: CanvasRenderingContext2D, s: Stamp, now: number) => {
      const t = Math.min(1, (now - s.born) / BLEED_MS);
      // ease-out flow: pigment keeps creeping outward, slower over time
      const r = s.r * (1 + s.grow * (1 - Math.pow(1 - t, 2)));
      const c = PALETTE[s.c % PALETTE.length] ?? PALETTE[0];
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
      g.addColorStop(0, `hsl(${c.h} ${c.s}% ${c.l}% / 0.34)`);
      g.addColorStop(0.6, `hsl(${c.h + 8} ${c.s - 8}% ${c.l + 5}% / 0.2)`);
      g.addColorStop(0.85, `hsl(${c.h + 12} ${c.s}% ${c.l + 8}% / 0.08)`);
      g.addColorStop(1, `hsl(${c.h + 14} ${c.s}% ${c.l + 10}% / 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (now: number) => {
      const ctx = canvas.getContext("2d");
      const paint = paintRef.current;
      const mask = maskRef.current;
      if (!ctx || !paint || !mask) return;
      const pctx = paint.getContext("2d");
      if (!pctx) return;

      pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pctx.clearRect(0, 0, paint.width, paint.height);
      for (const s of stampsRef.current) drawStamp(pctx, s, now);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(paint, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      const stamps = stampsRef.current;
      const flowing = stamps.some((s) => now - s.born < BLEED_MS);
      if (dirtyRef.current || flowing) {
        render(now);
        dirtyRef.current = false;
        if (!doneRef.current) checkComplete();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const paintAt = (cx: number, cy: number) => {
      const rect = wrap.getBoundingClientRect();
      const x = cx - rect.left;
      const y = cy - rect.top;
      const brush = Math.max(40, Math.min(rect.height, rect.width) * 0.34);
      const now = performance.now();

      const prev = lastRef.current ?? { x, y };
      const dist = Math.hypot(x - prev.x, y - prev.y);
      const steps = Math.max(1, Math.ceil(dist / (brush * 0.3)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = prev.x + (x - prev.x) * t;
        const py = prev.y + (y - prev.y) * t;
        stampsRef.current.push({
          x: px,
          y: py,
          r: brush * (0.85 + Math.random() * 0.3),
          grow: 0.55 + Math.random() * 0.4,
          born: now,
          c: colorRef.current,
        });
        // pigment runs downward into descenders (the tail of the "y")
        stampsRef.current.push({
          x: px + (Math.random() - 0.5) * brush * 0.2,
          y: py + brush * (0.55 + Math.random() * 0.35),
          r: brush * (0.5 + Math.random() * 0.2),
          grow: 0.9 + Math.random() * 0.5,
          born: now,
          c: colorRef.current,
        });
      }
      lastRef.current = { x, y };
      if (stampsRef.current.length > 900) stampsRef.current.splice(0, stampsRef.current.length - 900);
      dirtyRef.current = true;
    };

    const checkComplete = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || canvas.width === 0) return;
      const step = 8;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let painted = 0;
      for (let i = 3; i < data.length; i += 4 * step) if ((data[i] ?? 0) > 24) painted++;
      if (painted / (textPixelsRef.current / 2) > 0.8) doneRef.current = true;
    };

    const startStroke = (cx: number, cy: number) => {
      if (doneRef.current) {
        // keep the finished painting, just switch to the next pigment
        colorRef.current = (colorRef.current + 1) % PALETTE.length;
        doneRef.current = false;
      }
      lastRef.current = null;
      paintAt(cx, cy);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !(e.buttons > 0 || e.pressure > 0)) return;
      paintAt(e.clientX, e.clientY);
    };
    const onEnter = (e: PointerEvent) => startStroke(e.clientX, e.clientY);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      startStroke(e.clientX, e.clientY);
    };
    const onLeave = () => {
      lastRef.current = null;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointerup", onLeave);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointercancel", onLeave);

    buildMask();
    rafRef.current = requestAnimationFrame(loop);

    let roFrame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(roFrame);
      roFrame = requestAnimationFrame(() => buildMask());
    });
    ro.observe(wrap);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => {
      canvas.width = 0;
      buildMask();
    });

    // Touch devices get no hover: sweep the brush across the word once it is in view.
    const coarse = window.matchMedia("(hover: none)").matches;
    let autoTimer = 0;
    let io: IntersectionObserver | null = null;
    if (coarse) {
      const sweep = () => {
        const rect = wrap.getBoundingClientRect();
        const rows = [0.35, 0.62];
        let i = 0;
        const total = 48;
        const tick = () => {
          const row = rows[Math.floor(i / total) % rows.length] ?? 0.5;
          const p = (i % total) / (total - 1);
          const dir = Math.floor(i / total) % 2 === 0 ? p : 1 - p;
          paintAt(rect.left + rect.width * dir, rect.top + rect.height * row);
          i++;
          if (i < total * rows.length) autoTimer = window.setTimeout(tick, 45);
        };
        lastRef.current = null;
        tick();
      };
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              window.clearTimeout(autoTimer);
              autoTimer = window.setTimeout(sweep, 350);
            }
          }
        },
        { threshold: 0.5 },
      );
      io.observe(wrap);
    }

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerup", onLeave);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(roFrame);
      window.clearTimeout(autoTimer);
      io?.disconnect();
      ro.disconnect();
    };
  }, [text]);

  return (
    <span ref={wrapRef} className={cn("paint-mark", className)}>
      <span ref={baseRef} className="paint-mark-base">
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden className="paint-mark-canvas" />
    </span>
  );
}
