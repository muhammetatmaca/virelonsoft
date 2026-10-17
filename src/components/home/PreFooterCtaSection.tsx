import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import TopoField from "../TopoField";

export const PreFooterCtaSection: React.FC = () => {
  return (
    <section className="w-full p-2 sm:p-3 pt-0 bg-black">
      <div className="relative w-full rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/15 bg-black p-8 sm:p-12 md:p-16 overflow-hidden text-center flex flex-col items-center justify-center">
        {/* TopoField WebGL Background (Hero ile aynı arkaplan) */}
        <div className="absolute inset-0 h-full w-full pointer-events-none opacity-50">
          <TopoField
            mode="dark"
            speed={0.7}
            length={1}
            density={1}
            opacity={0.7}
            className="h-full w-full"
          />
        </div>

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.45] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />

        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5FCDFF]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[#5FCDFF] font-mono mb-4 px-3 py-1 rounded-full bg-[#5FCDFF]/10 border border-[#5FCDFF]/20 backdrop-blur">
            Hemen Başlayalım
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#E1E0CC] leading-[1.08] mb-6">
            Bir sonraki dijital sisteminizi birlikte inşa edelim.
          </h2>

          <p className="text-xs sm:text-base text-[#E1E0CC]/75 max-w-xl leading-relaxed mb-8">
            İster sıfırdan bir mobil uygulama, ister kurumsal iş süreçlerinizi toparlayacak bir yönetim platformu; doğrudan çalışan mimariler üretiyoruz.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
            <a
              href="https://wa.me/905070084069?text=Merhaba,%20Virelonsoft%20yaz%C4%B1l%C4%B1m%20hizmetleri%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold px-7 py-3.5 text-xs sm:text-sm transition-all shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95"
            >
              <span>WhatsApp'tan Yazın</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/tickets"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E1E0CC]/30 hover:border-[#E1E0CC] bg-black/60 backdrop-blur text-[#E1E0CC] hover:text-white px-7 py-3.5 text-xs sm:text-sm font-medium transition-all hover:bg-white/10 active:scale-95"
            >
              <span>Detaylı Teklif Alın</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
          </div>

          {/* Direct Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#E1E0CC]/70 border-t border-white/10 pt-6 w-full">
            <a
              href="tel:05070084069"
              className="inline-flex items-center gap-2 hover:text-[#E1E0CC] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5FCDFF]" />
              <span>0507 008 4069</span>
            </a>

            <a
              href="mailto:lexicallayer@muhammetatmaca.com.tr"
              className="inline-flex items-center gap-2 hover:text-[#E1E0CC] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#5FCDFF]" />
              <span>lexicallayer@muhammetatmaca.com.tr</span>
            </a>

            <div className="inline-flex items-center gap-2 text-[#E1E0CC]/70">
              <MapPin className="w-3.5 h-3.5 text-[#5FCDFF]" />
              <span>Türkiye Geneli Hizmet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
