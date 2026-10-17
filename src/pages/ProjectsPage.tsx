import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Iphone16Pro } from "../components/ui/iphone-16-pro";
import { MacbookPro } from "../components/ui/macbook-pro";
import { Footer } from "../components/layout/Footer";
import { MobileAppsMarquee } from "../components/projects/MobileAppsMarquee";
import { AsciiLogo } from "../components/ui/AsciiLogo";
import TopoField from "../components/TopoField";
import { CUSTOM_MOBILE_MOCKUPS } from "../components/showcase/MobileAppMockups";

export interface ShowcaseProject {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  internalRoute?: string;
  externalUrl?: string;
  accent: string;
  tags: string[];
}

export const PROJECTS: ShowcaseProject[] = [
  /* --- 1. ANA SAYFA ÇÖZÜM MİMARİLERİ --- */
  {
    id: "b2b-bayi",
    title: "Modern B2B Bayi Portalı — Kademeli İskonto, Cari Bakiye ve Toptan Sipariş Ağı",
    client: "B2B Bayi Portalı",
    year: "2026",
    category: "B2B Ticaret & Sipariş Portalı",
    description:
      "Telefon ve mesaj trafiğini sıfırlayan kurumsal B2B ticaret altyapısı. Bayi ve müşteri gruplarına özel dinamik kademeli iskonto matrisi, açık hesap/çek/senet cari risk ve limit kontrolü, vadeli sipariş onay ve plasiyer yetkilendirme zinciri. ERP sistemleriyle çift yönlü canlı stok senkronizasyonu, 7/24 kesintisiz DBS (Doğrudan Borçlandırma Sistemi) ve 3D Secure sanal POS e-tahsilat entegrasyonu sunan uçtan uca toptan satış platformu.",
    desktopImage: "/showcase/b2b-desktop.png",
    mobileImage: "/showcase/b2b-mobile.png",
    internalRoute: "/tickets",
    accent: "#5FCDFF",
    tags: ["B2B Bayi Portalı", "Kademeli İskonto Matrisi", "Cari Risk & DBS", "Canlı ERP Stok Entegre", "Vadeli Sipariş Onayı", "Plasiyer Saha Ağı", "Next.js"],
  },
  {
    id: "crm-yonetim",
    title: "Modern Karanlık CRM & Çok Kanallı Müşteri Operasyon Dashboard'u",
    client: "CRM Dashboard",
    year: "2026",
    category: "Kurumsal CRM & Analitik",
    description:
      "Dağınık Excel tabloları ve kaybolan müşteri verilerini tek ekranda toplayan kurumsal CRM mimarisi. Aday müşteriden satışa kadar dinamik Kanban satış hunisi (pipeline), çok kanallı iletişim geçmişi (WhatsApp, E-posta, Telefon entegrasyonu), otomatik teklif ve sözleşme PDF motoru. Departman bazlı hedef takibi, anlık ciro ve kârlılık metrikleri ile saha ekipleri için rol bazlı granular yetkilendirme sistemi.",
    desktopImage: "/showcase/crm-desktop.png",
    mobileImage: "/showcase/crm-mobile.png",
    internalRoute: "/tickets",
    accent: "#00F59B",
    tags: ["Kurumsal CRM", "Satış Hunisi (Pipeline)", "Otomatik Teklif PDF", "WhatsApp / E-Posta Entegre", "Granular Yetkilendirme", "Canlı Ciro Metrikleri", "TypeScript"],
  },
  {
    id: "erp-sistemleri",
    title: "Modüler Bulut ERP Yönetim Paneli & Kurumsal Kaynak Planlama",
    client: "ERP Paneli",
    year: "2026",
    category: "ERP & Kaynak Planlama",
    description:
      "Departmanlar arası kopuklukları ortadan kaldıran şirket içi modüler ERP omurgası. GİB onaylı e-Fatura, e-Arşiv ve e-İrsaliye entegrasyonu; çoklu depo, şube ve dövizli cari hesap yönetimi. Satın alma talebinden onay zincirine kadar tam denetim mekanizması, personel bordro ve izin takip modülleri ile finansal nakit akışını milisaniyeler içinde simüle eden canlı raporlama motoru.",
    desktopImage: "/showcase/erp-desktop.png",
    mobileImage: "/showcase/erp-mobile.png",
    internalRoute: "/tickets",
    accent: "#5FCDFF",
    tags: ["Modüler ERP Omurgası", "e-Dönüşüm (GİB e-Fatura)", "Satın Alma Onay Zinciri", "Dövizli Cari Yönetimi", "Nakit Akış Simülasyonu", "PostgreSQL"],
  },
  {
    id: "seo-analitik",
    title: "Kurumsal SEO Analitik Platformu & Yapay Zeka Destekli Sıralama Radarı",
    client: "SEO Analitik",
    year: "2026",
    category: "SEO & Organik Büyüme Analitiği",
    description:
      "Organik arama motoru trafiğini ve anahtar kelime sıralamalarını 7/24 otonom izleyen analitik motoru. Google Search Console API ve PageSpeed Core Web Vitals doğrudan veri akışı; kırık link, indexleme ve schema markup açıklarını tespit eden teknik SEO tarayıcısı. Sektörel rakip sıralama değişimlerini anlık bildiren ve hedeflenen kelimelerde içerik boşluklarını haritalandıran otomatik raporlama platformu.",
    desktopImage: "/showcase/seo-desktop.png",
    mobileImage: "/showcase/seo-mobile.png",
    internalRoute: "/tickets",
    accent: "#bef264",
    tags: ["SEO Sıralama Radarı", "GSC / Search Console API", "Core Web Vitals Analizi", "Teknik SEO Tarayıcı", "Rakip GAP Analizi", "Otomatik Raporlama"],
  },
  {
    id: "e-ticaret",
    title: "Headless E-Ticaret Platformu — Yüksek Hızlı Checkout & Pazaryeri Entegrasyonu",
    client: "E-Ticaret Mağazası",
    year: "2026",
    category: "Modern E-Ticaret & Ödeme Altyapısı",
    description:
      "Milisaniyelik sayfa yüklenme hızına sahip, dönüşüm odaklı headless e-ticaret altyapısı. Sepette terk oranını düşüren tek tıkla ödeme akışı, PayTR, İyzico ve banka sanal POS entegrasyonları. Trendyol, Hepsiburada ve Amazon pazaryerleriyle iki yönlü canlı ürün, fiyat ve stok senkronizasyonu; kargo API'leri (Yurtiçi, Aras, MNG) ile otomatik barkod basımı ve sipariş takip sistemi.",
    desktopImage: "/showcase/eticaret-desktop.png",
    mobileImage: "/showcase/eticaret-mobile.png",
    internalRoute: "/tickets",
    accent: "#ff645b",
    tags: ["Headless E-Ticaret", "Pazaryeri API Senkronu", "Tek Tık Checkout", "Sanal POS & Taksit", "Otomatik Kargo Entegre", "Next.js / Redis"],
  },
  {
    id: "depo-sistemleri",
    title: "Akıllı Depo Stok Yönetim Sistemi (WMS) & El Terminali Altyapısı",
    client: "Depo Stok WMS",
    year: "2026",
    category: "Depo Yönetim Sistemleri",
    description:
      "Fiziksel depo operasyonlarında insan hatasını sıfıra indiren kurumsal WMS yazılımı. Android el terminalleri ve barkod/karekod okuyucularla canlı stok sayımı, koridor-raf-kat lokasyon optimizasyonu, FIFO/LIFO kurallı akıllı ürün toplama rotaları. Tedarikçi mal kabulünden sevkiyat irsaliyesine kadar barkod kontrollü çift doğrulama ve depo personeli KPI performans takip motoru.",
    desktopImage: "/showcase/depo-desktop.png",
    mobileImage: "/showcase/depo-mobile.png",
    internalRoute: "/tickets",
    accent: "#ff9d69",
    tags: ["WMS Depo Omurgası", "El Terminali Android", "Koridor / Raf Lokasyon", "Barkod / QR Doğrulama", "FIFO/LIFO Toplama", "Hatasız Sevkiyat"],
  },
  {
    id: "ai-otomasyon",
    title: "WhatsApp AI Kurumsal Asistan & Otonom İş Akışı Entegrasyonu",
    client: "AI Otomasyon",
    year: "2026",
    category: "Yapay Zeka & Entegre Bot Sistemleri",
    description:
      "İşletmenizin kurumsal bilgi tabanı (RAG) ve ürün kataloğuyla doğrudan eğitilen yapay zeka ajanları. 7/24 resmi WhatsApp Business API ve web sitenizde müşterileri insan doğallığında karşılayan, sipariş alan, randevu planlayan ve soruları yanıtlayan otonom sistem. Gelen fatura, PDF ve irsaliyeleri OCR ile okuyup muhasebe veya CRM sisteminize otomatik işleyen hatasız süreç otomasyonu.",
    desktopImage: "/showcase/ai-otomasyon-desktop.png",
    mobileImage: "/showcase/ai-otomasyon-mobile.png",
    internalRoute: "/ai",
    accent: "#5FCDFF",
    tags: ["WhatsApp Business API", "Kurumsal RAG Mimarisi", "LLM / Claude & GPT", "Otonom Randevu & Sipariş", "Evrak & Belge OCR", "Süreç Otomasyonu"],
  },
  {
    id: "mikroservis",
    title: "Dağıtık Mikroservis Mimarisi & Yüksek Trafikli Bulut Altyapısı",
    client: "Mikroservis",
    year: "2026",
    category: "Mikroservis & Dağıtık Bulut",
    description:
      "Ani trafik patlamalarında ve yüksek eşzamanlı isteklerde sıfır kesinti (Zero-Downtime) sağlayan dağıtık servis mimarisi. Docker ve Kubernetes (K8s) orkestrasyonu, Ocelot / Envoy API Gateway üzerinden akıllı yük dengeleme. RabbitMQ ve Apache Kafka mesaj kuyruklarıyla gevşek bağlı (loosely coupled) asenkron mimari, Redis önbellekleme katmanı ve Prometheus/Grafana ile uçtan uca canlı sistem izleme.",
    desktopImage: "/showcase/mikroservis-desktop.png",
    mobileImage: "/showcase/mikroservis-mobile.png",
    internalRoute: "/tickets",
    accent: "#E1E0CC",
    tags: ["Docker & Kubernetes", "API Gateway (Ocelot)", "RabbitMQ / Kafka Kuyruk", "Redis Dağıtık Cache", "Prometheus & Grafana", "99.99% Uptime"],
  },
  {
    id: "mobil-uygulama",
    title: "Cross-Platform Mobil Mühendislik & App Store / Play Store Dağıtımı",
    client: "Mobil Uygulama",
    year: "2026",
    category: "Mobil Mühendislik & Sanal POS",
    description:
      "iOS ve Android platformlarında yerel (native) performans ve 60/120 FPS akıcılık sunan React Native mobil mimarisi. Güvenli biyometrik giriş (Face ID / Parmak İzi), çevrimdışı (offline-first) yerel veri senkronizasyonu, Firebase ve OneSignal anlık push bildirim motoru. In-App Purchase (Uygulama içi satın alma) ve 3D Secure sanal POS ödeme akışları dahil, App Store ve Google Play onay süreçleri uçtan uca tamamlanmış anahtar teslim mobil çözümler.",
    desktopImage: "/showcase/mobil-desktop.png",
    mobileImage: "/showcase/mobil-mobile.png",
    internalRoute: "/tickets",
    accent: "#5FCDFF",
    tags: ["React Native", "iOS & Android", "Biyometrik Kimlik", "Offline-First Senkron", "Push Notification", "In-App Purchase", "Store Yayını"],
  },

  /* --- 2. CANLI MÜŞTERİ & ÜRETİM PROJELERİ --- */
  {
    id: "doganlar-eczacilik",
    title: "Doğanlar Eczacılık — B2B Dağıtım Ağı ve Logo ERP Entegre E-Ticaret Platformu",
    client: "Doğanlar Eczacılık",
    year: "2025",
    category: "B2B / E-Ticaret & Logo ERP Entegrasyonu",
    description:
      "100'den fazla eczane ile ecza deposu arasındaki tüm sipariş ve faturalandırma trafiğini dijitalleştiren kurumsal B2B platformu. Logo Tiger ERP ile milisaniyelik canlı stok, depocu-plasiyer iskonto oranları ve cari risk limitleri senkronizasyonu. ASP.NET Core mikroservis altyapısı, Redis önbellekleme ve RabbitMQ kuyruk yönetimiyle yüksek sipariş hacminde sıfır gecikmeli kesintisiz operasyon.",
    desktopImage: "/showcase/doganlar-eczacilik-desktop.png",
    mobileImage: "/showcase/doganlar-eczacilik-mobile.png",
    externalUrl: "https://www.doganlarecza.com/",
    accent: "#5FCDFF",
    tags: ["ASP.NET Core", "Microservices Mimari", "Logo Tiger ERP Entegre", "Redis Önbellek", "RabbitMQ", "SQL Server", "100+ Eczane Ağı"],
  },
  {
    id: "lcyikar",
    title: "LCYıkar — Endüstriyel Temizlik Hizmetleri & Saha Operasyon Portalı",
    client: "LCYıkar",
    year: "2025",
    category: "Service Platform & Saha Operasyon Yönetimi",
    description:
      "Bireysel ve kurumsal temizlik taleplerini tek merkezde toplayan, bölge ve uzman ekiplere göre akıllı görev yönlendirmesi yapan saha yönetim platformu. Müşteriler için online randevu ve SMS onay akışı; saha ekipleri için rota, iş başlangıç/bitiş onayı ve mobil operasyon arayüzü. Yönetim kadrosu için anlık hakediş hesaplama, müşteri memnuniyet skoru ve canlı gelir analitiği sunan merkezi dashboard.",
    desktopImage: "/showcase/lcyikar-desktop.png",
    mobileImage: "/showcase/lcyikar-mobile.png",
    externalUrl: "https://lcyikar.com/",
    accent: "#00F59B",
    tags: ["React", "Node.js & Express", "Saha Ekip Dağıtım", "SMS Bildirim Motoru", "PostgreSQL", "Canlı Hakediş Paneli", "Türkiye Geneli"],
  },
  {
    id: "multishop",
    title: "MultiShop — Dağıtık Mikroservis Mimarili Ölçeklenebilir E-Ticaret Motoru",
    client: "MultiShop",
    year: "2023",
    category: "E-Commerce / Dağıtık Mikroservis Mimarisi",
    description:
      "Katalog, sepet, sipariş, kargo ve ödeme işlevlerinin birbirinden bağımsız çalışan servislerle yönetildiği yeni nesil e-ticaret omurgası. Ocelot API Gateway üzerinden yönlendirilen istekler, IdentityServer ile merkezi JWT kimlik doğrulama, RabbitMQ ile asenkron sipariş kuyrukları. Yüksek sezon indirimlerinde çökmeyen, her mikroservisin kendi veri tabanıyla (Database-per-Service) bağımsız ölçeklendiği kurumsal altyapı.",
    desktopImage: "/showcase/multishop-desktop.png",
    mobileImage: "/showcase/multishop-mobile.png",
    externalUrl: "https://mobilia.com.tr/",
    accent: "#ff9d69",
    tags: ["ASP.NET Core", "Microservices", "Ocelot API Gateway", "Database-per-Service", "RabbitMQ", "Stripe & Iyzico", "SQL Server"],
  },
  {
    id: "ham-sandalye",
    title: "Ham Sandalye — Özel Varyant Motorlu E-Ticaret ve Dijital Mobilya Mağazası",
    client: "Ham Sandalye",
    year: "2023",
    category: "E-Commerce & Varyant Seçim Motoru",
    description:
      "Mobilya sektörünün karmaşık ürün varyasyonlarını (kumaş türü, ahşap cila rengi, ayak modeli, özel ölçü) dinamik olarak fiyata yansıtan akıllı varyant seçim motoru. Next.js ile Google aramalarında ilk sıraları hedefleyen üstün teknik SEO mimarisi, yüksek çözünürlüklü ürün sunumu ve 1 saniyenin altında sayfa açılış hızı. Güvenli online ödeme altyapısı ve kargo entegrasyonuyla uçtan uca çalışan modern e-ticaret deneyimi.",
    desktopImage: "/showcase/ham-sandalye-desktop.png",
    mobileImage: "/showcase/ham-sandalye-mobile.png",
    externalUrl: "https://hamsandalye.com/",
    accent: "#bef264",
    tags: ["Next.js", "Dinamik Varyant Motoru", "Teknik SEO Mimarisi", "Responsive UI", "PayTR / Sanal POS", "Görsel Optimizasyonu"],
  },
  {
    id: "servisciler",
    title: "Servisciler — Personel ve Okul Taşımacılığı Sektörel Araç Pazaryeri",
    client: "Servisciler",
    year: "2023",
    category: "Pazaryeri Platformu & İlan Yönetimi",
    description:
      "Personel ve okul servisi taşımacılığı sektöründeki plaka sahipleri, şoförler ve araç arayan kurumsal firmaları bir araya getiren iki taraflı dijital pazaryeri. Hat/rota ilanı oluşturma, plaka alım-satım ve kiralama modülleri, doğrulanan kullanıcılar arası anlık şifreli mesajlaşma. Lokasyon bazlı servis güzergah araması ve filtrelenebilir ilan yapısıyla sektörün dijital buluşma noktası.",
    desktopImage: "/showcase/servisciler-desktop.png",
    mobileImage: "/showcase/servisciler-mobile.png",
    externalUrl: "https://servisciler.com/",
    accent: "#ff645b",
    tags: ["İki Taraflı Pazaryeri", "React & Node.js", "Canlı Mesajlaşma Motoru", "Rota & Güzergah Arama", "Plaka İlan Sistemi", "Mobil Uyumlu UI"],
  },
  {
    id: "babayigit-yamen",
    title: "Babayiğit Yamen — Hukuk Bürosu Kurumsal Dijital Platformu ve İçerik Portalı",
    client: "Babayiğit Yamen",
    year: "2022",
    category: "Kurumsal CMS & Hukuk İçerik Platformu",
    description:
      "Hukuk profesyonelleri ve müvekkiller için geliştirilen kurumsal içerik ve dijital iletişim platformu. Güncel Yargıtay içtihatları, mevzuat bültenleri, hukuki makaleler ve sektörel analizlerin dinamik yayını. Google yerel arama motoru optimizasyonu (Local SEO), kurumsal kimliği yansıtan asil tipografi ve güvenli müvekkil ön başvuru formu ile kurumsal prestiji en üst düzeye çıkaran web mimarisi.",
    desktopImage: "/showcase/babayigit-yamen-desktop.png",
    mobileImage: "/showcase/babayigit-yamen-mobile.png",
    externalUrl: "https://babayigityamen.av.tr/",
    accent: "#5FCDFF",
    tags: ["Kurumsal Hukuk Portalı", "Next.js", "Hukuki İçerik CMS", "Local SEO & Optimizasyon", "Asil Tipografi", "Müvekkil Başvuru Sistemi"],
  },
  {
    id: "global-depo",
    title: "Global Depo — Çok Kanallı B2B Entegre Depo ve Sevkiyat Yönetim Platformu",
    client: "Global Depo",
    year: "2022",
    category: "B2B & Depo Operasyon Altyapısı",
    description:
      "Pazaryeri satışları (Trendyol, Hepsiburada, Amazon), kurumsal B2B toptan siparişler ve fiziki antrepo stok hareketlerini tek merkezden yöneten bulut depo sistemi. El terminalleriyle barkodlu mal kabul, çapraz sevkiyat (cross-docking), anlık koli/palet bazında stok takibi ve kargo API entegrasyonları. Depo içi raf doluluk oranları ve lojistik KPI metriklerini anlık sunan analitik yönetim ekranı.",
    desktopImage: "/showcase/global-depo-desktop.png",
    mobileImage: "/showcase/global-depo-mobile.png",
    externalUrl: "https://globaldepo.com/",
    accent: "#00F59B",
    tags: ["B2B Depo Omurgası", "Pazaryeri API Senkronu", "El Terminali Barkod", "Çapraz Sevkiyat (Cross-dock)", "Antrepo Takip", "SQL & Node.js"],
  },
  {
    id: "lexicallayer",
    title: "LexicalLayer — Real-Time Representation Engineering & LoRA Steering Ağ Geçidi",
    client: "LexicalLayer",
    year: "2026",
    category: "AI / Representation Engineering & Edge Gateway",
    description:
      "Büyük dil modellerindeki (LLM) sentetik slop, yapay klişeler ve kurumsal laf kalabalığını prompt mühendisliğiyle değil; kaynakta model ağırlıkları seviyesinde arındıran yeni nesil yapay zeka ağ geçidi. Rank-16 LoRA (.safetensors), residual activation steering ve pre-softmax logit warping algoritmalarıyla doğrudan model aktivasyonlarını yönlendirir. Cloudflare Pages ve Edge Workers üzerinde ultra düşük gecikmeyle (edge latency) çalışan ters vekil (reverse proxy) ve resmi npm SDK kütüphanesi.",
    desktopImage: "/showcase/lexicallayer-desktop.png",
    mobileImage: "/showcase/lexicallayer-mobile.png",
    externalUrl: "https://lexicallayer.muhammetatmaca.com.tr",
    accent: "#5FCDFF",
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Representation Engineering", "Rank-16 LoRA", "Residual Steering", "Cloudflare Pages"],
  },
];

