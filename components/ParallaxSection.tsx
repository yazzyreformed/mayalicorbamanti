"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
      });
      
      mm.add("(max-width: 767px)", () => {
         const images = gsap.utils.toArray<HTMLElement>(".parallax-img");
         images.forEach((img) => {
             const speed = parseFloat(img.getAttribute("data-speed") || "1");
             gsap.to(img, {
                y: () => -70 * speed, // Telefonda görsellerin ekrandan aşırı hızlı fırlayıp kaybolmaması için azaltılmış yol mesafesi
                ease: "none",
                scrollTrigger: { 
                    trigger: containerRef.current, 
                    start: "top bottom", 
                    end: "bottom top", 
                    scrub: true 
                }
             });
         });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-[#2A3B2C] relative overflow-hidden h-[85vh] md:h-[120vh]">

      <div className="absolute top-[12%] left-[2%] w-[45vw] md:w-[32vw] h-[25vh] md:h-[48vh] parallax-img" data-speed="2">
        <Image 
          src="/kayseri_mantisi.png" 
          alt="Kayseri Mantısı" 
          fill
          sizes="(max-width: 768px) 45vw, 32vw"
          className="object-cover clip-pill opacity-90"
        />
      </div>
      
      <div className="absolute top-[40%] right-[2%] w-[50vw] md:w-[30vw] h-[30vh] md:h-[50vh] parallax-img" data-speed="3.5">
        <Image 
          src="/beyran.png" 
          alt="Beyran" 
          fill
          sizes="(max-width: 768px) 50vw, 30vw"
          className="object-cover object-[center_20%] clip-rounded-top opacity-90"
        />
      </div>

      <div className="absolute top-[65%] left-[10%] w-[45vw] md:w-[25vw] h-[22vh] md:h-[38vh] parallax-img" data-speed="1.2">
        <Image 
          src="/kayseri_yaglamasi.png" 
          alt="Kayseri Yağlaması" 
          fill
          sizes="(max-width: 768px) 45vw, 25vw"
          className="object-cover rounded-[3rem] opacity-90"
        />
      </div>

      {/* Merkez Metin */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 pointer-events-none mt-[8vh] md:mt-0">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F9F9F6] text-center leading-[1.1] drop-shadow-2xl">
          doğal. <br /> katkısız. <br /> <span className="italic text-[#E8D1B5]">lezzetli.</span>
        </h2>
      </div>
    </section>
  );
}
