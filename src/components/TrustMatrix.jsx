import Icon from "./Icon.jsx";

const STATS = [
  { value: "77", accent: "+", title: "Years Sightholder Privilege", text: "Continuous allocation partner with De Beers since the post-war genesis in 1948." },
  { value: "100", accent: "%", title: "Immutable Traceability", text: "Zero secondary open-market sourcing. Fully sealed mine-to-salon custody chain." },
  { value: "07", title: "Global Diamond Bourses", text: "Direct sovereign trading floors from Antwerp Hoveniersstraat to Dubai DMCC." },
  { value: "$4B", accent: "+", title: "Cumulative Rare Yield", text: "Polished stones cut for high jewelry houses, royal crowns, and private vaults." },
];

const BADGES = [
  { icon: "verified_user", title: "Kimberley Accord", sub: "100% Conflict Free" },
  { icon: "shield", title: "De Beers BPP", sub: "Best Practice Principles" },
  { icon: "token", title: "Tracr™ Blockchain", sub: "Cryptographic Fingerprint" },
  { icon: "menu_book", title: "GIA Direct Lab", sub: "Dual Diamond Dossier" },
];

export default function TrustMatrix() {
  return (
    <section id="trust-matrix" className="scroll-mt-20 w-full py-space-xl bg-surface-container-lowest px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">Institutional Authority</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
              The Sovereign Provenance &amp; Trust Matrix
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Diamond trading at the pinnacle of luxury relies on absolute verification. Our provenance protocols ensure every stone is historically accountable and conflict-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          {STATS.map((s) => (
            <div key={s.title} className="bg-surface-container-low rounded-lg p-space-lg shadow-md hover:bg-surface-container transition-colors">
              <span className="font-display text-display text-primary block mb-space-xs">
                {s.value}{s.accent && <span className="text-secondary">{s.accent}</span>}
              </span>
              <span className="font-label-md text-label-md uppercase tracking-widest text-primary block">{s.title}</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-container rounded-xl p-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant block mb-space-md text-center">
            Rigorous Industry Accord Badges &amp; Standards
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md text-center">
            {BADGES.map((b) => (
              <div key={b.title} className="p-space-md bg-surface-container-high rounded-md">
                <Icon name={b.icon} className="text-secondary text-[28px] mb-space-xs" />
                <span className="font-label-md text-label-md uppercase text-primary block">{b.title}</span>
                <span className="font-body-sm text-body-sm text-outline">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}