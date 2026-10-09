import { useEffect, useRef } from "react";
import useImageSequence from "../hooks/useImageSequence.js";
import Loader from "./Loader.jsx";
import Icon from "./Icon.jsx";
import { SEQUENCE } from "../data/hero.js";

const STAGES = [
  "Kimberlite pipe extraction",
  "Octahedral crystal matrix",
  "Laser tomography profiling",
  "Sovereign atelier sight",
];

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function Hero() {
  const { count, path, focusX, focusY, smoothing, startAt } = SEQUENCE;
  const { frames, progress, ready, failed } = useImageSequence({ count, path, startAt });

  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const copyRef = useRef(null);
  const stepRef = useRef(null);
  const labelRef = useRef(null);
  const barRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cw = 0, ch = 0, lastDrawn = -1, lastStage = -1, current = 0, raf = 0;

    const resize = () => {
      cw = canvas.clientWidth; ch = canvas.clientHeight;
      canvas.width = cw; canvas.height = ch;   // 1:1, the frames are only 720p
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
    };

    // returns true only if something was actually drawn
    const draw = (i) => {
      let img = frames.current[i];
      if (!img || !img.naturalWidth) {
        img = null;
        for (let k = i; k >= 0; k--) {
          const f = frames.current[k];
          if (f && f.naturalWidth) { img = f; break; }
        }
        if (!img) return false;
      }
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) * focusX, (ch - h) * focusY, w, h);
      return true;
    };

    const scrollProgress = () => {
      const r = trackRef.current.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
    };

    const tick = () => {
      const target = scrollProgress();
      current = reduced ? target : current + (target - current) * smoothing;
      if (Math.abs(target - current) < 0.0001) current = target;

      // 1) which frame
      const idx = Math.min(count - 1, Math.round(current * (count - 1)));
      if (idx !== lastDrawn && draw(idx)) lastDrawn = idx;

      // 2) hero text fades out, picture brightens
      const copy = 1 - smooth(0.05, 0.16, current);
      const c = copyRef.current;
      c.style.opacity = copy.toFixed(3);
      c.style.transform = `translate3d(0, ${(-current * 160).toFixed(1)}px, 0)`;
      c.style.pointerEvents = copy > 0.5 ? "auto" : "none";
      frameRef.current.style.opacity = (0.35 + 0.65 * (1 - copy)).toFixed(3);

      // 3) stage tracker (text only changes when the stage changes)
      const stage = Math.min(STAGES.length - 1, Math.floor(current * STAGES.length));
      if (stage !== lastStage) {
        lastStage = stage;
        stepRef.current.textContent = `0${stage + 1} / 0${STAGES.length}`;
        labelRef.current.textContent = STAGES[stage];
      }
      barRef.current.style.width = `${Math.max(4, current * 100).toFixed(1)}%`;
      cueRef.current.style.opacity = current < 0.03 ? 1 : 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [frames, count, focusX, focusY, smoothing]);

  return (
    <>
      <Loader progress={progress} done={ready} failed={failed} />

      {/* Tall track. The sticky stage stays pinned while you scroll through it. */}
      <section ref={trackRef} id="sequence-container" className="relative w-full h-[500vh] bg-surface-container-lowest">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* Picture: canvas inside the faded frame box */}
          <div ref={frameRef} className="frame pointer-events-none select-none">
            <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
          </div>
          <div className="absolute inset-0 hero-grade pointer-events-none" />
          <div className="grain" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          {/* Top info chips */}
          <div className="absolute top-28 left-margin right-margin z-20 flex justify-between items-start pointer-events-none">
            <div className="flex items-center gap-space-sm bg-surface-container-low/80 backdrop-blur-md px-space-md py-space-xs rounded-sm shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Live Sightholder Allocation • Orapa Pipe 01
              </span>
            </div>
            <div className="hidden md:flex flex-col text-right font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              <span className="text-primary font-semibold">23.82ct Octahedral Rough</span>
              <span className="text-outline">Trace Origin: Botswana Craton</span>
            </div>
          </div>

          {/* Centre narrative (fades out on scroll) */}
          <div ref={copyRef} className="relative z-10 max-w-5xl mx-auto px-margin text-center flex flex-col items-center will-change-transform">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs mb-space-md bg-surface-container/60 backdrop-blur-xl rounded-full">
              <Icon name="diamond" className="text-secondary text-[14px]" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed">
                Primary De Beers Sightholder Since 1948
              </span>
            </div>
            <h1 className="font-display text-display-mobile md:text-display max-w-4xl tracking-tight text-primary drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]">
              The Name Behind Diamonds.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-md font-light leading-relaxed">
              From primordial mantle depths to sovereign brilliance. We curate, cut, and master the world’s most
              consequential rough allocations across eight decades of unbroken custody.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-space-md mt-space-xl">
              <a href="#the-genesis"
                 className="bg-primary text-on-primary font-label-md text-label-md uppercase px-space-xl py-space-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl hover:shadow-[0_0_24px_rgba(255,255,255,0.18)] tracking-widest">
                Explore Rough Supply
              </a>
              <a href="#polished-duality"
                 className="bg-surface-container/70 backdrop-blur-xl text-primary font-label-md text-label-md uppercase px-space-lg py-space-md hover:bg-surface-bright transition-all shadow-md tracking-widest">
                Discover Polished Masterpieces
              </a>
            </div>
          </div>

          {/* Bottom-left stage tracker */}
          <div className="absolute bottom-8 left-margin z-20 hidden lg:flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span ref={stepRef} className="font-label-md text-label-md text-secondary font-bold tracking-widest">01 / 04</span>
              <span ref={labelRef} className="font-label-sm text-label-sm uppercase tracking-widest text-primary">{STAGES[0]}</span>
            </div>
            <div className="w-64 h-0.5 bg-surface-variant overflow-hidden rounded-full mt-1">
              <div ref={barRef} className="h-full bg-primary" style={{ width: "4%" }} />
            </div>
            <span className="font-body-sm text-body-sm text-outline">Direct mantle retrieval depth: 150km</span>
          </div>

          {/* Bottom-right legend */}
          <div className="absolute bottom-8 right-margin z-20 hidden md:flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm tracking-widest">
            <div className="flex items-center gap-space-xs"><span className="w-2 h-2 rounded-full bg-primary" /><span>ROUGH DOCKET</span></div>
            <div className="h-3 w-px bg-surface-variant" />
            <div className="flex items-center gap-space-xs"><span className="w-2 h-2 rounded-full bg-outline" /><span>OPTICAL PROFILING</span></div>
            <div className="h-3 w-px bg-surface-variant" />
            <div className="flex items-center gap-space-xs"><span className="w-2 h-2 rounded-full bg-outline" /><span>POLISHED ALLOCATION</span></div>
          </div>

          {/* Scroll cue */}
          <a ref={cueRef} href="#the-genesis"
             className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-space-xs text-on-surface-variant hover:text-primary transition-all">
            <span className="font-label-sm text-label-sm uppercase tracking-widest">Scroll to Traverse Genesis</span>
            <Icon name="expand_more" className="text-[20px] animate-bounce" />
          </a>
        </div>
      </section>
    </>
  );
}