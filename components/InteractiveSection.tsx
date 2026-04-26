"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function InteractiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Follow cursor setup
      const cursor = cursorRef.current;
      
      const onMouseMove = (e: MouseEvent) => {
        // More elastic/lagging cursor = spring mechanics
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.85,
          ease: "power4.out",
        });

        // Parallax Inverse Window Effect logic
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 2;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 2;
        
        const imgs = cursor?.querySelectorAll("img");
        if (imgs && imgs.length > 0) {
          gsap.to(imgs, {
            x: -xOffset * 80,
            y: -yOffset * 80,
            rotation: xOffset * 8, // slight 3d tilt
            scale: 1.25, // enlarged to cover the edges while sliding
            duration: 1.2,
            ease: "power3.out"
          });
        }
      };
      
      window.addEventListener("mousemove", onMouseMove);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.15 });
        },
        onLeaveBack: () => {
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.15 });
        }
      });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (type: string) => {
    setHoveredVideo(type);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.7)", overwrite: "auto" });
  };
  
  const handleMouseLeave = () => {
    // We drastically reduce the duration and use overwrite to prevent ghost cursors.
    // Also, we don't instantly set hoveredVideo to null so the image stays visible during the fade out animation.
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in", overwrite: "auto" });
  };

  return (
    <section ref={containerRef} className="py-24 md:py-64 bg-[#F9F9F6] relative overflow-hidden texture-bg md:cursor-default perspective-1000">
      {/* Custom Floating Cursor / Mask Window */}
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-[380px] h-[380px] rounded-full overflow-hidden pointer-events-none z-50 opacity-0 scale-0 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(42,59,44,0.15)] bg-[#2A3B2C]/5 backdrop-blur-sm border border-white/20"
      >
        {hoveredVideo === "manti" && (
          <img src="/kayseri_mantisi.png" className="w-full h-full object-cover transform scale-125 origin-center" alt="Mantı" />
        )}
        {hoveredVideo === "yaglama" && (
          <img src="/kayseri_yaglamasi_kusbakisi.png" className="w-full h-full object-cover transform scale-125 origin-center" alt="Yağlama" />
        )}
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-12 lg:gap-16 relative z-10">
        <Link href="/menu#mantilar" passHref className="md:cursor-none flex flex-col items-center group">
          <h2 
            className="text-[5.5rem] leading-none md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] font-serif text-[#2A3B2C] hover:text-[#8B5A2B] transition-colors duration-500 md:cursor-none"
            onMouseEnter={() => handleMouseEnter("manti")}
            onMouseLeave={handleMouseLeave}
          >
            MANTI
          </h2>
        </Link>
        
        <span className="text-4xl md:text-6xl font-serif italic text-stone-300 pointer-events-none my-4 md:my-0">&amp;</span>
        
        <Link href="/menu#yaglamalar" passHref className="md:cursor-none flex flex-col items-center group">
          <h2 
            className="text-[5.5rem] leading-none md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] font-serif text-[#2A3B2C] hover:text-[#8B5A2B] transition-colors duration-500 md:cursor-none"
            onMouseEnter={() => handleMouseEnter("yaglama")}
            onMouseLeave={handleMouseLeave}
          >
            YAĞLAMA
          </h2>
        </Link>
      </div>
    </section>
  );
}
