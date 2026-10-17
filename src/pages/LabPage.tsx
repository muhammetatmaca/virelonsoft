import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

declare global {
  interface Window {
    __THRINE_FONT_PATCHED__?: boolean;
  }
}

function installThrineFontCorsFix() {
  if (typeof window === "undefined" || window.__THRINE_FONT_PATCHED__) return;
  window.__THRINE_FONT_PATCHED__ = true;

  const rewriteFontUrl = (url: string) => {
    if (url.startsWith("https://thrine.app/fonts/")) {
      return url.replace("https://thrine.app/fonts/", `${window.location.origin}/fonts/`);
    }
    return url;
  };

  // Patch main-thread fetch for Thrine typeface JSON files (missing CORS headers on thrine.app/fonts/*)
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const rawUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    const rewritten = rewriteFontUrl(rawUrl);
    if (rewritten !== rawUrl) {
      return originalFetch(rewritten, init);
    }
    return originalFetch(input, init);
  };

  // Patch Worker.prototype.postMessage so textGeometry.worker receives the local same-origin font URL
  if (typeof Worker !== "undefined") {
    const originalPostMessage = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (message: unknown, ...rest: unknown[]) {
      if (
        message &&
        typeof message === "object" &&
        "source" in message &&
        message.source &&
        typeof message.source === "object" &&
        "url" in message.source &&
        typeof message.source.url === "string"
      ) {
        const nextUrl = rewriteFontUrl(message.source.url);
        if (nextUrl !== message.source.url) {
          message = {
            ...message,
            source: {
              ...message.source,
              url: nextUrl,
            },
          };
        }
      }
      return (originalPostMessage as (...args: unknown[]) => void).call(this, message, ...rest);
    };
  }
}

export const LabPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    installThrineFontCorsFix();

    const existingScript = document.querySelector(
      'script[src="https://thrine.app/embed/v1.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://thrine.app/embed/v1.js";
      document.head.appendChild(script);
    }

    const host = mountRef.current;
    if (!host) return;

    // Create a fresh <model-embed> instance on mount so Thrine's internal `this.disposed` state is always clean
    host.innerHTML = "";
    const embedEl = document.createElement("model-embed");
    embedEl.setAttribute("project", "e_c5a70848af2dd0780d74");
    embedEl.style.display = "block";
    embedEl.style.width = "100%";
    embedEl.style.aspectRatio = "1066/551";
    host.appendChild(embedEl);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-[#E1E0CC] flex flex-col pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 pb-10">

      <div className="flex-1 flex items-center justify-center w-full">
        <div
          ref={mountRef}
          className="w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10 bg-neutral-950"
        />
      </div>
    </main>
  );
};
