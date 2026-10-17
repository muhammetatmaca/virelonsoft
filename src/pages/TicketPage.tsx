import React, { useState, useMemo } from "react";
import {
  CheckCircle2,
  Smartphone,
  Globe,
  Database,
  Rocket,
  ShoppingCart,
  Bot,
  Send,
  MessageSquare,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import TopoField from "../components/TopoField";
import EngravedTicket from "../components/ui/engraved-ticket";
import { Footer } from "../components/layout/Footer";

interface ServiceOption {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  ticketWord: string;
}

const SERVICES: ServiceOption[] = [
  {
    id: "mobile",
    title: "Mobil Uygulama (iOS & Android)",
    badge: "Native / Hybrid",
    icon: Smartphone,
    desc: "React Native & Flutter ile 60/120 FPS akıcı, App Store ve Play Store onaylı mobil çözümler.",
    ticketWord: "MOBILE",
  },
  {
    id: "b2b-web",
    title: "B2B Bayi Portalı & Kurumsal Web",
    badge: "Sub-Second",
    icon: Globe,
    desc: "Next.js tabanlı, yüksek trafiğe dayanıklı bayi yönetim panelleri ve kurumsal arayüzler.",
    ticketWord: "B2B PORTAL",
  },
  {
    id: "erp",
    title: "Logo ERP & Mikroservis Entegrasyonu",
    badge: "Çift Yönlü Sync",
    icon: Database,
    desc: "Logo Tiger/Go3, REST API ve RabbitMQ ile stok, cari, iskonto ve sipariş senkronizasyonu.",
    ticketWord: "LOGO ERP",
  },
  {
    id: "seo",
    title: "SEO & Core Web Vitals Optimizasyonu",
    badge: "100/100 Skor",
    icon: Rocket,
    desc: "Sub-second TTFB, zengin şema yapıları ve Google organik aramalarda 1. sıra indeksleme mimarisi.",
    ticketWord: "SEO ENGINE",
  },
  {
    id: "ecommerce",
    title: "Özel E-Ticaret Platformu",
    badge: "Ölçeklenebilir",
    icon: ShoppingCart,
    desc: "Yüksek hacimli ödeme altyapıları, dinamik kargo entegrasyonları ve bayi fiyatlandırma motoru.",
    ticketWord: "ECOMMERCE",
  },
  {
    id: "ai",
    title: "Yapay Zeka & Özel Otomasyon",
    badge: "LLM & Vision",
    icon: Bot,
    desc: "Kurumsal doküman sorgulama, YOLO/ResNet görüntü işleme ve özel LLM bot mimarileri.",
    ticketWord: "AI SYSTEM",
  },
];

export const TicketPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(["mobile"]);

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectNotes, setProjectNotes] = useState("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((s) => s !== id)
          : prev
        : [...prev, id]
    );
  };

  // Ticket display word derived from selections
  const primaryService = SERVICES.find((s) => s.id === selectedServices[0]) || SERVICES[0];
  const ticketHeadline = useMemo(() => {
    if (selectedServices.length === 1) return primaryService.ticketWord;
    if (selectedServices.length === 2) return "FULL STACK";
    return "VIRELON";
  }, [selectedServices, primaryService]);

  const ticketCode = useMemo(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "VRL-";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  // WhatsApp message composer
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const chosenServiceTitles = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(", ");

    const lines = [
      `*VIRELONSOFT PROJE VE TEKLİF TALEBİ* (${ticketCode})`,
      ``,
      `*İletişim:* ${fullName || "Belirtilmedi"} ${company ? `(${company})` : ""}`,
      `*Telefon:* ${phone || "Belirtilmedi"}`,
      `*E-posta:* ${email || "Belirtilmedi"}`,
      ``,
      `*Seçilen Hizmetler:*`,
      `• ${chosenServiceTitles}`,
      ``,
      projectNotes ? `*Proje Notları:*\n${projectNotes}` : "",
      ``,
      `_Bu mesaj virelonsoft.com üzerinden oluşturulmuştur._`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/905070084069?text=${message}`, "_blank");
  };

  // Mailto composer
  const handleMailSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const chosenServiceTitles = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(", ");

    const subject = encodeURIComponent(`Proje Teklif Talebi [${ticketCode}] - ${fullName || company || "Virelonsoft"}`);
    const body = encodeURIComponent(
      `Sayın Virelonsoft Mühendislik Ekibi,\n\n` +
      `Aşağıdaki kapsamda projemiz için teknik değerlendirme ve teklif almak istiyoruz:\n\n` +
      `Ad Soyad: ${fullName}\n` +
      `Şirket: ${company}\n` +
      `Telefon: ${phone}\n` +
      `E-posta: ${email}\n\n` +
      `Seçilen Hizmetler: ${chosenServiceTitles}\n\n` +
      `Proje Detayları ve Notlar:\n${projectNotes || "Detaylar toplantıda paylaşılacaktır."}\n\n` +
      `İyi çalışmalar.`
    );

    window.open(`mailto:lexicallayer@muhammetatmaca.com.tr?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 selection:bg-neutral-200 selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Waves (Exact TopoField from Home & Hakkımızda) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <TopoField
          mode="light"
          speed={0.7}
          length={1.2}
          density={1.1}
          opacity={0.8}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 sm:pt-32 pb-20">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.04em] text-neutral-950 leading-[1.05] text-balance mb-5">
              Projenizi Başlatalım, Doğrudan Teklif Alın
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
              Geliştirmek istediğiniz sistemin kapsamını ve entegrasyonlarını belirleyin; doğrudan çalışan,
              ölçeklenebilir mimarimiz için şeffaf süre ve maliyet planı oluşturalım.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Scope & Contact Form (7 cols) */}
            <form onSubmit={handleWhatsAppSubmit} className="lg:col-span-7 flex flex-col gap-8">
              {/* Step 1: Services Selection */}
              <div className="rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-md p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-medium text-neutral-950">
                    1. Hizmet Kapsamı
                  </h2>
                  <span className="text-xs text-neutral-500 font-mono">Çoklu Seçim</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                  Projenizde yer alacak modülleri seçin (en az bir tane seçilmelidir):
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    const Icon = srv.icon;
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950/10"
                            : "bg-white/90 text-neutral-900 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span
                            className={`p-2 rounded-lg ${
                              isSelected ? "bg-white/10 text-white" : "bg-neutral-100 text-neutral-900"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white/15 text-neutral-200"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {srv.badge}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm leading-tight mb-1">{srv.title}</div>
                          <div
                            className={`text-xs leading-relaxed line-clamp-2 ${
                              isSelected ? "text-neutral-300" : "text-neutral-500"
                            }`}
                          >
                            {srv.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact & Notes */}
              <div className="rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-md p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-medium text-neutral-950 mb-1">
                  2. İletişim Bilgileri & Proje Notu
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                  Size doğrudan ulaşabileceğimiz bilgileri girin:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Şirket / Kurum Adı
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Örn: Doğanlar Grubu"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Telefon Numarası (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ahmet@sirketiniz.com"
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Proje Özeti & Özel İhtiyaçlar
                  </label>
                  <textarea
                    rows={4}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Hedefleriniz, entegre edilecek sistemler veya eklemek istediğiniz özel detaylar..."
                    className="w-full rounded-xl border border-neutral-200 bg-white p-3.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 resize-y"
                  />
                </div>

                {/* Submission CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold px-6 py-3.5 text-sm transition-all shadow-sm cursor-pointer hover:shadow-md"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp ile Teklif İste</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleMailSubmit}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-medium px-5 py-3.5 text-sm transition-all cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    <span>E-posta Gönder</span>
                  </button>
                </div>

                <p className="text-center text-[11px] text-neutral-500 mt-4">
                  Bilgileriniz yalnızca proje kapsamını değerlendirmek ve size dönüş yapmak amacıyla kullanılır.
                </p>
              </div>
            </form>

            {/* Right Column: Live Dynamic Letterpress Ticket & Direct Contact Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
              {/* Dynamic Engraved Ticket Showcase */}
              <div className="rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-md p-6 shadow-sm overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-neutral-950" />
                    <span className="text-xs font-mono font-semibold text-neutral-900 uppercase">
                      Dijital Teklif Bileti
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">{ticketCode}</span>
                </div>

                {/* Live Breathed Crimson Ticket */}
                <div className="w-full flex justify-center py-2 scale-90 sm:scale-100 transition-transform">
                  <EngravedTicket
                    variant="crimson"
                    word={ticketHeadline}
                    code={ticketCode}
                    tagline="VIRELONSOFT / 2026"
                    quote="DIRECT ENGINEERING"
                    body={`${selectedServices.length} HİZMET KAPSAMI SEÇİLDİ • VIRELONSOFT`}
                    notes="VIRELON / TR"
                    breathe={true}
                  />
                </div>

                <p className="text-center text-[11px] text-neutral-500 mt-2">
                  Bilet üzerindeki başlık seçtiğiniz hizmetlere göre canlı güncellenir.
                </p>
              </div>

              {/* Fast Direct Contacts Card */}
              <div className="rounded-2xl border border-neutral-200 bg-white/85 backdrop-blur-md p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 font-mono">
                  Doğrudan İletişim Kanalları
                </h3>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+905070084069"
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 transition-colors group"
                  >
                    <span className="p-2.5 rounded-lg bg-neutral-100 text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs text-neutral-500">Mühendislik & Satış Hattı</div>
                      <div className="text-sm font-medium text-neutral-950">+90 (507) 008 40 69</div>
                    </div>
                  </a>

                  <a
                    href="mailto:lexicallayer@muhammetatmaca.com.tr"
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 transition-colors group"
                  >
                    <span className="p-2.5 rounded-lg bg-neutral-100 text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs text-neutral-500">Doğrudan E-posta</div>
                      <div className="text-sm font-medium text-neutral-950">lexicallayer@muhammetatmaca.com.tr</div>
                    </div>
                  </a>
                </div>

                {/* Guarantees */}
                <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-3 text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>NDA & Gizlilik Sözleşmesi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>24 Saat İçinde Dönüş</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Real Site Footer */}
      <Footer outerBgClass="bg-transparent pt-6 pb-10 relative z-10" />
    </div>
  );
};

export default TicketPage;
