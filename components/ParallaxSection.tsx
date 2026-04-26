"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>(".parallax-img");
      
      images.forEach((img) => {
        const speed = parseFloat(img.getAttribute("data-speed") || "1");
        
        gsap.to(img, {
          y: () => -200 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#2A3B2C] relative overflow-hidden h-[120vh]">
      <div className="absolute top-[20%] left-[10%] w-[45vw] md:w-[32vw] h-[48vh] parallax-img" data-speed="2">
        <img 
          src="/kayseri_mantisi.png" 
          alt="Kayseri Mantısı" 
          className="w-full h-full object-cover clip-pill opacity-90"
        />
      </div>
      
      <div className="absolute top-[50%] right-[10%] w-[40vw] md:w-[30vw] h-[50vh] parallax-img" data-speed="3.5">
        <img 
          src="/beyran.png" 
          alt="Beyran" 
          className="w-full h-full object-cover object-[center_20%] clip-rounded-top opacity-90"
        />
      </div>

      <div className="absolute top-[70%] left-[30%] w-[30vw] md:w-[25vw] h-[38vh] parallax-img" data-speed="1.2">
        <img 
          src="/kayseri_yaglamasi.png" 
          alt="Kayseri Yağlaması" 
          className="w-full h-full object-cover rounded-[5rem] opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center relative z-10 pointer-events-none">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#F9F9F6] text-center leading-tight drop-shadow-2xl">
          doğal. <br /> katkısız. <br /> <span className="italic text-[#E8D1B5]">lezzetli.</span>
        </h2>
      </div>
    </section>
  );
}
