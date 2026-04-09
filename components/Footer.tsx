import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2A3B2C] text-[#F9F9F6] py-16 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="text-3xl font-serif font-bold tracking-widest flex flex-col">
            <span>NEVA</span>
            <span className="text-[#E8D1B5] text-sm font-sans tracking-normal mt-1">ÇORBA & MANTI</span>
          </Link>
          <p className="text-sm text-[#D3C7B6] max-w-xs leading-relaxed">
            Tamamen doğal malzemeler ile eski usül, geleneksel bir lezzet deneyimi. Doğadan ilham alıyor, sevgiyle sunuyoruz.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-lg font-serif mb-2 text-[#E8D1B5]">Menü & Bilgi</h4>
          <Link href="/menu" className="text-sm hover:text-white transition-colors">Menüyü İncele</Link>
          <Link href="/hakkimizda" className="text-sm hover:text-white transition-colors">Hikayemiz</Link>
          <Link href="/iletisim" className="text-sm hover:text-white transition-colors">İletişim</Link>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-lg font-serif mb-2 text-[#E8D1B5]">Bize Ulaşın</h4>
          <p className="text-sm text-[#D3C7B6]">0312 800 08 06</p>
          <p className="text-sm text-[#D3C7B6] max-w-[250px] leading-relaxed">Subayevleri, Şehit Ömer Halisdemir Bulvarı No:47/A Keçiören, Ankara, Turkey 06135</p>
          
          <div className="flex space-x-5 mt-6 pb-2">
             <a href="tel:+903128000806" className="w-10 h-10 rounded-full border border-[#3A4E3D] flex items-center justify-center hover:bg-[#E8D1B5] hover:text-[#2A3B2C] transition-all" aria-label="Bizi Arayın"><Phone size={18} /></a>
             <a href="https://www.google.com/maps/dir//Neva+Çorba+Mantı,+Kavacık+Subayevleri,+Şht.+Ömer+Halisdemir+Blv+47%2FA,+06135,+Kavacık+Subayevleri,+Şht.+Ömer+Halisdemir+Blv+47%2FA,+06000+Keçiören%2FAnkara/@39.927808,32.800768,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14d34d62b1ff3f11:0x9f41685f5bbf79c3!2m2!1d32.8737568!2d39.9670255?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#3A4E3D] flex items-center justify-center hover:bg-[#E8D1B5] hover:text-[#2A3B2C] transition-all" aria-label="Yol Tarifi Alın"><MapPin size={18} /></a>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-[#3A4E3D] text-center text-xs text-[#A9BBAA] flex flex-col md:flex-row justify-center items-center gap-4">
        <span>© {new Date().getFullYear()} Neva Çorba Mantı. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
