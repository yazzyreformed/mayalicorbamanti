"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FadeInText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Split text logic simulated with scrub
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 1.5,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 md:py-56 bg-[#F9F9F6] px-6 texture-bg relative z-10">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight text-[#2A3B2C]"
        >
          Her bir kase, <br className="hidden md:block" />el emeği ve özenle hazırlanan tariflerle <br className="hidden md:block" />
          <span className="italic text-[#8B5A2B]">doğadan sofranıza uzanıyor.</span>
        </h2>
      </div>
    </section>
  );
}
