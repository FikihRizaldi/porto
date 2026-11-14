import Header from "../components/Header";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import GlobalBackground from "../components/GlobalBackground";

export default function Home() {
  return (
    <>
      {/* Fixed global background layer: orbit SVG + skill conveyor belt — runs across ALL sections */}
      <GlobalBackground />

      <Header />
      <main className="relative min-h-screen">
        <Hero />
        <Portfolio />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
