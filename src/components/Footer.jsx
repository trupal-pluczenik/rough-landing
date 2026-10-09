const BOURSES = [
  ["Antwerp", "Hoveniersstraat 53, Diamond District"],
  ["London", "100 Hatton Garden, Private Vaults"],
  ["Johannesburg", "Jewel City, Diamond Exchange Centre"],
  ["Gaborone", "Diamond Technology Park"],
  ["New York", "580 Fifth Avenue, 24th Floor"],
  ["Tel Aviv", "Diamond Exchange Maccabi Complex"],
  ["Dubai", "Almas Tower, DMCC Free Zone"],
];

const CUSTODY = [
  "De Beers Authorized Sightholder No. 048",
  "Kimberley Process Certification Scheme Compliant",
  "Responsible Jewellery Council (RJC) Code of Practices",
  "Tracr™ Blockchain Immutable Origin Ledger",
  "Gemological Institute of America (GIA) Mine to Market",
  "World Diamond Council System of Warranties",
  "Chain of Custody Protocol ISO 24016",
];

const ARCHIVE = [
  ["Rough Dossiers", "#the-genesis"],
  ["Polished Folio", "#polished-duality"],
  ["Audit Disclosures", "#trust-matrix"],
  ["Sightholder Access", "#global-salons"],
  ["Private Appointment", "#global-salons"],
];

const head = "font-label-md text-label-md uppercase tracking-widest text-on-surface block";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant">
      <div className="w-full px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col justify-between space-y-space-md">
            <div>
              <span className="font-headline-md text-headline-md text-primary tracking-wider uppercase block">Maison Pluczenik</span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm max-w-sm">
                Sightholder to the world's most sovereign diamond sources since 1948. Architecting absolute rarity through geological custody, laser-refracted geometry, and immutable provenance.
              </p>
            </div>
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface block">Private Gazette</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Receive confidential allocations and subterranean geological dispatches.</p>
              <div className="flex gap-space-xs mt-space-sm">
                <input type="email" placeholder="Enter institutional address"
                  className="bg-surface-container text-on-surface font-body-sm text-body-sm px-space-md py-space-sm w-full focus:outline-none focus:ring-0 placeholder:text-outline" />
                <button type="button"
                  className="bg-primary text-on-primary font-label-md text-label-md uppercase px-space-md py-space-sm hover:bg-primary-container hover:text-on-primary-container transition-colors tracking-widest">
                  Inscribe
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-space-sm">
            <span className={head}>Global Bourses &amp; Presence</span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              {BOURSES.map(([city, addr]) => (
                <li key={city}><span className="text-primary font-medium">{city}:</span> {addr}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-space-sm">
            <span className={head}>Custody &amp; Sightholder Traceability</span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              {CUSTODY.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-space-sm">
            <span className={head}>The Archive</span>
            <ul className="space-y-space-xs font-label-sm text-label-sm uppercase tracking-widest">
              {ARCHIVE.map(([t, href]) => (
                <li key={t}><a href={href} className="text-on-surface-variant hover:text-primary transition-colors block">{t}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-space-xl pt-space-lg flex flex-col md:flex-row justify-between items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
          <p>© 1948–{new Date().getFullYear()} Maison Pluczenik. All Global Rights Reserved. Kimberlite Custody Assurance.</p>
          <div className="flex gap-space-md">
            <a href="#" className="hover:text-primary transition-colors">Ethical Disclosures</a>
            <a href="#" className="hover:text-primary transition-colors">Custody Protocols</a>
            <a href="#" className="hover:text-primary transition-colors">Legal Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}