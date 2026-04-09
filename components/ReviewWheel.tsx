"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { Camera } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";

const storyReviews = [
  {
    id: 1,
    username: "emirkara",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1766558469_3794489917888557047_78295801941.jpg",
  },
  {
    id: 2,
    username: "selin.yilmaz",
    userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1766995829_3798158764466246016_78295801941.jpg",
  },
  {
    id: 3,
    username: "caner_aydin",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1769670341_3820593150939692411_78295801941.jpg",
  },
  {
    id: 4,
    username: "mervedemir_",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1770064970_3823904521349688508_78295801941.jpg",
  },
  {
    id: 5,
    username: "buraktas",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1772887996_3847585617475834751_78295801941.jpg",
  },
  {
    id: 6,
    username: "ayse.gurme",
    userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1772888556_3847590379470493655_78295801941.jpg",
  },
  {
    id: 7,
    username: "yemek.rehberim",
    userImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    storyImage: "/nevacorbamanti_1772888796_3847592477201316239_78295801941.jpg",
  }
];

export default function ReviewWheel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="py-32 bg-[#F9F9F6] h-[700px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5A2B]"></div>
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-[#F9F9F6] texture-bg overflow-hidden relative z-20">
      <div className="container mx-auto px-6 text-center mb-16 md:mb-20">
        <h2 className="text-4xl md:text-6xl font-serif text-[#2A3B2C] mb-4">
          Misafirlerimizin <span className="italic text-[#8B5A2B]">Deneyimleri</span>
        </h2>
        <p className="text-stone-500 max-w-2xl mx-auto italic">
          Bizi sosyal medyadan etiketleyen misafirlerimizin kareleri.
        </p>
      </div>

      <div className="w-full">
        <Swiper
          modules={[FreeMode, Autoplay]}
          grabCursor={true}
          freeMode={true}
          slidesPerView="auto"
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          className="story-swiper !px-6 md:!px-12"
        >
          {[...storyReviews, ...storyReviews].map((story, index) => (
            <SwiperSlide 
              key={index} 
              className="!w-[280px] md:!w-[340px] !h-[500px] md:!h-[600px]"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-stone-900 group">
                {/* Photo */}
                <img 
                  src={story.storyImage} 
                  alt="Review" 
                  className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-110" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .story-swiper .swiper-wrapper {
          -webkit-transition-timing-function: linear !important;
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}




