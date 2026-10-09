import { useEffect, useRef, useState } from "react";

/**
 * Preloads an image sequence. Frame 1 first, then the rest in small batches.
 * Returns the frames array (a ref, so it never triggers re-renders),
 * a 0 to 1 load progress, and whether the page can be revealed.
 */
export default function useImageSequence({ count, path, startAt = 0.25 }) {
  const frames = useRef(new Array(count));
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    let revealed = false;

    const load = (n) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve(false);
          loaded++;
          const p = loaded / count;
          setProgress(p);
          if (!revealed && p >= startAt) { revealed = true; setReady(true); }
          resolve(true);
        };
        img.onerror = () => resolve(false);
        img.src = path(n);
        frames.current[n - 1] = img;
      });

    (async () => {
      const ok = await load(1);
      if (!ok) { if (!cancelled) setFailed(true); return; }
      const BATCH = 10;
      for (let n = 2; n <= count && !cancelled; n += BATCH) {
        const group = [];
        for (let k = n; k < n + BATCH && k <= count; k++) group.push(load(k));
        await Promise.all(group);
      }
      if (!cancelled && !revealed) setReady(true);
    })();

    return () => { cancelled = true; };
  }, [count, path, startAt]);

  return { frames, progress, ready, failed };
}
