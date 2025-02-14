import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import GridDistortion from '../components/distortation';
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/LandingHero";
import HeroSection from "@/components/LandingSection";
import ServicesSection from "@/components/LandingContent";
import PreHero from "@/components/PreHero";

export default function Home() {
  return (
    <>

<PreHero />
<HeroSection />
<Hero  />
<ServicesSection />

<Footer />
    </>
  );
}
