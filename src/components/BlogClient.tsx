"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BlogClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-32 md:pt-40 pb-24 bg-[#F8F9FC] min-h-screen text-oba-dark text-left">
      <div className="container mx-auto px-3 md:px-4 text-left">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 text-left">
          <div className="inline-block px-4 py-1.5 bg-oba-orange/10 text-oba-orange rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Kurumsal Paylaşımlar
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-oba-dark tracking-tight mb-6 uppercase italic">Blog & Haberler</h1>
          <p className="text-gray-500 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed text-center">
            Oba Çelik Yapı'dan en güncel haberler ve teknik rehberler.
          </p>
        </div>

        {loading ? (
           <div className="text-center p-20 text-gray-400 italic font-bold">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 max-w-7xl mx-auto text-left">
              {posts.map((post) => (
                <Link 
                  href={`/blog/${post.id}`} 
                  key={post.id} 
                  className="group bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer block text-left"
                >
                  <div className="flex flex-col h-full text-left">
                    <div className="relative h-32 md:h-64 overflow-hidden text-left">
                      <Image
                        src={post.imageUrl || "/assets/images/oba-celik-yapi-galeri.png"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-1000"
                      />
                      <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-oba-orange text-white px-2 md:px-4 py-1 rounded-full text-[7px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-10 text-left">
                      <div className="hidden md:flex items-center gap-6 mb-4 text-gray-400 text-[10px] font-black uppercase tracking-widest text-left">
                         <span className="flex items-center gap-2"><Clock size={14} className="text-oba-orange" /> {post.date}</span>
                      </div>
                      
                      <h3 className="text-xs md:text-2xl font-black text-oba-dark mb-2 md:mb-4 group-hover:text-oba-orange transition duration-300 line-clamp-2 uppercase italic leading-tight text-left">
                        {post.title}
                      </h3>
                      
                      <p className="hidden md:block text-gray-500 leading-relaxed mb-8 line-clamp-3 font-medium text-sm text-left">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 md:gap-4 text-oba-dark font-black text-[9px] md:text-sm uppercase tracking-widest group-hover:gap-6 transition-all duration-300 text-left">
                        Oku <ArrowRight size={14} className="text-oba-orange" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
