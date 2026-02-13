"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ forceDark = false }: { forceDark?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change (logic usually handled by Next.js Link but safe to have)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const headerBg = isScrolled || forceDark 
    ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
    : "bg-transparent py-5";

  const textColor = isScrolled || forceDark ? "text-oba-dark" : "text-white";
  const iconColor = isScrolled || forceDark ? "#3D3D3D" : "#FFFFFF";

  const navLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/#hizmetler" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${headerBg}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-40 md:w-48 h-10 md:h-12">
              <Image
                src="/assets/logos/oba-celik-yapi-logo.webp"
                alt="Oba Çelik Yapı"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className={`hidden lg:flex space-x-10 font-bold text-sm uppercase tracking-widest transition-colors duration-300 ${textColor}`}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-oba-orange transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/iletisim" className={`hidden lg:block px-8 py-3 rounded-full font-black text-xs uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-xl ${isScrolled || forceDark ? "bg-oba-orange text-white" : "bg-white text-oba-dark"}`}>
              Teklif Al
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 transition-transform active:scale-90"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} color={iconColor} /> : <Menu size={28} color={iconColor} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white lg:hidden flex flex-col p-10 pt-32"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black text-oba-dark uppercase italic tracking-tighter hover:text-oba-orange transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-oba-orange" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <div className="h-[1px] bg-gray-100 w-full"></div>
              <div className="flex flex-col gap-4">
                <a href="tel:+905427476124" className="flex items-center gap-4 text-oba-dark font-bold">
                  <div className="w-12 h-12 rounded-2xl bg-oba-orange/10 flex items-center justify-center text-oba-orange">
                    <Phone size={20} />
                  </div>
                  <span>0542 747 61 24</span>
                </a>
                <Link 
                  href="/iletisim" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-oba-orange text-white py-5 rounded-[2rem] font-black uppercase text-center tracking-widest shadow-xl shadow-oba-orange/20"
                >
                  Ücretsiz Teklif Al
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
