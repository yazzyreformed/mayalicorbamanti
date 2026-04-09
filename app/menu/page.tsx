"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const menuData = [
  {
    category: "Çorbalar",
    id: "corbalar",
    items: [
      { name: "Mercimek Çorbası", price: "180 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/mercimek_corba.jpg" },
      { name: "Ezogelin Çorbası", price: "180 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/ezogelin.jpg" },
      { name: "Tavuk Çorbası", price: "250 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/tavuk_corbasi.jpg" },
      { name: "Kelle Paça Çorbası", price: "350 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/kellepaca.jpg" },
    ]
  },
  {
    category: "Mantılar",
    id: "mantilar",
    items: [
      { name: "Kayseri Mantısı", price: "450 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/kayseri_mantisi.jpeg" },
      { name: "Hingel Mantı", price: "450 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/hingel_manti.jpg" },
      { name: "Çıtır Mantı", price: "450 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/citir_manti.jpg" },
    ]
  },
  {
    category: "Yağlamalar",
    id: "yaglamalar",
    items: [
      { name: "Kayseri Yağlaması", price: "500 TL", desc: "Biber turşusu, salata, yoğurt ile", img: "/yaglama_tabak.png" },
    ]
  },
  {
    category: "Ekstra",
    id: "ekstra",
    items: [
      { name: "Ev Yapımı İçli Köfte (Kızartılmış)", price: "130 TL", desc: "Tek kişilik", img: "/icli_kofte.jpeg" },
    ]
  },
  {
    category: "İçecekler",
    id: "icecekler",
    items: [
      { name: "Sarıyer Kola (33 cl.)", price: "60 TL", desc: "Kutu içecek", img: "/sariyer_kola.jpg" },
      { name: "Sarıyer Portakal (33 cl.)", price: "60 TL", desc: "Kutu içecek", img: "/sariyer_portakal.jpg" },
      { name: "Sarıyer Gazoz (25 cl.)", price: "40 TL", desc: "Cam şişe", img: "/sariyer_gazoz.jpg" },
      { name: "Su (50 cl.)", price: "20 TL", desc: "Pet şişe", img: "/su.jpg" },
    ]
  }
];

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Kategoriler için büyük harf slider yukarı kayma efekti
      gsap.utils.toArray<HTMLHeadingElement>(".menu-header").forEach(header => {
        gsap.fromTo(header, 
          { y: 80, opacity: 0 }, 
          { 
            y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 90%",
            }
          }
        );
      });

      // 2. Her bir kategorideki menu kartlarının (grid) staggered açılması
      gsap.utils.toArray<HTMLDivElement>(".menu-category").forEach(categoryDiv => {
        const items = categoryDiv.querySelectorAll(".menu-item");
        if (items.length > 0) {
          gsap.fromTo(items, 
            { y: 50, opacity: 0 }, 
            {
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              stagger: 0.15, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: categoryDiv,
                start: "top 85%",
              }
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Handle initial load scroll based on hash
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 120,
            behavior: "smooth"
          });
        }
      }, 300); // Allow time for elements to render
    }
  }, []);

  const scrollToCategory = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // offset for the sticky menu
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#F9F9F6] min-h-screen pb-32 pt-28 texture-bg">
      {/* 1. Page Title */}
      <div className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#2A3B2C] mb-8">Menü</h1>
        <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto italic font-serif">
          Nesilden nesile aktarılan ustalıkla, en doğal taze malzemelerden hazırlanan klasik tatlarımız.
        </p>
      </div>

      {/* 2. Sticky Category Navigation */}
      <div className="sticky top-[86px] z-40 bg-[#F9F9F6]/95 backdrop-blur-md border-y border-[#2A3B2C]/10 py-5 transition-shadow shadow-sm">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <nav className="flex items-center space-x-8 md:space-x-12 justify-start md:justify-center whitespace-nowrap min-w-max md:min-w-0">
            {menuData.map(cat => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`}
                onClick={(e) => scrollToCategory(cat.id, e)}
                className="text-sm font-semibold tracking-[0.2em] uppercase text-[#2A3B2C] hover:text-[#8B5A2B] transition-colors"
              >
                {cat.category}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Categories Content */}
      <div className="container mx-auto px-6 mt-16 md:mt-24 space-y-32 md:space-y-48">
        {menuData.map(category => (
          <section key={category.id} id={category.id} className="menu-category pt-8">
            <h2 className="menu-header text-5xl md:text-7xl lg:text-8xl font-serif text-[#E8D1B5] mb-12 md:mb-16 text-center md:text-left drop-shadow-sm opacity-0">
              {category.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
              {category.items.map((item, idx) => (
                <div key={idx} className="menu-item flex flex-col group opacity-0">
                  {/* Organic Shape Menu Image */}
                  <div className="w-full h-64 md:h-72 mb-6 overflow-hidden clip-rounded-top shadow-lg">
                     <img 
                       src={item.img} 
                       alt={item.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                  </div>

                  <div className="flex items-start sm:items-baseline justify-between mb-3 w-full gap-3 sm:gap-0">
                    <h3 className="text-xl md:text-2xl font-serif text-[#2A3B2C] group-hover:text-[#8B5A2B] transition-colors leading-tight">
                      {item.name}
                    </h3>
                    
                    {/* Dots Separator */}
                    <div className="hidden sm:block flex-grow mx-4 border-b-[2px] border-dotted border-[#2A3B2C]/30 relative top-[-6px] min-w-[20px]"></div>
                    
                    <span className="text-xl md:text-2xl font-serif text-[#2A3B2C] group-hover:text-[#8B5A2B] transition-colors whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  
                  {item.desc && (
                    <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-3">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
