"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const dishes = [
  { id: 1, name: "Tepsi Mantı", img: "/tepsimanti.png" },
  { id: 2, name: "Mercimek Çorbası", img: "/mercimek_tabak.png" },
  { id: 3, name: "Yağlama", img: "/yaglama_tabak.png" },
  { id: 4, name: "Klasik Mantı", img: "/klasik_manti_tabak.png" },
  { id: 5, name: "Çıtır Mantı", img: "/citirmanti_tabak.png" },
];

export default function DishCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Animate rotation on slide change
    const imgs = document.querySelectorAll(`.carousel-img-active`);
    imgs.forEach(img => {
      gsap.fromTo(
        img, 
        { rotation: 90, scale: 0.95 },   // 90 derece dönüş açısı
        { rotation: 0, scale: 1.1, duration: 1.4, ease: "power2.out" }
      );
    });
  }, [currentIndex]);

  return (
    <section className="py-10 md:py-16 bg-[#E8D1B5] overflow-hidden relative border-t border-[#2A3B2C]/10">
      <div className="container mx-auto px-6 mb-8 relative z-30 flex justify-center">
        <h3 className="text-xl md:text-2xl font-serif tracking-widest text-[#2A3B2C] uppercase border-b border-[#2A3B2C]/30 pb-4">
          Öne Çıkan Lezzetler
        </h3>
      </div>
      
      <div className="relative w-full h-[450px] md:h-[650px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            el: '.custom-dish-pagination',
            bulletClass: 'dish-bullet',
            bulletActiveClass: 'dish-bullet-active',
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {dishes.map((dish, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <div 
                    className={`w-[260px] h-[260px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden mb-8 md:mb-10 shadow-2xl relative transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`}
                  >
                    <img 
                      src={dish.img} 
                      alt={dish.name}
                      className={`w-full h-full object-cover ${isActive ? 'carousel-img-active' : ''}`}
                      style={{ transform: "scale(1.1)" }}
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 mix-blend-overlay"></div>
                  </div>
                  <h4 
                    className={`text-4xl md:text-6xl font-serif text-[#2A3B2C] drop-shadow-sm transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    {dish.name}
                  </h4>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Custom Indicator Dots container */}
      <div className="container mx-auto flex justify-center mt-6 relative z-30 custom-dish-pagination space-x-3">
         {/* Bullets injected by Swiper */}
      </div>

      <style jsx global>{`
        .dish-bullet {
          width: 12px;
          height: 12px;
          display: inline-block;
          border-radius: 50%;
          background: rgba(194, 24, 7, 0.2);
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dish-bullet:hover {
          background: rgba(194, 24, 7, 0.5);
        }
        .dish-bullet-active {
          background: #2A3B2C;
          transform: scale(1.25);
        }
      `}</style>
    </section>
  );
}
