import React from "react";
import {
  Search,
  Camera,
  Bell,
  Heart,
  ShoppingCart,
  User,
  Home,
  Flame,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Send,
  Mic,
  Paperclip,
  Phone,
  Video,
  CheckCheck,
  Check,
  ScanLine,
  Barcode,
  Package,
  Box,
  AlertTriangle,
  TrendingUp,
  FileText,
  SlidersHorizontal,
  Download,
  Building2,
  CheckCircle2,
  Plus,
  Mail,
  ExternalLink,
  Shield,
  FileSpreadsheet,
  Receipt,
  Globe,
  BarChart3,
  Calendar,
} from "lucide-react";

// Top iOS Status Bar component
const IosStatusBar = ({ time = "09:41", dark = false }: { time?: string; dark?: boolean }) => (
  <div
    className={`w-full flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold select-none ${
      dark ? "text-white" : "text-gray-900"
    }`}
  >
    <span>{time}</span>
    <div className="flex items-center gap-1.5 opacity-90">
      <span className="text-[10px] font-bold">5G</span>
      <span className="w-3.5 h-2.5 border border-current rounded-sm flex items-center p-0.5">
        <span className="w-full h-full bg-current rounded-xs"></span>
      </span>
    </div>
  </div>
);

// ============================================================================
// 1. E-TİCARET PLATFORMU (Trendyol / Hepsiburada Tarzı Gerçek Tüketici Mobil Uygulaması)
// ============================================================================
export const EcommerceMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#f5f5f7] text-[#1e1e1e] flex flex-col select-none overflow-hidden font-sans"
  >
    {/* Trendyol Turuncusu Header */}
    <div className="bg-[#f27a1a] text-white pt-1 pb-3 px-4 shadow-sm">
      <IosStatusBar dark time="09:41" />
      
      {/* Search Bar + Aksiyonlar */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 bg-white text-gray-700 h-9 rounded-lg flex items-center px-3 shadow-xs">
          <Search className="w-4 h-4 text-[#f27a1a] shrink-0 mr-2" />
          <span className="text-[11px] text-gray-400 truncate">Marka, ürün veya kategori ara...</span>
          <Camera className="w-4 h-4 text-gray-400 shrink-0 ml-auto" />
        </div>
        <div className="relative p-1.5 bg-black/10 rounded-lg">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </div>

    {/* Scrollable App Body */}
    <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2.5">
      {/* Hikayeler / Kategori Yuvarlakları */}
      <div className="flex items-center justify-between px-1 py-1">
        {[
          { label: "Süper Fırsat", icon: "🔥", badge: "Yeni" },
          { label: "Elektronik", icon: "💻", badge: "" },
          { label: "Moda & Giyim", icon: "👗", badge: "" },
          { label: "Kuponlar", icon: "🎟️", badge: "%30" },
          { label: "Hızlı Market", icon: "⚡", badge: "Go" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-[#f27a1a] flex items-center justify-center text-lg shadow-xs relative">
              <span>{item.icon}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] font-medium text-gray-700 text-center leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Süper İndirim Banner */}
      <div className="rounded-xl p-3 bg-gradient-to-r from-[#ff5e36] to-[#f27a1a] text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="bg-black/30 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
              Günün Fırsatı
            </span>
            <span className="text-[10px] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" /> 04:18:22
            </span>
          </div>
          <div className="text-sm font-bold mt-1">Teknoloji Günlerinde %40 İndirim</div>
          <div className="text-[10px] text-white/80">Sepette ek ₺250 indirim kodu: VIRELON</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white text-[#f27a1a] font-black text-xs flex items-center justify-center shadow-lg shrink-0">
          %40
        </div>
      </div>

      {/* 2'li Ürün Grid (Trendyol Ürün Kartları) */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {/* Ürün 1 */}
        <div className="bg-white rounded-xl p-2 shadow-xs border border-gray-200/80 flex flex-col justify-between relative">
          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-gray-400">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </button>
          
          <div className="w-full h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-3xl">🎧</span>
            <span className="absolute bottom-1 left-1 bg-[#10b981] text-white text-[8px] font-bold px-1 py-0.5 rounded">
              Hızlı Teslimat
            </span>
          </div>

          <div className="mt-2">
            <div className="text-[11px] font-semibold text-gray-800 line-clamp-1">
              Sony WH-1000XM5 Kulaklık
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[9px] text-gray-500">
              <span className="text-amber-500 font-bold flex items-center">
                ★ 4.9
              </span>
              <span>(1.842)</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-[#f27a1a]">₺4.299</span>
              <span className="text-[9px] text-gray-400 line-through">₺5.499</span>
            </div>
          </div>

          <button className="w-full mt-2 py-1.5 bg-[#f27a1a] text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
            <ShoppingCart className="w-3 h-3" /> Sepete Ekle
          </button>
        </div>

        {/* Ürün 2 */}
        <div className="bg-white rounded-xl p-2 shadow-xs border border-gray-200/80 flex flex-col justify-between relative">
          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-gray-400">
            <Heart className="w-3.5 h-3.5" />
          </button>
          
          <div className="w-full h-24 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <span className="text-3xl">⌚</span>
            <span className="absolute bottom-1 left-1 bg-[#f27a1a] text-white text-[8px] font-bold px-1 py-0.5 rounded">
              Kuponlu
            </span>
          </div>

          <div className="mt-2">
            <div className="text-[11px] font-semibold text-gray-800 line-clamp-1">
              Apple Watch Ultra 2 Titanyum
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-[9px] text-gray-500">
              <span className="text-amber-500 font-bold flex items-center">
                ★ 4.8
              </span>
              <span>(920)</span>
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-[#f27a1a]">₺8.999</span>
              <span className="text-[9px] text-gray-400 line-through">₺10.200</span>
            </div>
          </div>

          <button className="w-full mt-2 py-1.5 bg-[#f27a1a] text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
            <ShoppingCart className="w-3 h-3" /> Sepete Ekle
          </button>
        </div>
      </div>
    </div>

    {/* Trendyol Alt Tab Bar */}
    <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-[10px]">
      <div className="flex flex-col items-center text-[#f27a1a] font-semibold">
        <Home className="w-5 h-5" />
        <span className="text-[9px] mt-0.5">Ana Sayfa</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <Flame className="w-5 h-5" />
        <span className="text-[9px] mt-0.5">Trendyol Go</span>
      </div>
      <div className="flex flex-col items-center text-gray-400 relative">
        <Heart className="w-5 h-5" />
        <span className="text-[9px] mt-0.5">Favorilerim</span>
        <span className="absolute -top-1 right-1 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
          4
        </span>
      </div>
      <div className="flex flex-col items-center text-gray-400 relative">
        <ShoppingCart className="w-5 h-5" />
        <span className="text-[9px] mt-0.5">Sepetim</span>
        <span className="absolute -top-1 right-0 bg-[#f27a1a] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
          2
        </span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <User className="w-5 h-5" />
        <span className="text-[9px] mt-0.5">Hesabım</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// 2. WHATSAPP AI KURUMSAL ASİSTAN (Birebir Resmi WhatsApp iOS Sohbet Arayüzü)
// ============================================================================
export const AiBotMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#0b141a] text-[#e9edef] flex flex-col select-none overflow-hidden font-sans"
  >
    {/* WhatsApp iOS Header */}
    <div className="bg-[#1f2c34] text-white px-3 pt-1 pb-2 border-b border-[#2a3942]">
      <IosStatusBar dark time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5">
          <ChevronLeft className="w-6 h-6 text-[#00a884] -ml-1" />
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
              🤖
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00a884] rounded-full border-2 border-[#1f2c34] flex items-center justify-center">
              <Check className="w-2 h-2 text-white stroke-[3]" />
            </span>
          </div>
          <div className="ml-1">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <span>Virelon Kurumsal Asistan</span>
              <span className="bg-[#00a884] text-white rounded-full p-0.5 text-[8px]">✓</span>
            </div>
            <div className="text-[10px] text-[#8696a0]">İşletme Hesabı • Çevrimiçi</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#00a884]">
          <Video className="w-5 h-5 text-[#8696a0]" />
          <Phone className="w-4 h-4 text-[#8696a0]" />
        </div>
      </div>
    </div>

    {/* Sohbet Alanı */}
    <div className="flex-1 bg-[#0b141a] p-3 flex flex-col justify-end gap-2.5 overflow-hidden text-[11px]">
      <div className="bg-[#182229] text-[#ffd279] text-[9px] px-3 py-1.5 rounded-lg text-center mx-auto border border-[#ffd279]/20 max-w-[260px]">
        🔒 Mesajlar ve aramalar uçtan uca şifrelidir. Yapay zeka ERP sistemine canlı bağlıdır.
      </div>

      {/* Müşteri Sorusu */}
      <div className="self-start max-w-[82%] bg-[#202c33] text-[#e9edef] p-2.5 rounded-2xl rounded-tl-xs shadow-sm">
        <div>
          Merhaba! 50 kullanıcı için ERP + E-Ticaret entegrasyonu teklifi alabilir miyim? Depo stokları anlık eşitlenecek mi?
        </div>
        <div className="text-[9px] text-[#8696a0] text-right mt-1">14:32</div>
      </div>

      {/* AI Asistan Yanıtı */}
      <div className="self-end max-w-[86%] bg-[#005c4b] text-[#e9edef] p-2.5 rounded-2xl rounded-tr-xs shadow-sm">
        <div>
          Merhaba Muhammet Bey 👋 Evet, sistem çift yönlü webhook ile ERP ve pazaryeri stoklarını <strong>80 milisaniyede</strong> eşitler.
        </div>
        <div className="mt-1.5 p-2 bg-[#025143] rounded-lg border border-white/10 flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#25d366]" />
          <div className="flex-1">
            <div className="text-[10px] font-bold">Teklif_Virelon_ERP_50User.pdf</div>
            <div className="text-[8px] text-white/70">1.4 MB • Özel İskontolu</div>
          </div>
          <Download className="w-4 h-4 text-[#25d366]" />
        </div>
        <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696a0] mt-1">
          <span>14:32</span>
          <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
        </div>
      </div>

      {/* Hızlı Aksiyon Butonları */}
      <div className="flex flex-col gap-1.5 self-end w-full max-w-[86%] mt-1">
        <button className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] py-1.5 px-3 rounded-lg text-center font-medium border border-[#00a884]/30 flex items-center justify-center gap-1.5">
          <span>📞 Satış Temsilcisi ile Görüş</span>
        </button>
        <button className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] py-1.5 px-3 rounded-lg text-center font-medium border border-[#00a884]/30 flex items-center justify-center gap-1.5">
          <span>📅 Canlı Demo Randevusu Al</span>
        </button>
      </div>
    </div>

    {/* WhatsApp Mesaj Giriş Barı */}
    <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-[#2a3942]">
      <Paperclip className="w-5 h-5 text-[#8696a0]" />
      <div className="flex-1 bg-[#2a3942] text-white rounded-full px-3 py-1.5 flex items-center justify-between text-xs">
        <span className="text-[#8696a0]">Mesaj yazın...</span>
        <Camera className="w-4 h-4 text-[#8696a0]" />
      </div>
      <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-black">
        <Mic className="w-4 h-4 text-white" />
      </div>
    </div>
  </div>
);

// ============================================================================
// 3. AKILLI DEPO (WMS) & EL TERMİNALİ (Zebra TC52 / Honeywell Endüstriyel Arayüz)
// ============================================================================
export const WmsMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#12161a] text-white flex flex-col select-none overflow-hidden font-sans border-2 border-amber-500/30"
  >
    {/* Zebra Endüstriyel Tepe Barı */}
    <div className="bg-amber-500 text-black px-4 pt-2 pb-2 font-bold flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs tracking-wider font-mono">
        <Barcode className="w-4 h-4" /> ZEBRA TC52 • WMS v4.2
      </div>
      <div className="text-[10px] bg-black text-amber-400 px-2 py-0.5 rounded font-mono">
        LAZER: AKTİF
      </div>
    </div>
    
    <IosStatusBar dark time="09:41" />

    <div className="p-3 flex-1 flex flex-col gap-2.5">
      <div className="bg-[#1c232b] rounded-lg p-2.5 border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[9px] text-amber-400 font-mono uppercase tracking-wider">Aktif Toplama Görevi</div>
          <div className="text-xs font-bold text-white">#SEVK-2026-9042 • Sipariş Hazırlama</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-400">18 / 24 Kalem</div>
          <div className="text-[9px] text-white/50">%75 Tamamlandı</div>
        </div>
      </div>

      {/* Lazer Barkod Vizörü */}
      <div className="relative h-44 rounded-xl bg-black border-2 border-dashed border-amber-400/80 p-3 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444]" />
        
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

        <ScanLine className="w-12 h-12 text-amber-400/40 mb-1" />
        <div className="text-[10px] font-mono text-amber-400 tracking-widest text-center">
          [ BARKODU VİZÖRE GETİRİN ]
        </div>
        <div className="mt-2 bg-[#1f2937] px-3 py-1 rounded text-white font-mono text-xs tracking-wider border border-white/10">
          ||||| 869019283741 |||||
        </div>
      </div>

      {/* Hedef Raf ve Ürün Bilgisi */}
      <div className="bg-[#1c232b] rounded-xl p-3 border-2 border-amber-500/60 shadow-lg">
        <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">Hedef Konum (Lokasyon)</div>
        <div className="text-2xl font-black text-white tracking-wider mt-0.5 font-mono">
          KORİDOR C • RAF 04 • GÖZ 2B
        </div>

        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">SKU-8921 • Hidrolik Rulman 45mm</div>
            <div className="text-[10px] text-white/50 font-mono">Lot No: #LOT-2026-X4</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between bg-black/40 p-2 rounded-lg">
          <span className="text-xs font-mono text-white/80">Toplanan Adet:</span>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded bg-gray-700 text-white font-bold text-lg flex items-center justify-center">
              -
            </button>
            <span className="text-xl font-black text-amber-400 font-mono">36 / 50</span>
            <button className="w-8 h-8 rounded bg-amber-500 text-black font-bold text-lg flex items-center justify-center">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button className="py-3 bg-red-600/80 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Eksik Stok
        </button>
        <button className="py-3 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg">
          <CheckCircle2 className="w-4 h-4" /> Onayla & Geç
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// 4. B2B BAYİ PORTALI (Metro / Kurumsal Toptan Koli Sipariş & Cari Ekstre Portalı)
// ============================================================================
export const B2BMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#f8fafc] text-gray-900 flex flex-col select-none overflow-hidden font-sans"
  >
    {/* Güven Veren Kurumsal Lacivert Header */}
    <div className="bg-[#0a2540] text-white pt-1 pb-3 px-4 shadow-sm">
      <IosStatusBar dark time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-xs">
            B2B
          </div>
          <div>
            <div className="text-xs font-bold tracking-tight">DOĞANLAR ECZA A.Ş.</div>
            <div className="text-[10px] text-sky-300">Bayi Kodu: #BAYI-409 • Platin Grup</div>
          </div>
        </div>
        <div className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
          -%35 İSKONTO
        </div>
      </div>
    </div>

    {/* Gövde */}
    <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden">
      {/* Cari Risk & Limit Kartı (Bankacılık / Muhasebe Netliği) */}
      <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium">
          <span>KULLANILABİLİR CARİ KREDİ LİMİTİ</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">DBS AKTİF ✓</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 mt-0.5">
          ₺540.000<span className="text-xs text-gray-500 font-normal"> / ₺800.000</span>
        </div>

        {/* Limit Barı */}
        <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-[#0a2540] h-full rounded-full" style={{ width: "68%" }} />
        </div>

        <div className="flex justify-between items-center text-[9px] text-gray-600 mt-2 pt-2 border-t border-gray-100">
          <span>Vade: <strong>45 Gün Açık Hesap</strong></span>
          <span className="text-emerald-700 font-semibold">Gecikmiş Borç Yok ✓</span>
        </div>
      </div>

      {/* Toptan Arama */}
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center text-[11px] text-gray-400 shadow-xs">
        <Search className="w-4 h-4 mr-2 text-gray-400" />
        <span>İlaç, medikal sarf veya barkod ara...</span>
      </div>

      {/* Toptan İskontolu Ürün Listesi */}
      <div className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
        <span>Toptan Koli Kataloğu</span>
        <span className="text-sky-700 text-[10px]">Hızlı Tekrar Sipariş</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {/* Ürün 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-xl">
              📦
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Parasetamol 500mg (100'lü Koli)</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400 line-through">₺1.200</span>
                <span className="text-xs font-bold text-[#0a2540]">₺780 / Koli</span>
                <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 px-1 rounded">-%35</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
            <span className="text-xs font-bold text-gray-700">20 Koli</span>
          </div>
        </div>

        {/* Ürün 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-xl">
              🧴
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Serum Fizyolojik 500ml (24'lü Koli)</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-400 line-through">₺850</span>
                <span className="text-xs font-bold text-[#0a2540]">₺510 / Koli</span>
                <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 px-1 rounded">-%40</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
            <span className="text-xs font-bold text-gray-700">10 Koli</span>
          </div>
        </div>
      </div>

      {/* Sipariş Onay Barı */}
      <div className="bg-[#0a2540] text-white rounded-xl p-3 flex items-center justify-between shadow-md">
        <div>
          <div className="text-[9px] text-sky-200">30 Koli • Vadeli Sipariş Tutarı</div>
          <div className="text-sm font-bold">₺20.700,00 <span className="text-[9px] font-normal text-white/70">+KDV</span></div>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[10px] px-3 py-2 rounded-lg flex items-center gap-1 shadow">
          <span>Siparişi Onayla</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    {/* Alt Tab Bar */}
    <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between text-[10px] text-gray-500">
      <span className="text-[#0a2540] font-bold">● Toptan</span>
      <span>Siparişlerim (8)</span>
      <span>Cari Ekstre</span>
      <span>Plasiyerim</span>
    </div>
  </div>
);

// ============================================================================
// 5. MODERN KARANLIK CRM (HubSpot / Salesforce Tarzı Satış Pipeline & Müşteri Rehberi)
// ============================================================================
export const CrmMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#111318] text-white flex flex-col select-none overflow-hidden font-sans"
  >
    {/* CRM Header */}
    <div className="bg-[#181b22] px-4 pt-2 pb-3 border-b border-white/10">
      <IosStatusBar dark time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
            MA
          </div>
          <div>
            <div className="text-xs font-bold text-white">Muhammet Atmaca</div>
            <div className="text-[10px] text-gray-400">Kurumsal Satış Direktörü</div>
          </div>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Yeni Müşteri
        </button>
      </div>
    </div>

    {/* CRM Gövde */}
    <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden">
      {/* Satış Özeti Metrikleri */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#181b22] border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[9px] text-gray-400">Aktif Lead</div>
          <div className="text-sm font-bold text-white mt-0.5">38 Firma</div>
        </div>
        <div className="bg-[#181b22] border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[9px] text-gray-400">Teklif Tutarı</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">₺2.4M</div>
        </div>
        <div className="bg-[#181b22] border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[9px] text-gray-400">Kapanan (Q1)</div>
          <div className="text-sm font-bold text-sky-400 mt-0.5">14 Anlaşma</div>
        </div>
      </div>

      {/* Pipeline Aşamaları */}
      <div className="flex items-center gap-1.5 text-[10px] overflow-x-auto pb-1 no-scrollbar">
        <span className="bg-emerald-500 text-black font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
          Tüm Müşteriler (38)
        </span>
        <span className="bg-[#181b22] text-gray-300 border border-white/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          Sözleşme Aşaması (5)
        </span>
        <span className="bg-[#181b22] text-gray-300 border border-white/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          Teklif İletildi (12)
        </span>
      </div>

      {/* Müşteri Kartları (Doğrudan İletişim & Aksiyon) */}
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sıcak Müşteri Takip Listesi</div>

      <div className="flex flex-col gap-2 flex-1">
        {/* Müşteri 1 */}
        <div className="bg-[#181b22] border border-white/10 rounded-xl p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">
                DE
              </div>
              <div>
                <div className="text-xs font-bold text-white">Doğanlar Eczacılık Grubu</div>
                <div className="text-[10px] text-gray-400">Yetkili: Ahmet Doğan (Genel Müdür)</div>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
              Sözleşme Aşaması
            </span>
          </div>

          <div className="mt-2 text-[10px] text-gray-300 bg-black/30 p-1.5 rounded">
            📌 <strong>Son Not:</strong> ERP entegrasyonu için ₺480.000 teklif onaylandı, imza bekleniyor.
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">₺480.000</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" /> Ara
              </button>
              <button className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-[9px] text-white font-bold flex items-center gap-1">
                <Send className="w-3 h-3" /> WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Müşteri 2 */}
        <div className="bg-[#181b22] border border-white/10 rounded-xl p-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                LC
              </div>
              <div>
                <div className="text-xs font-bold text-white">LCYıkar Endüstriyel Saha</div>
                <div className="text-[10px] text-gray-400">Yetkili: Serkan Yılmaz (Operasyon Md.)</div>
              </div>
            </div>
            <span className="bg-sky-500/20 text-sky-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
              Teklif İncelendi
            </span>
          </div>

          <div className="mt-2 text-[10px] text-gray-300 bg-black/30 p-1.5 rounded">
            📌 <strong>Son Not:</strong> 50 saha personeli için mobil uygulama hakediş modülü görüşüldü.
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">₺220.000</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" /> Ara
              </button>
              <button className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] text-sky-400 font-bold flex items-center gap-1">
                <Mail className="w-3 h-3" /> E-posta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Alt Tab Bar */}
    <div className="bg-[#0b0c10] border-t border-white/10 px-6 py-2 flex items-center justify-between text-[10px] text-gray-400">
      <span className="text-emerald-400 font-bold">● Müşteriler</span>
      <span>Pipeline</span>
      <span>Takvim (3)</span>
      <span>Raporlar</span>
    </div>
  </div>
);

// ============================================================================
// 6. MODÜLER BULUT ERP YÖNETİMİ (GİB e-Fatura, Kasa & Onay Zinciri Portalı)
// ============================================================================
export const ErpMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#0f172a] text-white flex flex-col select-none overflow-hidden font-sans"
  >
    {/* Kurumsal ERP Header */}
    <div className="bg-[#1e293b] px-4 pt-2 pb-3 border-b border-white/10">
      <IosStatusBar dark time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-xs">
            ERP
          </div>
          <div>
            <div className="text-xs font-bold tracking-tight">VİRELON BULUT ERP</div>
            <div className="text-[10px] text-slate-400">GİB e-Dönüşüm & Mali Omurga</div>
          </div>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded font-mono">
          GİB BAĞLI ✓
        </span>
      </div>
    </div>

    {/* ERP Gövde */}
    <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden">
      {/* Günlük Net Kasa & Finans Kartı */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-3 border border-slate-700 shadow-md">
        <div className="text-[10px] text-slate-400 font-mono">TOPLAM KASA & BANKA BAKİYESİ</div>
        <div className="text-2xl font-bold text-white mt-0.5">
          ₺1.840.250<span className="text-xs text-sky-400 font-normal">,00</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-700 text-[10px]">
          <div>
            <span className="text-slate-400 text-[9px] block">Bugün Tahsil Edilen:</span>
            <span className="text-emerald-400 font-bold">₺450.000 (8 Fatura)</span>
          </div>
          <div>
            <span className="text-slate-400 text-[9px] block">Yapılan Ödemeler:</span>
            <span className="text-rose-400 font-bold">₺120.000 (Tedarikçi)</span>
          </div>
        </div>
      </div>

      {/* Hızlı e-Belge Aksiyon Butonları */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-2 text-white">
          <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
          <span className="font-semibold block text-[10px]">e-Fatura Kes</span>
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-2 text-white">
          <Package className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <span className="font-semibold block text-[10px]">e-İrsaliye</span>
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-2 text-white">
          <Receipt className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="font-semibold block text-[10px]">e-Arşiv GİB</span>
        </button>
      </div>

      {/* GİB'e Kesilen Son e-Faturalar */}
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
        <span>GİB Onaylı Son e-Faturalar</span>
        <span className="text-sky-400 text-[9px]">Tüm Faturalar (142)</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {/* Fatura 1 */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-sky-400 font-bold">EFT2026000001429</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
              GİB Başarılı ✓
            </span>
          </div>
          <div className="text-xs font-semibold text-white mt-1">Doğanlar Eczacılık Deposu A.Ş.</div>
          <div className="flex items-center justify-between mt-1 text-[10px]">
            <span className="text-slate-400">Toptan İlaç Sevkiyatı</span>
            <span className="text-sm font-bold text-white font-mono">₺84.500,00</span>
          </div>
        </div>

        {/* Fatura 2 */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-sky-400 font-bold">EFT2026000001428</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">
              Tahsil Edildi ✓
            </span>
          </div>
          <div className="text-xs font-semibold text-white mt-1">Ham Sandalye Mobilya Sanayi</div>
          <div className="flex items-center justify-between mt-1 text-[10px]">
            <span className="text-slate-400">İhracat Sevkiyatı</span>
            <span className="text-sm font-bold text-white font-mono">₺142.300,00</span>
          </div>
        </div>

        {/* Fatura 3 */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-sky-400 font-bold">EFT2026000001427</span>
            <span className="bg-amber-500/20 text-amber-300 text-[8px] font-bold px-1.5 py-0.5 rounded">
              Kuyrukta (GİB)
            </span>
          </div>
          <div className="text-xs font-semibold text-white mt-1">LCYıkar Endüstriyel Temizlik</div>
          <div className="flex items-center justify-between mt-1 text-[10px]">
            <span className="text-slate-400">Saha Hizmet Bedeli</span>
            <span className="text-sm font-bold text-white font-mono">₺36.800,00</span>
          </div>
        </div>
      </div>
    </div>

    {/* Alt Tab Bar */}
    <div className="bg-[#0b1120] border-t border-slate-800 px-6 py-2 flex items-center justify-between text-[10px] text-slate-400">
      <span className="text-sky-400 font-bold">● e-Fatura</span>
      <span>Kasa/Banka</span>
      <span>Stok/Depo</span>
      <span>Bordro/İK</span>
    </div>
  </div>
);

// ============================================================================
// 7. KURUMSAL SEO ANALİTİK (Google Search Console & Sıralama Radarı)
// ============================================================================
export const SeoMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-white text-gray-900 flex flex-col select-none overflow-hidden font-sans"
  >
    {/* Google Search Console Temiz Header */}
    <div className="bg-white border-b border-gray-200 px-4 pt-1 pb-3 shadow-xs">
      <IosStatusBar dark={false} time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            G
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Google Search Console</div>
            <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-600" /> muhammetatmaca.com.tr
            </div>
          </div>
        </div>
        <span className="bg-blue-50 text-[#1a73e8] border border-blue-200 text-[9px] font-bold px-2 py-0.5 rounded-full">
          Son 28 Gün
        </span>
      </div>
    </div>

    {/* Gövde */}
    <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden">
      {/* 4'lü Google Performans Metrikleri (GSC Birebir Kartı) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-xs">
        <div className="grid grid-cols-2 gap-3 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[9px] text-[#1a73e8] font-bold block uppercase">Toplam Tıklama</span>
            <div className="text-xl font-bold text-gray-900 mt-0.5">142.8 B</div>
            <span className="text-[9px] text-emerald-700 font-semibold">▲ +%28,4 artış</span>
          </div>
          <div>
            <span className="text-[9px] text-purple-700 font-bold block uppercase">Toplam Gösterim</span>
            <div className="text-xl font-bold text-gray-900 mt-0.5">1.84 M</div>
            <span className="text-[9px] text-emerald-700 font-semibold">▲ +%42,1 artış</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <span className="text-[9px] text-emerald-700 font-bold block uppercase">Ortalama TO (CTR)</span>
            <div className="text-base font-bold text-gray-900 mt-0.5">%7,8</div>
          </div>
          <div>
            <span className="text-[9px] text-amber-700 font-bold block uppercase">Ortalama Konum</span>
            <div className="text-base font-bold text-gray-900 mt-0.5">1.8 (İlk Sayfa)</div>
          </div>
        </div>
      </div>

      {/* Google Mavi Trend Çizgisi */}
      <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs">
        <div className="text-[9px] font-bold text-gray-500 uppercase">Organik Tıklama Grafiği</div>
        <div className="h-10 w-full mt-1">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
            <path
              d="M0 24 Q 20 20, 40 14 T 70 8 T 100 2"
              fill="none"
              stroke="#1a73e8"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      {/* Google 1. Sıradaki Anahtar Kelimeler (Ne Anlattığı %100 Belli!) */}
      <div className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
        <span>Google #1. Sıradaki Sorgular</span>
        <span className="text-emerald-700 text-[10px]">Tüm Kelimeler (240+)</span>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        {/* Kelime 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-900">"b2b e-ticaret yazılımı"</div>
            <div className="text-[9px] text-gray-500">48.200 Tıklama • 240.000 Gösterim</div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded font-mono">
            1. SIRA ★
          </span>
        </div>

        {/* Kelime 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-900">"kurumsal erp çözümleri"</div>
            <div className="text-[9px] text-gray-500">32.400 Tıklama • 180.000 Gösterim</div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded font-mono">
            1. SIRA ★
          </span>
        </div>

        {/* Kelime 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-900">"özel yazılım ajansı istanbul"</div>
            <div className="text-[9px] text-gray-500">21.800 Tıklama • 115.000 Gösterim</div>
          </div>
          <span className="bg-blue-100 text-[#1a73e8] text-[10px] font-black px-2 py-0.5 rounded font-mono">
            2. SIRA
          </span>
        </div>
      </div>
    </div>

    {/* Alt Tab Bar */}
    <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-between text-[10px] text-gray-500">
      <span className="text-[#1a73e8] font-bold">● Performans</span>
      <span>Sayfalar</span>
      <span>Dizin</span>
      <span>Ayarlar</span>
    </div>
  </div>
);

// ============================================================================
// 8. DAĞITIK MİKROSERVİS MİMARİSİ (Datadog / BetterStack SRE Canlı Telemetri)
// ============================================================================
export const MicroserviceMobileMockup = () => (
  <div
    style={{ width: 344, height: 748, transform: "scale(0.5)", transformOrigin: "top left" }}
    className="w-[344px] h-[748px] bg-[#05070a] text-white flex flex-col select-none overflow-hidden font-mono"
  >
    {/* Terminal Tepe Barı */}
    <div className="bg-[#0d1117] border-b border-emerald-500/20 px-4 pt-2 pb-3">
      <IosStatusBar dark time="09:41" />
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-white tracking-wider">prod-k8s-fra1</span>
        </div>
        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
          48/48 Pods OK
        </span>
      </div>
    </div>

    {/* İçerik */}
    <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden text-[10px]">
      <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-950/40 to-[#0d1117] border border-emerald-500/30">
        <div className="text-[9px] text-emerald-400">P99 LATENCY & THROUGHPUT</div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-white">12<span className="text-sm font-normal text-emerald-400">ms</span></span>
          <span className="text-xs text-emerald-300 font-bold">28.4K req/sec</span>
        </div>
        
        <div className="h-6 w-full flex items-end gap-1 mt-2">
          {[40, 55, 30, 80, 65, 45, 90, 75, 50, 85, 95, 60, 45, 70, 80, 60, 50, 65, 80, 75].map((val, i) => (
            <div
              key={i}
              style={{ height: `${val}%` }}
              className="flex-1 bg-emerald-500/70 rounded-xs"
            />
          ))}
        </div>
      </div>

      <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Kubernet Microservice Pods</div>

      <div className="flex flex-col gap-1.5 flex-1">
        {[
          { name: "auth-service-v3", pods: "8/8", cpu: "18%", lat: "4ms", status: "HEALTHY", color: "text-emerald-400" },
          { name: "checkout-order-api", pods: "16/16", cpu: "42%", lat: "14ms", status: "HEALTHY", color: "text-emerald-400" },
          { name: "payment-stripe-gateway", pods: "6/6", cpu: "28%", lat: "22ms", status: "HEALTHY", color: "text-emerald-400" },
          { name: "elastic-search-cluster", pods: "4/4", cpu: "78%", lat: "35ms", status: "HIGH_LOAD", color: "text-amber-400" },
        ].map((svc, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-2 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-white">{svc.name}</div>
              <div className="text-[9px] text-white/50">Pods: {svc.pods} • CPU: {svc.cpu}</div>
            </div>
            <div className="text-right">
              <div className={`text-[10px] font-bold ${svc.color}`}>{svc.status}</div>
              <div className="text-[9px] text-white/40">{svc.lat}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black/60 rounded-lg p-2 border border-white/10 text-[9px] text-white/70">
        <span className="text-emerald-400 font-bold">[AUTOSCALER]: </span>
        <span>checkout-order-api pod adedi 12'den 16'ya otonom artırıldı.</span>
      </div>
    </div>

    {/* Alt Bar */}
    <div className="bg-[#090d16] border-t border-white/10 px-6 py-2 flex items-center justify-between text-[10px] text-white/50">
      <span className="text-emerald-400 font-bold">● Telemetri</span>
      <span>Podlar</span>
      <span>Alarmlar (0)</span>
      <span>Loglar</span>
    </div>
  </div>
);

// Map of custom mobile mockups by project id
// NOT: "mobil-uygulama" (Cross-Platform Mobil Mühendislik) projesinin orijinal yüksek kaliteli ekran görüntüsü (/showcase/mobil-mobile.png) kullanıcının talebi doğrultusunda korunmuştur.
export const CUSTOM_MOBILE_MOCKUPS: Record<string, React.ReactNode> = {
  // Projeler sayfası ID'leri
  "b2b-bayi": <B2BMobileMockup />,
  "crm-yonetim": <CrmMobileMockup />,
  "kurumsal-panel": <CrmMobileMockup />,
  "erp-sistemleri": <ErpMobileMockup />,
  "seo-analitik": <SeoMobileMockup />,
  "seo-web": <SeoMobileMockup />,
  "e-ticaret": <EcommerceMobileMockup />,
  "depo-sistemleri": <WmsMobileMockup />,
  "ai-otomasyon": <AiBotMobileMockup />,
  "mikroservis": <MicroserviceMobileMockup />,

  // Ana sayfa SelectedWorksSection ID eşleşmeleri
  "b2b-portal": <B2BMobileMockup />,
  "dark-crm": <CrmMobileMockup />,
  "cloud-erp": <ErpMobileMockup />,
  "headless-commerce": <EcommerceMobileMockup />,
  "smart-wms": <WmsMobileMockup />,
  "whatsapp-ai": <AiBotMobileMockup />,
  "microservices": <MicroserviceMobileMockup />,
  "seo-platform": <SeoMobileMockup />,
};
