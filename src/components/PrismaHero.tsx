import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopoField from "./TopoField";
import { Footer } from "./layout/Footer";
import { SelectedWorksSection } from "./home/SelectedWorksSection";
import { BentoServicesSection } from "./home/BentoServicesSection";
import { ProcessSection } from "./home/ProcessSection";
import { PreFooterCtaSection } from "./home/PreFooterCtaSection";

/* ---------------- VirelonIcon ---------------- */
export const VirelonIcon = ({ className = "w-[0.46em] h-[0.46em]" }: { className?: string }) => {
  return (
    <img
      src="/virelon-v-icon.png"
      alt="VirelonSoft Mark"
      className={`inline-block shrink-0 object-contain drop-shadow-[0_4px_24px_rgba(192,38,211,0.5)] ${className}`}
    />
  );
};

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, icon, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {isLast && (
              icon ? (
                <span className="absolute -top-[0.06em] -right-[0.65em] inline-flex items-center justify-center pointer-events-none">
                  {icon}
                </span>
              ) : showAsterisk ? (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
              ) : null
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const navItems = [
  { label: "Projelerimiz", to: "/projects" },
  { label: "Hizmetlerimiz", to: "/supply" },
  { label: "Seo Optimizasyonu", to: "/ai" },
  { label: "Hakkımızda", to: "/equator" },
  { label: "Teklif Alın", to: "/tickets" },
];

const PrismaHero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-black text-[#E1E0CC]">
      {/* Hero Section with TopoField Background */}
      <section className="h-screen w-full p-2 sm:p-3 bg-black">
        <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10">
          {/* TopoField WebGL Background */}
          <div className="absolute inset-0 h-full w-full">
            <TopoField
              mode="dark"
              speed={1}
              length={1}
              density={1}
              opacity={1}
              className="h-full w-full"
            />
          </div>

          {/* Noise overlay */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-overlay" />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-2 sm:px-6 md:px-10">
            <div className="grid grid-cols-12 items-end gap-4">
              <div className="col-span-12 lg:col-span-7">
                <h1
                  className="font-medium leading-[0.85] tracking-[-0.07em] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[8.5vw] 2xl:text-[9vw]"
                  style={{ color: "#E1E0CC" }}
                >
                  <WordsPullUp text="Virelonsoft" icon={<VirelonIcon />} />
                </h1>
              </div>

              <div className="col-span-12 flex flex-col gap-6 pb-6 lg:col-span-5 lg:pb-10">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] text-white font-medium tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-2xl"
                  style={{ lineHeight: 1.45 }}
                >
                  VirelonSoft; Türkiye genelinde web, mobil ve kurumsal yazılım çözümleri geliştiren modern bir teknoloji stüdyosudur. İhtiyaca özel, yüksek performanslı ve ölçeklenebilir dijital sistemler inşa ediyoruz.
                </motion.p>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 w-full max-w-xl md:max-w-2xl">
                  {/* Satır 1 (3 Buton) */}
                  <motion.button
                    onClick={() => navigate("/projects")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full bg-[#5FCDFF] py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-black transition-all hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Projelerimiz</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#5FCDFF]" />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/tickets")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full bg-[#e2261b] py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-white transition-all hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Teklif Alın</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/tickets")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full bg-primary py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-black transition-all hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Teklif Alın</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: "#E1E0CC" }} />
                    </span>
                  </motion.button>

                  {/* Satır 2 (3 Buton) */}
                  <motion.button
                    onClick={() => navigate("/supply")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full border border-[#E1E0CC]/40 bg-black/50 backdrop-blur py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-[#E1E0CC] transition-all hover:border-[#E1E0CC] hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Hizmetlerimiz</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#E1E0CC] transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black" />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/equator")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full border border-[#ff9d69]/60 bg-[#ff9d69]/90 backdrop-blur py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-[#3e2002] transition-all hover:bg-[#ff9d69] hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Hakkımızda</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#3e2002] transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#fcf8f0]" />
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/ai")}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer flex items-center justify-between rounded-full bg-[#00F59B] py-1 sm:py-1.5 pl-2.5 sm:pl-3.5 pr-1 text-[11px] sm:text-xs md:text-sm font-medium text-black transition-all hover:opacity-95"
                  >
                    <span className="whitespace-nowrap">Seo Optimizasyonu</span>
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 ml-1">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00F59B]" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 · Selected Works Showcase */}
      <SelectedWorksSection />

      {/* 02 · Engineering Capabilities & Bento Grid */}
      <BentoServicesSection />

      {/* 03 · 3-Step Delivery Process */}
      <ProcessSection />

      {/* 04 · Pre-Footer Conversion & Direct Contact */}
      <PreFooterCtaSection />

      {/* Footer Section */}
      <Footer outerBgClass="bg-black" />
    </div>
  );
};

export { PrismaHero };

