import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Layers,
  Building2,
  Package,
  ShoppingCart,
  Bot,
  Server,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  Boxes,
  Database,
  SlidersHorizontal,
} from "lucide-react";
import { asciiLogoData } from "../data/asciiLogoData";
import TopoField from "../components/TopoField";
import { Footer } from "../components/layout/Footer";

/* ---------------- Interactive Star Logo ---------------- */
const RAYS = [
  { angle8: 0, angle6: 0, angle4: 0, collapse6: false, collapse4: false },
  { angle8: 22.5, angle6: 22.5, angle4: 22.5, collapse6: true, collapse4: true },
  { angle8: 45, angle6: 30, angle4: 45, collapse6: false, collapse4: false },
  { angle8: 67.5, angle6: 60, angle4: 67.5, collapse6: false, collapse4: true },
  { angle8: 90, angle6: 90, angle4: 90, collapse6: false, collapse4: false },
  { angle8: 112.5, angle6: 112.5, angle4: 112.5, collapse6: true, collapse4: true },
  { angle8: 135, angle6: 120, angle4: 135, collapse6: false, collapse4: false },
  { angle8: 157.5, angle6: 150, angle4: 157.5, collapse6: false, collapse4: true },
];

const LOGO_STATES: {
  rayMode: number;
  circleR: number;
  circleStrokeWidth: number;
  collapseAll?: boolean;
}[] = [
  { rayMode: 8, circleR: 9, circleStrokeWidth: 2 },
  { rayMode: 4, circleR: 4, circleStrokeWidth: 2 },
  { rayMode: 6, circleR: 7, circleStrokeWidth: 2 },
  { rayMode: 8, circleR: 13, circleStrokeWidth: 3, collapseAll: true },
];

const SPRING_TRANSITION = { duration: 0.85, type: "spring" as const, bounce: 0.2 };
const INITIAL_TRANSITION = { duration: 1, ease: [0.16, 1, 0.3, 1] as const };

const InteractiveStarLogo = () => {
  const [hovered, setHovered] = useState(false);
  const [modeIdx, setModeIdx] = useState(0);
  const [rotation, setRotation] = useState(90);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0.03 * RAYS.length * 1000 + 800);
    return () => clearTimeout(timer);
  }, []);

  const currentMode = LOGO_STATES[modeIdx];

  const stepLogo = useCallback(() => {
    setModeIdx((i) => (i + 1) % LOGO_STATES.length);
    setRotation((r) => r + (Math.random() > 0.5 ? 90 : -90));
  }, []);

  useEffect(() => {
    if (hovered) {
      stepLogo();
      const id = setInterval(stepLogo, 1000);
      return () => clearInterval(id);
    } else {
      const id = setTimeout(() => {
        setModeIdx(0);
        setRotation(90);
      }, 1500);
      return () => clearTimeout(id);
    }
  }, [hovered, stepLogo]);

  return (
    <div
      className="size-12 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: 0 }}
        animate={{ rotate: rotation }}
        transition={mounted ? SPRING_TRANSITION : INITIAL_TRANSITION}
        style={{ transformOrigin: "center center", transformBox: "fill-box" }}
        className="size-12"
      >
        {RAYS.map((ray, idx) => {
          const angle =
            currentMode.rayMode === 4
              ? ray.angle4
              : currentMode.rayMode === 6
              ? ray.angle6
              : ray.angle8;
          const collapsed =
            currentMode.collapseAll ||
            (currentMode.rayMode === 6 && ray.collapse6) ||
            (currentMode.rayMode === 4 && ray.collapse4);
          return (
            <motion.rect
              key={idx}
              x={18.5}
              y={0}
              width={3}
              height={40}
              rx={0.5}
              fill="#000"
              initial={{ scale: 0, rotate: angle }}
              animate={{ scale: collapsed ? 0 : 1, rotate: angle }}
              transition={{
                ...(mounted ? SPRING_TRANSITION : INITIAL_TRANSITION),
                scale: {
                  duration: mounted ? 0.4 : 0.3,
                  ...(!mounted ? { delay: 0.03 * idx } : {}),
                },
              }}
              style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
            />
          );
        })}
        <motion.circle
          cx={20}
          cy={20}
          fill="#fff"
          stroke="#000"
          initial={{ r: 3, strokeWidth: currentMode.circleStrokeWidth }}
          animate={{ r: currentMode.circleR, strokeWidth: currentMode.circleStrokeWidth }}
          transition={SPRING_TRANSITION}
        />
      </motion.svg>
    </div>
  );
};

