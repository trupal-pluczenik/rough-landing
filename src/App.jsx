import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Genesis from "./components/Genesis.jsx";
import Duality from "./components/Duality.jsx";
import TrustMatrix from "./components/TrustMatrix.jsx";
import Salons from "./components/Salons.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased selection:bg-surface-variant selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Genesis />
        <Duality />
        <TrustMatrix />
        <Salons />
      </main>
      <Footer />
    </div>
  );
}