import dynamic from "next/dynamic";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Skills = dynamic(() => import("../components/Skills"), { ssr: true });
const Portfolio = dynamic(() => import("../components/Portfolio"), { ssr: true });
const Experience = dynamic(() => import("../components/Experience"), { ssr: true });
const Contact = dynamic(() => import("../components/Contact"), { ssr: true });
const Footer = dynamic(() => import("../components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Portfolio />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