/* ---------------- AsciiLogo (Hero Background) ---------------- */
const LOGO_CHARS = "&_=!#$@%01";
const NOISE_CHARS = ".,':;~-`";

const AsciiLogo = ({
  areaWidth = "100%",
  areaHeight = 600,
  fontSize = 8,
  lineHeight = 10,
  animationSpeed = 80,
  logoNoiseIntensity = 0.15,
  noiseMaxDensity = 0.35,
}: {
  areaWidth?: string | number;
  areaHeight?: number;
  fontSize?: number;
  lineHeight?: number;
  animationSpeed?: number;
  logoNoiseIntensity?: number;
  noiseMaxDensity?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noiseGrid, setNoiseGrid] = useState("");
  const [logoArt, setLogoArt] = useState("");
  const revealRowsRef = useRef(0);
  const revealingRef = useRef(true);

  const getCols = useCallback(() => {
    if (typeof areaWidth === "number") return Math.ceil(areaWidth / 4.8);
    const width = containerRef.current?.offsetWidth || window.innerWidth;
    return width > 0 ? Math.ceil(width / 4.8) : asciiLogoData.gridCols;
  }, [areaWidth]);

  const colsRef = useRef(getCols());

  const generateNoise = useCallback(
    (cols?: number) => {
      const c = cols ?? colsRef.current;
      const { gridRows } = asciiLogoData;
      const revealed = revealRowsRef.current;
      const startRow = gridRows - revealed;
      const rows: string[] = [];

      for (let r = 0; r < gridRows; r++) {
        if (r < startRow) {
          rows.push(" ".repeat(c));
          continue;
        }
        const progress = revealed > 0 ? (r - startRow) / revealed : 1;
        const density =
          noiseMaxDensity * Math.pow(r / (gridRows - 1), 2.5) * Math.min(1, 1.5 * progress);
        let line = "";
        for (let col = 0; col < c; col++) {
          line +=
            Math.random() < density
              ? NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
              : " ";
        }
        rows.push(line);
      }
      return rows.join("\n");
    },
    [noiseMaxDensity]
  );

  const generateLogo = useCallback(() => {
    const { brightnessMap, logoCols, logoRows } = asciiLogoData;
    const rows: string[] = [];
    for (let r = 0; r < logoRows; r++) {
      let line = "";
      for (let c = 0; c < logoCols; c++) {
        const b = brightnessMap[r]?.[c] ?? 1;
        if (b > 0.85) {
          line += " ";
        } else {
          const idx = Math.floor(
            (1 - Math.max(0, Math.min(1, b + (Math.random() - 0.5) * 2 * logoNoiseIntensity))) *
              (LOGO_CHARS.length - 1)
          );
          line += LOGO_CHARS[idx];
        }
      }
      line += "\n";
      rows.push(line);
    }
    return rows.join("");
  }, [logoNoiseIntensity]);

  useEffect(() => {
    colsRef.current = getCols();
    setNoiseGrid(generateNoise(colsRef.current));
    const onResize = () => {
      const next = getCols();
      if (next !== colsRef.current) {
        colsRef.current = next;
        setNoiseGrid(generateNoise(next));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getCols, generateNoise]);

  useEffect(() => {
    setNoiseGrid(generateNoise(colsRef.current));
    setLogoArt(generateLogo());
    const { gridRows } = asciiLogoData;
    const interval = setInterval(() => {
      if (revealingRef.current) {
        revealRowsRef.current = Math.min(revealRowsRef.current + 4, gridRows);
        if (revealRowsRef.current >= gridRows) revealingRef.current = false;
      }
      setNoiseGrid(generateNoise(colsRef.current));
      setLogoArt(generateLogo());
    }, animationSpeed);
    return () => clearInterval(interval);
  }, [generateNoise, generateLogo, animationSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full overflow-hidden"
      style={{
        width: typeof areaWidth === "number" ? `${areaWidth}px` : areaWidth,
        maxWidth: "100%",
        height: areaHeight,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-1 overflow-hidden font-mono whitespace-pre select-none text-gray-900"
        style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, letterSpacing: "0px" }}
      >
        {noiseGrid}
      </div>
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-1/2 items-center justify-center">
        <motion.div
          className="pointer-events-none scale-70 font-mono whitespace-pre select-none md:scale-100 text-gray-900"
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, letterSpacing: "0px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {logoArt}
        </motion.div>
      </div>
    </div>
  );
};

/* ---------------- AsciiQuoteMarks ---------------- */
const QUOTE_LEFT = [
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98],
  [0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98],
  [0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98],
  [0,0,0,0,0,0,0,0,0,0,0.05,0.98,0.98,0.98,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0.05,0.98,0.98,0.98,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0.05,0.98,0.98,0.98,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0.05,0.98,0.98,0.98,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0.05,0.98,0.98,0.98,0,0,0,0,0,0,0,0,0,0,0],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
];

const QUOTE_RIGHT = [
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0,0,0,0,0,0,0,0,0,0,0,0.98,0.98,0.98,0.06,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0.98,0.98,0.98,0.06,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0.98,0.98,0.98,0.06,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0.98,0.98,0.98,0.06,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0.98,0.98,0.98,0.06,0,0,0,0,0,0,0,0,0,0],
  [0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.97],
  [0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98],
  [0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0,0,0,0,0,0.98,0.98,0.98],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
  [0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98,0.98],
];

const AsciiQuote = ({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) => {
  const [art, setArt] = useState("");
  const map = direction === "left" ? QUOTE_LEFT : QUOTE_RIGHT;

  const generate = useCallback(() => {
    const rows: string[] = [];
    for (let r = 0; r < 12; r++) {
      let line = "";
      for (let c = 0; c < 25; c++) {
        const b = map[r]?.[c] ?? 1;
        if (b > 0.85) {
          line += " ";
        } else {
          const idx = Math.floor(
            (1 - Math.max(0, Math.min(1, b + (Math.random() - 0.5) * 0.3))) *
              (LOGO_CHARS.length - 1)
          );
          line += LOGO_CHARS[idx];
        }
      }
      rows.push(line);
    }
    return rows.join("\n");
  }, [map]);

  useEffect(() => {
    setArt(generate());
    const id = setInterval(() => setArt(generate()), 80);
    return () => clearInterval(id);
  }, [generate]);

  return (
    <div className={className} style={{ minHeight: 120, minWidth: 120 }}>
      <div
        className="pointer-events-none select-none text-gray-900"
        style={{
          whiteSpace: "pre",
          fontFamily: '"Roboto Mono", monospace',
          fontSize: "8px",
          lineHeight: "10px",
          letterSpacing: "0px",
        }}
      >
        {art}
      </div>
    </div>
  );
};

/* ---------------- AsciiFire (Retainer Card Background) ---------------- */
const FIRE_CHARS = " .:!+=&#";

const AsciiFire = ({
  width = 1000,
  height = 25,
  fontSize = 8,
  lineHeight = 10,
  animationSpeed = 80,
  fireColor = "#ff9999",
}) => {
  const [text, setText] = useState("");
  const cols = Math.floor(width / 4.8);
  const bufRef = useRef<Uint8Array>(new Uint8Array(cols * height));

  useEffect(() => {
    bufRef.current = new Uint8Array(cols * height);
    const step = () => {
      const buf = bufRef.current;
      const lastRow = (height - 1) * cols;
      const margin = Math.floor(0.15 * cols);

      for (let c = 0; c < cols; c++) {
        if (c >= margin && c <= cols - margin) {
          const rnd = Math.random();
          buf[lastRow + c] =
            rnd > 0.75
              ? FIRE_CHARS.length - 1
              : rnd > 0.35
              ? Math.floor(Math.random() * (FIRE_CHARS.length / 2))
              : 0;
        } else {
          buf[lastRow + c] = 0;
        }
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 1; r < height; r++) {
          const idx = r * cols + c;
          const val = buf[idx];
          if (val === 0) {
            buf[idx - cols] = 0;
          } else {
            const decay = Math.floor(2.2 * Math.random());
            const target = idx - cols + (Math.floor(3 * Math.random()) - 1);
            if (target >= 0) {
              const nextVal = val - decay;
              buf[target] = nextVal > 0 ? nextVal : 0;
            }
          }
        }
      }

      let out = "";
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < cols; c++) {
          out += FIRE_CHARS[buf[r * cols + c]];
        }
        out += "\n";
      }
      setText(out);
    };

    step();
    const id = setInterval(step, animationSpeed);
    return () => clearInterval(id);
  }, [cols, height, animationSpeed]);

  return (
    <pre
      style={{
        margin: 0,
        whiteSpace: "pre",
        fontFamily: '"Roboto Mono", "Courier New", monospace',
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
        color: fireColor,
        letterSpacing: "1px",
      }}
    >
      {text}
    </pre>
  );
};

