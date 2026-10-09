import Icon from "./Icon.jsx";

const LINKS = [
  { label: "Rough Allocation", href: "#the-genesis" },
  { label: "Polished Mastery", href: "#polished-duality" },
  { label: "Kimberlite Origin", href: "#the-genesis" },
  { label: "The Trust Matrix", href: "#trust-matrix" },
  { label: "Global Salons", href: "#global-salons" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/75 backdrop-blur-2xl shadow-[0_1px_16px_rgba(0,0,0,0.35)]">
      <div className="h-20 w-full px-margin flex items-center justify-between">
        <div className="flex flex-col">
          <a href="#" className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase">Rough</a>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            De Beers Sightholder Since 1948
          </span>
        </div>

        <nav className="hidden xl:flex items-center gap-space-md">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}
               className="font-label-md text-label-md uppercase text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-space-sm">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <a href="#global-salons"
             className="font-label-md text-label-md uppercase bg-primary text-on-primary py-space-sm px-space-lg hover:bg-primary-container hover:text-on-primary-container transition-colors tracking-widest">
            Client Vault
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}