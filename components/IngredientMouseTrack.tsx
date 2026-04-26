"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const ingredients = [
  { id: 1, src: "https://images.unsplash.com/photo-1501420193726-1f65acd36cda?q=80&w=400&auto=format&fit=crop", top: "10%", left: "5%", size: "w-24 md:w-40", speed: 0.12 }, // Garlic
  { id: 2, src: "https://images.unsplash.com/photo-1575475240735-0b191257c762?q=80&w=400&auto=format&fit=crop", top: "60%", left: "80%", size: "w-32 md:w-48", speed: -0.1 }, // Red Onion
  { id: 3, src: "https://images.unsplash.com/photo-1633640737481-2e9aabd87033?q=80&w=400&auto=format&fit=crop", top: "20%", left: "70%", size: "w-20 md:w-32", speed: 0.08 }, // Parsley
  { id: 4, src: "https://images.unsplash.com/photo-1693082895630-45b223dc2796?q=80&w=400&auto=format&fit=crop", top: "75%", left: "15%", size: "w-28 md:w-44", speed: -0.15 }, // Chili Pepper
];

export default function IngredientMouseTrack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".ingredient-item");
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        items?.forEach((item, index) => {
          const speed = ingredients[index].speed;
          const x = (clientX - centerX) * speed;
          const y = (clientY - centerY) * speed;
          
          gsap.to(item, {
            x,
            y,
            duration: 1,
            ease: "power2.out",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 md:py-64 bg-[#2A3B2C] overflow-hidden">
      {/* Background Ingredients */}
      {ingredients.map((ing) => (
        <div 
          key={ing.id}
          className={`ingredient-item absolute z-0 opacity-40 pointer-events-none rounded-full overflow-hidden blur-[1px] ${ing.size} aspect-square shadow-2xl`}
          style={{ top: ing.top, left: ing.left }}
        >
          <Image src={ing.src} alt="Ingredient" fill sizes="(max-width: 768px) 150px, 200px" className="object-cover scale-110" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-8xl font-serif text-[#E8D1B5] leading-tight max-w-4xl mx-auto reveal-text">
          bizi ayıran, <br />
          <span className="italic">doğallığa olan tutku.</span>
        </h2>
        <p className="mt-12 text-[#F9F9F6]/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal-text">
          Hiçbir endüstriyel katkı kütlesi mutfağımıza giremez. Sadece toprak, su, güneş ve emeğin harmanı.
        </p>
      </div>
    </section>
  );
}