/* ---------------- Kurumsal İletişim Butonları ---------------- */
const ContactActions = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
    <Link
      to="/tickets"
      className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all hover:bg-neutral-800 hover:scale-105"
    >
      <span>Ücretsiz Teklif & Analiz</span>
      <ArrowUpRight className="size-4 text-white/90" />
    </Link>
    <a
      href="https://wa.me/905070084069?text=Merhaba,%20Virelonsoft%20yaz%C4%B1l%C4%B1m%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20ve%20teklif%20almak%20istiyorum."
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-xs sm:text-sm font-medium text-gray-900 shadow-xs transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Phone className="size-4 text-emerald-600" />
      <span>WhatsApp Hızlı Görüşme</span>
    </a>
  </div>
);

/* ---------------- Gerçek Proje Vitrini Carousel ---------------- */
const LIVE_SHOWCASE_PROJECTS = [
  {
    title: "Kurumsal B2B Toptan Dağıtım Portalı",
    tag: "Canlı ERP & Cari Senkronizasyonu",
    src: "/showcase/doganlar-eczacilik-desktop.png",
  },
  {
    title: "Ham Sandalye — Tam Entegre E-Ticaret",
    tag: "Next.js & İhracat Checkout",
    src: "/showcase/ham-sandalye-desktop.png",
  },
  {
    title: "LCYıkar — Saha Operasyon Portalı",
    tag: "Canlı Görev & Personel Yönetimi",
    src: "/showcase/lcyikar-desktop.png",
  },
  {
    title: "Modern B2B Bayi Portalı",
    tag: "Kademeli İskonto & DBS Cari Bakiye",
    src: "/showcase/b2b-desktop.png",
  },
  {
    title: "Modüler Bulut ERP Omurgası",
    tag: "GİB e-Fatura & Onay Zinciri",
    src: "/showcase/erp-desktop.png",
  },
  {
    title: "Akıllı Depo (WMS) & El Terminali",
    tag: "Barkod Doğrulama & Raf Optimizasyonu",
    src: "/showcase/depo-desktop.png",
  },
  {
    title: "WhatsApp AI Kurumsal Asistan",
    tag: "RAG Bilgi Tabanı & Belge OCR",
    src: "/showcase/ai-otomasyon-desktop.png",
  },
  {
    title: "Kurumsal SEO Sıralama Radarı",
    tag: "Google Search Console API",
    src: "/showcase/seo-desktop.png",
  },
];

const ShowcaseCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  return (
    <div className="overflow-hidden">
      <div className="mx-auto mb-4 w-full max-w-4xl px-4 sm:mb-8 text-center">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0a2540]">
          [ CANLI ÜRETİM VİTRİNİ ]
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 mt-1">
          Gerçek Sistemler. Gerçek Müşteri Hacimleri.
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto">
          Milyonluk siparişleri hatasız işleyen, GİB'e saniyeler içinde bağlanan ve sahada aktif çalışan anahtar teslim mimarilerimiz.
        </p>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={(e) => {
          if (!scrollerRef.current) return;
          isDownRef.current = true;
          startXRef.current = e.pageX - scrollerRef.current.offsetLeft;
          scrollLeftRef.current = scrollerRef.current.scrollLeft;
        }}
        onPointerLeave={() => {
          isDownRef.current = false;
        }}
        onPointerUp={() => {
          isDownRef.current = false;
        }}
        onPointerMove={(e) => {
          if (!isDownRef.current || !scrollerRef.current) return;
          e.preventDefault();
          const x = e.pageX - scrollerRef.current.offsetLeft;
          const walk = (x - startXRef.current) * 1.4;
          scrollerRef.current.scrollLeft = scrollLeftRef.current - walk;
        }}
        className="flex cursor-grab scroll-px-8 gap-5 overflow-x-auto overflow-y-clip py-4 px-6 md:px-12 select-none active:cursor-grabbing no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {LIVE_SHOWCASE_PROJECTS.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex-none w-[320px] sm:w-[460px] lg:w-[540px] rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-lg transition-transform hover:-translate-y-1"
          >
            <img
              src={item.src}
              alt={item.title}
              className="h-56 sm:h-72 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 sm:p-6 flex flex-col justify-end">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5FCDFF] bg-black/60 backdrop-blur px-2 py-0.5 rounded w-fit mb-1 border border-white/10">
                {item.tag}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Müşteri Yorumları Slider (Dönen Referanslar) ---------------- */
