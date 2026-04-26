"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.8 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#2A3B2C]">
      <div className="absolute inset-0 z-0 opacity-65">
        <Image
          src="/hero.jpg"
          alt="Neva Hero"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-16">
        <h1 
          ref={textRef}
          className="text-[#F9F9F6] text-5xl md:text-8xl lg:text-9xl font-serif max-w-5xl leading-[1.1] tracking-tight"
        >
          Gelenek <br /> <span className="italic">yeniden yorumlandı.</span>
        </h1>
        
        <Link 
          href="/menu"
          ref={buttonRef}
          className="mt-16 w-36 h-36 rounded-full border border-[#C21807]/80 bg-[#C21807]/40 backdrop-blur-md text-[#F9F9F6] flex items-center justify-center text-sm font-semibold tracking-widest uppercase hover:bg-[#C21807] hover:border-[#C21807] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105"
        >
          Menüyü Gör
        </Link>
      </div>
    </section>
  );
}
