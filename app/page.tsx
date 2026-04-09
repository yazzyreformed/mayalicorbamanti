import Hero from "@/components/Hero";
import FadeInText from "@/components/FadeInText";
import DishCarousel from "@/components/DishCarousel";
import InteractiveSection from "@/components/InteractiveSection";
import ParallaxSection from "@/components/ParallaxSection";
import ReviewWheel from "@/components/ReviewWheel";
import ShiftingForkSection from "@/components/ShiftingForkSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FadeInText />
      <DishCarousel />
      <InteractiveSection />
      <ParallaxSection />
      <ShiftingForkSection />
      <ReviewWheel />
    </>
  );
}