const TESTIMONIALS = [
  {
    quote:
      "Küçük bir altyapı modülüyle başladık ancak teslim edilen kod kalitesi ve sistem hızı o kadar iyiydi ki tüm sipariş ve operasyon ağımızı teslim ettik. Baştan sona tam bir mühendislik disipliniyle çalıştılar.",
    author: "Kemal Kaya",
    role: "Kurumsal B2B & E-Ticaret Direktörü",
    initial: "K",
    color: "bg-[#0a2540]",
  },
  {
    quote:
      "Saha personellerimizin görev tamamlama, irsaliye doğrulama ve anlık hakediş süreçlerini tek bir mobil portalda topladık. Manuel veri girişinden kaynaklanan gecikmeler ve operasyon kayıpları sıfırlandı.",
    author: "Serkan Yılmaz",
    role: "Saha Operasyon & Lojistik Koordinatörü",
    initial: "S",
    color: "bg-emerald-800",
  },
  {
    quote:
      "Pazaryeri canlı stok senkronizasyonu ve yüksek hızlı checkout altyapısıyla büyük kampanya dönemlerinde bile sıfır kesinti yaşadık. Sayfa açılış hızımız ve sepet dönüşüm oranımız iki katına çıktı.",
    author: "Mert Aydın",
    role: "E-Ticaret & İhracat Yöneticisi",
    initial: "M",
    color: "bg-purple-900",
  },
  {
    quote:
      "GİB onaylı e-Fatura ve e-İrsaliye geçişimizi tam zamanında, muhasebe akışımızı bir saniye bile aksatmadan tamamladılar. Biyometrik onay zinciri departmanlar arası işleyişi çok hızlandırdı.",
    author: "Banu Demir",
    role: "Finans & ERP Süreç Yöneticisi",
    initial: "B",
    color: "bg-indigo-900",
  },
  {
    quote:
      "WhatsApp AI kurumsal asistanımız artık haftada binlerce müşteri talebini ve evrakını otonom karşılıyor. Satış ekibimizin üzerindeki operasyon yükü inanılmaz derecede hafifledi.",
    author: "Emre Tekin",
    role: "Teknoloji Girişimcisi & Kurucu Ortak",
    initial: "E",
    color: "bg-teal-900",
  },
];