export const ProjectsPage = () => {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  const scrollToProject = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-svh flex-col bg-white text-gray-950 font-sans selection:bg-black selection:text-white pt-20 sm:pt-24 pb-0 overflow-x-hidden">
      {/* TopoField Background Waves (Ana Sayfadaki Dalgalar) */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-45">
        <TopoField
          mode="light"
          speed={0.7}
          length={1.1}
          density={1}
          opacity={0.8}
          className="h-full w-full"
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0 opacity-[0.25] mix-blend-overlay" />

      {/* Supply Page ASCII Interactive Background */}
      <div className="pointer-events-none absolute right-0 top-0 left-0 z-0 overflow-hidden opacity-30">
        <AsciiLogo
          areaWidth="100%"
          areaHeight={620}
          fontSize={8}
          lineHeight={10}
          animationSpeed={80}
          logoNoiseIntensity={0.15}
          noiseMaxDensity={0.35}
          textColor="text-gray-900"
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 py-8 sm:py-10 mb-8 sm:mb-12">
        {/* Page Title */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#0284c7] mb-2 font-semibold">
            [ 01 · CANLI SİSTEM VİTRİNİ ]
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-950 leading-[1.05]">
            Üretim Seviyesinde Sistemler ve Referanslar<span className="text-[#0284c7]">.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
            Web, mobil, bulut ve kurumsal yönetim alanlarında uçtan uca geliştirdiğimiz canlı sistem mimarileri.
          </p>
        </div>

        {/* Project Selector Pills (Seçme Alanı - Sayfa Akışında) */}
        <div className="relative py-3 border-y border-gray-200 flex items-center gap-2 overflow-x-auto mb-12 no-scrollbar">
          {PROJECTS.map((project, idx) => {
            const isSelected = project.id === activeId;
            return (
              <button
                key={project.id}
                onClick={() => scrollToProject(project.id)}
                className={`cursor-pointer shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition ${
                  isSelected
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400 hover:text-black"
                }`}
              >
                <span className={`font-mono text-[11px] ${isSelected ? "text-white/70" : "text-gray-400"}`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{project.client}</span>
              </button>
            );
          })}
        </div>

        {/* All Projects Stream - Her biri büyük donanım vitrini olarak listelenir */}
        <div className="flex flex-col gap-14 sm:gap-20">
          {PROJECTS.map((project) => (
            <section
              key={project.id}
              id={project.id}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070709] p-5 sm:p-10 lg:p-12 xl:p-14 transition-all duration-300 hover:border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
            >
              {/* Subtle Color Aura */}
              <div
                className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[700px] rounded-full blur-[140px] opacity-25"
                style={{ backgroundColor: project.accent }}
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* Hardware Stage Frame */}
                <div className="relative flex w-full max-w-6xl xl:max-w-7xl flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 py-4">
                  {/* MacBook Pro Mockup */}
                  <div className="w-full lg:w-[82%] xl:w-[84%] transition-transform duration-500 hover:scale-[1.01]">
                    <MacbookPro
                      src={project.desktopImage}
                      className="h-auto w-full text-neutral-900 drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
                    />
                  </div>

                  {/* Overlapping iPhone 16 Pro Mockup */}
                  <div className="w-48 sm:w-56 lg:w-[22%] xl:w-[20%] lg:-ml-20 lg:mt-16 xl:mt-20 z-20 transition-transform duration-500 hover:-translate-y-2">
                    <Iphone16Pro
                      src={CUSTOM_MOBILE_MOCKUPS[project.id] ? undefined : project.mobileImage}
                      className="h-auto w-full text-neutral-900 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
                    >
                      {CUSTOM_MOBILE_MOCKUPS[project.id]}
                    </Iphone16Pro>
                  </div>
                </div>

                {/* Project Details Bar */}
                <div className="mt-8 w-full border-t border-white/10 pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
                      <span className="font-mono uppercase tracking-wider text-[#5FCDFF] font-semibold">
                        {project.client}
                      </span>
                      <span>•</span>
                      <span>{project.category}</span>
                      <span>•</span>
                      <span className="font-mono">{project.year}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#E1E0CC]/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#E1E0CC]/85 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.internalRoute && (
                        <Link
                          to={project.internalRoute}
                          className="inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] px-5 py-2.5 text-xs sm:text-sm font-medium text-black transition hover:bg-white shadow-sm"
                        >
                          Sayfayı İncele
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] px-5 py-2.5 text-xs sm:text-sm font-medium text-black transition hover:bg-white hover:scale-105 shadow-sm"
                        >
                          Canlı Siteyi Ziyaret Et
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Akan Telefon Mockupları Marquee */}
      <MobileAppsMarquee />

      {/* Sayfa Altı Footer */}
      <Footer outerBgClass="bg-white" />
    </div>
  );
};
