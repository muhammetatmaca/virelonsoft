import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Iphone16Pro } from "../ui/iphone-16-pro";

interface MobileAppItem {
  id: string;
  name: string;
  tag: string;
  screenshot: string;
  playStoreUrl: string;
}

const APPS: MobileAppItem[] = [
  {
    id: "teleflow-prompter",
    name: "TeleFlow: Video Teleprompter",
    tag: "AI & Teleprompter",
    screenshot: "/apps/teleflow-prompter/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.teleprompter&hl=tr",
  },
  {
    id: "virelon-wifi",
    name: "Virelon Wi-Fi: Ağ Radarı",
    tag: "Ağ Analitiği & Wi-Fi",
    screenshot: "/apps/virelon-wifi/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.wifi&hl=tr",
  },
  {
    id: "pairplay",
    name: "PairPlay: Birlikte Video İzle",
    tag: "Senkron Medya & Sosyal",
    screenshot: "/apps/pairplay/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.twoscreenonepage&hl=tr",
  },
  {
    id: "tick-shopping",
    name: "Tick - Ortak Alışveriş",
    tag: "Gerçek Zamanlı Liste",
    screenshot: "/apps/tick-shopping/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.tick&hl=tr",
  },
  {
    id: "sketchdr-ar-drawing",
    name: "SketchDr: AR Çizim & İzçiz",
    tag: "AR Çizim & Orantı",
    screenshot: "/apps/sketchdr-ar-drawing/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.sketchdr&hl=tr",
  },
  {
    id: "ringekko-alarm",
    name: "Ringekko: Akıllı Çalar Saat",
    tag: "Koşul Senkron Alarm",
    screenshot: "/apps/ringekko-alarm/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.ringekko&hl=tr",
  },
  {
    id: "qr-base",
    name: "QR Base: QR Okuyucu Oluşturucu",
    tag: "QR & Barkod Motoru",
    screenshot: "/apps/qr-base/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.qrbase&hl=tr",
  },
  {
    id: "privaradar",
    name: "PrivaRadar: VeriGözcüsü",
    tag: "Cihaz İçi Gizlilik",
    screenshot: "/apps/privaradar/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.privaradar&hl=tr",
  },
  {
    id: "belgecep-pdf-scanner",
    name: "BelgeCep: PDF Tarayıcı",
    tag: "Mobil OCR & PDF",
    screenshot: "/apps/belgecep-pdf-scanner/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.pdfscanner&hl=tr",
  },
  {
    id: "kira-mevzuat",
    name: "Kira Sözleşme Mevzuat",
    tag: "LegalTech & AI Denetim",
    screenshot: "/apps/kira-mevzuat/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.kiraai&hl=tr",
  },
  {
    id: "nova-authenticator",
    name: "Nova Authenticator 2FA",
    tag: "RFC 6238 TOTP Kasası",
    screenshot: "/apps/nova-authenticator/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.nova.authenticator&hl=tr",
  },
  {
    id: "oylama",
    name: "Oylama",
    tag: "Zero-Knowledge Oylama",
    screenshot: "/apps/oylama/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.consensus&hl=tr",
  },
  {
    id: "docuquery",
    name: "DocuQuery",
    tag: "Kılavuz Asistanı & OCR",
    screenshot: "/apps/docuquery/screenshot-1.webp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.virelon.DocuQuery&hl=tr",
  },
];

// Kesintisiz sonsuz akış için listeyi 2 kez çoğaltıyoruz
const DISPLAY_APPS = [...APPS, ...APPS];

export const MobileAppsMarquee: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden border-t border-gray-200 bg-white">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-sky-500/5 blur-[160px] rounded-full" />

      {/* Header Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#0284c7] mb-2 block">
              [ 02 · CANLI MOBİL UYGULAMALAR & STORE YAYINLARI ]
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-950 leading-[1.08]">
              Canlı App Store & Google Play Ekosistemi<span className="text-[#0284c7]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
            Kullanıcı odaklı, offline destekli ve mağaza onaylı gerçek dünya mobil ürünlerimiz. Kartların üzerine gelerek durdurabilir ve inceleyebilirsiniz.
          </p>
        </div>
      </div>

      {/* Infinite Flowing Mockup Stream */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-white to-transparent" />

        <div className="animate-marquee-phones flex gap-6 sm:gap-8 items-center py-4 px-4">
          {DISPLAY_APPS.map((app, index) => (
            <a
              key={`${app.id}-${index}`}
              href={app.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="group cursor-pointer shrink-0 flex flex-col items-center transition-transform duration-300 hover:scale-[1.03] select-none"
            >
              {/* iPhone 16 Pro Mockup Frame */}
              <div className="relative w-44 sm:w-52 md:w-56 drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:drop-shadow-[0_20px_40px_rgba(2,132,199,0.2)]">
                <Iphone16Pro
                  src={app.screenshot}
                  className="h-auto w-full text-neutral-900"
                />
              </div>

              {/* App Meta Info Badge */}
              <div className="mt-4 flex flex-col items-center text-center max-w-[200px]">
                <span className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-sky-600 transition-colors truncate w-full">
                  {app.name}
                </span>
                <span className="text-[11px] font-mono text-gray-500 mt-0.5 inline-flex items-center gap-1">
                  <span>{app.tag}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0284c7] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
