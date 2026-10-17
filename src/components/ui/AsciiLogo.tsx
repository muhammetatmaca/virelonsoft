import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { asciiLogoData } from "../../data/asciiLogoData";

const LOGO_CHARS = "&_=!#$@%01";
const NOISE_CHARS = ".,':;~-`";

export interface AsciiLogoProps {
  areaWidth?: string | number;
  areaHeight?: number;
  fontSize?: number;
  lineHeight?: number;
  animationSpeed?: number;
  logoNoiseIntensity?: number;
  noiseMaxDensity?: number;
  textColor?: string;
}

export const AsciiLogo = ({
  areaWidth = "100%",
  areaHeight = 600,
  fontSize = 8,
  lineHeight = 10,
  animationSpeed = 80,
  logoNoiseIntensity = 0.15,
  noiseMaxDensity = 0.35,
  textColor = "text-gray-900",
}: AsciiLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noiseGrid, setNoiseGrid] = useState("");
  const [logoArt, setLogoArt] = useState("");
  const revealRowsRef = useRef(0);
  const revealingRef = useRef(true);

  const getCols = useCallback(() => {
    if (typeof areaWidth === "number") return Math.ceil(areaWidth / 4.8);
    const width = containerRef.current?.offsetWidth || (typeof window !== "undefined" ? window.innerWidth : 1200);
    return width > 0 ? Math.ceil(width / 4.8) : asciiLogoData.gridCols;
  }, [areaWidth]);

  const colsRef = useRef(getCols());

  const generateNoise = useCallback(
    (cols?: number) => {
      const c = cols ?? colsRef.current;
      const { gridRows } = asciiLogoData;
      const revealed = revealRowsRef.current;
      const startRow = gridRows - revealed;
      const rows: string[] = [];

      for (let r = 0; r < gridRows; r++) {
        if (r < startRow) {
          rows.push(" ".repeat(c));
          continue;
        }
        const progress = revealed > 0 ? (r - startRow) / revealed : 1;
        const density =
          noiseMaxDensity * Math.pow(r / (gridRows - 1), 2.5) * Math.min(1, 1.5 * progress);
        let line = "";
        for (let col = 0; col < c; col++) {
          line +=
            Math.random() < density
              ? NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
              : " ";
        }
        rows.push(line);
      }
      return rows.join("\n");
    },
    [noiseMaxDensity]
  );

  const generateLogo = useCallback(() => {
    const { brightnessMap, logoCols, logoRows } = asciiLogoData;
    const rows: string[] = [];
    for (let r = 0; r < logoRows; r++) {
      let line = "";
      for (let c = 0; c < logoCols; c++) {
        const b = brightnessMap[r]?.[c] ?? 1;
        if (b > 0.85) {
          line += " ";
        } else {
          const idx = Math.floor(
            (1 - Math.max(0, Math.min(1, b + (Math.random() - 0.5) * 2 * logoNoiseIntensity))) *
              (LOGO_CHARS.length - 1)
          );
          line += LOGO_CHARS[idx];
        }
      }
      rows.push(line);
    }
    return rows.join("\n");
  }, [logoNoiseIntensity]);

  useEffect(() => {
    colsRef.current = getCols();
    setNoiseGrid(generateNoise(colsRef.current));
    const onResize = () => {
      const next = getCols();
      if (next !== colsRef.current) {
        colsRef.current = next;
        setNoiseGrid(generateNoise(next));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getCols, generateNoise]);

  useEffect(() => {
    let inView = true;
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = !!(entry && entry.isIntersecting && !document.hidden);
        },
        { rootMargin: "100px" }
      );
      observer.observe(el);
    }

    const onVisibility = () => {
      inView = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    setNoiseGrid(generateNoise(colsRef.current));
    setLogoArt(generateLogo());
    const { gridRows } = asciiLogoData;
    const interval = setInterval(() => {
      if (!inView) return;
      if (revealingRef.current) {
        revealRowsRef.current = Math.min(revealRowsRef.current + 4, gridRows);
        if (revealRowsRef.current >= gridRows) revealingRef.current = false;
      }
      setNoiseGrid(generateNoise(colsRef.current));
      setLogoArt(generateLogo());
    }, animationSpeed);

    return () => {
      clearInterval(interval);
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [generateNoise, generateLogo, animationSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full overflow-hidden"
      style={{
        width: typeof areaWidth === "number" ? `${areaWidth}px` : areaWidth,
        maxWidth: "100%",
        height: areaHeight,
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-1 overflow-hidden font-mono whitespace-pre select-none ${textColor}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, letterSpacing: "0px" }}
      >
        {noiseGrid}
      </div>
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-1/2 items-center justify-center">
        <motion.div
          className={`pointer-events-none scale-70 font-mono whitespace-pre select-none md:scale-100 ${textColor}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, letterSpacing: "0px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {logoArt}
        </motion.div>
      </div>
    </div>
  );
};
