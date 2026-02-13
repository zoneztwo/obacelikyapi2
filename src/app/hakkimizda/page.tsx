import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Zap, Users2, Building2, History } from "lucide-react";

export default function Hakkimizda() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FC]">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-oba-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-oba-orange/10 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">
              Geleceği <span className="text-oba-orange">Çelikle</span> <br />İnşa Ediyoruz
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed mb-10 border-l-4 border-oba-orange pl-6">
              2022 yılında başlayan yolculuğumuzda, modern mimariyi çeliğin gücüyle birleştirerek Türkiye'nin dört bir yanında güvenli yaşam alanları kuruyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl z-10">
                <Image 
                  src="/assets/images/oba-celik-yapi-3d-cizim.jpeg" 
                  alt="Oba Çelik Yapı Hakkımızda" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-oba-orange rounded-[2rem] -z-0 flex flex-col items-center justify-center text-white p-8 shadow-xl">
                <span className="text-6xl font-black mb-2 italic">2022</span>
                <span className="text-sm font-bold uppercase tracking-widest text-center">Yılından Beri Güvenle</span>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="inline-block px-5 py-2 bg-oba-orange/10 text-oba-orange rounded-full text-xs font-black uppercase tracking-widest">
                Hikayemiz
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tight leading-tight">
                Oba Çelik Yapı: <br />Yenilikçi, Hızlı ve Sarsılmaz
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Oba Çelik Yapı, 2022 yılında çelik yapı sektörüne yeni bir soluk getirmek amacıyla kuruldu. Geleneksel yapı tekniklerinin ötesine geçerek, depreme dayanıklı, çevre dostu ve estetik kaygısı yüksek yapılar üretmeyi misyon edindik.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                   <div className="text-3xl font-black text-oba-orange italic">500+</div>
                   <div className="text-sm font-bold text-oba-dark uppercase tracking-tight">Teslim Edilen Yapı</div>
                </div>
                <div className="space-y-3">
                   <div className="text-3xl font-black text-oba-orange italic">81</div>
                   <div className="text-sm font-bold text-oba-dark uppercase tracking-tight">Hizmet Verilen İl</div>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed font-medium">
                Mühendislik disiplinimizden ödün vermeden, villalardan endüstriyel tesislere kadar geniş bir yelpazede, modern yaşamın tüm ihtiyaçlarına cevap veren anahtar teslim çözümler sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-oba-orange font-bold tracking-widest uppercase mb-4 text-sm">Değerlerimiz</h2>
            <h3 className="text-3xl md:text-5xl font-black text-oba-dark tracking-tight italic">Bizi Biz Yapan Prensipler</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<ShieldCheck size={40} className="text-oba-orange" />}
              title="Sarsılmaz Güven"
              description="Tüm yapılarımızda en yüksek kalite çelik kullanarak, deprem ve dış etkenlere karşı tam koruma sağlıyoruz."
            />
            <ValueCard 
              icon={<Zap size={40} className="text-oba-orange" />}
              title="Hızlı Kurulum"
              description="Modüler ve hafif çelik sistemlerimiz sayesinde aylar süren inşaat süreçlerini haftalara indiriyoruz."
            />
            <ValueCard 
              icon={<Users2 size={40} className="text-oba-orange" />}
              title="Müşteri Odaklılık"
              description="Sizin hayalinizdeki tasarımı, mühendislik vizyonumuzla birleştirerek kişiye özel yaşam alanları üretiyoruz."
            />
          </div>
        </div>
      </section>

      {/* Corporate Info Section */}
      <section className="py-24 bg-oba-dark text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-black mb-6 italic text-oba-orange uppercase tracking-tighter">Vizyonumuz</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Türkiye''de çelik yapı denilince akla gelen ilk marka olmak ve sürdürülebilir mimariyi tüm dünyaya yaymak.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black mb-6 italic text-oba-orange uppercase tracking-tighter">Misyonumuz</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                İnsanlara sadece dört duvar değil; güvenli, konforlu ve estetik bir gelecek sunmak. Teknolojiyi ve çeliği en verimli şekilde kullanarak yaşam kalitesini artırmak.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden border-8 border-white/5">
             <Image 
                src="/assets/images/oba-celik-yapi-galeri-(7).jpeg" 
                alt="Oba Çelik Yapı Ofis" 
                fill 
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-10 bg-oba-orange/90 backdrop-blur-md rounded-3xl text-center shadow-2xl">
                   <Building2 size={64} className="mx-auto mb-4 text-white" />
                   <h4 className="text-xl font-black uppercase tracking-widest">Kurumsal Kimlik</h4>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-oba-dark mb-10 tracking-tighter">
            Hayalinizdeki Yapı İçin <br /><span className="text-oba-orange italic underline">Doğru Adrestesiniz</span>
          </h2>
          <Link href="/iletisim" className="inline-flex items-center gap-4 bg-oba-dark text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-oba-orange transition-all duration-500 shadow-2xl hover:-translate-y-2">
            Bizimle İletişime Geçin <Award size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-12 bg-[#F8F9FC] rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
      <div className="mb-8 p-6 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 group-hover:bg-oba-orange/5 transition-all">
        {icon}
      </div>
      <h4 className="text-2xl font-black text-oba-dark mb-4 italic tracking-tight uppercase">{title}</h4>
      <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
    </div>
  );
}

