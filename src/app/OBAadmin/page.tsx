"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  X,
  LogOut,
  Upload,
  GalleryThumbnails,
  Loader2
} from "lucide-react";

import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("blog");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "Rehber", excerpt: "", imageUrl: "", images: [] as string[] });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("oba_admin_auth");
    if (auth !== "true") {
      router.push("/OBAadmin/login");
    } else {
      setAuthenticated(true);
      fetchPosts();
      fetchGallery();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("oba_admin_auth");
    router.push("/OBAadmin/login");
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedGallery = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGallery(fetchedGallery);
    } catch (error) {
      console.error("Galeri yükleme hatası:", error);
    }
  };

  // Multiple File Upload Handler (Firebase Storage)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "post" | "gallery") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        setUploadProgress(`${i + 1} / ${fileArray.length} yükleniyor...`);

        // Create a unique file name
        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `uploads/${fileName}`);
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        if (downloadURL) {
          if (target === "post") {
            uploadedUrls.push(downloadURL);
          } else {
            // Add to Firestore Gallery Collection
            await addDoc(collection(db, "gallery"), {
              url: downloadURL,
              title: file.name,
              createdAt: serverTimestamp()
            });
          }
        }
      }
      
      if (target === "post") {
        setNewPost(prev => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
          imageUrl: prev.imageUrl || uploadedUrls[0] || ""
        }));
      } else if (target === "gallery") {
        fetchGallery();
        alert(`${fileArray.length} görsel başarıyla galeriye eklendi.`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Yükleme sırasında bir hata oluştu.");
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        ...newPost,
        date: new Date().toLocaleDateString("tr-TR"),
        createdAt: serverTimestamp(),
        status: "Yayında"
      });
      
      setShowModal(false);
      setNewPost({ title: "", category: "Rehber", excerpt: "", imageUrl: "", images: [] });
      fetchPosts();
      alert("Yazı başarıyla yayınlandı!");
    } catch (err) {
      console.error("Post error:", err);
      alert("Yazı eklenirken hata oluştu.");
    }
  };

  const deletePost = async (id: string) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        fetchPosts();
      } catch (err) {
        alert("Silme işlemi başarısız.");
      }
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (confirm("Bu görseli galeriden silmek istiyor musunuz?")) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        fetchGallery();
      } catch (err) {
        alert("Silme işlemi başarısız.");
      }
    }
  };

  if (!authenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="animate-spin text-oba-orange" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FC] font-sans text-oba-dark">
      <aside className="w-72 bg-[#1A1C1E] text-white flex flex-col z-20 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-oba-orange rounded-xl flex items-center justify-center">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">Oba Panel</span>
          </div>
          <nav className="space-y-1.5">
            <NavItem label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<LayoutDashboard size={20} />} />
            <NavItem label="Blog Yazıları" active={activeTab === "blog"} onClick={() => setActiveTab("blog")} icon={<FileText size={20} />} />
            <NavItem label="Galeri Yönetimi" active={activeTab === "gallery"} onClick={() => setActiveTab("gallery")} icon={<GalleryThumbnails size={20} />} />
            <NavItem label="Mesajlar" active={activeTab === "messages"} onClick={() => setActiveTab("messages")} icon={<MessageSquare size={20} />} />
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all px-4 py-3 rounded-xl hover:bg-white/5">
            <ExternalLink size={18} /> <span className="text-sm font-medium">Sitede Gör</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition-all px-4 py-3 rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={18} /> <span className="text-sm font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium capitalize">
            <span>Admin</span> <ChevronRight size={14} /> <span>{activeTab}</span>
          </div>
          <div className="w-10 h-10 bg-oba-orange/10 text-oba-orange rounded-full flex items-center justify-center font-bold">AD</div>
        </header>

        <div className="flex-1 overflow-auto p-10 bg-[#F8F9FC]">
          <div className="max-w-6xl mx-auto">
            
            {activeTab === "blog" && (
              <div className="animate-in fade-in duration-500">
                <div className="flex justify-between items-end mb-8">
                  <h1 className="text-4xl font-black text-oba-dark tracking-tight">Blog Yazıları</h1>
                  <button onClick={() => setShowModal(true)} className="bg-oba-orange text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-oba-orange/20 uppercase text-xs tracking-widest">
                    <Plus size={20} /> Yeni Yazı Ekle
                  </button>
                </div>
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-[0.2em] font-black border-b border-gray-100">
                          <th className="px-8 py-6">İçerik Bilgisi</th>
                          <th className="px-8 py-6">Kategori</th>
                          <th className="px-8 py-6">Tarih</th>
                          <th className="px-8 py-6 text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm font-medium">
                        {posts.map(post => (
                          <tr key={post.id} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-8 py-6 font-bold">{post.title}</td>
                            <td className="px-8 py-6"><span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] uppercase font-black">{post.category}</span></td>
                            <td className="px-8 py-6 text-gray-500">{post.date}</td>
                            <td className="px-8 py-6 text-right">
                               <button onClick={() => deletePost(post.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="animate-in fade-in duration-500">
                <div className="flex justify-between items-end mb-8">
                   <div>
                      <h1 className="text-4xl font-black text-oba-dark tracking-tight">Galeri Yönetimi</h1>
                      <p className="text-gray-400 font-medium text-sm mt-1 italic">Aynı anda birden fazla görsel seçip yükleyebilirsiniz.</p>
                   </div>
                   <button 
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-oba-orange text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-oba-orange/20 disabled:opacity-50 uppercase text-xs tracking-widest"
                   >
                     {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />} 
                     {uploading ? uploadProgress : "Görsel Seç & Yükle"}
                   </button>
                   <input 
                    type="file" 
                    ref={galleryInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => handleFileUpload(e, "gallery")} 
                   />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {gallery.map(item => (
                    <div key={item.id} className="group relative aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                      <img src={item.url} alt="Galeri" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button onClick={() => deleteGalleryItem(item.id)} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold italic uppercase tracking-widest text-xs">Galeri henüz boş. Görsel yüklemeye başlayın.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab !== "blog" && activeTab !== "gallery" && (
              <div className="p-20 text-center text-gray-400 font-bold italic">Bu bölüm geliştirilme aşamasındadır.</div>
            )}

          </div>
        </div>
      </main>

      {/* Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl p-10 overflow-hidden animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-oba-dark tracking-tight italic uppercase">Yeni Blog Yazısı</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleAddPost} className="space-y-5">
                <input type="text" placeholder="Başlık" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-oba-orange outline-none transition-all" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-oba-orange outline-none transition-all appearance-none" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}>
                    <option>Rehber</option><option>Haberler</option><option>Tamamlanan Projeler</option>
                </select>
                <textarea rows={3} placeholder="İçerik özeti..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold resize-none focus:ring-2 focus:ring-oba-orange outline-none transition-all" value={newPost.excerpt} onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}></textarea>
                
                {/* Image Gallery in Modal */}
                {newPost.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {newPost.images.map((url, index) => (
                      <div key={index} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${newPost.imageUrl === url ? "border-oba-orange shadow-lg shadow-oba-orange/20" : "border-gray-100"}`}>
                        <img src={url} alt={`Blog ${index}`} className="w-full h-full object-cover" onClick={() => setNewPost({...newPost, imageUrl: url})} />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updatedImages = newPost.images.filter((_, i) => i !== index);
                            let updatedCover = newPost.imageUrl;
                            if (newPost.imageUrl === url) {
                              updatedCover = updatedImages[0] || "";
                            }
                            setNewPost({...newPost, images: updatedImages, imageUrl: updatedCover});
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:scale-110 transition-transform"
                        >
                          <X size={12} />
                        </button>
                        {newPost.imageUrl === url && (
                          <div className="absolute bottom-0 inset-x-0 bg-oba-orange text-white text-[8px] font-black uppercase text-center py-0.5 tracking-widest">Kapak</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div onClick={() => fileInputRef.current?.click()} className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center cursor-pointer hover:border-oba-orange/50 hover:bg-oba-orange/[0.02] transition-all group">
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "post")} />
                   {uploading ? (
                     <div className="flex items-center justify-center gap-2 text-oba-orange font-bold animate-pulse">
                       <Loader2 className="animate-spin" size={18} /> 
                       <span className="text-xs uppercase tracking-widest">{uploadProgress || "Yükleniyor..."}</span>
                     </div>
                   ) : (
                     <div className="space-y-1">
                        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] group-hover:text-oba-orange transition-colors block">Fotoğraf Ekle</span>
                        <span className="text-gray-300 text-[9px] uppercase tracking-wider block">Birden fazla seçebilirsiniz</span>
                     </div>
                   )}
                </div>
                <button type="submit" disabled={uploading} className="w-full py-5 bg-oba-orange text-white font-black rounded-2xl shadow-xl shadow-oba-orange/30 hover:bg-[#D45520] transition-all disabled:opacity-50 uppercase tracking-widest text-xs">Yayınla</button>
              </form>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${active ? "bg-oba-orange text-white shadow-lg shadow-oba-orange/20" : "text-gray-500 hover:bg-white/5 hover:text-gray-300"}`}>
      {icon}<span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
