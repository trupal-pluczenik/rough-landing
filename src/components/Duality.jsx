import { useState } from "react";
import Icon from "./Icon.jsx";
import { IMG } from "../data/images.js";

const CUTS = [
  { id: "round", label: "Round Brilliant (57 Facets)" },
  { id: "emerald", label: "Emerald Cut (Step Architecture)" },
  { id: "cushion", label: "Cushion Modified Brilliant" },
];

const GAUGES = [
  { icon: "flare", title: "Fire & Dispersion", text: "Optimized spectral breakdown across 380nm–750nm spectrum" },
  { icon: "brightness_high", title: "Scintillation Dynamics", text: "Dynamic facet contrast calculated for high-intensity movement" },
  { icon: "hub", title: "Micro-Laser Precision", text: "Sub-micron facet planar variance under 0.002 degrees" },
];

export default function Duality() {
  const [cut, setCut] = useState("round");

  return (
    <section id="polished-duality" className="scroll-mt-20 w-full py-space-xl bg-background px-margin relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">Metamorphic Metrology</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
            The Duality of Fire: Rough to Polished
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Witness the mathematical alchemy. Laser micro-cleaving and Antwerp multi-facet polishing yield extraordinary refractive scintillation.
          </p>
        </div>

        {/* Cut chips */}
        <div className="flex flex-wrap items-center justify-center gap-space-sm mb-space-xl">
          {CUTS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCut(c.id)}
              className={`font-label-md text-label-md uppercase px-space-lg py-space-xs tracking-widest rounded-sm transition-all ${
                cut === c.id
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Rough vs polished */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <Panel
            phase="Phase I: Raw Mineral habit" phaseClass="text-secondary"
            badge={<span className="font-label-md text-label-md uppercase text-outline">Uncut Specimen</span>}
            img={IMG.rough} alt="Uncut diamond matrix"
            caption="Light Absorption: 0.04% Internal Refraction (Dormant)" captionClass="text-on-surface-variant"
            rows={[["Structural Inclusion Analysis", "VVS1 Potential Identified"], ["Laser Mapping Resolution", "0.8 Micron Tomography"]]}
          />
          <Panel
            phase="Phase II: Sovereign Polished Yield" phaseClass="text-primary"
            badge={<span className="font-label-md text-label-md uppercase bg-primary text-on-primary px-space-sm py-0.5 rounded-sm">Triple Excellent</span>}
            img={IMG.polished} alt="Polished round brilliant diamond with spectral fire" hoverZoom
            caption="Refractive Index: 2.417 • Max Dispersion 0.044" captionClass="text-primary"
            rows={[["Color / Clarity Grade", "D-Color • Internally Flawless"], ["Hearts & Arrows Symmetry", "Optical Perfection 99.8%", true]]}
          />
        </div>

        {/* Gauges */}
        <div className="mt-space-xl bg-surface-container rounded-xl p-space-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-center">
            {GAUGES.map((g) => (
              <div key={g.title} className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <Icon name={g.icon} className="text-primary" />
                </div>
                <div>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary block">{g.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{g.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// The two panels are identical in structure, so one small component serves both.
function Panel({ phase, phaseClass, badge, img, alt, caption, captionClass, rows, hoverZoom }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between mb-space-md">
        <span className={`font-label-sm text-label-sm uppercase tracking-widest ${phaseClass}`}>{phase}</span>
        {badge}
      </div>
      <div className="relative h-72 rounded-lg overflow-hidden bg-surface-container-lowest flex items-center justify-center my-space-sm group">
        <img src={img} alt={alt}
             className={`w-full h-full object-cover object-center ${hoverZoom ? "group-hover:scale-105 transition-transform duration-700" : ""}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
        <div className={`absolute bottom-4 left-4 font-mono text-body-sm ${captionClass}`}>{caption}</div>
      </div>
      <div className="space-y-space-xs mt-space-md pt-space-sm">
        {rows.map(([k, v, gold]) => (
          <div key={k} className="flex justify-between font-body-sm text-body-sm">
            <span className="text-on-surface-variant">{k}</span>
            <span className={`${gold ? "text-secondary" : "text-primary"} font-medium`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}