const TestimonialSlider = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex flex-col gap-2 lg:block lg:pl-44"
    >
      <AsciiQuote direction="left" className="-top-4 lg:absolute left-0" />
      <div className="min-h-[170px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 leading-snug">
              “<span>{current.quote}</span>”
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${current.color} text-white flex items-center justify-center font-bold text-sm shadow-xs`}
                >
                  {current.initial}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{current.author}</div>
                  <div className="text-xs text-gray-600">{current.role}</div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 mr-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeIdx ? "w-6 bg-black" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Yorum ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-black bg-white flex items-center justify-center text-gray-700 hover:text-black transition-colors"
                  aria-label="Önceki yorum"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-black bg-white flex items-center justify-center text-gray-700 hover:text-black transition-colors"
                  aria-label="Sonraki yorum"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ---------------- Kurumsal SSS ---------------- */
const FAQ_ITEMS = [
  {
    q: "Geliştirilen yazılımların kaynak kodları kime ait?",
    a: "Proje tamamlandığında yazılan tüm kaynak kodlar, veritabanı şemaları, mimari dokümanlar ve dağıtım konfigürasyonları eksiksiz olarak şirketinize devredilir. Hiçbir lisans kısıtlaması veya satıcı bağımlılığı (vendor lock-in) bulunmaz.",
  },
  {
    q: "Mevcut muhasebe veya ERP sistemimize (Logo, Netsis, Mikro vb.) entegre olabilir misiniz?",
    a: "Evet. Canlı üretim projelerimizde ve pek çok kurumsal müşterimizde yaptığımız gibi Logo Tiger, Netsis, Mikro, SAP veya yerel SQL veritabanlarıyla doğrudan REST API, Webhook veya veritabanı tetikleyicileri üzerinden çift yönlü canlı entegrasyon kuruyoruz.",
  },
  {
    q: "Mobil uygulamalarımızın App Store ve Google Play onay süreçlerini kim yönetiyor?",
    a: "Sürecin tamamını uçtan uca biz yönetiyoruz. Apple Developer ve Google Play Console hesap kurulumlarından, ekran görüntüsü tasarımlarına, gizlilik politikalarından mağaza inceleme süreçlerine kadar her adım onay garantisiyle teslim edilir.",
  },
  {
    q: "Proje teslim edildikten sonra destek ve güncelleme süreçleri nasıl işliyor?",
    a: "Tüm anahtar teslim projelerimiz 12 ay boyunca ücretsiz hata ve teknik garanti kapsamındadır. Ayrıca sisteminizin 7/24 kesintisiz çalışması ve yeni özelliklerin eklenmesi için aylık bakım (SLA) veya retainer modellerimizle yanınızda olmaya devam ediyoruz.",
  },
  {
    q: "Fiyatlandırma ve ödeme modeli nasıl işliyor?",
    a: "Kapsamı belirlenmiş projelerde sözleşmeli sabit bütçe (Fixed Price) çalışıyoruz. Sürekli geliştirme ve dinamik gereksinimler içeren projelerde ise aylık dedike mühendislik (Retainer) modeliyle haftalık şeffaf sprintler sunuyoruz.",
  },
  {
    q: "İş birliğine nasıl ve ne kadar sürede başlayabiliriz?",
    a: "Bizimle iletişime geçtiğinizde 24 saat içinde iş analizi toplantısı gerçekleştirir, 48 saat içinde ise mimari yol haritası ve bütçe teklifini iletiriz. Onay sonrası ilk sprint genellikle 3 gün içinde başlar.",
  },
];

/* ---------------- Main Frontend Supply / Hizmetlerimiz Page ---------------- */
export const FrontendSupplyPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-svh flex-col bg-white text-gray-950 font-sans relative overflow-x-hidden">
      {/* Background TopoField Waves (Exact from Home Page, Light Mode) */}
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

      <main className="isolate flex-1 relative z-10">
        <div className="relative isolate">
          {/* Hero Section */}
          <div className="relative isolate flex min-h-svh flex-col pt-24 md:pt-32">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
              <div className="mb-5 md:mb-8">
                <InteractiveStarLogo />
              </div>

              <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-gray-950 leading-tight">
                Uçtan Uca Kurumsal Yazılım <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-sky-900 to-indigo-900">
                  ve Ölçeklenebilir Sistem Mimarisi
                </span>
              </h1>

              <p className="mt-4 text-center text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                Şablonlara ve hazır kalıplara sıkışmadan; doğrudan işletmenizin işleyişine özel, hatasız, yüksek performanslı ve geleceğe hazır kurumsal yazılım sistemleri inşa ediyoruz.
              </p>

              {/* Güven Rozetleri */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs sm:text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="relative isolate size-2 shrink-0">
                    <div className="size-2 shrink-0 rounded-full bg-emerald-500" />
                    <div className="absolute top-1/2 left-1/2 -z-1 size-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-emerald-200" />
                  </div>
                  <span>2 Yeni Proje Kontenjanı Açık</span>
                </div>

                <div className="flex items-center gap-1.5 text-sky-700">
                  <Zap className="size-4 shrink-0 text-sky-600" />
                  <span>24 Saat İçinde Mimari Analiz</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-700">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  <span>%100 Kod Mülkiyeti & Garanti</span>
                </div>
              </div>

              <ContactActions className="mt-8 sm:mt-10" />
            </div>

            <div className="flex-1" />

            {/* ASCII Hero Arka Planı */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 overflow-hidden">
              <AsciiLogo
                areaWidth="100%"
                areaHeight={550}
                fontSize={8}
                lineHeight={10}
                animationSpeed={80}
                logoNoiseIntensity={0.15}
                noiseMaxDensity={0.3}
              />
            </div>
          </div>

          {/* Showcase & Features */}
          <div className="flex flex-col gap-24 py-12 lg:gap-32 lg:py-24">
            <ShowcaseCarousel />

            <section className="mx-auto w-full max-w-4xl px-4">
              <h2 className="section-title flex flex-col items-center text-center whitespace-pre-line text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-gray-300">Şirket içi güvenilirlik.</span>
                Kıdemli mühendislik esnekliği.
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-9 md:grid-cols-3 lg:mt-16">
                <div className="flex flex-col items-start gap-2.5 lg:gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 480"
                    className="size-10 shrink-0 text-emerald-500"
                  >
                    <path
                      fill="currentColor"
                      d="M360 289.7c43.4 0 86.9-16.6 120-49.7a169.2 169.2 0 0 0-120-49.7 169.2 169.2 0 0 0 49.7-120c-46.9 0-89.3 19-120 49.7 0-43.4-16.6-86.9-49.7-120a169.2 169.2 0 0 0-49.7 120 169.2 169.2 0 0 0-120-49.7c0 46.8 19 89.3 49.7 120-43.4 0-86.9 16.6-120 49.7a169.2 169.2 0 0 0 120 49.7 169.2 169.2 0 0 0-49.7 120c46.8 0 89.3-19 120-49.7 0 43.4 16.6 86.9 49.7 120a169.2 169.2 0 0 0 49.7-120 169.2 169.2 0 0 0 120 49.7c0-46.9-19-89.3-49.7-120"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold">İşe alım karmaşasını atlayın.</h3>
                  <p className="text-base text-gray-600">
                    Aylarca yazılımcı aramak veya haftalarca adaptasyonla vakit kaybetmek yok. Doğrudan mimariyi kurup üretime hazır kod teslim ediyoruz.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2.5 lg:gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 480"
                    className="size-10 shrink-0 text-rose-500"
                  >
                    <path
                      fill="currentColor"
                      d="m349.4 276.5 54.7 18.2a57.7 57.7 0 1 0 0-109.4l-54.7 18.2a57.4 57.4 0 0 1-27.1 2.4c5.1-7 12-13 20.8-17.5l51.6-25.8a57.7 57.7 0 1 0-77.3-77.3l-25.8 51.6a57.4 57.4 0 0 1-17.5 20.8 57.4 57.4 0 0 1 2.4-27.1l18.2-54.7a57.6 57.6 0 1 0-109.4 0l18.2 54.7a57.4 57.4 0 0 1 2.4 27.1 57.3 57.3 0 0 1-17.5-20.8l-25.8-51.6a57.7 57.7 0 1 0-77.3 77.3l51.5 25.8a57.4 57.4 0 0 1 21 17.5c-8.7 1.4-18 .7-27.2-2.4l-54.7-18.2a57.7 57.7 0 1 0 0 109.4l54.7-18.2a57.4 57.4 0 0 1 27.1-2.4 57.3 57.3 0 0 1-20.8 17.5l-51.6 25.8a57.7 57.7 0 1 0 77.3 77.3l25.8-51.5a57.4 57.4 0 0 1 17.5-21c1.4 8.7.7 18-2.4 27.2l-18.2 54.7a57.7 57.7 0 1 0 109.4 0l-18.2-54.7a57.4 57.4 0 0 1-2.4-27.1c7 5.1 13 12 17.5 20.9l25.8 51.5a57.7 57.7 0 1 0 77.4-77.4l-51.6-25.7a57.4 57.4 0 0 1-21-17.5c8.7-1.4 18-.7 27.2 2.4M240 300a60 60 0 1 1 0-120 60 60 0 0 1 0 120"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold">Sıfır sürtünmeli iş birliği.</h3>
                  <p className="text-base text-gray-600">
                    Özel WhatsApp ve Slack erişimi, anlık durum güncellemeleri, gereksiz toplantı trafiği olmadan doğrudan sonuca odaklı çalışma.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2.5 lg:gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 480 480"
                    className="size-10 shrink-0 text-amber-500"
                  >
                    <path
                      fill="currentColor"
                      d="M480 240a169.2 169.2 0 0 0-120-49.7 169.2 169.2 0 0 0 49.7-120c-46.9 0-89.3 19-120 49.7 0-43.4-16.6-86.9-49.7-120a169.2 169.2 0 0 0-49.7 120 169.2 169.2 0 0 0-120-49.7c0 46.8 19 89.3 49.7 120-43.4 0-86.9 16.6-120 49.7a169.2 169.2 0 0 0 120 49.7 169.2 169.2 0 0 0-49.7 120c46.8 0 89.3-19 120-49.7 0 43.4 16.6 86.9 49.7 120a169.2 169.2 0 0 0 49.7-120 169.2 169.2 0 0 0 120 49.7c0-46.9-19-89.3-49.7-120 43.4 0 86.9-16.6 120-49.7m-240 60a60 60 0 1 1 0-120 60 60 0 0 1 0 120"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold">İşi sahiplenen mühendislik.</h3>
                  <p className="text-base text-gray-600">
                    Sürekli yönlendirme beklemeden mimari eksikleri görür, sizinle netleştirir ve üretime alırız. Tam sorumluluk, net teslimat.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Çalışma Metodolojisi (4 Adım) */}
          <div className="bg-gray-50 border-y border-gray-200 py-16 lg:py-24">
            <div className="mx-auto w-full max-w-4xl px-4">
              <div className="text-center mb-12 sm:mb-16">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
                  [ SÜREÇ VE TESLİMAT ]
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 mt-1">
                  4 Adımda Hatasız Canlıya Alma
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Mimari ve Analiz",
                    desc: "İşletmenizin mevcut veritabanı, ERP altyapısı ve iş akışları haritalandırılır; teknik mimari plan hazırlanır.",
                  },
                  {
                    step: "02",
                    title: "Hızlı Prototip",
                    desc: "Kullanıcı deneyimi ve API omurgası kurulur; çalışan ilk canlı prototip 1. haftada testinize açılır.",
                  },
                  {
                    step: "03",
                    title: "Stres ve Yük Testi",
                    desc: "Sistem binlerce eşzamanlı istek, yüksek sipariş ve GİB fatura kuyruğu altında güvenlik testlerinden geçirilir.",
                  },
                  {
                    step: "04",
                    title: "Canlıya Alma & SLA",
                    desc: "Veri aktarımı tamamlanır, personel eğitimi verilir ve 7/24 teknik izleme garantisiyle sistem devreye alınır.",
                  },
                ].map((st, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-2xl font-black font-mono text-gray-300 block mb-2">
                        {st.step}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{st.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Müşteri Başarı Referansları (Dönen Yorumlar Slider) */}
          <div className="bg-white border-b border-gray-100">
            <div className="mx-auto w-full max-w-4xl px-4 pt-8 pb-10 lg:py-16">
              <TestimonialSlider />
            </div>
          </div>

          {/* İş Birliği ve Hizmet Modelleri */}
          <div className="py-16 lg:py-24 bg-[#fafafa]">
            <section className="mx-auto w-full max-w-4xl px-4">
              <div className="text-center mb-10 sm:mb-12">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
                  [ ÇALIŞMA MODELLERİ ]
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 mt-1">
                  Şirketinizin İhtiyacına Uygun Modeller
                </h2>
              </div>

              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-1 sm:p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden rounded-xl">
                  {/* Model 1: Anahtar Teslim Proje */}
                  <div className="relative isolate w-full overflow-hidden bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mb-2">
                        SÖZLEŞMELİ & SABİT KAPSAM
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Anahtar Teslim Proje</h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Kapsamı, ekran tasarımları ve API gereksinimleri baştan netleştirilen kurumsal projeler için.
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 font-mono">Bütçe & Teslimat:</div>
                        <div className="text-lg font-bold text-gray-900 mt-0.5">Sabit Bütçe & Net Takvim</div>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>Baştan belirlenen net sözleşmeli teslim tarihi</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>%100 kaynak kod devri ve teknik dokümantasyon</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>12 ay ücretsiz hata düzeltme ve teknik garanti</span>
                        </li>
                      </ul>
                    </div>

                    <Link
                      to="/tickets"
                      className="mt-6 w-full py-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-xs font-bold text-center block transition-all"
                    >
                      Projeniz İçin Teklif Alın →
                    </Link>
                  </div>

                  {/* Model 2: Aylık Dedike Mühendislik (Retainer) */}
                  <div className="relative isolate w-full overflow-hidden bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="pointer-events-none absolute bottom-0 left-0 -z-1 flex h-40 w-full justify-center overflow-hidden opacity-30">
                      <AsciiFire width={600} />
                    </div>

                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded w-fit mb-2">
                        DEDİKE YAZILIM GÜCÜ
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Aylık Dedike Mühendislik</h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Şirketinizin bünyesinde tam zamanlı kıdemli bir yazılım departmanı gibi çalışan kesintisiz mühendislik.
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 font-mono">Çalışma Şekli:</div>
                        <div className="text-lg font-bold text-gray-900 mt-0.5">Haftalık Sprintler & Canlı Çıktı</div>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>Özel WhatsApp / Slack doğrudan iletişim kanalı</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>Sürekli yeni özellik geliştirme ve canlı optimizasyon</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0" />
                          <span>İstediğiniz zaman durdurma veya sonlandırma esnekliği</span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href="https://wa.me/905070084069?text=Merhaba,%20ayl%C4%B1k%20dedike%20m%C3%BChendislik%20hizmetiniz%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold text-center block transition-all"
                    >
                      Dedike Ekip İçin Görüşün →
                    </a>
                  </div>
                </div>

                {/* Alt Hızlı İletişim Şeridi */}
                <div className="mt-2 bg-white rounded-xl p-4 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Hemen Başlamak Mı İstiyorsunuz?</div>
                      <div className="text-xs text-gray-600">Bugün iletişime geçin, 24 saat içinde mimari planı başlatalım.</div>
                    </div>
                  </div>
                  <ContactActions />
                </div>
              </div>
            </section>
          </div>

          {/* Sıkça Sorulan Sorular */}
          <div className="py-16 lg:py-24 border-t border-gray-200 bg-white">
            <div className="mx-auto w-full max-w-4xl px-4">
              <div className="text-center mb-10">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
                  [ MERAK EDİLENLER ]
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 mt-1">
                  Sıkça Sorulan Sorular
                </h2>
              </div>

              <div className="mx-auto flex w-full max-w-2xl flex-col divide-y divide-gray-200">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="w-full">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="group relative flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-gray-900 sm:text-base"
                        >
                          <span className="pr-4">{item.q}</span>
                          <span className="text-gray-400 group-hover:text-black">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer outerBgClass="bg-transparent pt-6 pb-10 relative z-10" />
    </div>
  );
};
