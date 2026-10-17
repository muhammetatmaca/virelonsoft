import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface WhatsAppFloatingButtonProps {
  phone?: string;
  displayPhone?: string;
  message?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phone = "905070084069",
  displayPhone = "0507 008 4069",
  message = "Merhaba, Virelonsoft yazılım hizmetleri hakkında bilgi almak istiyorum.",
}) => {
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.aside
      aria-label="WhatsApp İletişim"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 right-3 sm:top-4 sm:right-5 md:top-5 md:right-6 z-50 pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Bize Ulaşın: ${displayPhone}`}
        className="group relative flex items-center gap-2 sm:gap-2.5 rounded-full bg-black/85 hover:bg-black/95 backdrop-blur-xl border border-[#E1E0CC]/20 hover:border-[#25D366]/70 px-3 py-1.5 sm:px-4 sm:py-2 text-[#E1E0CC] shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.22)] transition-all duration-300"
      >
        {/* Minimal WhatsApp Vector Icon */}
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#25D366] shrink-0 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.74 14.85 12.19 15.91C12.78 16.16 13.23 16.31 13.59 16.42C14.18 16.61 14.71 16.58 15.14 16.52C15.62 16.45 16.62 15.91 16.83 15.33C17.04 14.74 17.04 14.24 16.98 14.14C16.92 14.04 16.76 13.98 16.52 13.86C16.27 13.74 15.08 13.15 14.86 13.07C14.64 12.99 14.47 12.95 14.31 13.19C14.15 13.43 13.68 13.98 13.54 14.14C13.4 14.31 13.26 14.33 13.02 14.21C12.78 14.09 12.01 13.84 11.09 13.02C10.37 12.38 9.89 11.59 9.75 11.35C9.61 11.11 9.73 10.98 9.86 10.86C9.97 10.75 10.1 10.58 10.22 10.44C10.34 10.3 10.38 10.2 10.46 10.04C10.54 9.88 10.5 9.74 10.44 9.62C10.38 9.5 9.91 8.34 9.71 7.87C9.52 7.41 9.32 7.47 9.17 7.46C9.03 7.46 8.87 7.45 8.71 7.45C8.55 7.45 8.28 7.51 8.06 7.76" />
        </svg>

        {/* Label */}
        <span className="text-[11px] sm:text-xs font-medium tracking-tight text-[#E1E0CC] group-hover:text-white transition-colors">
          Bize Ulaşın
        </span>

        {/* Phone number badge on larger screens */}
        <span className="hidden sm:inline-block text-[11px] font-mono text-[#E1E0CC]/60 group-hover:text-[#E1E0CC] transition-colors border-l border-[#E1E0CC]/15 pl-2">
          {displayPhone}
        </span>

        {/* Subtle arrow */}
        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E1E0CC]/40 group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </a>
    </motion.aside>
  );
};
