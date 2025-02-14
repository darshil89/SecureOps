import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import GridDistortion from '../components/distortation';
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/LandingHero";
import HeroSection from "@/components/LandingSection";
import ServicesSection from "@/components/LandingContent";

export default function Home() {
  return (
    <>

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GridDistortion
    imageSrc="https://picsum.photos/1920/1080?grayscale"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />
</div>
<HeroSection />
<Hero  />
<ServicesSection />

<Footer />
    </>
  );
}
