import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import TopoField from "../TopoField";

export const BentoServicesSection: React.FC = () => {
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
            <span className="text-xs uppercase tracking-widest text-[#5FCDFF] font-mono mb-2 block">
              [ 02 · MÜHENDİSLİK ALANLARI ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#E1E0CC] leading-[1.1]">
              Uçtan Uca Yazılım ve Sistem Mimarisi.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E1E0CC]/70 max-w-md leading-relaxed">
            Şablonlara sıkışmadan; doğrudan işletmenizin işleyişine özel, hatasız ve ölçeklenebilir kurumsal yazılım sistemleri inşa ediyoruz.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1 (Span 2 cols): Mobil Uygulama */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="md:col-span-2 rounded-2xl border border-[#E1E0CC]/15 bg-black/85 backdrop-blur-xl p-6 sm:p-8 hover:border-[#5FCDFF]/50 transition-all flex flex-col justify-between relative overflow-hidden group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs text-[#5FCDFF] tracking-wider uppercase">
                  // 01 · MOBİL UYGULAMA GELİŞTİRME
                </span>
                <span className="font-mono text-xs text-[#E1E0CC]/40">01</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#E1E0CC] mb-3 leading-snug">
                App Store ve Google Play'de Anahtar Teslim Mobil Çözümler.
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/75 leading-relaxed max-w-2xl mb-6">
                İşinizi müşterilerinizin cebine taşıyoruz. Kullanıcı dostu arayüzler, online kredi kartı/POS tahsilatı, anlık bildirim sistemi ve internetsiz çalışma desteği. Mağaza başvuru ve onay süreçlerinin tamamını baştan sona biz yönetiyoruz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-5 border-t border-white/5">
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                iOS & Android
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Sanal POS & Ödeme
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Mağaza Onay Garantisi
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Anlık Bildirim (Push)
              </span>
            </div>
          </motion.div>

          {/* Card 2 (Span 1 col): Depo (WMS) & B2B Bayi */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-[#E1E0CC]/15 bg-black/85 backdrop-blur-xl p-6 sm:p-8 hover:border-[#ff9d69]/50 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs text-[#ff9d69] tracking-wider uppercase">
                  // 02 · DEPO & B2B
                </span>
                <span className="font-mono text-xs text-[#E1E0CC]/40">02</span>
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-3">
                Depo Yönetimi (WMS) & B2B Bayi Portalları
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/75 leading-relaxed mb-6">
                Karekod/barkod okuma ve el terminalleriyle sıfır hatalı sevkiyat. Bayilerinize özel iskontolu fiyat, cari hesap ve vadeli sipariş portalları.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              <span className="text-[11px] font-mono text-[#ff9d69]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                El Terminali
              </span>
              <span className="text-[11px] font-mono text-[#ff9d69]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                Bayi İskonto
              </span>
              <span className="text-[11px] font-mono text-[#ff9d69]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                Kayıpsız Sevkiyat
              </span>
            </div>
          </motion.div>

          {/* Card 3 (Span 1 col): Kurumsal ERP & CRM */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-[#E1E0CC]/15 bg-black/85 backdrop-blur-xl p-6 sm:p-8 hover:border-[#00F59B]/50 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs text-[#00F59B] tracking-wider uppercase">
                  // 03 · ERP & CRM
                </span>
                <span className="font-mono text-xs text-[#E1E0CC]/40">03</span>
              </div>

              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-3">
                Özel Şirket Yönetim Panelleri
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/75 leading-relaxed mb-6">
                Excel karmaşasını bitiren; müşteri takibi, siparişler, personel yetkilendirmesi ve anlık gelir-gider raporlarını tek ekranda toplayan kurumsal sistemler.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              <span className="text-[11px] font-mono text-[#00F59B]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                Sipariş & Cari
              </span>
              <span className="text-[11px] font-mono text-[#00F59B]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                Canlı Rapor
              </span>
              <span className="text-[11px] font-mono text-[#00F59B]/90 px-2 py-0.5 rounded bg-white/[0.04]">
                Rol Yetkisi
              </span>
            </div>
          </motion.div>

          {/* Card 4 (Span 2 cols): Mikroservis & AI Otomasyon */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="md:col-span-2 rounded-2xl border border-[#E1E0CC]/15 bg-black/85 backdrop-blur-xl p-6 sm:p-8 hover:border-[#E1E0CC]/50 transition-all flex flex-col justify-between relative overflow-hidden group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs text-[#E1E0CC] tracking-wider uppercase">
                  // 04 · MİKROSERVİS, BULUT & YAPAY ZEKA
                </span>
                <span className="font-mono text-xs text-[#E1E0CC]/40">04</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-medium text-[#E1E0CC] mb-3 leading-snug">
                Yüksek Trafikte Çökmeyen Mimariler & Akıllı Yapay Zeka Otomasyonları.
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/75 leading-relaxed max-w-2xl mb-6">
                Milyonluk kullanıcı trafiğini sıfır kesintiyle kaldıran Docker ve Kubernetes tabanlı mikroservisler kuruyoruz. WhatsApp ve web sitenizde 7/24 müşteri karşılayan, otomatik sipariş ve randevu oluşturan firmanıza özel yapay zeka asistanları entegre ediyoruz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-5 border-t border-white/5">
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Docker & Kubernetes
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                7/24 WhatsApp AI Bot
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Sıfır Kesinti (99.9%)
              </span>
              <span className="text-xs font-mono text-[#E1E0CC]/80 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                Muhasebe & ERP Köprüsü
              </span>
            </div>
          </motion.div>
        </div>

        {/* Alt Hızlı Aksiyon */}
        <div className="relative z-10 flex justify-center mt-12">
          <Link
            to="/tickets"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#E1E0CC]/30 bg-black/80 px-6 py-3 text-xs sm:text-sm font-medium text-[#E1E0CC] hover:border-[#5FCDFF] hover:text-white transition-all shadow-md backdrop-blur"
          >
            <span>Özel Yazılım İhtiyacınızı Konuşalım</span>
            <ArrowUpRight className="w-4 h-4 text-[#5FCDFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
