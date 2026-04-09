"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IngredientMouseTrack from "@/components/IngredientMouseTrack";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRevealRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Hero Reveal Animation (Clip-Path Expansion)
      gsap.fromTo(heroRevealRef.current,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.1 },
        { 
          clipPath: "circle(150% at 50% 50%)", 
          scale: 1,
          duration: 2.2, 
          ease: "power3.inOut",
          delay: 0.2
        }
      );

      // Hero Text fade
      gsap.fromTo(heroTextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 1.4 }
      );

      // 2. Story Reveal Triggers
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach(el => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 3. Parallax Image Triggers
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach(img => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            scrub: true,
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#E8D1B5] min-h-screen text-[#2A3B2C] overflow-hidden texture-bg pb-20">
      
      {/* 1. Hero Reveal Section */}
      <section className="relative w-full h-screen bg-[#2A3B2C] flex items-center justify-center pointer-events-none z-10">
        {/* The Reveal Container */}
        <div 
          ref={heroRevealRef}
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          {/* Background image inside the reveal */}
          <div 
            className="absolute inset-0 bg-cover bg-center brightness-[0.7]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2671&auto=format&fit=crop')" }} 
          />
        </div>
        
        {/* Centered Hero Text */}
        <h1 
          ref={heroTextRef}
          className="relative z-10 text-5xl md:text-7xl lg:text-9xl text-[#F9F9F6] font-serif text-center px-4 max-w-6xl leading-[1.1] opacity-0"
        >
          tamamen doğal, <br/>
          <span className="italic text-[#E8D1B5]">gerçek lezzet</span>
        </h1>
      </section>

      {/* 2. Brand Story / Founder Section */}
      <section className="py-32 md:py-48 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
          
          <div className="w-full md:w-1/2 order-2 md:order-1 reveal-text">
            <h2 className="text-6xl md:text-8xl font-serif tracking-tighter mb-8 text-[#2A3B2C]">
              neva'nın hikayesi
            </h2>
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-sans mb-8">
              Her çorba kasesinde, her mantı tanesinde geçmişten gelen bir miras taşıyoruz. Neva, annelerimizin mutfağındaki o eşsiz kokuyu ve özeni günümüzün hızlı dünyasında yeniden canlandırmak arzusuyla kuruldu.
            </p>
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-sans">
              Bizim için yemek sadece doymak değil; bir araya gelmek, eski anıları tazelemek ve katkısız doğallığın tadını çıkarmaktır. El emeği göz nuru hazırlanan yufkalarımız, özenle seçilmiş yöresel etlerimiz ve baharatlarımızla sofralarınıza misafir oluyoruz.
            </p>
          </div>

          <div className="w-full md:w-1/2 px-4 md:px-8 order-1 md:order-2 flex justify-center">
            {/* Custom Mask Image */}
            <div className="w-[300px] h-[400px] md:w-[450px] md:h-[600px] overflow-hidden rounded-[8rem] md:rounded-[12rem] opacity-0 reveal-text relative shadow-2xl">
              <img 
                src="/hikayemiz.jpg" 
                alt="Restaurant Exterior" 
                className="parallax-img w-full h-[120%] object-cover absolute top-[-10%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Large Quote Section */}
      <section className="py-24 bg-[#2A3B2C] text-[#F9F9F6]">
        <div className="container mx-auto px-6 text-center max-w-5xl reveal-text">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.3] italic text-[#E8D1B5]">
            "Endüstriyel mutfakların gürültüsünden uzakta, tencerenin yavaş yavaş tıngırdadığı gerçek ustalık vizyonu."
          </h3>
        </div>
      </section>

      {/* 4. Interactive Ingredient Mouse Track Section */}
      <IngredientMouseTrack />

      {/* 5. Second Content Block */}
      <section className="py-32 md:py-48 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
          
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Custom Mask Image - Circle */}
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full opacity-0 reveal-text relative shadow-2xl">
              <img 
                src="/kaynagindan_sofraya.jpg" 
                alt="Chef preparing food" 
                className="parallax-img w-full h-[120%] object-cover absolute top-[-10%]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 reveal-text">
            <h2 className="text-6xl md:text-8xl font-serif tracking-tighter mb-8 text-[#2A3B2C]">
              kaynağından <br/> sofraya
            </h2>
            <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-sans mb-8">
              En iyi yemeğin en iyi malzemeyle başladığına inanıyoruz. Bu yüzden unumuzu değirmenden, etimizi yöresel kasabımızdan, baharatlarımızı ise hasat edildiği bölgelerden doğrudan temin ediyoruz.
            </p>
            <p className="text-xl md:text-2xl text-[#8B5A2B] leading-relaxed font-serif mt-4 italic">
              Sevgiyle yoğruluyor, özenle sarılıyor.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
