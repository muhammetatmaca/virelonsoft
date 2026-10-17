import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppNavbar } from "./components/AppNavbar";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";

// Code splitting / Dynamic lazy loading for all pages to maximize performance
const PrismaHero = lazy(() =>
  import("./components/PrismaHero").then((m) => ({ default: m.PrismaHero }))
);
const FrontendSupplyPage = lazy(() =>
  import("./pages/FrontendSupplyPage").then((m) => ({ default: m.FrontendSupplyPage }))
);
const EquatorPage = lazy(() =>
  import("./pages/EquatorPage").then((m) => ({ default: m.EquatorPage }))
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
);
const TicketPage = lazy(() =>
  import("./pages/TicketPage").then((m) => ({ default: m.TicketPage }))
);
const AiSearchPage = lazy(() =>
  import("./pages/AiSearchPage").then((m) => ({ default: m.AiSearchPage }))
);

/**
 * Minimalist, dark-mode branded page transition loader
 */
function PageLoader() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-3 text-[#E1E0CC]">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute h-full w-full rounded-full border-2 border-[#E1E0CC]/15 border-t-[#5FCDFF] animate-spin" />
        <img
          src="/virelon-v-icon.png"
          alt="V"
          className="w-4 h-4 object-contain opacity-85"
        />
      </div>
      <span className="text-[11px] uppercase tracking-widest text-[#E1E0CC]/50 font-mono">
        Virelonsoft
      </span>
    </div>
  );
}

const ROUTE_TITLES: Record<string, string> = {
  "/": "Virelonsoft — Kurumsal Yazılım, Mobil & Sistem Mimarisi",
  "/projects": "Projelerimiz — Virelonsoft",
  "/projelerimiz": "Projelerimiz — Virelonsoft",
  "/supply": "Hizmetlerimiz — Virelonsoft",
  "/hizmetlerimiz": "Hizmetlerimiz — Virelonsoft",
  "/ai": "SEO Optimizasyonu — Virelonsoft",
  "/equator": "Hakkımızda & Vizyon — Virelonsoft",
  "/hakkimizda": "Hakkımızda & Vizyon — Virelonsoft",
  "/tickets": "Teklif Alın — Virelonsoft",
  "/teklif": "Teklif Alın — Virelonsoft",
  "/teklif-al": "Teklif Alın — Virelonsoft",
};

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/": "Ölçeklenebilir mikroservisler, yüksek performanslı mobil uygulamalar (React Native, iOS & Android), B2B bayi portalları, Logo ERP entegrasyonu ve teknik SEO mimarileri geliştiren bağımsız yazılım stüdyosu.",
  "/projects": "Virelonsoft tarafından geliştirilen üretim seviyesi projeler: Logo ERP B2B Bayi Portalı, Teleflow AI Teleprompter ve mobil uygulamalar.",
  "/projelerimiz": "Virelonsoft tarafından geliştirilen üretim seviyesi projeler: Logo ERP B2B Bayi Portalı, Teleflow AI Teleprompter ve mobil uygulamalar.",
  "/supply": "Kurumsal yazılım hizmetleri: Modern frontend mühendisliği, React Native mobil sistemler, mikroservis backend mimarisi ve bulut sistemleri.",
  "/hizmetlerimiz": "Kurumsal yazılım hizmetleri: Modern frontend mühendisliği, React Native mobil sistemler, mikroservis backend mimarisi ve bulut sistemleri.",
  "/ai": "Yapay zeka arama motorları (GEO/LLMO) ve Core Web Vitals için tasarlanmış yüksek performanslı teknik SEO altyapısı.",
  "/equator": "Virelonsoft stüdyo manifestosu, vizyon, teknik felsefe ve kurucu mimar Muhammet Atmaca hakkında bilgiler.",
  "/hakkimizda": "Virelonsoft stüdyo manifestosu, vizyon, teknik felsefe ve kurucu mimar Muhammet Atmaca hakkında bilgiler.",
  "/tickets": "Yeni bir dijital ürün veya kurumsal sistem projesi başlatmak için şeffaf teknik analiz ve teklif bilet formu.",
  "/teklif": "Yeni bir dijital ürün veya kurumsal sistem projesi başlatmak için şeffaf teknik analiz ve teklif bilet formu.",
  "/teklif-al": "Yeni bir dijital ürün veya kurumsal sistem projesi başlatmak için şeffaf teknik analiz ve teklif bilet formu.",
};

/**
 * Automatically scrolls window to top and dynamically updates SEO tags on route transitions
 */
function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const title = ROUTE_TITLES[pathname] || "Virelonsoft — Kurumsal Yazılım & Sistem Mimarisi";
    document.title = title;

    // Update canonical link
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const cleanPath = pathname === "/" ? "" : pathname;
    canonical.href = `https://virelonsoft.muhammetatmaca.com.tr${cleanPath}`;

    // Update meta description
    const desc = ROUTE_DESCRIPTIONS[pathname] || ROUTE_DESCRIPTIONS["/"];
    let metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) {
      metaDesc.content = desc;
    }
    let ogDesc = document.querySelector<HTMLMetaElement>("meta[property='og:description']");
    if (ogDesc) {
      ogDesc.content = desc;
    }
    let ogUrl = document.querySelector<HTMLMetaElement>("meta[property='og:url']");
    if (ogUrl) {
      ogUrl.content = canonical.href;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteWatcher />
      <AppNavbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<PrismaHero />} />
          <Route path="/lab" element={<Navigate to="/tickets" replace />} />
          <Route path="/supply" element={<FrontendSupplyPage />} />
          <Route path="/hizmetlerimiz" element={<FrontendSupplyPage />} />
          <Route path="/equator" element={<EquatorPage />} />
          <Route path="/hakkimizda" element={<EquatorPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projelerimiz" element={<ProjectsPage />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/teklif" element={<TicketPage />} />
          <Route path="/teklif-al" element={<TicketPage />} />
          <Route path="/ai" element={<AiSearchPage />} />
          <Route path="/spline" element={<Navigate to="/" replace />} />
          <Route path="/miranda" element={<Navigate to="/projects" replace />} />
          <Route path="/portfolyo" element={<Navigate to="/projects" replace />} />
        </Routes>
      </Suspense>
      <WhatsAppFloatingButton phone="905070084069" />
    </BrowserRouter>
  );
}
