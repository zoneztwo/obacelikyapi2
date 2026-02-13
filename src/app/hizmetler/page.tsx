import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Ruler, Droplets, ThermometerSun, HardHat } from "lucide-react";

export default function Hizmetler() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FC]">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 bg-oba-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-oba-orange/5 -skew-x-12 translate-x-32"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">
            Çelik Yapı <span className="text-oba-orange">Çözümlerimiz</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Oba Çelik Yapı olarak, modern mühendislik teknikleri ve yüksek kalite standartları ile geleceğin güvenli ve estetik yapılarını inşa ediyoruz.
          </p>
        </div>
      </section>

      {/* Main Services List */}
      <section className="py-32 relative z-20 -mt-16">
        <div className="container mx-auto px-6 space-y-32">
          
          {/* Service 1: Çelik Villalar */}
          <ServiceDetail 
            title="Lüks Çelik Villalar"
            subtitle="Estetik ve Güvenin Buluşma Noktası"
            description="Hayalinizdeki lüks yaşam alanını çeliğin sarsılmaz gücüyle inşa ediyoruz. Depreme tam dayanıklı, kişiye özel mimari tasarımlarımızla konforu ve prestiji bir arada sunuyoruz. İnce işçilik ve modern detaylarla bezenmiş villalarımız, nesiller boyu güvenle yaşayacağınız yuvalar sunar."
            image="/assets/images/oba-celik-yapi-3d-cizim.jpeg"
            features={["Depreme %100 Dayanıklılık", "Esnek Mimari Tasarım", "Yüksek Isı ve Ses Yalıtımı"]}
            reversed={false}
          />

          {/* Service 2: Hafif Çelik Evler */}
          <ServiceDetail 
            title="Hafif Çelik Ev Sistemleri"
            subtitle="Hızlı, Güvenli ve Modern"
            description="Zamanın ve güvenliğin kıymetini bilenler için hafif çelik konut çözümleri sunuyoruz. İleri teknoloji ile fabrikada üretilip yerinde montajı yapılan evlerimiz, yüksek deprem güvenliği ve dört mevsim konfor sağlar. Estetik tasarımlarımızla modern yaşamın kapılarını aralıyoruz."
            image="/assets/images/oba-celik-yapi-proje1-(1).webp"
            features={["Hızlı Kurulum ve Teslimat", "Yüksek Deprem Güvenliği", "Düşük Bakım Gereksinimi"]}
            reversed={true}
          />

          {/* Service 3: Endüstriyel Yapılar */}
          <ServiceDetail 
            title="Endüstriyel Çelik Yapılar"
            subtitle="Geniş Açıklıklı Ticari Çözümler"
            description="Fabrika binaları, depolar, hangarlar ve spor tesisleri için geniş açıklıklı ağır çelik konstrüksiyon sistemler üretiyoruz. İşletmenizin ihtiyaçlarına göre optimize edilmiş statik hesaplamalarla, en ağır yükleri taşıyabilen işlevsel ve dayanıklı alanlar yaratıyoruz."
            image="/assets/images/oba-celik-yapi-galeri-(1).jpeg"
            features={["Geniş Açıklıklı Sistemler", "Ağır Yük Taşıma Kapasitesi", "Hızlı Montaj Süreci"]}
            reversed={false}
          />

          {/* Service 4: Hafif Çelik Sistemler */}
          <ServiceDetail 
            title="Hafif Çelik Teknolojisi"
            subtitle="Yeni Nesil Yapı Standartları"
            description="Geleceğin yapı teknolojisi olan hafif çelik sistemler ile hem çevre dostu hem de son derece dayanıklı binalar inşa ediyoruz. Galvanizli çelik profiller kullanılarak üretilen bu yapılar, korozyona karşı dirençli ve uzun ömürlüdür."
            image="/assets/images/oba-celik-yapi-proje1-(5).webp"
            features={["Korozyona Karşı Direnç", "%100 Geri Dönüştürülebilir", "Hassas Milimetrik Üretim"]}
            reversed={true}
          />

        </div>
      </section>

      {/* Why Choose Our Tech Section */}
      <section className="py-32 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-oba-orange font-bold tracking-[0.2em] uppercase mb-4 text-xs">Teknik Avantajlar</h2>
            <h3 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">Neden Çelik Yapı?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard icon={<ShieldCheck size={32} />} title="Deprem Güvenliği" desc="Betonarmeye göre çok daha hafif ve esnek yapısıyla deprem anında enerjiyi sönümler." />
            <TechCard icon={<Zap size={32} />} title="Hızlı Montaj" desc="İnşaat süresini %70 oranında kısaltarak projelerinizi haftalar içinde teslim etmemizi sağlar." />
            <TechCard icon={<ThermometerSun size={32} />} title="Isı Yalıtımı" desc="Duvar içi yalıtım sistemleri sayesinde en zorlu iklim koşullarında bile enerji tasarrufu sağlar." />
            <TechCard icon={<Ruler size={32} />} title="Hatasız Üretim" desc="Bilgisayar destekli CNC makinelerde milimetrik hassasiyetle üretilir, insan hatasını sıfıra indirir." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-oba-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter uppercase italic">
            Projenizi <span className="text-oba-orange">Birlikte</span> Planlayalım
          </h2>
          <Link href="/iletisim" className="inline-flex items-center gap-4 bg-oba-orange text-white px-12 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:text-oba-dark transition-all duration-500 shadow-2xl">
            Ücretsiz Teklif Alın <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceDetail({ title, subtitle, description, image, features, reversed }: any) {
  return (
    <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}>
      <div className="flex-1 space-y-8 text-left">
        <div className="inline-block px-4 py-1.5 bg-oba-orange/10 text-oba-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          {subtitle}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">{title}</h2>
        <p className="text-gray-500 text-lg leading-relaxed font-medium">{description}</p>
        <ul className="space-y-4">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
              <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center">
                <ShieldCheck size={14} />
              </div>
              {f}
            </li>
          ))}
        </ul>
        <Link href="/iletisim" className="inline-flex items-center gap-3 text-oba-dark font-black text-sm uppercase tracking-widest border-b-4 border-oba-orange pb-2 hover:text-oba-orange transition-colors">
          Detayları Gör <ArrowRight size={18} />
        </Link>
      </div>
      <div className="flex-1 w-full">
        <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

function TechCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 bg-[#F8F9FC] rounded-[2.5rem] border border-gray-100 hover:bg-oba-dark hover:text-white transition-all duration-500 group">
      <div className="mb-6 p-4 bg-white rounded-2xl inline-block text-oba-orange shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xl font-black mb-4 uppercase italic tracking-tight">{title}</h4>
      <p className="text-sm font-medium leading-relaxed opacity-60">{desc}</p>
    </div>
  )
}
