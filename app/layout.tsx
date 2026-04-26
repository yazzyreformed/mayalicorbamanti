import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Neva Mantı | Gerçek Lezzet",
  description: "Nesilden nesile aktarılan ustalıkla, en doğal taze malzemelerden hazırlanan klasik Kayseri Mantısı, Yağlaması ve Çorbaları.",
  keywords: "neva, neva mantı, kayseri mantısı, yağlama, tepsi mantı, beyran, çorba, restoran",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Neva Mantı",
    description: "Doğal, katkısız, lezzetli. Orijinal Kayseri Mantısı ve nefis çorbalarımızı keşfedin. WhatsApp veya Instagram'dan menümüze göz atabilirsiniz.",
    url: "https://nevamanti.com", // İleride gerçek domain eklendiğinde buraya yazılacak
    siteName: "Neva Mantı",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Neva Mantı Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neva Mantı",
    description: "Geleneksel lezzetlerin modern sunumu. El yapımı mantı ve taze çorbalar.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased text-stone-800 bg-[#F9F9F6] selection:bg-[#8B5A2B] selection:text-white`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
