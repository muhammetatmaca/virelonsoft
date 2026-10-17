import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Star,
  MoreVertical,
  Plus,
  X,
  Mic,
  Camera,
  Share2,
} from "lucide-react";
import EnergyRing from "../components/originkit/ui/energy-ring";
import TopoField from "../components/TopoField";
import { AiStatus, type AiStatusState } from "../components/ui/ai-status";
import {
  WebSearch,
  WebSearchCitation,
  type WebSource,
  type WebSearchStatus,
} from "../components/ui/web-search";
import { Footer } from "../components/layout/Footer";

interface SerpMockData {
  searchQuery: string;
  displayUrl: string;
  title: string;
  snippet: string;
  rating: number;
  reviewCount: number;
  ctr: string;
  sitelinks: { title: string; desc: string }[];
  aiOverview?: string;
  competitor: {
    displayUrl: string;
    title: string;
    snippet: string;
  };
}

interface ResearchPreset {
  id: string;
  title: string;
  query: string;
  sources: WebSource[];
  rimColor: string;
  baseColor: string;
  serpData: SerpMockData;
  renderAnswer: (sources: WebSource[]) => ReactNode;
}

const RESEARCH_PRESETS: ResearchPreset[] = [
  {
    id: "ecommerce-boutique",
    title: "Google #1. Sıra — E-Ticaret & Online Butik Mağazası",
    query: "kadın giyim & özel tasarım butik online alışveriş",
    rimColor: "#10B981",
    baseColor: "#047857",
    serpData: {
      searchQuery: "kadın giyim & özel tasarım butik online alışveriş",
      displayUrl: "https://lumina-boutique.com › kadin-butik",
      title: "Özel Tasarım Kadın Giyim & Yeni Sezon Butik Alışveriş | Lumina",
      snippet:
        "2026 İlkbahar & Yaz yeni sezon koleksiyonu. Aynı gün ücretsiz kargo, 1 saniyede tek tıkla Apple Pay & Kartla güvenli ödeme. Google'da 1. sırada yer alan en hızlı headless kadın giyim mağazası.",
      rating: 4.9,
      reviewCount: 2840,
      ctr: "%43.2 Organik Tıklama",
      aiOverview:
        "Lumina Boutique; özel tasarım kadın giyim, keten elbiseler ve abiye modellerinde 280ms sayfa yükleme hızı, zengin ürün şemaları (Product Schema - Fiyat, Beden, Stok) ve yüksek müşteri puanıyla Google arama sonuçlarında 1. sırada listelenen lider kadın giyim e-ticaret mağazasıdır.",
      sitelinks: [
        { title: "Yeni Sezon Elbiseler", desc: "Özel dikim abiye, keten ve günlük modeller" },
        { title: "Takım & Ceket Koleksiyonu", desc: "Ofis ve sokak stili kadın takım kombinleri" },
        { title: "Aynı Gün Ücretsiz Kargo", desc: "15:00'e kadar verilen tüm siparişlerde hızlı teslimat" },
        { title: "İndirimli Fırsat Ürünleri", desc: "Sezon sonu sepette %40 ek indirim fırsatları" },
      ],
      competitor: {
        displayUrl: "https://klasik-giyim-pazaryeri.com › kadin",
        title: "Kadın Giyim Ürünleri ve Çeşitleri | Klasik Mağaza",
        snippet: "Yavaş açılan ürün sayfaları, stok güncellemesi geciken eski nesil e-ticaret sitesi. Sepet yükleme süresi 4 saniye üzerinde kalan geleneksel altyapı...",
      },
    },
    sources: [
      {
        id: "src-merchant-center",
        title: "Google Merchant Center — Zengin Ürün Snippet'ı (Fiyat & Stok)",
        url: "https://merchants.google.com/",
        snippet:
          "Ürün fiyatı (₺890), beden varyantları (XS-L) ve anlık canlı stok durumu Google Arama Sonuçlarında doğrudan yeşil olarak onaylandı.",
        favicon: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
      },
      {
        id: "src-google-search",
        title: "Google Search Central — E-Ticaret SERP & Kategori Hiyerarşisi",
        url: "https://developers.google.com/search/docs/specialty/ecommerce",
        snippet:
          "'Kadın giyim online alışveriş' ve 'özel tasarım butik' aramalarında site sıralaması 19. pozisyondan 1. sıraya yükseldi.",
        favicon: "https://www.google.com/s2/favicons?domain=google.com&sz=64",
      },
      {
        id: "src-headless-telemetry",
        title: "Headless Commerce & Edge Checkout Telemetrisi",
        url: "https://shopify.dev/docs/storefronts/headless",
        snippet:
          "0.28 saniyelik anında ürün filtreleme ve mobil tek tıkla checkout ile dönüşüm oranı (CR) sektör ortalamasının 3.8 katına çıktı.",
        favicon: "https://www.google.com/s2/favicons?domain=shopify.com&sz=64",
      },
      {
        id: "src-pagespeed",
        title: "Google PageSpeed Insights — Mobil E-Ticaret Deneyimi (CrUX)",
        url: "https://pagespeed.web.dev/",
        snippet:
          "Mobil LCP 280ms, Core Web Vitals 100/100 yeşil bant. Sepeti terk etme oranında %38 dramatik düşüş tescillendi.",
        favicon: "https://www.google.com/s2/favicons?domain=web.dev&sz=64",
      },
    ],
    renderAnswer: (sources) => (
      <>
        <p>
          Geliştirilen yüksek hızlı headless e-ticaret altyapısı ve{" "}
          <strong>Product Schema (Fiyat, Beden, Stok)</strong> zengin veri katmanı sayesinde mağazanız hedef anahtar kelimelerde{" "}
          <strong>Google Arama Sonuçlarında 1. Sıraya</strong> yerleşti{" "}
          <WebSearchCitation index={1} source={sources[0]} />. Müşteriler Google'da arama yaptığı anda ürünün fiyatını, kullanıcı puanını (
          <strong>★★★★★ 4.9</strong>) ve stok durumunu doğrudan SERP üzerinde görerek rakipleri atlayıp sitenize girmektedir{" "}
          <WebSearchCitation index={2} source={sources[1]} />{" "}
          <WebSearchCitation index={3} source={sources[2]} />.
        </p>
        <p>
          Mobil cihazlarda <strong>280ms LCP ve 0ms CLS</strong> ile açılan ürün sayfaları sayesinde Google'ın Core Web Vitals denetiminden 100/100 tam puan alındı; sepeti terk etme oranı minimize edilerek organik satış dönüşümü zirveye taşındı{" "}
          <WebSearchCitation index={4} source={sources[3]} />.
        </p>
      </>
    ),
  },
];

