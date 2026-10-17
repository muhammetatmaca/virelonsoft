import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import TidalStipple from "../originkit/ui/tidal-stipple";

export const VirelonIcon = ({ className = "w-[0.46em] h-[0.46em]" }: { className?: string }) => {
  return (
    <img
      src="/virelon-v-icon.png"
      alt="VirelonSoft Mark"
      className={`inline-block shrink-0 object-contain drop-shadow-[0_4px_24px_rgba(192,38,211,0.5)] ${className}`}
    />
  );
};

export const Footer: React.FC<{ outerBgClass?: string }> = ({ outerBgClass = "bg-transparent" }) => {
  return (
    <footer className={`w-full p-2 sm:p-3 pt-0 ${outerBgClass}`}>
      <div className="relative min-h-[560px] md:min-h-[640px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10 flex flex-col justify-between">
        {/* Originkit Tidal Stipple WebGL2 Background */}
        <div className="absolute inset-0 h-full w-full">
          <TidalStipple
            background="#0B0A08"
            baseColor="#0081FF"
            accentColor="#5FCDFF"
            density={40}
            scale={186}
            dotTop={35}
            reach={4}
            distortion={6}
            speed={100}
            tide={20}
            style={{ width: "100%", height: "100%", minHeight: "100%" }}
          />
        </div>

        {/* Subtle fade for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/75" />

        {/* Footer Top Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 p-6 sm:p-10 md:p-14">
          <div className="md:col-span-6 flex flex-col justify-end gap-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.08] text-[#E1E0CC] max-w-xl">
              Fikirleri yüksek performanslı, ölçeklenebilir ve yaşayan dijital sistemlere dönüştürüyoruz.
            </h2>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#5FCDFF] font-mono mb-1">
              Sayfalar
            </span>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              Projelerimiz
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5FCDFF] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
            <Link
              to="/supply"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              Hizmetlerimiz
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5FCDFF] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
            <Link
              to="/ai"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              Seo Optimizasyonu
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5FCDFF] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
            <Link
              to="/equator"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              Hakkımızda & Vizyon
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5FCDFF] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
            <Link
              to="/tickets"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              Teklif Alın
              <ArrowUpRight className="h-3.5 w-3.5 text-[#5FCDFF] opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#5FCDFF] font-mono mb-1">
              İletişim & Kurucu
            </span>
            <a
              href="https://muhammetatmaca.com.tr"
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base text-[#5FCDFF] hover:underline transition-colors inline-flex items-center gap-1.5"
            >
              muhammetatmaca.com.tr
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
            </a>
            <a
              href="mailto:lexicallayer@muhammetatmaca.com.tr"
              className="text-sm text-[#E1E0CC]/85 hover:text-white transition-colors"
            >
              lexicallayer@muhammetatmaca.com.tr
            </a>
            <a
              href="tel:+905070084069"
              className="text-sm text-[#E1E0CC]/85 hover:text-white transition-colors font-mono"
            >
              +90 507 008 4069
            </a>
            <p className="text-xs text-[#E1E0CC]/75 leading-relaxed mt-2">
              Türkiye geneli modern web, mobil ve kurumsal dijital sistem çözümleri.
            </p>
          </div>
        </div>

        {/* Footer Bottom Wordmark & Copyright */}
        <div className="relative z-10 px-6 pb-6 sm:px-10 sm:pb-8 md:px-14 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-[#E1E0CC]/15 pt-6">
          <div className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.06em] leading-none text-[#E1E0CC] flex items-center gap-2">
            Virelonsoft<span className="inline-flex ml-1"><VirelonIcon className="w-8 h-8 sm:w-11 sm:h-11" /></span>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono text-[#E1E0CC]">
            <span className="text-white font-medium">© {new Date().getFullYear()} VirelonSoft</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
