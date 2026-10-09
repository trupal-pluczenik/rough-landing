import { useEffect, useRef } from "react";
import useImageSequence from "../hooks/useImageSequence.js";
import Loader from "./Loader.jsx";
import { SEQUENCE, BRAND, NAV, BEATS } from "../data/hero.js";

const ease = (t) => t * t * (3 - 2 * t);

function beatOpacity(p, b) {
  const f = b.fade ?? 0.035;
  if (p < b.in || p > b.out) return b.in === 0 && p < f ? 1 : 0;
  let o = Math.min(ease(Math.min(1, (p - b.in) / f)), ease(Math.min(1, (b.out - p) / f)));
  if (b.in === 0 && p < f) o = ease(Math.min(1, (b.out - p) / f)) || 1; // hero is visible at p = 0
  return o;
}

export default function ScrollHero() {
  const { count, path, focusX, focusY, smoothing, startAt } = SEQUENCE;
  const { frames, progress, ready, failed } = useImageSequence({ count, path, startAt });

  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const beatRefs = useRef([]);
  const dotRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cw = 0, ch = 0, lastDrawn = -1, current = 0, raf = 0;

    const resize = () => {
      // const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const dpr = 1
      cw = canvas.clientWidth; ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
    };

    // cover-fit, like CSS background-size: cover
    const draw = (i) => {
      let img = frames.current[i];
      if (!img || !img.naturalWidth) {
        img = null;
        for (let k = i; k >= 0; k--) {
          const f = frames.current[k];
          if (f && f.naturalWidth) { img = f; break; }
        }
        if (!img) return;
      }
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) * focusX, (ch - h) * focusY, w, h);
    };

    const scrollProgress = () => {
      const r = trackRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / total));
    };

    const tick = () => {
      const target = scrollProgress();
      current = reduced ? target : current + (target - current) * smoothing;
      if (Math.abs(target - current) < 0.0001) current = target;

      const idx = Math.min(count - 1, Math.round(current * (count - 1)));
      if (idx !== lastDrawn) { draw(idx); lastDrawn = idx; }

      BEATS.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const o = beatOpacity(current, b);
        const mid = Math.min(1, Math.max(0, (current - b.in) / (b.out - b.in)));
        const drift = (0.5 - mid) * 36; // slow upward drift tied to scroll
        const base = b.side === "center" ? "translateY(50%) " : "";
        el.style.opacity = o.toFixed(3);
        el.style.transform = `${base}translate3d(0, ${drift.toFixed(1)}px, 0)`;
        el.classList.toggle("on", o > 0.6);
      });

      if (dotRef.current) dotRef.current.style.top = `calc(${(current * 100).toFixed(2)}% - 1.5px)`;
      if (cueRef.current) cueRef.current.style.opacity = current < 0.03 ? 1 : 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [frames, count, focusX, focusY, smoothing]);

  // draw frame 1 as soon as the loader lifts
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const img = frames.current[0];
    if (!img || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    ctx.drawImage(img, (cw - img.naturalWidth * s) * focusX, (ch - img.naturalHeight * s) * focusY,
      img.naturalWidth * s, img.naturalHeight * s);
  }, [ready, frames, focusX, focusY]);

  return (
    <>
      <Loader progress={progress} done={ready} failed={failed} />

      <section className="track" ref={trackRef} aria-label="From deep earth to rough diamond">
        <div className="stage">
          <div className="frame">
            <canvas ref={canvasRef} className="seq" aria-hidden="true" />
          </div>
          <div className="grade" />
          <div className="grain" />

          <header className="nav">
            <a className="brand" href="#">{BRAND}</a>
            <nav aria-label="Main">
              <ul>
                {NAV.map((l) => (
                  <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </nav>
          </header>

          {BEATS.map((b, i) => {
            const Heading = b.hero ? "h1" : "h2";
            return (
              <div
                key={b.id}
                ref={(el) => (beatRefs.current[i] = el)}
                className={`beat${b.side ? " " + b.side : ""}`}
              >
                <Heading>
                  {b.title.map((line, k) => (
                    <span key={k}>
                      {typeof line === "string" ? line : <em>{line.em}</em>}
                      {k < b.title.length - 1 && <br />}
                    </span>
                  ))}
                </Heading>
                <p>{b.body}</p>
                {b.actions && (
                  <div className="actions">
                    {b.actions.map((a) => (
                      <a key={a.label} className={`btn${a.solid ? " solid" : ""}`} href={a.href}>
                        {a.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="descent" aria-hidden="true"><i ref={dotRef} /></div>
          <div className="cue" ref={cueRef} aria-hidden="true">
            <span>Scroll to descend</span><span className="line" />
          </div>
        </div>
      </section>
    </>
  );
}
