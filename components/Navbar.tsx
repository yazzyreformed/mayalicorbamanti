"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Menü", href: "/menu" },
  ];

  const rightNavLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-100 py-3" 
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent pt-6 pb-2"
      }`}
    >
      <div className="container mx-auto px-6 grid grid-cols-3 items-center">
        {/* Desktop Left Nav */}
        <nav className="hidden md:flex space-x-10 justify-start">
          {leftNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                scrolled ? "text-stone-700 hover:text-[#2A3B2C]" : "text-[#F9F9F6] drop-shadow-md hover:text-white"
              } after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "after:bg-[#2A3B2C]" : "after:bg-[#E8D1B5]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* LOGO (Center) - Slightly Adjusted */}
        <div className="flex justify-start md:justify-center col-span-2 md:col-span-1 relative">
          <Link href="/" className="flex flex-col items-center justify-center transform -translate-y-1 md:-translate-y-2 cursor-pointer">
            <div className="relative group">
              {/* Optional Subtle Glow behind logo when scrolled */}
              <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 ${scrolled ? 'bg-white/50 opacity-100' : 'opacity-0'}`}></div>
              <img 
                src="/logo.png?v=1" 
                alt="Neva Çorba & Mantı" 
                draggable="false"
                className="relative h-[80px] md:h-[100px] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] select-none pointer-events-none" 
              />
            </div>
          </Link>
        </div>

        {/* Desktop Right Nav */}
        <nav className="hidden md:flex space-x-8 lg:space-x-10 justify-end items-center">
          {rightNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                scrolled ? "text-stone-700 hover:text-[#2A3B2C]" : "text-[#F9F9F6] drop-shadow-md hover:text-white"
              } after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "after:bg-[#2A3B2C]" : "after:bg-[#E8D1B5]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Sipariş Ver Button with effects */}
          <a
            href="https://www.yemeksepeti.com/restaurant/n20f/neva-corba-and-manti?srsltid=AfmBOor6dKA0qsscwqTPz9jnwoau1xYqJdSvVkzNobE4g94X9iKqLmt7"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden text-sm font-bold tracking-widest uppercase transition-all duration-300 border-2 px-6 py-2.5 rounded-full group ${
              scrolled 
                ? "border-[#2A3B2C] text-[#2A3B2C] hover:text-white hover:shadow-[0_4px_20px_rgba(42,59,44,0.3)]" 
                : "border-[#E8D1B5] text-[#E8D1B5] hover:text-[#2A3B2C] drop-shadow-md hover:backdrop-blur-none"
            }`}
          >
            {/* Button Hover Background Fill */}
            <span className={`absolute inset-0 w-full h-full -z-10 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left ${scrolled ? "bg-[#2A3B2C]" : "bg-[#E8D1B5]"}`}></span>
            Sipariş Ver
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex justify-end md:hidden col-span-1">
          <button
            className={`transition-colors duration-300 ${scrolled ? "text-[#2A3B2C]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 flex flex-col items-center py-10 space-y-8 animate-in slide-in-from-top-2 duration-300">
          {[...leftNavLinks, ...rightNavLinks].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-serif text-stone-800 hover:text-[#2A3B2C] tracking-wide transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
             href="https://www.yemeksepeti.com/restaurant/n20f/neva-corba-and-manti?srsltid=AfmBOor6dKA0qsscwqTPz9jnwoau1xYqJdSvVkzNobE4g94X9iKqLmt7"
             target="_blank"
             rel="noopener noreferrer"
             className="text-lg font-bold tracking-widest uppercase text-white bg-[#2A3B2C] px-8 py-3 rounded-full shadow-lg"
             onClick={() => setMobileMenuOpen(false)}
          >
             Sipariş Ver
          </a>
        </div>
      )}
    </header>
  );
}
