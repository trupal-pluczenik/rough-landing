import Icon from "./Icon.jsx";
import { IMG } from "../data/images.js";

const SPECS = [
  { label: "Rough Mass", value: "48.30 ct", big: true },
  { label: "Crystal Class", value: "Isometric Hexoctahedral" },
  { label: "Host Kimberlite", value: "Hypabyssal Facies" },
  { label: "Primary Origin", value: "Jwaneng Pipe, BW" },
];

const RECORDS = [
  ["Kimberley Process Verification", "100% Guaranteed", "font-semibold"],
  ["Tracr™ Blockchain Hash", "0x8F44...A219", "font-mono text-body-sm"],
  ["Responsible Jewellery Council", "Certified Audit #RJC-992", "font-semibold"],
];

export default function Genesis() {
  return (
    <section id="the-genesis" className="scroll-mt-20 w-full py-space-xl bg-surface px-margin relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-surface-container-high/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">Origin Dossier • 1948–2025</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
              The Kimberlite Genesis &amp; Lineage
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Unbroken geological custody. Every crystal passes through sovereign sightholder verification directly from the Southern African cratonic formations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Specimen pod */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-space-md z-10">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Specimen ID: PLZ-KB-4091</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-space-xs">Type IIa Octahedral Crystal</h3>
              </div>
              <span className="font-label-md text-label-md bg-surface-container-high text-primary px-space-md py-space-xs rounded-sm tracking-widest">GIA SIGHT RECORD</span>
            </div>

            <div className="relative w-full h-80 rounded overflow-hidden my-space-md bg-surface-container-lowest flex items-center justify-center">
              <img src={IMG.genesis} alt="Rough octahedral diamond trapped in kimberlite host stone"
                   className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-xs rounded-sm">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Subterranean Facet Angle: 54.74° Normal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md bg-surface-container rounded-md p-space-md z-10">
              {SPECS.map((s) => (
                <div key={s.label}>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline block">{s.label}</span>
                  <span className={s.big ? "font-headline-sm text-headline-sm text-primary font-serif" : "font-body-md text-body-md text-primary font-medium"}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg">
            <div className="bg-surface-container-low rounded-lg p-space-lg shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mb-space-md">
                  <Icon name="layers" className="text-primary text-[20px]" />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-space-sm">Seventy-Seven Years of Sovereign Allocations</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  As one of the world’s enduring premier De Beers Sightholders, Maison Pluczenik commands institutional-scale access to the rarest gem-quality runs. Our rough selection prioritizes pristine structural habit, avoiding post-formation shearing and ensuring optimal light velocity through uncut rough crystal cores.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md space-y-space-sm">
                {RECORDS.map(([k, v, cls]) => (
                  <div key={k} className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                    <span>{k}</span>
                    <span className={`text-primary ${cls}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-high rounded-lg p-space-md flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <Icon name="verified" className="text-secondary text-[24px]" />
                <div>
                  <span className="font-label-md text-label-md uppercase text-primary tracking-widest block">Direct Mine Allocation Box</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Reserved exclusively for accredited atelier private viewings</span>
                </div>
              </div>
              <Icon name="arrow_forward" className="text-on-surface-variant" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}