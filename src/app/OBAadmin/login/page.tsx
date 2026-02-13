"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const auth = localStorage.getItem("oba_admin_auth");
    if (auth === "true") {
      router.push("/OBAadmin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple authentication check with provided credentials
    if (username === "oba_admin" && password === "OBA2026!") {
      setTimeout(() => {
        localStorage.setItem("oba_admin_auth", "true");
        router.push("/OBAadmin");
      }, 1000);
    } else {
      setTimeout(() => {
        setError("Geçersiz kullanıcı adı veya şifre!");
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-oba-orange/10 p-10 border border-gray-100 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-oba-orange rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-oba-orange/20">
              <Lock className="text-white" size={36} />
            </div>
            <h1 className="text-3xl font-black text-oba-dark tracking-tight uppercase italic">Admin Girişi</h1>
            <p className="text-gray-400 font-medium mt-2">Lütfen yetkili bilgilerinizi girin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 ml-4">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-oba-orange outline-none transition-all"
                  placeholder="Kullanıcı Adı"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 ml-4">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-oba-orange outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-oba-orange text-white font-black rounded-2xl shadow-xl shadow-oba-orange/30 hover:bg-[#D45520] transition-all disabled:opacity-50 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Giriş Yapılıyor...
                </>
              ) : (
                "Sisteme Giriş Yap"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push("/")}
              className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-oba-dark transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; 2026 OBA Çelik Yapı - Admin Panel
        </p>
      </div>
    </div>
  );
}
