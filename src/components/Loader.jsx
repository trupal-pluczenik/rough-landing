import { BRAND } from "../data/hero.js";

export default function Loader({ progress, done, failed }) {
  return (
    <div
      role="status" aria-live="polite"
      className={`fixed inset-0 z-[60] bg-surface-container-lowest flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${done ? "opacity-0 invisible" : "opacity-100"}`}
    >
      <div className="font-headline-md text-headline-md text-primary tracking-widest uppercase">{BRAND}</div>
      <div className="w-60 max-w-[56vw] h-px bg-surface-variant overflow-hidden">
        <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <div className="font-body-sm text-body-sm text-on-surface-variant text-center px-6 min-h-[1.2em]">
        {failed ? "Frames not found. Put ezgif-frame-001.jpg to 240.jpg in /public/frames." : "Descending"}
      </div>
    </div>
  );
}