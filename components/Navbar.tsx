"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        mobileMenuOpen
          ? "bg-transparent py-4 border-b-transparent"
          : scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-100 py-3" 
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent pt-6 pb-2 border-b-transparent"
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
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* LOGO (Center) - Slightly Adjusted */}
        <div className="flex justify-start md:justify-center col-span-2 md:col-span-1 relative z-50">
          <Link href="/" className="flex flex-col items-center justify-center transform -translate-y-1 md:-translate-y-2 cursor-pointer" onClick={(e) => handleNavClick(e, "/")}>
            <div className="relative group">
              {/* Optional Subtle Glow behind logo when scrolled */}
              <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 ${scrolled && !mobileMenuOpen ? 'bg-white/50 opacity-100' : 'opacity-0'}`}></div>
              <Image 
                src="/logo.png" 
                alt="Neva Mantı" 
                width={200}
                height={100}
                priority={true}
                draggable={false}
                className="relative h-[80px] w-auto md:h-[100px] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] select-none pointer-events-none" 
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
              onClick={(e) => handleNavClick(e, link.href)}
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
        <div className="flex justify-end md:hidden col-span-1 relative z-50">
          <button
            className={`transform transition-all duration-500 outline-none ${
              mobileMenuOpen 
                ? "text-[#E8D1B5] rotate-90 scale-110" 
                : scrolled ? "text-[#2A3B2C] rotate-0 scale-100" : "text-white rotate-0 scale-100"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={36} strokeWidth={1.5} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Premium Fullscreen Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#1A251C] z-40 flex flex-col items-center justify-center transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-10 w-full px-6 relative z-10">
          {[...leftNavLinks, ...rightNavLinks].map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-4xl sm:text-5xl font-serif text-[#F9F9F6] tracking-widest uppercase transition-all duration-500 ease-out transform hover:text-[#E8D1B5] hover:scale-105 ${
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${mobileMenuOpen ? i * 75 + 100 : 0}ms` }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
              className={`pt-12 w-full flex justify-center transition-all duration-500 ease-out ${
                  mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${mobileMenuOpen ? 400 : 0}ms` }}
          >
              <a
                 href="https://www.yemeksepeti.com/restaurant/n20f/neva-corba-and-manti?srsltid=AfmBOor6dKA0qsscwqTPz9jnwoau1xYqJdSvVkzNobE4g94X9iKqLmt7"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-sm font-bold tracking-[0.2em] uppercase text-[#1A251C] bg-[#E8D1B5] px-10 py-4 rounded-full shadow-[0_0_50px_rgba(232,209,181,0.25)] border border-[#E8D1B5] active:scale-95 transition-transform"
                 onClick={() => setMobileMenuOpen(false)}
              >
                 Sipariş Ver
              </a>
          </div>
        </div>

      </div>
    </header>
  );
}
