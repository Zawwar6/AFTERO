import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStory from "./components/BrandStory";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import WhyAftero from "./components/WhyAftero";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {/* <Loader show={loading} /> */}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <Services />
        <Portfolio />
        <Process />
        <WhyAftero />
        {/* <Stats /> */}
        {/* <Testimonials /> */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
