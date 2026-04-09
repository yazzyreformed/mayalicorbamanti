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
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
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
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.7)" });
  };
  
  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: "power2.in" });
    setHoveredVideo(null);
  };

  return (
    <section ref={containerRef} className="py-40 md:py-64 bg-[#F9F9F6] relative overflow-hidden texture-bg cursor-default perspective-1000">
      {/* Custom Floating Cursor / Mask Window */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[380px] h-[380px] rounded-full overflow-hidden pointer-events-none z-50 opacity-0 scale-0 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(42,59,44,0.15)] bg-[#2A3B2C]/5 backdrop-blur-sm border border-white/20"
      >
        {hoveredVideo === "corba" && (
          <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transform scale-125 origin-center" alt="Çorba" />
        )}
        {hoveredVideo === "manti" && (
          <img src="/klasik_manti_tabak.png" className="w-full h-full object-cover transform scale-125 origin-center" alt="Mantı" />
        )}
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32">
        <Link href="/menu#corbalar" passHref className="cursor-none">
          <h2 
            className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-[#2A3B2C] hover:text-[#8B5A2B] transition-colors duration-500 cursor-none"
            onMouseEnter={() => handleMouseEnter("corba")}
            onMouseLeave={handleMouseLeave}
          >
            ÇORBA
          </h2>
        </Link>
        <span className="text-4xl md:text-6xl font-serif italic text-stone-300 pointer-events-none">&amp;</span>
        <Link href="/menu#mantilar" passHref className="cursor-none">
          <h2 
            className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-[#2A3B2C] hover:text-[#8B5A2B] transition-colors duration-500 cursor-none"
            onMouseEnter={() => handleMouseEnter("manti")}
            onMouseLeave={handleMouseLeave}
          >
            MANTI
          </h2>
        </Link>
      </div>
    </section>
  );
}
