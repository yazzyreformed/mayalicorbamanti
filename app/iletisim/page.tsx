"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Info Blocks Animation
      if (infoRef.current) {
        gsap.fromTo(infoRef.current.children,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out",
            delay: 0.4
          }
        );
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9F9F6] min-h-screen pt-32 pb-24 texture-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-serif text-[#2A3B2C] mb-6">
            Bize Ulaşın
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto italic font-serif">
            Görüşleriniz bizim için değerli. Soru, öneri veya sadece bir 'merhaba' için formu doldurabilir ya da doğrudan bize ulaşabilirsiniz.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto mt-16 pb-12">
          {/* Contact Info */}
          <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
            <div className="flex flex-col items-center text-center space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-[#2A3B2C]/5">
              <div className="w-16 h-16 rounded-full bg-[#E8D1B5] flex items-center justify-center flex-shrink-0 text-[#2A3B2C]">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-[#2A3B2C] mb-2">Adres</h3>
                <p className="text-stone-600 leading-relaxed text-lg">
                  Subayevleri, Şehit Ömer Halisdemir Bulvarı
                  No:47/A Keçiören, Ankara, 06135
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-[#2A3B2C]/5">
              <div className="w-16 h-16 rounded-full bg-[#E8D1B5] flex items-center justify-center flex-shrink-0 text-[#2A3B2C]">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-[#2A3B2C] mb-2">Telefon</h3>
                <p className="text-stone-600 text-lg">0312 800 08 06</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-[#2A3B2C]/5">
              <div className="w-16 h-16 rounded-full bg-[#E8D1B5] flex items-center justify-center flex-shrink-0 text-[#2A3B2C]">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-[#2A3B2C] mb-2">Çalışma Saatleri</h3>
                <p className="text-stone-600 text-lg">
                  Haftanın her günü <br/> 08:00 - 23:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
