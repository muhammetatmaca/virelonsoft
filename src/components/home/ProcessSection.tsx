import React from "react";
import { CheckCircle2, GitBranch, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import TopoField from "../TopoField";

const STEPS = [
  {
    step: "01",
    title: "Keşif ve Mimari Tasarım",
    description:
      "İhtiyaçlarınızı dinler, veritabanı şemasını, API mimarisini ve ekran prototiplerini ilk günden netleştiririz. Beklenmedik maliyet veya kapsam kayması yaşanmaz.",
    tag: "1. Hafta: Net Yol Haritası",
    icon: <GitBranch className="w-5 h-5 text-[#5FCDFF]" />,
  },
  {
    step: "02",
    title: "Çevik Geliştirme & Canlı Demolar",
    description:
      "Haftalık test sürümleri ve gerçek cihaz testleriyle süreci şeffaf biçimde izlersiniz. Kod tabanı modüler ve temiz yazılır, her aşamada onayınız alınır.",
    tag: "Haftalık Sürümler",
    icon: <CheckCircle2 className="w-5 h-5 text-[#00F59B]" />,
  },
  {
    step: "03",
    title: "Mağaza Yayını & Sürekli Destek",
    description:
      "App Store ve Google Play onayları eksiksiz tamamlanır, bulut sunucular optimize edilir. Lansmandan sonra da sisteminiz yalnız bırakılmaz.",
    tag: "Sıfır Kesinti & Destek",
    icon: <Rocket className="w-5 h-5 text-[#ff9d69]" />,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="w-full p-2 sm:p-3 pt-0 bg-black">
      <div className="relative w-full rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10 bg-black p-6 sm:p-10 md:p-14 overflow-hidden">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#E1E0CC]/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00F59B] font-mono mb-2 block">
              [ 03 · ÇALIŞMA SÜRECİ ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#E1E0CC] leading-[1.1]">
              Sürpriz Yok. Net Teslim Takvimi.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1E0CC]/70 max-w-md leading-relaxed">
            Haftalarca süren bürokrasi veya bitmeyen toplantılar yok. Doğrudan çalışan koda ve sonuca odaklanıyoruz.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s) => (
            <motion.div
              key={s.step}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#E1E0CC]/15 bg-black/80 backdrop-blur-xl p-6 sm:p-8 hover:border-[#E1E0CC]/40 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#E1E0CC]/40 group-hover:text-[#E1E0CC] transition-colors">
                    {s.step}
                  </span>
                  <div className="rounded-full bg-white/[0.05] border border-white/10 p-2">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-3">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E1E0CC]/70 leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#E1E0CC]/60">{s.tag}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
