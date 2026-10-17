import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { MacbookPro } from "../ui/macbook-pro";
import { Iphone16Pro } from "../ui/iphone-16-pro";
import TopoField from "../TopoField";
import { CUSTOM_MOBILE_MOCKUPS } from "../showcase/MobileAppMockups";

interface ShowcaseProject {
  id: string;
  client: string;
  title: string;
  category: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  accent: string;
  tags: string[];
  to: string;
  ctaText: string;
}

const PROJECTS: ShowcaseProject[] = [
  {
    id: "b2b-bayi",
    client: "B2B Bayi Sistemi",
    title: "Kurumsal B2B Bayi Portalı & Toptan Sipariş Ağı",
    category: "Toptan Satış & Bayi Ağı",
    description:
      "Bayi ve müşteri gruplarına özel dinamik kademeli iskonto matrisi, açık hesap/çek cari risk kontrolü, vadeli sipariş onay zinciri, canlı ERP stok entegrasyonu ve 7/24 DBS/Sanal POS tahsilat platformu.",
    desktopImage: "/showcase/b2b-desktop.png",
    mobileImage: "/showcase/b2b-mobile.png",
    accent: "#c8fdab",
    tags: ["Kademeli İskonto", "Cari Risk & DBS", "ERP Stok Entegre", "Vadeli Sipariş"],
    to: "/tickets",
    ctaText: "B2B Teklifi Al",
  },
  {
    id: "kurumsal-panel",
    client: "Yönetim Paneli & CRM",
    title: "Şirketinize Özel Yönetim ve Takip Panelleri",
    category: "Özel Web Yazılımı & CRM",
    description:
      "İşinizi Excel dosyalarından ve kağıtlardan kurtarın. Müşterilerinizi, siparişlerinizi, saha ekibinizi ve stoklarınızı tek bir güvenli ekrandan yönetebileceğiniz bulut sistemleri.",
    desktopImage: "/showcase/crm-desktop.png",
    mobileImage: "/showcase/crm-mobile.png",
    accent: "#ff9d69",
    tags: ["Sipariş & Stok Takibi", "CRM & Müşteri", "Personel Yetkilendirme", "Canlı Raporlar"],
    to: "/tickets",
    ctaText: "İhtiyacını Belirt",
  },
  {
    id: "erp-sistemleri",
    client: "ERP & Süreç Yönetimi",
    title: "Kurumsal ERP ve Kaynak Planlama Sistemleri",
    category: "Kurumsal ERP & Finans Yönetimi",
    description:
      "Üretim, satınalma, tedarik zinciri, finans ve insan kaynaklarını tek bir merkezi mimaride birleştiren, şirketinize özel modüler ERP platformları.",
    desktopImage: "/showcase/erp-desktop.png",
    mobileImage: "/showcase/erp-mobile.png",
    accent: "#E1E0CC",
    tags: ["Finans & Muhasebe", "Tedarik & Satınalma", "Üretim Planlama", "Modüler Mimari"],
    to: "/tickets",
    ctaText: "ERP Teklifi Al",
  },
  {
    id: "seo-web",
    client: "SEO & Kurumsal Web",
    title: "Google Uyumlu Kurumsal Web ve Teknik SEO",
    category: "Arama Motoru Optimizasyonu & Web",
    description:
      "Google aramalarında rakiplerinizin önüne geçiren, teknik SEO altyapısıyla organik müşteri kazandıran, mobilde ve masaüstünde milisaniyelerde açılan modern web siteleri.",
    desktopImage: "/showcase/seo-desktop.png",
    mobileImage: "/showcase/seo-mobile.png",
    accent: "#00F59B",
    tags: ["Google İlk Sayfa SEO", "Teknik SEO & Hız", "Organik Ziyaretçi", "Mobil Uyumlu"],
    to: "/tickets",
    ctaText: "SEO & Web Teklifi Al",
  },
  {
    id: "e-ticaret",
    client: "E-Ticaret & Ödeme",
    title: "Özel E-Ticaret ve Sanal POS Satış Altyapısı",
    category: "Online Tahsilat & E-Ticaret",
    description:
      "İyzico, PayTR ve banka sanal POS altyapılarıyla 7/24 kesintisiz tahsilat yapan, kargo ve e-fatura sistemlerine otomatik bağlı, yüksek dönüşüm sağlayan modern e-ticaret siteleri.",
    desktopImage: "/showcase/eticaret-desktop.png",
    mobileImage: "/showcase/eticaret-mobile.png",
    accent: "#c8fdab",
    tags: ["Sanal POS Entegrasyonu", "Otomatik E-Fatura", "Kargo Takip", "Yüksek Dönüşüm"],
    to: "/tickets",
    ctaText: "E-Ticaret Teklifi Al",
  },
  {
    id: "depo-sistemleri",
    client: "Depo & Stok (WMS)",
    title: "Depo ve Stok Yönetim Sistemleri (WMS)",
    category: "Depo Otomasyonu & Lojistik",
    description:
      "Karekod/barkod okuma, el terminali desteği, raf bazlı lokasyon takibi, hızlı sayım ve hatasız sevkiyat süreçleriyle deponuzu tek ekrandan dijitalleştirin.",
    desktopImage: "/showcase/depo-desktop.png",
    mobileImage: "/showcase/depo-mobile.png",
    accent: "#ff9d69",
    tags: ["Barkod & El Terminali", "Raf & Lokasyon Takibi", "Kayıpsız Sevkiyat", "Anlık Stok"],
    to: "/tickets",
    ctaText: "Depo Sistemi Başlat",
  },
  {
    id: "ai-otomasyon",
    client: "Otomasyon & AI Entegre",
    title: "Yapay Zeka ve İş Süreçleri Otomasyonu",
    category: "AI Entegrasyonu & RPA",
    description:
      "WhatsApp ve web sitenizde 7/24 müşterileri yanıtlayan, otomatik teklif hazırlayan, PDF ve faturaları yapay zekayla okuyup sisteme işleyen uçtan uca akıllı otomasyonlar.",
    desktopImage: "/showcase/ai-otomasyon-desktop.png",
    mobileImage: "/showcase/ai-otomasyon-mobile.png",
    accent: "#5FCDFF",
    tags: ["WhatsApp AI Asistanı", "Evrak & Fatura Okuma AI", "Otomatik İş Akışları", "Hata Sıfırlama"],
    to: "/tickets",
    ctaText: "AI Otomasyon Başlat",
  },
  {
    id: "mikroservis",
    client: "Mikroservis Mimarisi",
    title: "Yüksek Trafikli Mikroservis ve API Altyapıları",
    category: "Ölçeklenebilir Backend & Cloud",
    description:
      "Milyonlarca anlık kullanıcıyı kesintisiz karşılayan, bağımsız servislerle çalışan, Docker ve Kubernetes mimarili, çökmeyen yüksek performanslı kurumsal sistemler.",
    desktopImage: "/showcase/mikroservis-desktop.png",
    mobileImage: "/showcase/mikroservis-mobile.png",
    accent: "#5FCDFF",
    tags: ["Docker & Kubernetes", "Yük Dengeleme", "Sıfır Kesinti (99.9%)", "Mikroservis API"],
    to: "/tickets",
    ctaText: "Mimari Danışmanlık",
  },
  {
    id: "mobil-uygulama",
    client: "Mobil Uygulama",
    title: "iOS & Android Mobil Uygulama Geliştirme",
    category: "App Store & Google Play",
    description:
      "İşinizi veya fikrinizi müşterilerinizin cebine taşıyın. Kolay kullanımlı, online ödeme alan, anlık bildirim gönderen ve App Store / Google Play onay süreçleri dahil anahtar teslim mobil uygulamalar.",
    desktopImage: "/showcase/mobil-desktop.png",
    mobileImage: "/showcase/mobil-mobile.png",
    accent: "#5FCDFF",
    tags: ["iOS & Android", "Ödeme Altyapısı", "Anlık Bildirim", "Mağaza Yayını"],
    to: "/tickets",
    ctaText: "Mobil Teklifi Al",
  },
];