export function AiSearchPage() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const preset = RESEARCH_PRESETS[selectedPresetIdx];

  const [aiState, setAiState] = useState<AiStatusState>("researching");
  const [searchStatus, setSearchStatus] = useState<WebSearchStatus>("searching");
  const [visibleSourcesCount, setVisibleSourcesCount] = useState(2);
  const [runKey, setRunKey] = useState(0);
  const [autoSimulating, setAutoSimulating] = useState(true);

  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const triggerPipeline = (presetIndex = selectedPresetIdx) => {
    clearTimers();
    const targetPreset = RESEARCH_PRESETS[presetIndex];
    setAutoSimulating(true);
    setRunKey((k) => k + 1);
    setAiState("thinking");
    setSearchStatus("searching");
    setVisibleSourcesCount(1);

    timersRef.current.push(
      window.setTimeout(() => {
        setAiState("researching");
        setVisibleSourcesCount(Math.min(2, targetPreset.sources.length));
      }, 1000),
      window.setTimeout(() => {
        setVisibleSourcesCount(Math.min(3, targetPreset.sources.length));
      }, 1900),
      window.setTimeout(() => {
        setAiState("analyzing");
        setVisibleSourcesCount(targetPreset.sources.length);
      }, 2900),
      window.setTimeout(() => {
        setAiState("writing");
        setSearchStatus("done");
      }, 4000),
      window.setTimeout(() => {
        setAiState("done");
        setAutoSimulating(false);
      }, 6200)
    );
  };

  useEffect(() => {
    triggerPipeline(0);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    triggerPipeline(idx);
  };

  const activeSources = preset.sources.slice(0, visibleSourcesCount);
  const currentSource = activeSources[activeSources.length - 1] ?? preset.sources[0];
  const statusDetail =
    aiState === "researching"
      ? currentSource.title
      : aiState === "analyzing"
        ? `${activeSources.length} SEO sinyali doğrulandı`
        : undefined;

  const isFinished = aiState === "done" || aiState === "writing";

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 selection:bg-neutral-200 selection:text-black relative overflow-x-hidden">
      {/* Background TopoField Waves (Exact from Home Page, Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <TopoField
          mode="light"
          speed={0.8}
          length={1.2}
          density={1.1}
          opacity={0.65}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 pb-16">
        <main className="mx-auto max-w-7xl px-4 py-4 sm:px-8">
          {/* Main Layout: Left Sleek Core & Sources + Right REAL GOOGLE CHROME BROWSER WINDOW */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Energy Ring Core & Taranan Kaynaklar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* High-Contrast Obsidian Lens for Energy Ring Core */}
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#05070B] border border-neutral-200/90 shadow-xl flex items-center justify-center">
                <EnergyRing
                  speed={isFinished ? 50 : 130}
                  particleSpeed={isFinished ? 30 : 80}
                  ringSize={76}
                  density={5500}
                  crackle={isFinished ? 35 : 85}
                  rimColor={preset.rimColor}
                  baseColor={preset.baseColor}
                  background="#05070B"
                  hoverEnabled={true}
                  hoverIntensity={100}
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              {/* Taranan Kaynaklar ve Sinyal Doğrulama */}
              <div className="rounded-2xl border border-neutral-200/90 bg-white/90 backdrop-blur-md p-4 shadow-sm space-y-4 text-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200/90 pb-3">
                  <AiStatus
                    key={`card-status-${runKey}`}
                    state={aiState}
                    detail={statusDetail}
                    favicon={aiState === "researching" ? currentSource.favicon : undefined}
                    timer={true}
                  />
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                    {activeSources.length} / {preset.sources.length} Kaynak
                  </span>
                </div>

                {/* WebSearch Component */}
                <WebSearch
                  key={`websearch-${preset.id}-${runKey}`}
                  query={preset.query}
                  sources={activeSources}
                  status={searchStatus}
                  defaultOpen={true}
                  className="w-full"
                />

                {/* Sentezlenen Yanıt */}
                <div className="pt-2 border-t border-neutral-200/90 text-xs text-neutral-600 leading-relaxed">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                    Algoritmik Rapor
                  </div>
                  {preset.renderAnswer(preset.sources)}
                </div>
              </div>
            </div>

            {/* Right Column: GERÇEK GOOGLE CHROME BROWSER WINDOW */}
            <div className="lg:col-span-8 flex flex-col gap-3.5">
              {/* Tarayıcının Üst Kısmında Ne Yaptığımızı Anlatan Açıklama (Kartsız, Badgesiz, Virelonsoft Fontu & Ağırlığında) */}
              <div className="space-y-2 pb-2">
                <h1 className="text-3xl sm:text-5xl lg:text-[44px] font-medium tracking-[-0.07em] text-neutral-900 leading-[0.95]">
                  E-Ticaret Mağazanızı Google'da{" "}
                  <span className="text-emerald-600">
                    1. Sıraya
                  </span>{" "}
                  Nasıl Taşıyoruz?
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl font-normal tracking-tight">
                  Geliştirdiğimiz headless e-ticaret altyapısı; ürün fiyatlarını, beden varyantlarını ve anlık stok durumunu{" "}
                  <strong className="text-neutral-900 font-medium">Product Schema</strong> ile Googlebot'a doğrudan tanıtır.{" "}
                  <strong className="text-emerald-700 font-medium">280ms mobil sayfa hızı</strong> ve sıfır düzen kayması (0.000 CLS) sayesinde mağazanız hedef aramalarda reklam bütçesine ihtiyaç duymadan 1. sıraya yerleşir; zengin alt bağlantılar (sitelinks) ve yıldız değerlendirmeleriyle en yüksek organik tıklama oranını yakalar.
                </p>
              </div>

              {/* Chrome Browser Window Container */}
              <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-[#202124] shadow-2xl">
                {/* 1. Chrome Tab Bar */}
                <div className="flex items-center justify-between bg-[#1f1f23] px-3 pt-2 pb-0 border-b border-black/40 select-none">
                  <div className="flex items-center gap-1 max-w-[80%]">
                    {/* Active Google Tab */}
                    <div className="group flex min-w-0 items-center gap-2 rounded-t-xl bg-[#202124] px-3.5 py-2 text-xs font-medium text-neutral-200 border-t border-x border-neutral-700/60 shadow-sm max-w-[280px]">
                      {/* Google Favicon */}
                      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span className="truncate text-[11px] font-sans text-neutral-300 min-w-0">
                        {preset.query} - Google'da Ara
                      </span>
                      <X className="h-3 w-3 text-neutral-400 opacity-60 group-hover:opacity-100 cursor-pointer ml-auto shrink-0" />
                    </div>

                    {/* New Tab Button */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white cursor-pointer transition">
                      <Plus className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Window Controls (Mac / Chrome Style) */}
                  <div className="flex items-center gap-2 pr-2 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e] inline-block" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24] inline-block" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29] inline-block" />
                  </div>
                </div>

                {/* 2. Chrome Omnibox Bar */}
                <div className="flex items-center gap-2 bg-[#202124] px-3 py-2 border-b border-black/30">
                  <div className="flex items-center gap-1 text-neutral-400 shrink-0">
                    <ChevronLeft className="h-4 w-4 cursor-pointer hover:text-white" />
                    <ChevronRight className="h-4 w-4 opacity-40" />
                    <button
                      type="button"
                      onClick={() => triggerPipeline(0)}
                      title="Google Aramasını Yeniden Yükle"
                      className="p-0.5 hover:text-white transition active:rotate-180 cursor-pointer"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* URL Address Bar */}
                  <div className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-[#292a2d] px-3.5 py-1.5 text-xs text-neutral-300 border border-neutral-700/60 focus-within:border-blue-500">
                    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden mr-2">
                      <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
                      <span className="text-neutral-400 text-[11px] font-mono shrink-0">https://</span>
                      <span className="text-white text-[11px] font-sans truncate min-w-0">
                        www.google.com/search?q={preset.query.replace(/&/g, "%26").replace(/\s+/g, "+")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 shrink-0">
                      <Star className="h-3.5 w-3.5 hover:text-amber-400 cursor-pointer" />
                      <Share2 className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400 pl-1 shrink-0">
                    <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                      L
                    </div>
                    <MoreVertical className="h-4 w-4 cursor-pointer hover:text-white" />
                  </div>
                </div>

                {/* 3. Google SERP Web Viewport */}
                <div className="bg-[#202124] p-4 sm:p-6 text-[#bdc1c6] font-sans min-h-[560px]">
                  {/* Google Search Bar Header inside Webpage */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3c4043] pb-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Authentic Google Multi-Color Text Logo */}
                      <span className="text-2xl font-bold tracking-tight select-none">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </span>

                      {/* Google Search Input Pill */}
                      <div className="flex flex-1 items-center justify-between rounded-full bg-[#303134] px-4 py-2 border border-transparent hover:border-[#5f6368] focus-within:border-transparent focus-within:shadow-[0_1px_6px_rgba(0,0,0,0.4)] max-w-xl">
                        <span className="text-xs text-white truncate font-sans">
                          {preset.query}
                        </span>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Mic className="h-3.5 w-3.5 text-[#4285F4] cursor-pointer" />
                          <Camera className="h-3.5 w-3.5 text-[#4285F4] cursor-pointer" />
                          <Search className="h-3.5 w-3.5 text-[#8ab4f8] cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Google Search Tabs (Tümü, Görseller, Videolar...) */}
                  <div className="flex items-center gap-5 text-xs text-[#969ba1] border-b border-[#3c4043] pt-3 pb-2.5 px-1 font-medium">
                    <span className="flex items-center gap-1 text-[#8ab4f8] border-b-2 border-[#8ab4f8] pb-2 cursor-pointer font-semibold">
                      Tümü
                    </span>
                    <span className="cursor-pointer hover:text-white">Görseller</span>
                    <span className="cursor-pointer hover:text-white">Videolar</span>
                    <span className="cursor-pointer hover:text-white">Haberler</span>
                    <span className="cursor-pointer hover:text-white">Haritalar</span>
                    <span className="cursor-pointer hover:text-white hidden sm:inline">Daha Fazla</span>
                    <span className="ml-auto text-neutral-500 text-[11px] font-normal cursor-pointer hover:text-neutral-300">
                      Araçlar
                    </span>
                  </div>

                  {/* Search Stat info */}
                  <div className="py-2.5 text-[11px] text-[#9aa0a6]">
                    Yaklaşık 142.000 sonuç bulundu (0,21 saniye)
                  </div>

                  {/* Loading / Searching Shimmer effect if in thinking/researching */}
                  {!isFinished && (
                    <div className="py-8 space-y-4 animate-pulse">
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Googlebot dizini taranıyor ve EEAT sinyalleri işleniyor...</span>
                      </div>
                      <div className="h-4 w-48 rounded bg-neutral-700/60" />
                      <div className="h-6 w-3/4 rounded bg-neutral-700/60" />
                      <div className="h-12 w-full rounded bg-neutral-700/40" />
                    </div>
                  )}

                  {/* Real Search Results Content when ready */}
                  {isFinished && (
                    <div className="space-y-6 pt-1">
                      {/* #1 ORGANİK ARAMA SONUCU: LUMINA BOUTIQUE E-TİCARET */}
                      <div className="space-y-2">
                        {/* URL + Favicon + 3 Dots */}
                        <div className="flex items-center gap-2.5">
                          <div className="h-6 w-6 rounded-full bg-[#171717] border border-white/10 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
                            L
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-white flex items-center gap-1.5">
                              Lumina Boutique
                              <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.2 border border-emerald-500/30">
                                1. SIRA
                              </span>
                            </span>
                            <span className="text-[11px] text-[#bdc1c6] font-sans">
                              {preset.serpData.displayUrl}
                            </span>
                          </div>
                          <MoreVertical className="h-3.5 w-3.5 text-neutral-500 ml-auto cursor-pointer" />
                        </div>

                        {/* Title link (Google Blue #8ab4f8) */}
                        <h2 className="text-lg sm:text-xl font-normal text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                          {preset.serpData.title}
                        </h2>

                        {/* Star Rating & Review Meta */}
                        <div className="flex items-center gap-2 text-xs text-[#9aa0a6]">
                          <div className="flex text-[#fbbc04]">★★★★★</div>
                          <span className="font-semibold text-white">{preset.serpData.rating}</span>
                          <span>({preset.serpData.reviewCount})</span>
                          <span>·</span>
                          <span className="text-emerald-400 font-medium">{preset.serpData.ctr}</span>
                          <span>·</span>
                          <span>100/100 Core Web Vitals</span>
                        </div>

                        {/* Snippet Description */}
                        <p className="text-xs sm:text-[13px] text-[#bdc1c6] leading-relaxed max-w-3xl">
                          {preset.serpData.snippet}
                        </p>

                        {/* Google Sitelinks (2x2 Grid) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pl-2 border-l-2 border-neutral-700/60">
                          {preset.serpData.sitelinks.map((link, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <a
                                href="#sitelink"
                                onClick={(e) => e.preventDefault()}
                                className="text-xs font-medium text-[#8ab4f8] hover:underline cursor-pointer block"
                              >
                                {link.title}
                              </a>
                              <p className="text-[11px] text-[#9aa0a6] line-clamp-1">
                                {link.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* #2 ORGANİK ARAMA SONUCU: GELENEKSEL RAKİP (Rakiplerin geride kaldığını hissettiren kart) */}
                      <div className="pt-4 border-t border-[#3c4043] space-y-1.5 opacity-60 hover:opacity-100 transition">
                        <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                          <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center text-[9px] font-bold text-neutral-300">
                            R
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-neutral-300">Rakip Çözüm</span>
                            <span className="text-[11px] text-neutral-500 font-sans">
                              {preset.serpData.competitor.displayUrl}
                            </span>
                          </div>
                          <span className="ml-auto text-[10px] text-neutral-500">2. Sıra</span>
                        </div>

                        <h3 className="text-base text-[#8ab4f8] hover:underline cursor-pointer">
                          {preset.serpData.competitor.title}
                        </h3>

                        <p className="text-xs text-[#9aa0a6] leading-relaxed">
                          {preset.serpData.competitor.snippet}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer outerBgClass="bg-transparent pt-6 pb-10 relative z-10" />
    </div>
  );
}

export default AiSearchPage;
