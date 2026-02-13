import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Iletisim() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FC]">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 bg-oba-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-oba-orange/10 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
            Bizimle <span className="text-oba-orange">İletişime</span> Geçin
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            Hayalinizdeki çelik yapı projesi için uzman ekibimizle görüşün, size en uygun çözümü birlikte planlayalım.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <ContactInfoCard 
                icon={<MapPin className="text-oba-orange" size={32} />}
                title="Merkez Ofis"
                content="Fatih mahallesi kazım Karabekir caddesi no:37/E Çayırlı/ERZİNCAN"
              />
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-start gap-6 group">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-oba-orange/5 transition-colors">
                  <Phone className="text-oba-orange" size={32} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Telefon</h4>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+905427476124" className="text-oba-dark font-bold hover:text-oba-orange transition-colors">0542 747 61 24</a>
                    <a href="tel:+905530901124" className="text-oba-dark font-bold hover:text-oba-orange transition-colors">0553 090 11 24</a>
                  </div>
                </div>
              </div>
              <ContactInfoCard 
                icon={<Mail className="text-oba-orange" size={32} />}
                title="E-Posta"
                content="info@obacelikyapi.com"
                link="mailto:info@obacelikyapi.com"
              />
              <ContactInfoCard 
                icon={<Clock className="text-oba-orange" size={32} />}
                title="Çalışma Saatleri"
                content="Pazartesi - Cumartesi: 09:00 - 19:00"
              />
            </div>

            <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-oba-dark mb-8 tracking-tight italic uppercase">Hızlı Teklif Formu</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Adınız Soyadınız</label>
                  <input type="text" placeholder="Örn: Ahmet Yılmaz" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-oba-orange outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Telefon Numaranız</label>
                  <input type="tel" placeholder="05XX XXX XX XX" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-oba-orange outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">İlgilendiğiniz Hizmet</label>
                  <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-oba-orange outline-none transition-all font-bold appearance-none">
                    <option>Çelik Ev Projesi</option>
                    <option>Hafif Çelik Ev</option>
                    <option>Endüstriyel Yapı</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Mesajınız</label>
                  <textarea rows={5} placeholder="Projeniz hakkında kısa bilgi verin..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-oba-orange outline-none transition-all font-bold resize-none"></textarea>
                </div>
                <button type="submit" className="md:col-span-2 bg-oba-orange text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-oba-orange/30 hover:bg-[#D45520] transition-all flex items-center justify-center gap-3">
                  Mesajı Gönder <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="h-[500px] w-full bg-gray-100 rounded-[3rem] border-8 border-gray-50 overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-4">
                <MapPin size={64} className="opacity-20" />
                <span className="font-bold italic uppercase tracking-widest opacity-50">Erzincan Çayırlı Harita Görünümü</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfoCard({ icon, title, content, link }: { icon: React.ReactNode, title: string, content: string, link?: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all flex items-start gap-6 group">
      <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-oba-orange/5 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">{title}</h4>
        {link ? (
          <a href={link} className="text-oba-dark font-bold leading-relaxed hover:text-oba-orange transition-colors">{content}</a>
        ) : (
          <p className="text-oba-dark font-bold leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  );
}
