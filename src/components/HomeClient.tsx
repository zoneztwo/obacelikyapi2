"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Building, Users, Globe, Maximize2, X, ShieldCheck } from "lucide-react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomeClient() {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLatestPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchGallery = async () => {
       try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"), limit(8));
        const snapshot = await getDocs(q);
        const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGallery(images);
       } catch (error) {
         console.error("Error fetching gallery:", error);
       }
    };

    fetchLatestPosts();
    fetchGallery();
  }, []);

  const defaultImages = [
    "/assets/images/oba-celik-yapi-galeri-(1).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(2).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(3).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(4).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(5).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(6).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(7).jpeg",
    "/assets/images/oba-celik-yapi-galeri-(8).jpeg",
  ];

  const galleryItems = gallery.length > 0 ? gallery.map(g => g.url) : defaultImages;

  return (
    <div className="flex flex-col min-h-screen bg-white text-oba-dark">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/assets/images/oba-celik-yapi-galeri.png"
          alt="Oba Çelik Yapı Hero"
          fill
          className="object-cover brightness-50 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-0"></div>
        <div className="container mx-auto px-6 z-10 text-center relative">
          <div className="inline-block px-4 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-[9px] md:text-xs font-bold uppercase tracking-widest text-oba-orange">
            Premium Çelik Yapı Sistemleri
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight uppercase italic text-center text-white">
            Geleceği <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oba-orange to-orange-300">Çelikle İnşa Et</span>
          </h1>
          <p className="text-sm md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 font-medium leading-relaxed px-4 text-center">
            Türkiye'nin her noktasında estetik, dayanıklı ve hızlı kurulumlu çelik ev çözümleri.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link href="/#hizmetler" className="bg-oba-orange text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-[#D45520] transition-all hover:scale-105 shadow-2xl">
              Projeleri İncele
            </Link>
            <Link href="/iletisim" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-white hover:text-oba-dark transition-all">
              Teklif İste
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-oba-dark py-10 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
            <StatItem icon={<Building size={18} />} value="500+" label="Proje" />
            <StatItem icon={<Users size={18} />} value="100%" label="Memnuniyet" />
            <StatItem icon={<Globe size={18} />} value="81" label="Şehir" />
            <StatItem icon={<CheckCircle2 size={18} />} value="2 Yıl" label="Garanti" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-oba-orange font-bold tracking-[0.2em] uppercase mb-4 text-[10px] md:text-xs">Hizmetlerimiz</h2>
            <h3 className="text-3xl md:text-6xl font-black text-oba-dark tracking-tighter leading-tight uppercase italic">
              Hayallerinizi Geleceğin <br className="hidden md:block" /> Teknolojisiyle İnşa Ediyoruz
            </h3>
          </div>
          
          <div className="space-y-32">
            {/* Service 1: Çelik Evler */}
            <div className="flex flex-col lg:flex-row gap-16 items-center text-left">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-oba-orange/10 text-oba-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Estetik ve Güvenin Buluşma Noktası
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">Lüks Çelik Evler</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">Hayalinizdeki lüks yaşam alanını çeliğin sarsılmaz gücüyle inşa ediyoruz. Depreme tam dayanıklı, kişiye özel mimari tasarımlarımızla konforu ve prestiji bir arada sunuyoruz.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Depreme %100 Dayanıklılık
                  </li>
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Esnek Mimari Tasarım
                  </li>
                </ul>
                <Link href="/iletisim" className="inline-flex items-center gap-3 text-oba-dark font-black text-sm uppercase tracking-widest border-b-4 border-oba-orange pb-2 hover:text-oba-orange transition-colors">
                  Teklif Al <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image src="/assets/images/oba-celik-yapi-proje1-(9).webp" alt="Çelik Evler" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Service 2: Hafif Çelik */}
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-center text-left">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-oba-orange/10 text-oba-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Yeni Nesil Yapı Standartları
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">Hafif Çelik Teknolojisi</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">Geleceğin yapı teknolojisi olan hafif çelik sistemler ile hem çevre dostu hem de son derece dayanıklı binalar inşa ediyoruz.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Korozyona Karşı Direnç
                  </li>
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Hassas Milimetrik Üretim
                  </li>
                </ul>
                <Link href="/iletisim" className="inline-flex items-center gap-3 text-oba-dark font-black text-sm uppercase tracking-widest border-b-4 border-oba-orange pb-2 hover:text-oba-orange transition-colors">
                  Teklif Al <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image src="/assets/images/oba-celik-yapi-proje1-(1).webp" alt="Hafif Çelik" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Service 3: Endüstriyel */}
            <div className="flex flex-col lg:flex-row gap-16 items-center text-left">
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-oba-orange/10 text-oba-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Geniş Açıklıklı Ticari Çözümler
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">Endüstriyel Yapılar</h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">Fabrika binaları, depolar ve hangarlar için geniş açıklıklı ağır çelik konstrüksiyon sistemler üretiyoruz.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Geniş Açıklıklı Sistemler
                  </li>
                  <li className="flex items-center gap-4 text-oba-dark font-bold text-sm uppercase italic">
                    <div className="w-6 h-6 rounded-full bg-oba-orange text-white flex items-center justify-center flex-shrink-0"><ShieldCheck size={14} /></div>
                    Hızlı Montaj Süreci
                  </li>
                </ul>
                <Link href="/iletisim" className="inline-flex items-center gap-3 text-oba-dark font-black text-sm uppercase tracking-widest border-b-4 border-oba-orange pb-2 hover:text-oba-orange transition-colors">
                  Teklif Al <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image src="/assets/images/oba-celik-yapi-Endüstriyel-konut-celik-endüstriyel-0.webp" alt="Endüstriyel Yapılar" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-32 bg-oba-dark overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-oba-orange font-bold tracking-[0.2em] uppercase mb-2 text-[10px]">Portfolyo</h2>
              <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Proje Galerisi</h3>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-medium max-w-xs text-center md:text-right italic">Büyütmek için görsele tıklayın.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {galleryItems.map((url, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage(url)}
                className="relative group rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl cursor-zoom-in aspect-square"
              >
                <img src={url} alt="Oba Proje" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-oba-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-8 h-8 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-oba-dark shadow-xl"><Maximize2 size={24} /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div className="text-left">
              <h2 className="text-oba-orange font-bold tracking-[0.2em] uppercase mb-4 text-[10px] md:text-xs">Blog & Haberler</h2>
              <h3 className="text-3xl md:text-5xl font-black text-oba-dark tracking-tighter uppercase italic">Güncel Gelişmeler</h3>
            </div>
            <Link href="/blog" className="hidden sm:flex text-gray-400 font-bold hover:text-oba-orange transition-colors items-center gap-2 text-sm">Tüm Yazılar <ArrowRight size={18} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {latestPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group cursor-pointer block text-left">
                <div className="relative h-40 md:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 shadow-lg">
                  <Image src={post.imageUrl || "/assets/images/oba-celik-yapi-galeri.png"} alt={post.title} fill className="object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/95 px-2 md:px-3 py-0.5 md:py-1 rounded-lg text-[7px] md:text-[10px] font-black uppercase tracking-wider text-oba-orange">{post.category}</div>
                </div>
                <h4 className="text-xs md:text-xl font-bold text-oba-dark mb-2 leading-snug group-hover:text-oba-orange transition-colors line-clamp-2 uppercase italic">{post.title}</h4>
                <div className="inline-flex items-center gap-2 text-[10px] md:text-sm font-black text-oba-dark uppercase tracking-wide group-hover:gap-4 transition-all">Oku <ArrowRight size={16} className="text-oba-orange" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-oba-orange transition-colors z-50"><X size={32} /></button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full h-full flex items-center justify-center">
              <img src={selectedImage} alt="Büyük Görsel" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ icon, value, label }: any) {
   return (
      <div className="flex items-center gap-3 text-white">
         <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-white/10 flex items-center justify-center text-oba-orange flex-shrink-0">{icon}</div>
         <div className="text-left">
            <div className="text-sm md:text-2xl font-black tracking-tighter italic">{value}</div>
            <div className="text-[7px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</div>
         </div>
      </div>
   )
}
