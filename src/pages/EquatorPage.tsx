import { useState } from "react";
import { Plus } from "lucide-react";
import TopoField from "../components/TopoField";
import TransparentBirdCanvas from "../components/canvas/TransparentBirdCanvas";
import TransparentCloudCanvas from "../components/canvas/TransparentCloudCanvas";
import { Footer } from "../components/layout/Footer";

const CAPABILITIES = [
  {
    title: "Mobil Uygulama Geliştirme (iOS & Android)",
    desc: "React Native ve Flutter ile 50+ yayında mobil uygulama tecrübesi. Sub-second açılış hızları, 60/120 FPS akıcı arayüzler ve App Store & Google Play standartları.",
  },
  {
    title: "Kurumsal Web Sistemleri & B2B Portalları",
    desc: "Next.js ve React tabanlı, yüksek trafiğe dayanıklı kurumsal portallar. Dağınık verileri tek ekranda toplayan yönetim panelleri ve bayi ağları.",
  },
  {
    title: "ERP & Mikroservis Entegrasyonları",
    desc: "Logo ERP, SAP ve özel muhasebe sistemleriyle çift yönlü anlık veri senkronizasyonu; stok, cari bakiye, dinamik iskonto ve sipariş otomasyonu.",
  },
  {
    title: "Arama Motoru & SEO Optimizasyonu",
    desc: "Sub-second TTFB, 0ms CLS ve Google Core Web Vitals 100/100 optimizasyonu. Yapay zeka arama motorları ve Google organik ilk sıra indeksleme altyapısı.",
  },
  {
    title: "Yapay Zeka & Derin Öğrenme (AR-GE)",
    desc: "YOLO ve ResNet tabanlı nesne tespiti, derin öğrenme modelleri ve LLM aracı katmanları (Reverse Proxy, LoRA Steering ve SDK entegrasyonları).",
  },
  {
    title: "Bulut Mimarisi & DevOps Süreçleri",
    desc: "Docker, Kubernetes ve CI/CD otomasyonları. Yüksek güvenlikli altyapı operasyonu, sıfır kesintili dağıtım ve gerçek zamanlı loglama.",
  },
  {
    title: "Canlı Analitik & Saha Operasyon Panelleri",
    desc: "Saha ekipleri için rota ve görev yönetimi, anlık hakediş hesaplama, SMS onay akışları ve yönetim kadrosu için finansal performans göstergeleri.",
  },
  {
    title: "Özel Yazılım Mimarisi & Danışmanlık",
    desc: "İhtiyaca özel uçtan uca dijital dönüşüm yol haritaları. Performans darboğazlarının analizi, refactoring ve modernizasyon rehberliği.",
  },
];