export const SelectedWorksSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  // Otomatik akış (autoplay): 6 saniyede bir sonraki projeye geçer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Aktif sekmeyi YALNIZCA kendi yatay şeridinde kaydır (pencereyi/ana sayfayı ASLA dikeyde zıplatmaz)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const tab = tabRefs.current[activeIndex];
    if (container && tab) {
      const scrollLeft = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <section className="w-full p-2 sm:p-3 pt-0 bg-black">
      <div className="relative w-full rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10 bg-black p-6 sm:p-10 md:p-14 overflow-hidden">
        {/* TopoField WebGL Background (Hero ile aynı arkaplan) */}
        <div className="absolute inset-0 h-full w-full pointer-events-none opacity-60">
          <TopoField
            mode="dark"
            speed={0.8}
            length={1}
            density={1}
            opacity={0.8}
            className="h-full w-full"
          />
        </div>

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#E1E0CC]/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#5FCDFF] font-mono mb-2 block">
              [ 01 · ÇÖZÜMLERİMİZ ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#E1E0CC] leading-[1.1]">
              İhtiyacınıza Özel Yazılım Çözümleri.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1E0CC]/70 max-w-md leading-relaxed">
            Mobil uygulama, kurumsal yönetim paneli, e-ticaret veya yapay zeka asistanı... Şirketinizi büyütecek doğru sistemi anahtar teslim geliştirip yayına alıyoruz.
          </p>
        </div>

        {/* Project Selector Tabs - Doğrudan dolup akan (fluid fill) lüks butonlar */}
        <div
          ref={tabsContainerRef}
          className="relative z-10 flex items-center justify-start gap-3 overflow-x-auto py-1 pb-4 mb-10 no-scrollbar scroll-smooth"
        >
          {PROJECTS.map((project, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={project.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer shrink-0 relative overflow-hidden rounded-full border px-6 py-3 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                  isSelected
                    ? "border-[#E1E0CC] bg-black/90 shadow-lg"
                    : "border-white/10 bg-black/60 text-[#E1E0CC]/65 hover:text-white hover:border-white/30"
                }`}
              >
                {/* Alt metin katmanı (Krem renk) */}
                <div className="flex items-center gap-2.5 text-[#E1E0CC]/80 whitespace-nowrap">
                  <span className="font-mono text-xs opacity-50">0{idx + 1}</span>
                  <span className="font-medium tracking-tight">{project.client}</span>
                </div>

                {/* Butonun doğrudan içine su gibi akan ilerleme dolgusu (Gradient/nokta yok, saf studio akışı) */}
                {isSelected && (
                  <motion.div
                    key={`flow-${idx}-${activeIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0 bg-[#E1E0CC] overflow-hidden"
                  >
                    {/* Dolgu üzerinden geçerken siyah renge dönüşen metin katmanı */}
                    <div className="absolute inset-0 px-6 py-3 flex items-center gap-2.5 text-black font-semibold whitespace-nowrap">
                      <span className="font-mono text-xs opacity-75">0{idx + 1}</span>
                      <span className="tracking-tight">{project.client}</span>
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Stage Container - Başlık ve Açıklamalar doğrudan ekranların üstünde, her şey görünür alanda */}
        <div className="relative z-10 w-full mb-10">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0.15, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* Active Project Info Bar - Geniş yatay denge, sağdaki boşluğu dolduran kompakt düzen */}
            <div className="w-full max-w-5xl mb-6 border-b border-white/10 pb-5">
              {/* Üst Satır: Kategori + Başlık (geniş alan) ve Aksiyon Butonu */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-xs font-mono text-[#5FCDFF] tracking-wider uppercase mb-1.5">
                    // {activeProject.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#E1E0CC] tracking-tight">
                    {activeProject.title}
                  </h3>
                </div>

                <Link
                  to={activeProject.to}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] hover:bg-white text-black px-5 py-2 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shrink-0 self-start md:self-auto"
                >
                  <span>{activeProject.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Alt Satır: Açıklama metni ve Etiketler */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-[#E1E0CC]/75 max-w-2xl leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-[#E1E0CC]/85 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* PC (MacBook Pro) + Mobile (iPhone 16 Pro) Mockup Stage - Ekrana tam oturan kompakt ve net cihazlar */}
            <div className="flex w-full max-w-5xl flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 py-1 mb-4">
              {/* MacBook Pro (PC) */}
              <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl transition-transform duration-500 hover:scale-[1.01]">
                <MacbookPro
                  src={activeProject.desktopImage}
                  className="h-auto w-full text-neutral-900 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* iPhone 16 Pro (Telefon) */}
              <div className="w-32 sm:w-36 lg:w-40 shrink-0 transition-transform duration-500 hover:-translate-y-2">
                <Iphone16Pro
                  src={CUSTOM_MOBILE_MOCKUPS[activeProject.id] ? undefined : activeProject.mobileImage}
                  className="h-auto w-full text-neutral-900 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                >
                  {CUSTOM_MOBILE_MOCKUPS[activeProject.id]}
                </Iphone16Pro>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Link to Direct Proposal / Contact */}
        <div className="relative z-10 flex justify-center">
          <Link
            to="/tickets"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#E1E0CC]/30 bg-black/80 px-6 py-3 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:border-[#5FCDFF] hover:text-white transition-all shadow-md backdrop-blur"
          >
            <span>Aklınızdaki Projeyi Konuşalım · Ücretsiz Teklif Alın</span>
            <ArrowUpRight className="w-4 h-4 text-[#5FCDFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
