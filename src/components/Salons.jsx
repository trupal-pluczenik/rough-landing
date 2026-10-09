import { useState } from "react";
import Icon from "./Icon.jsx";
import { IMG } from "../data/images.js";

const SALONS = [
  { img: IMG.antwerp,  tag: "Headquarters", name: "Antwerp Salon",   addr: "Hoveniersstraat 53, Diamond District",       note: "EST. 1948" },
  { img: IMG.newYork,  tag: "Americas",     name: "New York Salon",  addr: "580 Fifth Avenue, 24th Floor",              note: "BY APPT ONLY" },
  { img: IMG.dubai,    tag: "Middle East",  name: "Dubai Salon",     addr: "Almas Tower, Level 48, DMCC",               note: "CUSTOM PARCELS" },
  { img: IMG.hongKong, tag: "Asia Pacific", name: "Hong Kong Salon", addr: "Two International Finance Centre, Central", note: "HIGH JEWELRY" },
];

const CHECKS = [
  "Bilateral Non-Disclosure Agreement execution",
  "Direct gemologist & sightholder partner in attendance",
  "Insured Brink’s & Malca-Amit transit capabilities",
];

const VAULTS = [
  ["antwerp", "Antwerp Head Vaults (Hoveniersstraat)"],
  ["london", "London Hatton Garden Private Suites"],
  ["new-york", "New York Fifth Avenue Salon"],
  ["dubai", "Dubai Almas Tower Vault"],
  ["hong-kong", "Hong Kong Central Suite"],
];

const INTERESTS = [
  ["rough-parcels", "Rough Kimberlite Run Parcels (10ct - 100ct+)"],
  ["d-flawless", "Single Exceptional D-Flawless Master Stones"],
  ["fancy-colors", "Rare Fancy Vivid Colors (Pink, Blue, Yellow)"],
  ["bespoke-commission", "Custom Sightholder Heritage Commission"],
];

const field = "w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-outline";
const label = "font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant block";

export default function Salons() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send the form data to your backend or email service here
    setSent(true);
  };

  return (
    <section id="global-salons" className="scroll-mt-20 w-full py-space-xl bg-surface px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">Private Appointments</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
            Global Salons &amp; Vault Consultation
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Acquisitions of major rough parcels and bespoke high-jewelry stones occur under strict confidential protocol within our high-security sovereign vaults.
          </p>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          {SALONS.map((s) => (
            <div key={s.name} className="bg-surface-container-low rounded-xl overflow-hidden shadow-lg group hover:bg-surface-container transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-0.5 rounded-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">{s.tag}</span>
                </div>
              </div>
              <div className="p-space-md">
                <h3 className="font-headline-sm text-headline-sm text-primary">{s.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">{s.addr}</p>
                <div className="mt-space-md pt-space-xs flex justify-between items-center text-outline font-label-sm text-label-sm">
                  <span>VAULT TIER: SECURE 5</span>
                  <span className="text-secondary font-semibold">{s.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request module */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-high rounded-full mb-space-md">
                  <Icon name="lock" className="text-secondary text-[16px]" />
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Encrypted Sightholder Channel</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Initiate Confidential Vault Allocation</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-md">
                  Appointments are held under non-disclosure protocols. Registered institutions, auction specialists, and private family offices will receive a customized dossier prior to presentation.
                </p>
              </div>
              <div className="mt-space-lg space-y-space-xs">
                {CHECKS.map((c) => (
                  <div key={c} className="flex items-center gap-space-xs text-body-sm font-body-sm text-outline">
                    <Icon name="check_circle" className="text-[16px] text-secondary" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-surface-container p-space-lg rounded-xl shadow-inner">
              <form className="space-y-space-md" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="space-y-space-xs">
                    <label className={label}>Full Legal Principal / Institution</label>
                    <input className={field} required type="text" placeholder="e.g. Lord Sterling / Family Office" />
                  </div>
                  <div className="space-y-space-xs">
                    <label className={label}>Institutional Secure Email</label>
                    <input className={field} required type="email" placeholder="principal@domain.ch" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="space-y-space-xs">
                    <label className={label}>Preferred Salon Vault</label>
                    <select className={field}>{VAULTS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
                  </div>
                  <div className="space-y-space-xs">
                    <label className={label}>Allocation Interest</label>
                    <select className={field}>{INTERESTS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
                  </div>
                </div>
                <div className="space-y-space-xs">
                  <label className={label}>Special Handling or Vault Clearance Notes</label>
                  <textarea className={field} rows="3" placeholder="Provide any specific carat minimums, cratonic preferences, or security clearance specifications." />
                </div>
                <div className="flex items-center gap-space-sm pt-space-xs">
                  <input id="nda-agree" required type="checkbox" className="w-4 h-4 rounded bg-surface-container-lowest text-primary focus:ring-0 cursor-pointer" />
                  <label htmlFor="nda-agree" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
                    I agree to bilateral confidentiality protocols under Rough DIAmonds Sovereign Sightholder compliance rules.
                  </label>
                </div>
                <button type="submit"
                  className="w-full bg-primary text-on-primary font-label-md text-label-md uppercase py-space-md tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg">
                  Transmit Vault Consultation Request
                </button>
                {sent && (
                  <div className="p-space-md bg-surface-container-highest rounded-md flex items-center gap-space-sm text-secondary">
                    <Icon name="shield" className="text-[20px]" />
                    <span className="font-body-sm text-body-sm text-primary">
                      Dossier request encrypted and queued for Senior Gemological Partner clearance within 4 hours.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}