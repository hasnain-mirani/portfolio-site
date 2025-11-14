

import Header from "@/components/Header";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Works from "@/components/Works";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonals";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WorksClient from "@/components/WorksClient";

export default function HomePage() {
  return (
    <>
      {/* Header includes scrollspy underline; keep NavProgress here if you prefer it outside */}
      <Header />
      {/* If you didn’t embed NavProgress inside Header, show it here */}
      {/* <div className="mx-auto max-w-6xl px-4 mt-2"><NavProgress height={3} /></div> */}

      {/* Sections (IDs must match the navbar + hook) */}
      <main className="pt-28 md:pt-36">
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>
<section id="works">
  <WorksClient />
</section>
      

        <section id="resume">
          <Resume />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
