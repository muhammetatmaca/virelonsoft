import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Projelerimiz", to: "/projects" },
  { label: "Hizmetlerimiz", to: "/supply" },
  { label: "Seo Optimizasyonu", to: "/ai" },
  { label: "Hakkımızda", to: "/equator" },
  { label: "Teklif Alın", to: "/tickets" },
];

export function AppNavbar() {
  const location = useLocation();

  return (
    <nav className="fixed left-1/2 top-0 z-40 -translate-x-1/2 max-w-[96vw] pointer-events-auto">
      <div className="flex items-center gap-3.5 sm:gap-6 md:gap-8 lg:gap-10 rounded-b-2xl md:rounded-b-3xl bg-black/95 backdrop-blur-2xl border-x border-b border-[#E1E0CC]/25 px-4 py-2.5 sm:px-8 md:px-10 shadow-[0_12px_45px_rgba(0,0,0,0.95)] overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Brand Icon (Clicking takes user back to homepage) */}
        <Link
          to="/"
          aria-label="Virelonsoft Anasayfa"
          className="group flex items-center shrink-0 pr-0.5 sm:pr-1 transition-transform hover:scale-110 active:scale-95"
        >
          <img
            src="/virelon-v-icon.png"
            alt="Virelonsoft"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Navigation Links */}
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`text-[11px] whitespace-nowrap font-medium transition-colors sm:text-xs md:text-sm ${
                isActive
                  ? "text-[#E1E0CC] font-semibold"
                  : "text-[#E1E0CC]/80 hover:text-[#E1E0CC]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
