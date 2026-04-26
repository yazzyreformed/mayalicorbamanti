"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const menuData = [
  {
    category: "Çorbalar",
    id: "corbalar",
    items: [
      { name: "Mercimek Çorbası", price: "150 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/mercimek çorbası.png" },
      { name: "Ezogelin Çorbası", price: "150 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/ezogelin çorbası.png" },
      { name: "Yayla Çorbası", price: "150 TL", desc: "", img: "/yayla çorbası.png" },
      { name: "Tavuk Çorbası (Arabaşı)", price: "200 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/arabaşı (tavuk) çorbası.png" },
      { name: "İşkembe Çorbası", price: "250 TL", desc: "", img: "/işkembe çorbası.png" },
      { name: "Kelle Paça Çorbası", price: "280 TL", desc: "Biber turşusu, turp, ekmek ile", img: "/kelle paça çorbası.png" },
      { name: "Etli Kemik Suyu", price: "300 TL", desc: "", img: "/kelle paça çorbası.png" },
      { name: "Beyran Çorbası", price: "330 TL", desc: "", img: "/beyran.png", imgPosition: "object-[center_15%]" },
    ]
  },
  {
    category: "Mantılar",
    id: "mantilar",
    items: [
      { name: "Kayseri Mantısı", price: "350 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/kayseri mantısı.png" },
      { name: "Çıtır Mantı", price: "350 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/Çıtır mantı.png" },
      { name: "Hingel Mantı", price: "350 TL", desc: "İsteğe göre yoğurt, sos. Biber turşusu, salata, ekmek ile", img: "/hingel mantı.png" },
      { name: "Tepsi Mantı", price: "400 TL", desc: "", img: "/tepsi mantı.png" },
    ]
  },
  {
    category: "Kayseri Yağlaması",
    id: "yaglamalar",
    items: [
      { name: "Kayseri Yağlaması", price: "400 TL", desc: "Biber turşusu, salata, yoğurt ile", img: "/kayseri yağlaması.png", containerClass: "h-64 md:h-72 lg:h-[20rem] xl:h-[22rem]", imgPosition: "object-[center_60%]" },
    ]
  },
  {
    category: "Yan Ürünler",
    id: "yan-urunler",
    items: [
      { name: "İçli Köfte (2 adet)", price: "200 TL", desc: "Kızartılmış", img: "/içli köfte.png", containerClass: "h-64 md:h-72 lg:h-[20rem] xl:h-[22rem]", imgPosition: "object-center" },
      { name: "Zeytinyağlı Yaprak Sarma", price: "150 TL", desc: "", img: "/zeytinyağlı yaprak sarma.png", containerClass: "h-64 md:h-72 lg:h-[20rem] xl:h-[22rem]", imgPosition: "object-[center_20%]" },
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
                  <div className={`w-full mb-6 overflow-hidden clip-rounded-top shadow-lg ${(item as any)?.containerClass || 'h-[18rem] md:h-[22rem] lg:h-[26rem] xl:h-[28rem]'}`}>
                     <img 
                       src={item.img} 
                       alt={item.name} 
                       className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.imgPosition || 'object-[center_35%]'}`}
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
                  
                  
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
