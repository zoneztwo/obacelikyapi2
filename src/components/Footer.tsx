import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-oba-dark text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="relative w-48 h-16 mb-8">
              <Image
                src="/assets/logos/oba-celik-yapi-logo-w.webp"
                alt="Oba Çelik Yapı"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Türkiye genelinde en üst segment çelik ev ve yapı sistemleri çözümleri sunuyoruz. Kalite, estetik ve güvenin adresi.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black mb-8 border-b-2 border-oba-orange pb-2 inline-block uppercase tracking-widest">Hızlı Linkler</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li><Link href="/" className="hover:text-oba-orange transition-colors">Anasayfa</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-oba-orange transition-colors">Hakkımızda</Link></li>
              <li><Link href="/hizmetler" className="hover:text-oba-orange transition-colors">Hizmetler</Link></li>
              <li><Link href="/blog" className="hover:text-oba-orange transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black mb-8 border-b-2 border-oba-orange pb-2 inline-block uppercase tracking-widest">Hizmetlerimiz</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li>Çelik Ev Modelleri</li>
              <li>Hafif Çelik Sistemler</li>
              <li>Endüstriyel Çelik Yapılar</li>
              <li>Lüks Yaşam Alanları</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black mb-8 border-b-2 border-oba-orange pb-2 inline-block uppercase tracking-widest">İletişim</h4>
            <ul className="space-y-4 text-gray-400 font-bold text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-oba-orange flex-shrink-0" /> 
                <span>Fatih mah. Kazım Karabekir cad. no:37/E Çayırlı/ERZİNCAN</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-oba-orange" /> 
                <a href="tel:+905427476124" className="hover:text-oba-orange transition-colors">0542 747 61 24</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-oba-orange" /> 
                <a href="tel:+905530901124" className="hover:text-oba-orange transition-colors">0553 090 11 24</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-oba-orange" /> 
                <a href="mailto:info@obacelikyapi.com" className="hover:text-oba-orange transition-colors">info@obacelikyapi.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-20 pt-10 text-center text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">
          <p>&copy; 2026 Oba Çelik Yapı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
