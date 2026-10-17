import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Compass,
  ExternalLink,
  Mail,
  MoveRight,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  image: string;
  award: string;
  href: string;
  accent: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "books-of-ye",
    title: "The Books of Ye",
    category: "Concept & WebGL",
    year: "2022",
    tagline:
      "A conceptual NFT web experience depicting the five Books of Moses, in which every divine passage is re-imagined.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    award: "Site of the Day · Awwwards",
    href: "https://www.awwwards.com/sites/the-books-of-ye",
    accent: "#B88E52",
  },
  {
    id: "wow-concept",
    title: "WOW Concept",
    category: "Retail & Interactive",
    year: "2023",
    tagline:
      "The world's first concept store in Madrid revolutionizing retail with high-fashion dynamic spatial gamification.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    award: "FWA of the Month",
    href: "https://wowconcept.com/",
    accent: "#E25822",
  },
  {
    id: "the-roger-hub",
    title: "The Roger Hub",
    category: "3D Experience",
    year: "2023",
    tagline:
      "An immersive web experience showcasing the tennis-inspired On sneakers born out of partnership with Roger Federer.",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    award: "Site of the Year Nominee",
    href: "https://www.on-running.com/",
    accent: "#2D7F5E",
  },
  {
    id: "avroko",
    title: "AvroKO Architecture",
    category: "Editorial & Architecture",
    year: "2021",
    tagline:
      "Global interior architecture portfolio gathering luxury hospitality, restaurant, and bar spaces around the world.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    award: "Site of the Day",
    href: "https://www.avroko.com/",
    accent: "#7C6354",
  },
  {
    id: "prada",
    title: "Prada Employees Outlet",
    category: "Minimalist eCommerce",
    year: "2021",
    tagline:
      "Online store gathering archival Prada collection seasons with ultra-restrained Italian editorial typography.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    award: "Awwwards Developer Award",
    href: "https://prada.com/",
    accent: "#1D1D1B",
  },
  {
    id: "om-swami",
    title: "Om Swami Himalayan",
    category: "Spiritual & Narrative",
    year: "2022",
    tagline:
      "Serial entrepreneur turned Himalayan monk. Deep interactive narrative blending serene soundscapes with meditation.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    award: "FWA of the Day",
    href: "https://os.me/",
    accent: "#D48B47",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Blurring the line between design and code, Niccolò has an unmatched eye for detail and precise execution in his work which pushes the whole industry forward.",
    author: "Sam Day",
    role: "Creative Director & Designer",
    company: "Freelance",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "Niccolò‘s eye for detail & design as well as his impeccable aesthetics, make him one of the true leaders in today’s digital design and creative coding scene.",
    author: "Sofia Papadopoulou",
    role: "Designer & Art Director",
    company: "Independent",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "A high-skilled designer who creates novel experiences with ease and craft. His signature is more vivid on each project he launches and this is only the start.",
    author: "Bruno Arizio",
    role: "Creative Director",
    company: "Studio BA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    quote:
      "A very promising Creative Director and Interactive Designer given his natural aesthetic taste and innate instinct for functionality and motion typography.",
    author: "Enea Rossi",
    role: "Co-Founder",
    company: "Adoratorio Studio",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

const AWARDS_COUNTER = [
  { label: "Site of the Day", count: "9", sub: "Awwwards" },
  { label: "Site of the Month", count: "1", sub: "Winners" },
  { label: "FWA of the Day", count: "6", sub: "Awards" },
  { label: "Acclaimed Mentions", count: "8", sub: "Honors" },
];

export function MirandaPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse tilt on the big masthead stamp
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    damping: 25,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#CDC6BE] text-[#1D1D1B] font-serif selection:bg-[#1D1D1B] selection:text-[#CDC6BE] overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(rgba(29, 29, 27, 0.08) 1px, transparent 0)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Newspaper Top Navigation */}
      <nav className="sticky top-0 z-40 border-b-2 border-[#1D1D1B] bg-[#CDC6BE]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1B] bg-transparent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D1D1B] transition hover:bg-[#1D1D1B] hover:text-[#CDC6BE]"
            >
              <ArrowLeft className="size-3.5" />
              Virelonsoft
            </Link>
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
              Amsterdam, NL · 52.3676° N, 4.9041° E
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
              <a
                href="#work"
                className="hover:underline underline-offset-4 decoration-2"
              >
                Selected Work
              </a>
              <a
                href="#about"
                className="hover:underline underline-offset-4 decoration-2"
              >
                About & Awards
              </a>
              <a
                href="#testimonials"
                className="hover:underline underline-offset-4 decoration-2"
              >
                Press
              </a>
            </div>

            <button
              type="button"
              onClick={() => setSoundOn(!soundOn)}
              className="rounded-full border border-[#1D1D1B] px-3 py-1 font-mono text-xs uppercase tracking-wider transition hover:bg-[#1D1D1B] hover:text-[#CDC6BE] cursor-pointer"
            >
              Sound: {soundOn ? "On" : "Mute"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 space-y-16">
        {/* Newspaper Masthead Hero */}
        <section className="border-b-2 border-[#1D1D1B] pb-12">
          {/* Top metadata ticker */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#1D1D1B] pb-2 text-xs font-mono uppercase tracking-widest text-[#1D1D1B]/75 mb-6">
            <span>Vol. XXIII · Paper Portfolio Edition</span>
            <span>Independent Creative Director & Developer</span>
            <span>Awwwards Site of the Year Nominee</span>
          </div>

          {/* Giant Editorial Headline: "MIRANDA" */}
          <div className="relative overflow-hidden py-4 text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17vw] sm:text-[19vw] font-black tracking-[-0.07em] leading-[0.8] uppercase select-none text-[#1D1D1B] font-serif"
            >
              Miranda
            </motion.h1>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
              <span className="rounded-full border border-[#1D1D1B] px-3 py-1 bg-[#1D1D1B] text-[#CDC6BE]">
                Special Issue · 2024
              </span>
              <span className="italic font-serif normal-case text-base sm:text-lg text-[#1D1D1B]/80 max-w-md text-right">
                “Crafting iconic digital artifacts through typography, motion, & creative coding.”
              </span>
            </div>
          </div>

          {/* Editorial 3-Column Split */}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 border-t-2 border-[#1D1D1B] pt-8">
            {/* Col 1: Dropcap Manifesto */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
                [ 01. The Manifesto ]
              </span>
              <p className="text-lg sm:text-xl leading-relaxed text-[#1D1D1B]/90 font-serif">
                <span className="float-left mr-3.5 mb-1 bg-[#1D1D1B] px-3.5 py-1 text-4xl sm:text-5xl font-black text-[#CDC6BE] font-serif leading-none">
                  A
                </span>
                s a multidisciplinary artisan, I start from raw matter and give life
                to iconic interactive products. Deep collaboration and obsessive
                craft turn client visions into award-winning reality, pushing the
                whole digital web forward.
              </p>
              <div className="pt-4 border-t border-[#1D1D1B]/20 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#1D1D1B]/70">
                <span>Disciplines</span>
                <span>Art Direction · WebGL · Motion</span>
              </div>
            </div>

            {/* Col 2: Stamp & Portrait Card */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4">
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative rounded-2xl border-2 border-dashed border-[#1D1D1B] p-4 bg-[#D9D3CC] shadow-xl max-w-xs w-full"
              >
                <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-[#1D1D1B]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Niccolò Miranda"
                    className="h-full w-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-wider">
                    <span className="font-bold">Postage No. 42</span>
                    <span className="block text-[10px] text-[#1D1D1B]/60">Verified Stamp</span>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-[#1D1D1B] grid place-items-center bg-[#96B59F] text-[#1D1D1B] font-mono text-xs font-bold">
                    ★
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Col 3: Role Index & Coordinates */}
            <div className="md:col-span-3 flex flex-col justify-between border-l-0 md:border-l md:border-[#1D1D1B] md:pl-6 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
                  [ 02. Accolades ]
                </span>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight">Interactive Designer</h3>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Digital Art Director</h3>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Creative Developer</h3>
                  <h3 className="text-lg font-medium italic underline underline-offset-4">
                    Based in Amsterdam, NL
                  </h3>
                </div>
              </div>

              <div className="rounded-xl border border-[#1D1D1B] p-4 bg-white/40 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-[#1D1D1B]/70">
                  <span>Recognition</span>
                  <span className="font-bold text-[#1D1D1B]">24+ Laurels</span>
                </div>
                <div className="flex justify-between text-[#1D1D1B]/70">
                  <span>Clients</span>
                  <span className="font-bold text-[#1D1D1B]">Global & Independent</span>
                </div>
                <div className="flex justify-between text-[#1D1D1B]/70">
                  <span>Availability</span>
                  <span className="font-bold text-[#2D7F5E]">Open for Q2 Projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Awards Counter Banner */}
        <section className="border-y-2 border-[#1D1D1B] py-6 bg-[#D4CDCE]/50">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1B]">
            {AWARDS_COUNTER.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-4 pt-3 md:pt-0"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1D1D1B]/60 block">
                    {item.sub}
                  </span>
                  <span className="font-serif text-lg font-bold uppercase">
                    {item.label}
                  </span>
                </div>
                <div className="font-serif text-5xl font-black text-[#1D1D1B]">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Selected Work Horizontal Showcase */}
        <section id="work" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between border-b-2 border-[#1D1D1B] pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
                [ 03. Selected Works · 2021—2024 ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-1">
                Featured Chronicles
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1D1D1B]/70">
              <MoveRight className="size-4 animate-pulse" />
              <span>Scroll horizontally to inspect archives</span>
            </div>
          </div>

          {/* Draggable Horizontal Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            {PROJECTS.map((proj, idx) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -6 }}
                className="min-w-[320px] sm:min-w-[420px] md:min-w-[480px] shrink-0 snap-start rounded-2xl border-2 border-[#1D1D1B] bg-[#E3DDD5] p-5 shadow-lg flex flex-col justify-between space-y-4"
              >
                {/* Project Header */}
                <div className="flex items-center justify-between border-b border-[#1D1D1B]/20 pb-3 font-mono text-xs uppercase tracking-wider">
                  <span className="font-bold text-[#1D1D1B]">
                    #{String(idx + 1).padStart(2, "0")} · {proj.year}
                  </span>
                  <span className="rounded-full border border-[#1D1D1B] px-2.5 py-0.5 text-[10px] bg-white/70">
                    {proj.category}
                  </span>
                </div>

                {/* Project Preview Image */}
                <div className="aspect-16/10 w-full overflow-hidden rounded-xl border border-[#1D1D1B] bg-black relative group">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-full w-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-[#1D1D1B] text-[#CDC6BE] px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                    <Trophy className="size-3 text-[#B88E52]" />
                    {proj.award}
                  </div>
                </div>

                {/* Project Body */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1B]">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1D1D1B]/75 leading-relaxed font-sans line-clamp-2">
                    {proj.tagline}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 border-t border-[#1D1D1B]/20 flex items-center justify-between">
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold tracking-wider text-[#1D1D1B] hover:underline underline-offset-4"
                  >
                    Explore Case Study
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <span className="font-mono text-xs text-[#1D1D1B]/40">
                    Live WebGL
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Testimonials & Critical Praise */}
        <section id="testimonials" className="border-t-2 border-[#1D1D1B] pt-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
                [ 04. Critical Acclaim · Quotes ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
                Words from the Industry
              </h2>
            </div>
            {/* Interactive Tab Buttons for Quotes */}
            <div className="flex flex-wrap gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  className={`rounded-full border border-[#1D1D1B] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition cursor-pointer ${
                    activeTestimonial === idx
                      ? "bg-[#1D1D1B] text-[#CDC6BE]"
                      : "bg-transparent text-[#1D1D1B] hover:bg-black/10"
                  }`}
                >
                  {t.author.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Big Quote Card */}
          <div className="rounded-3xl border-2 border-[#1D1D1B] bg-[#E1DBD2] p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute right-6 top-6 text-9xl font-black text-[#1D1D1B]/10 select-none pointer-events-none font-serif">
              “
            </div>
            <div className="relative z-10 max-w-4xl space-y-6">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-snug text-[#1D1D1B]">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-[#1D1D1B]/30">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].author}
                  className="h-12 w-12 rounded-full border border-[#1D1D1B] object-cover"
                />
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#1D1D1B]">
                    {TESTIMONIALS[activeTestimonial].author}
                  </h4>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#1D1D1B]/70">
                    {TESTIMONIALS[activeTestimonial].role} ·{" "}
                    <span className="font-semibold text-[#1D1D1B]">
                      {TESTIMONIALS[activeTestimonial].company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Vintage Infinite Marquee Strip */}
        <section className="relative overflow-hidden border-y-2 border-[#1D1D1B] py-4 bg-[#1D1D1B] text-[#CDC6BE] -mx-4 sm:-mx-8">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4 font-mono text-sm uppercase tracking-widest">
                <span>LET'S CREATE SOMETHING ICONIC TOGETHER</span>
                <span className="text-[#96B59F]">★</span>
                <span>AVAILABLE FOR FREELANCE & ART DIRECTION</span>
                <span className="text-[#96B59F]">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Editorial Newspaper Footer */}
        <footer id="about" className="pt-6 pb-12 space-y-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 border-b-2 border-[#1D1D1B] pb-10">
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-3xl font-black uppercase tracking-tight">
                Get In Touch
              </h3>
              <p className="text-sm font-sans text-[#1D1D1B]/80 max-w-md leading-relaxed">
                Interested in building an unforgettable digital piece, interactive campaign, or creative brand platform? Reach out directly via dispatch.
              </p>
              <a
                href="mailto:info@niccolomiranda.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1B] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#CDC6BE] transition hover:bg-[#333]"
              >
                <Mail className="size-4" />
                info@niccolomiranda.com
              </a>
            </div>

            <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-[#1D1D1B]/50 block font-bold">Directories</span>
              <div className="flex flex-col gap-2 text-[#1D1D1B]">
                <a
                  href="https://twitter.com/niccolomiranda"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Twitter / X <ExternalLink className="size-3 opacity-60" />
                </a>
                <a
                  href="https://instagram.com/niccolomiranda"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Instagram <ExternalLink className="size-3 opacity-60" />
                </a>
                <a
                  href="https://dribbble.com/niccolomiranda"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Dribbble <ExternalLink className="size-3 opacity-60" />
                </a>
                <a
                  href="https://www.behance.net/niccolomiranda"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Behance <ExternalLink className="size-3 opacity-60" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-[#1D1D1B]/50 block font-bold">Colophon</span>
              <p className="text-[#1D1D1B]/75 leading-relaxed font-sans normal-case text-xs">
                Designed & coded as an homage to the legendary paper portfolio of Niccolò Miranda. Built with React, Tailwind CSS, & Framer Motion.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between font-mono text-xs uppercase tracking-widest text-[#1D1D1B]/60">
            <span>Miranda© {new Date().getFullYear()}</span>
            <span>All Rights Reserved</span>
            <span>Amsterdam, The Netherlands</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default MirandaPage;
