import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  Cpu,
  GitCommitHorizontal,
  Layers,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ActionNode } from "../components/ui/action-node";
import { MorphingTabs, type MorphingTabsItem } from "../components/motion/morphing-tabs";

const COMMUNITY_FILE_ID = "76d3a78d-dc15-4fee-a0b4-a7a46ac6a2c4";
const SPLINE_PUBLIC_URL = "https://my.spline.design/glassmorphlandingpage-CbjtHUw04FiR1zh8y93lK0s5/";
const DEFAULT_PREVIEW_UUID = "0d817857-bb7c-49c8-aa10-98544ffc4ba6";

interface SplineCommunityMeta {
  title: string;
  description: string;
  handle: string;
  userName: string;
  views: number;
  likes: number;
  remixes: number;
  thumbnail: string;
  tags: string[];
}

export function SplineMorphPage() {
  // Spline 3D Scene state
  const [previewUuid, setPreviewUuid] = useState<string>(DEFAULT_PREVIEW_UUID);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [expanded3D, setExpanded3D] = useState(false);
  const [splineMeta, setSplineMeta] = useState<SplineCommunityMeta>({
    title: "Glassmorph landing page",
    description: "glassmorph landing page with cursor tracking",
    handle: "DesignGabor",
    userName: "Design Gabor",
    views: 59859,
    likes: 2555,
    remixes: 12397,
    thumbnail: `https://community-filepreview.spline.design/webp-90/${COMMUNITY_FILE_ID}.webp`,
    tags: ["cursor", "tracking", "color", "yellow", "green", "glass", "landing", "spline", "design", "web"],
  });

  // ActionNode interactive knobs
  const [reach, setReach] = useState(25);
  const [bounce, setBounce] = useState(20);
  const [stagger, setStagger] = useState(55);
  const [count, setCount] = useState(4);
  const [corner, setCorner] = useState(20);
  const [lastAction, setLastAction] = useState<string>("Hover the Node 07 card corner to unfold actions");

  // MorphingTabs state
  const [activeTab, setActiveTab] = useState<string | null>("node-bench");
  const [tabOrderLog, setTabOrderLog] = useState<string[]>([
    "node-bench",
    "flow-canvas",
    "spline-stage",
    "spring-geometry",
  ]);

  useEffect(() => {
    let cancelled = false;
    async function fetchSplineScene() {
      try {
        const [metaRes, openRes] = await Promise.all([
          fetch(`https://community-api.spline.design/file/${COMMUNITY_FILE_ID}`),
          fetch(`https://community-api.spline.design/file/open/${COMMUNITY_FILE_ID}`),
        ]);
        if (!cancelled && metaRes.ok) {
          const metaData = await metaRes.json();
          setSplineMeta((prev) => ({
            ...prev,
            title: metaData.title ?? prev.title,
            description: metaData.description ?? prev.description,
            handle: metaData.handle ?? prev.handle,
            userName: metaData.userName ?? prev.userName,
            views: metaData.views ?? prev.views,
            likes: metaData.likes ?? prev.likes,
            remixes: metaData.remixes ?? prev.remixes,
            thumbnail: metaData.thumbnail ?? prev.thumbnail,
            tags: metaData.tags ?? prev.tags,
          }));
        }
        if (!cancelled && openRes.ok) {
          const openData = await openRes.json();
          if (openData?.uuidFile) {
            setPreviewUuid(openData.uuidFile);
          }
        }
      } catch {
        // Fallback previewUuid is already set
      }
    }
    fetchSplineScene();
    return () => {
      cancelled = true;
    };
  }, []);

  // Compute live spring math from ActionNode's springOf(bounce)
  const k = 0.08 + (bounce / 100) * 0.16;
  const d = 0.62 + (bounce / 100) * 0.2;
  const zeta = -Math.log(d) / (2 * Math.sqrt(k));
  const airGapPx = 6 + (Math.min(40, Math.max(20, reach)) / 100) * 24;

  const tabs: MorphingTabsItem[] = [
    {
      id: "node-bench",
      label: "Action Node",
      icon: <GitCommitHorizontal className="size-4" />,
      content: (
        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          {/* ActionNode Live Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center rounded-3xl bg-[#0e0e12] px-6 py-4 border border-black/10 shadow-inner relative overflow-visible">
            <div className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span>HOVER CARD TO UNFOLD CORNER FAN</span>
            </div>

            <div className="my-2 flex items-center justify-center">
              <ActionNode
                reach={reach}
                bounce={bounce}
                stagger={stagger}
                count={count}
                corner={corner}
                onAction={(id, label) =>
                  setLastAction(`Triggered "${label}" (${id}) at bounce=${bounce}, corner=${corner}px`)
                }
              />
            </div>

            <div className="w-full rounded-xl bg-white/5 px-3.5 py-2 text-center font-mono text-xs text-lime-300 border border-white/10">
              {lastAction}
            </div>
          </div>

          {/* Parameter Knobs Panel */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-lime-300 mb-2">
                <Sliders className="size-3" />
                Corner Arc & Spring Bench
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                Concentric Corner Trajectory Controls
              </h3>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                Actions emerge directly along an offset path concentric with the card’s top-right corner radius, hiding inside the diagonal when folded.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
                  <span>Spring Bounce (Tune)</span>
                  <span className="font-mono text-zinc-900">
                    {bounce} (ζ={zeta.toFixed(2)})
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={bounce}
                  onChange={(e) => setBounce(Number(e.target.value))}
                  className="accent-zinc-900 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-400">
                  0 = heavy (ζ≈0.85) · 100 = lively rebound (ζ≈0.20)
                </span>
              </label>

              <label className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
                  <span>Cascade Stagger</span>
                  <span className="font-mono text-zinc-900">
                    {stagger}% ({Math.round((stagger / 100) * 90)}ms/btn)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stagger}
                  onChange={(e) => setStagger(Number(e.target.value))}
                  className="accent-zinc-900 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-400">
                  First-to-last on open, reverse order on close
                </span>
              </label>

              <label className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
                  <span>Card Corner Radius</span>
                  <span className="font-mono text-zinc-900">{corner}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={32}
                  value={corner}
                  onChange={(e) => setCorner(Number(e.target.value))}
                  className="accent-zinc-900 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-400">
                  Mark radius scales to {Math.min(15, corner * 0.47).toFixed(1)}px
                </span>
              </label>

              <label className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-700">
                  <span>Reach (Air Gap)</span>
                  <span className="font-mono text-zinc-900">
                    {reach} ({airGapPx.toFixed(1)}px)
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={40}
                  value={reach}
                  onChange={(e) => setReach(Number(e.target.value))}
                  className="accent-zinc-900 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-400">
                  Concentric clearance between card & buttons
                </span>
              </label>
            </div>

            {/* Button Count Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
              <span className="text-xs font-medium text-zinc-700">
                Visible Corner Actions (Count: {count})
              </span>
              <div className="flex items-center gap-2">
                {[2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                      count === n
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {n} Buttons
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "flow-canvas",
      label: "Flow Canvas",
      icon: <Workflow className="size-4" />,
      content: (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                Multi-Step Automation Graph
              </h3>
              <p className="text-sm text-zinc-600">
                Hover each node card to inspect how different corner geometries and spring tunings feel side-by-side.
              </p>
            </div>
            <span className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-mono text-lime-300">
              3 Active Pipeline Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 rounded-3xl bg-[#0e0e12] p-6 sm:p-8 md:grid-cols-3 place-items-center">
            <ActionNode
              nodeName="Node 01 · Ingest"
              description="Streams webhook payloads from GitHub and normalizes diff hunks into structured AST events."
              corner={6}
              bounce={15}
              stagger={40}
              count={3}
              onAction={(_, label) => setLastAction(`Node 01: ${label}`)}
            />
            <ActionNode
              nodeName="Node 07 · Synthesize"
              description="Reads the thread, writes a summary, and posts it back to the channel it came from."
              corner={20}
              bounce={50}
              stagger={55}
              count={4}
              onAction={(_, label) => setLastAction(`Node 07: ${label}`)}
            />
            <ActionNode
              nodeName="Node 12 · Dispatch"
              description="Routes verified release notes to Slack and triggers production canary rollout."
              corner={32}
              bounce={85}
              stagger={75}
              count={4}
              onAction={(_, label) => setLastAction(`Node 12: ${label}`)}
            />
          </div>
        </div>
      ),
    },
    {
      id: "spline-stage",
      label: "Spline 3D",
      icon: <Box className="size-4" />,
      content: (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-zinc-900 mb-2">
                <span>Direct URL: my.spline.design/glassmorphlandingpage-CbjtHUw04FiR1zh8y93lK0s5/</span>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900">
                {splineMeta.title} — by @{splineMeta.handle}
              </h3>
              <p className="text-sm text-zinc-600 mt-1">
                {splineMeta.description} · {splineMeta.views.toLocaleString()} views ·{" "}
                {splineMeta.remixes.toLocaleString()} remixes
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={SPLINE_PUBLIC_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                Open Live Spline
                <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href={`https://community.spline.design/file/${COMMUNITY_FILE_ID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
              >
                Community Page
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="text-xs font-mono uppercase text-zinc-400">Direct Spline Link</div>
              <div className="mt-1 font-mono text-xs font-semibold text-zinc-900 break-all">
                {SPLINE_PUBLIC_URL}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="text-xs font-mono uppercase text-zinc-400">Interaction Mode</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900">
                Real-Time 3D Cursor Tracking & Glass Refraction
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="text-xs font-mono uppercase text-zinc-400">Scene Tags</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {splineMeta.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "spring-geometry",
      label: "Spring Math",
      icon: <Cpu className="size-4" />,
      content: (
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">
              Frame-Rate Independent Damping & Offset Arc Mathematics
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Both <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs">ActionNode</code> and{" "}
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs">@beui/morphing-tabs</code>{" "}
              use analytical path parameterization paired with custom spring physics.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="text-xs font-mono uppercase text-zinc-400">
                1. Damping Ratio (ζ)
              </span>
              <div className="font-mono text-sm font-semibold text-zinc-900">
                ζ = -ln(d) / (2 · √k) = {zeta.toFixed(3)}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Velocity decay is raised to <code className="text-zinc-900">Math.pow(d, dt)</code> where{" "}
                <code className="text-zinc-900">dt</code> is measured in 60ths of a second, ensuring identical energy decay even across dropped frames.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="text-xs font-mono uppercase text-zinc-400">
                2. Concentric Ride Path
              </span>
              <div className="font-mono text-sm font-semibold text-zinc-900">
                arc = corner ({corner}px) + off ({(airGapPx + 18).toFixed(1)}px)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Instead of striking a fixed circle from one interior point, buttons ride the card’s own offset contour: straight along top, concentric around the corner arc, and straight down the right edge.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="text-xs font-mono uppercase text-zinc-400">
                3. Liquid Notch Join
              </span>
              <div className="font-mono text-sm font-semibold text-zinc-900">
                Order: [{tabOrderLog.join(" → ")}]
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Drag any tab horizontally in the rail above to reorder rooms—the SVG cubic-Bézier liquid surface morphs continuously with the dragged tab.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#07080a] text-white selection:bg-lime-400/30 selection:text-lime-200 pt-20 sm:pt-24 pb-12">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 space-y-10">
        {/* Section 1: Interactive Spline 3D Glassmorph Hero Stage + Floating ActionNode Overlay */}
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-[#0d0f12] shadow-2xl">
          <div
            className={`relative w-full transition-all duration-500 ${
              expanded3D ? "h-[82vh]" : "h-[540px] sm:h-[620px]"
            }`}
          >
            {/* Preview poster while interactive 3D iframe initializes */}
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d0f12]">
                <img
                  src={splineMeta.thumbnail}
                  alt={splineMeta.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-45 blur-xs"
                />
                <div className="relative z-10 flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-black/75 px-6 py-4 backdrop-blur-xl">
                  <RefreshCw className="h-5 w-5 animate-spin text-lime-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-200">
                    Loading Spline 3D Glassmorph Scene...
                  </span>
                </div>
              </div>
            )}

            {/* Live Interactive Spline Scene directly from https://my.spline.design/glassmorphlandingpage-CbjtHUw04FiR1zh8y93lK0s5/ */}
            <iframe
              src={SPLINE_PUBLIC_URL}
              title={splineMeta.title}
              onLoad={() => setIframeLoaded(true)}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              className="h-full w-full border-0"
            />

            {/* Top-left Glassmorphism Badge */}
            <div className="pointer-events-none absolute left-5 top-5 z-20 flex flex-wrap items-center gap-2">
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-lime-400" />
                <span>{splineMeta.title}</span>
                <span className="text-white/40">·</span>
                <span className="font-mono text-[11px] text-lime-300">@{splineMeta.handle}</span>
              </div>
            </div>

            {/* Top-right Controls */}
            <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExpanded3D((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-xl transition hover:bg-black/80 cursor-pointer"
              >
                {expanded3D ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5" />
                    Compact Stage
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5" />
                    Expand 3D Stage
                  </>
                )}
              </button>
              <a
                href={SPLINE_PUBLIC_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/50 bg-lime-400/20 px-3.5 py-2 text-xs font-semibold text-lime-200 backdrop-blur-xl transition hover:bg-lime-400/30"
              >
                Live Spline Link
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://community.spline.design/file/${COMMUNITY_FILE_ID}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-2 text-xs font-medium text-white/80 backdrop-blur-xl transition hover:bg-black/80"
              >
                Community
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>

            {/* Bottom-right Floating ActionNode on top of the 3D scene */}
            <div className="hidden md:flex absolute bottom-4 right-8 z-20 items-center justify-center">
              <ActionNode
                reach={reach}
                bounce={bounce}
                stagger={stagger}
                count={count}
                corner={corner}
                onAction={(id, label) =>
                  setLastAction(`Triggered "${label}" (${id}) from 3D Stage overlay`)
                }
              />
            </div>
          </div>
        </section>

        {/* Section 2: @beui/morphing-tabs Interactive Workbench */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4 px-1">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-400">
                <Layers className="h-3.5 w-3.5" />
                <span>@beui/morphing-tabs · Drag tabs to reorder</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Liquid Surface Morphing Tabs & ActionNode Studio
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              Drag any tab horizontally or use Alt + ArrowLeft/Right to reorder
            </p>
          </div>

          <MorphingTabs
            items={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
            onOrderChange={(nextOrder) => setTabOrderLog(nextOrder)}
            ariaLabel="Spline and ActionNode Studio Tabs"
          />
        </section>
      </main>
    </div>
  );
}

export default SplineMorphPage;
