"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SoupPourSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const liquidStreamRef = useRef<HTMLDivElement>(null);
  const ladleSoupRef = useRef<HTMLDivElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const bowlSoupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context;
    
    // Next.js hydration işlemi bittikten hemen sonra GSAP'in DOM'a müdahale etmesi için ufak bir gecikme ekliyoruz.
    // Bu sayede "insertBefore" (NotFoundError) React çakışmasının önüne geçilir.
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1500", // Scroll length to play the animation
            scrub: 1,      // Smooth scrubbing
            pin: true,     // Pin the screen while this happens
          }
        });

        const isMobile = window.innerWidth < 768;
        const streamHeight = isMobile ? "48vh" : "65vh";

        // 1. Soup liquid stretches down from the ladle lip
        tl.to(liquidStreamRef.current, {
          height: streamHeight,
          ease: "none",
          duration: 2
        }, 0);

        // 1.5. Ladle soup interior goes down (gets emptier) as it pours
        tl.to(ladleSoupRef.current, {
          scaleX: 0.6,
          scaleY: 0.3,
          opacity: 0.2,
          y: 12,
          ease: "power1.inOut",
          duration: 2
        }, 0);

        // 2. The bowl at the bottom catches it and appears slightly
        tl.to(bowlRef.current, {
          y: 0,
          opacity: 1,
          ease: "back.out(1.1)",
          duration: 0.8
        }, "-=0.5");

        // 3. The bowl fills up with soup
        tl.to(bowlSoupRef.current, {
          y: "0%",
          ease: "none",
          duration: 1.5
        }, "-=0.3");

        // 3.5. Stop the stream when the bowl is full
        tl.to(liquidStreamRef.current, {
          opacity: 0,
          duration: 0.3
        }, "-=0.2");

        // 4. Text fades into view in the middle
        tl.fromTo(textRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          0.5
        );

      }, containerRef);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="w-full relative">
      <section ref={containerRef} className="bg-[#F9F9F6] relative h-screen w-full overflow-hidden pb-0">
        
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full flex flex-col items-center pointer-events-none z-10">
        
        {/* Minimalist Abstract Wooden / Golden Ladle */}
        <div className="relative mt-20 sm:-mt-5 flex flex-col items-center z-20">
           {/* Wooden Handle */}
           <div className="w-4 h-28 sm:w-5 sm:h-56 bg-gradient-to-t from-[#4a2e15] to-[#2e1c0d] rounded-t-full shadow-2xl -rotate-[15deg] translate-x-6 sm:translate-x-8 translate-y-6"></div>
           {/* Ladle Head/Bowl */}
           <div className="w-28 h-16 sm:w-40 sm:h-24 bg-gradient-to-b from-[#5c3a21] to-[#2e1c0d] rounded-b-[100px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative flex items-start justify-center overflow-visible border-t-8 border-[#2e1c0d]">
             {/* Liquid Top Surface inside the ladle */}
             <div 
               ref={ladleSoupRef}
               className="w-[85%] h-6 bg-gradient-to-r from-[#e38c14] to-[#f5b342] rounded-full mt-1 opacity-90 blur-[1px] shadow-[0_0_15px_#f5b342] relative z-10"
             ></div>
             
             {/* Liquid Pouring Stream (Moves to front edge of the ladle) */}
             <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-4 sm:w-[22px] flex justify-center z-30">
               <div 
                 ref={liquidStreamRef}
                 className="w-full bg-gradient-to-b from-[#f5b342] via-[#e38c14] to-[#d6720d] shadow-[0_0_30px_rgba(245,179,66,0.6)] rounded-b-full origin-top"
                 style={{ height: "0px" }} // Controlled by GSAP
               ></div>
             </div>
           </div>
        </div>

        {/* The Ceramic Bowl at the bottom */}
        <div 
          ref={bowlRef} 
          className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 w-48 h-16 sm:w-72 sm:h-28 bg-[#d6d6d3] rounded-b-[150px] shadow-[0_30px_50px_rgba(0,0,0,0.15)] opacity-0 translate-y-20 flex justify-center items-start overflow-hidden border-t-8 sm:border-t-[12px] border-[#c0c0bc] z-30"
        >
           {/* Soup rising inside the bowl */}
           <div 
             ref={bowlSoupRef}
             className="w-full h-full bg-gradient-to-t from-[#d6720d] to-[#f5b342] translate-y-full rounded-b-[150px] opacity-90 shadow-[inset_0_15px_20px_rgba(0,0,0,0.3)]"
           ></div>
        </div>
      </div>

      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center items-center pointer-events-none">
        <h2 
          ref={textRef} 
          className="text-3xl md:text-6xl lg:text-8xl font-serif text-[#2A3B2C] text-center max-w-5xl drop-shadow-sm leading-[1.2] px-4"
        >
          Tariflerimizde sadece <br className="hidden md:block"/>
          <span className="text-[#d6720d] italic tracking-wide">doğanın sunduğunu</span> kullanırız.
        </h2>
      </div>
    </section>
    </div>
  );
}
