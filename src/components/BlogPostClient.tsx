"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BlogPostClient({ id }: { id: string }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="pt-40 text-center font-bold italic text-oba-dark">Yükleniyor...</div>;
  if (!post) return <div className="pt-40 text-center font-bold italic text-oba-dark">Yazı bulunamadı.</div>;

  return (
    <div className="pt-40 pb-24 bg-[#F8F9FC] min-h-screen text-oba-dark">
      <div className="container mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-oba-dark font-black uppercase text-xs tracking-widest mb-12 hover:text-oba-orange transition-colors">
          <ArrowLeft size={18} /> Blog Listesine Dön
        </Link>

        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="relative h-[500px] w-full">
            <Image src={post.imageUrl || "/assets/images/oba-celik-yapi-galeri.png"} alt={post.title} fill className="object-cover" />
            <div className="absolute top-10 left-10 bg-oba-orange text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
              {post.category}
            </div>
          </div>

          <div className="p-12 md:p-20">
            <div className="flex flex-wrap items-center gap-8 mb-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2"><Clock size={16} className="text-oba-orange" /> {post.date}</div>
              <div className="flex items-center gap-2"><Tag size={16} className="text-oba-orange" /> {post.category}</div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-oba-dark tracking-tighter mb-10 leading-tight uppercase italic">{post.title}</h1>
            
            <div className="prose prose-xl max-w-none text-gray-500 font-medium leading-relaxed space-y-6">
              <p className="text-2xl text-oba-dark font-bold italic border-l-4 border-oba-orange pl-8 mb-10">
                {post.excerpt}
              </p>
              <p>
                Oba Çelik Yapı kalitesiyle inşa edilen tüm yapılarımızda olduğu gibi, bu içeriğimizde de modern çelik yapı sistemlerinin hayatımıza kattığı değeri ve mühendislik vizyonumuzu sizlerle paylaşıyoruz. 
              </p>
              
              {/* Image Gallery */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16 not-prose">
                  {post.images.map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                      <Image src={img} alt={`${post.title} - ${idx + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  ))}
                </div>
              )}

              <p>
                Detaylı bilgi ve projelendirme süreçleri için uzman ekiplerimizle her zaman iletişime geçebilirsiniz. Geleceği çelikle inşa ederken güvenliğiniz ve konforunuz bizim önceliğimizdir.
              </p>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
               <div className="flex items-center gap-4 text-oba-dark font-black text-sm uppercase tracking-widest cursor-pointer">
                  <Share2 size={20} className="text-oba-orange" /> Paylaş
               </div>
               <Link href="/iletisim" className="bg-oba-orange text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-oba-orange/20 hover:scale-105 transition-transform">
                  Hemen Teklif Al
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