export const EquatorPage = () => {
  const [openCaps, setOpenCaps] = useState<Record<number, boolean>>({});

  const toggleCap = (idx: number) =>
    setOpenCaps((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 selection:bg-neutral-200 selection:text-black relative overflow-x-hidden font-sans">
      {/* Background TopoField Waves (Exact from Home Page, Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <TopoField
          mode="light"
          speed={0.8}
          length={1.2}
          density={1.1}
          opacity={0.8}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/80 pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section
        id="top"
        className="relative z-10 grid min-h-screen w-full grid-rows-[40px_1fr_auto] overflow-hidden p-5 pt-24 sm:pt-28 md:p-[50px] md:pt-32"
      >
        <div />
        <div className="relative z-10 flex items-center">
          <h1 className="text-[3.25rem] md:text-[6.5rem] font-medium leading-[0.94] tracking-[-0.05em] text-neutral-950">
            Geleceğin
            <br />
            Yazılım
            <br />
            Mimarisi
          </h1>
        </div>
        <div className="relative z-10 grid grid-cols-[20px_1fr] gap-2 pb-4">
          <div className="mt-1 size-5 rounded-full bg-neutral-950" />
          <span className="max-w-[630px] text-[1.3125rem] md:text-[1.5rem] leading-[1.2] tracking-[-0.03em] text-neutral-700 text-balance">
            Ölçeklenebilir, yüksek performanslı ve kalıcı dijital çözümler: Kurumsal platformlar,
            mobil ekosistemler ve yapay zeka entegrasyonlarıyla işinizi geleceğe taşıyoruz.
          </span>
        </div>

        {/* Real Transparent WebGL Bird Layer: Zero borders, 100% transparent alpha so TopoField waves show directly through */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[calc(100%-40px)] -translate-x-1/2 aspect-[150/85]">
          <TransparentBirdCanvas className="h-full w-full object-contain object-bottom" />
        </div>
      </section>

      {/* Story Section */}
      <section id="our-story" className="relative z-10 px-5 py-20 md:px-[50px] md:py-[180px]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8 md:gap-[50px] text-[2.25rem] md:text-[4.5rem] leading-[1.1] tracking-[-0.04em] text-neutral-950 text-balance">
          <p>
            Farklı disiplinlerde uzmanlaşmış, aynı mühendislik tutkusu ve tavizsiz kalite anlayışını
            paylaşan bir vizyondan doğdu.
          </p>

          <p>Ortaya çıkan şey sıradan bir yazılım firması değil; farklı bir yaklaşım.</p>
          <p className="md:ml-[160px] text-neutral-700">
            Uçtan uca mobil uygulamalar, yüksek hacimli kurumsal sistemler ve modern web mimarileri sunmak için tasarlandı.
          </p>
          <p>Dijital dönüşümde taviz vermeyen kurumlar için güvenilir bir teknoloji ortağı.</p>
          <p className="md:ml-[160px]">
            Ve şimdi buradayız: <span className="font-semibold text-neutral-950">Virelonsoft</span>
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section
        id="capabilities"
        className="relative z-10 flex flex-col gap-8 md:gap-10 px-5 py-16 md:px-[50px] md:py-[130px] border-t border-neutral-200"
      >
        <h2 className="max-w-[700px] text-[2.25rem] md:text-[4.5rem] font-medium leading-[1.1] tracking-[-0.04em] text-neutral-950 text-balance">
          Dijital dönüşümde güvenilir teknoloji ortağınız
        </h2>
        <p className="max-w-[570px] text-[1.3125rem] md:text-[1.5rem] leading-[1.2] tracking-[-0.03em] text-neutral-600">
          Geniş teknoloji yelpazemiz ve mühendislik tecrübemizle kurumunuz için yüksek etkili,
          sürdürülebilir ve performans odaklı dijital sistemler tasarlıyor ve hayata geçiriyoruz.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {CAPABILITIES.map((cap, idx) => {
            const isOpen = !!openCaps[idx];
            return (
              <div
                key={cap.title}
                onClick={() => toggleCap(idx)}
                className={`group relative cursor-pointer overflow-hidden rounded-[8px] transition-all duration-200 ${
                  isOpen
                    ? "bg-neutral-950 text-white shadow-xl"
                    : "bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-neutral-400 text-neutral-900 shadow-sm"
                } min-h-[96px] md:min-h-[120px] flex flex-col justify-between`}
              >
                <div className="p-4 md:p-5">
                  <h3 className="max-w-[400px] text-[1.5rem] md:text-[2.25rem] font-medium leading-[1.1] tracking-[-0.02em] text-balance">
                    {cap.title}
                  </h3>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 pr-16 md:px-5 md:pb-5 md:pr-[170px] text-[1rem] md:text-[1.25rem] leading-[1.3] tracking-[-0.02em] text-neutral-300">
                    <p>{cap.desc}</p>
                  </div>
                )}

                {/* Minimalist Monochrome Plus Pill */}
                <div
                  className={`pointer-events-none absolute bottom-0 right-2.5 md:right-2.5 flex h-[36px] w-[72px] md:h-[60px] md:w-[120px] items-center justify-center rounded-t-full transition-transform duration-200 ${
                    isOpen
                      ? "bg-neutral-800 text-white translate-y-0"
                      : "bg-neutral-950 text-white translate-y-0 md:translate-y-full md:group-hover:translate-y-0"
                  }`}
                >
                  <Plus
                    className={`size-5 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animated Cloud Section: Native WebGL Transparent Alpha so waves show cleanly behind it */}
      <section className="relative z-10 flex h-[70svh] md:h-[85svh] w-full flex-col items-center justify-center gap-8 md:gap-10 overflow-hidden bg-transparent p-5 md:p-[50px] border-t border-neutral-200">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1100px] max-w-full -translate-x-1/2 -translate-y-1/2">
          <TransparentCloudCanvas className="h-full w-full object-contain" />
        </div>

        <h2 className="relative z-20 max-w-[800px] text-center text-[2.5rem] md:text-[4.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-neutral-950 text-balance">
          Dijital Dönüşümü Birlikte İnşa Edelim
        </h2>

        <div className="relative z-20 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://wa.me/905070084069"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 px-6 font-medium text-white transition-colors rounded-[6px] shadow-sm text-sm sm:text-base"
          >
            WhatsApp ile İletişime Geçin
          </a>
          <a
            href="https://www.linkedin.com/in/muhammet-atmaca-857481252/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 bg-white hover:bg-neutral-100 border border-neutral-300 px-6 font-medium text-neutral-900 transition-colors rounded-[6px] text-sm sm:text-base shadow-xs"
          >
            LinkedIn'de Takip Edin
          </a>
        </div>
      </section>

      {/* Real Virelonsoft Site Footer */}
      <Footer outerBgClass="bg-transparent pt-6 pb-10 relative z-10" />
    </div>
  );
};

export default EquatorPage;
