"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ETFEngine } from "@/lib/types";
import { Header } from "@/components/shared/Header";

// Lazy load route components for code splitting
const HomeView = dynamic(() => import("@/components/home/HomeView").then(mod => ({ default: mod.HomeView })), {
  loading: () => (
    <div className="w-full max-w-7xl mx-auto">
      <div className="animate-pulse space-y-8">
        <div className="h-64 bg-zinc-800/50 rounded-lg"></div>
        <div className="h-96 bg-zinc-800/50 rounded-lg"></div>
      </div>
    </div>
  ),
});

const ControlCenterView = dynamic(() => import("@/components/control-center/ControlCenterView").then(mod => ({ default: mod.ControlCenterView })), {
  loading: () => (
    <div className="w-full py-8">
      <div className="animate-pulse space-y-8">
        <div className="h-64 bg-zinc-800/50 rounded-lg"></div>
        <div className="h-96 bg-zinc-800/50 rounded-lg"></div>
      </div>
    </div>
  ),
});

type MainTabType = "home" | "control-center";
type BookmarkType = "news" | "definitions" | "top-performers" | "database";
type ControlTabType = "rocketship" | "flight-log" | "flight-path";

export default function Home() {
  const scrollToSection = (bookmark: BookmarkType) => {
    const element = document.getElementById(bookmark);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [activeTab, setActiveTab] = useState<MainTabType>("home");
  const [controlCenterTab, setControlCenterTab] = useState<ControlTabType>("rocketship");
  const [engines, setEngines] = useState<ETFEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeBookmark, setActiveBookmark] = useState<BookmarkType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEngines(data.engines || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Track active bookmark based on scroll position (throttled with requestAnimationFrame)
  const rafIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (activeTab !== "home") return;

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Schedule scroll handling on next animation frame
      rafIdRef.current = requestAnimationFrame(() => {
        const sections: BookmarkType[] = ["news", "definitions", "top-performers", "database"];
        const scrollPosition = window.scrollY + 150; // Offset for header

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
              setActiveBookmark(sections[i]);
              return;
            }
          }
        }
        setActiveBookmark(null);
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading ETF data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Make sure the Excel file exists at public/PhysOfWealth.xlsx
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tickers={engines.map(e => e.ticker)}
        activeBookmark={activeBookmark}
        onBookmarkClick={(bookmark) => {
          // Switch to home tab if not already there
          if (activeTab !== "home") {
            setActiveTab("home");
            // Wait for tab switch before scrolling
            setTimeout(() => {
              scrollToSection(bookmark);
            }, 100);
          } else {
            scrollToSection(bookmark);
          }
        }}
        controlCenterTab={controlCenterTab}
        onControlCenterTabChange={setControlCenterTab}
      />
      <div className="pt-24 md:pt-28 relative z-10">
        {/* Tagline at top of page - only for home tab */}
        {activeTab === "home" && (
          <div className="container mx-auto px-4 pt-4 pb-4">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold text-center">
              Explore ETF engines, track performance, and chart your path to financial freedom
            </p>
          </div>
        )}

        {/* News Articles Section */}
        {activeTab === "home" && (
          <div id="news" className="w-full px-4 mb-12 scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center w-full">
              {/* Large Featured Article */}
              <article 
                className="group relative w-full md:col-span-2 lg:col-span-2 h-80 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f1.jpg"
                  alt="Revolutionary ETF Classification System"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="absolute top-4 left-4 text-xs text-white font-bold bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">Featured</div>
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">2h ago</div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Revolutionary ETF Classification System Transforms Portfolio Analysis</h3>
                  <p className="text-white/90 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    Financial analysts are hailing the new Physics of Wealth engine classification framework as a breakthrough in ETF evaluation. The system categorizes funds into five distinct propulsion types—Nuclear, Elite, Stabilized, Baseline, and Wind-Dependent—each with unique performance characteristics and risk profiles. Early adopters report significant improvements in portfolio optimization, with the new metrics providing clearer insights into distribution stability, capital efficiency, and long-term growth potential.
                  </p>
                </div>
              </article>

              {/* Medium Article 1 */}
              <article 
                className="group relative w-full h-80 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f2.jpg"
                  alt="Nuclear Propulsion ETFs See Record Inflows"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="absolute top-4 left-4 text-xs text-white font-bold bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">Featured</div>
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">5h ago</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">Nuclear Propulsion ETFs See Record Inflows</h3>
                  <p className="text-white/90 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    High-yield ETF engines classified as Nuclear Propulsion are attracting unprecedented investor interest. These funds generate extreme thrust with default yields averaging 10%, though analysts caution about meaningful NAV drag requiring active monitoring.
                  </p>
                </div>
              </article>

              {/* Medium Article 2 */}
              <article 
                className="group relative w-full h-64 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f3.jpg"
                  alt="Elite Propulsion Funds Maintain Strong Performance"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">1d ago</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">Elite Propulsion Funds Maintain Strong Performance</h3>
                  <p className="text-white/90 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    Elite Propulsion ETFs continue to demonstrate exceptional reliability, with 7.5% default yields and manageable 8% NAV drag. Portfolio managers praise their high Engine Quality scores and suitability for long-duration deployment.
                  </p>
                </div>
              </article>

              {/* Small Article 1 */}
              <article 
                className="group relative w-full h-64 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f4.jpg"
                  alt="Stabilized Engines Gain Traction"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">2d ago</div>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight">Stabilized Engines Gain Traction</h3>
                  <p className="text-white/90 text-xs leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    Investors seeking balance are increasingly turning to Stabilized Propulsion ETFs, which offer moderate 5.5% yields with minimal 4% NAV drag.
                  </p>
                </div>
              </article>

              {/* Small Article 2 */}
              <article 
                className="group relative w-full h-64 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f5.jpg"
                  alt="Escape Ratio Metrics Reshape Analysis"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-4">
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">3d ago</div>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight">Escape Ratio Metrics Reshape Analysis</h3>
                  <p className="text-white/90 text-xs leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    The new Escape Ratio (ER) metric is helping investors identify ETFs with superior capital deployment efficiency.
                  </p>
                </div>
              </article>

              {/* Medium Article 3 */}
              <article 
                className="group relative w-full md:col-span-2 h-64 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src="/news_images/f6.jpg"
                  alt="Distribution Stability Index Becomes Key Selection Criterion"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 group-hover:to-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="absolute top-4 left-4 text-xs text-white font-bold bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">Featured</div>
                  <div className="absolute top-4 right-4 text-xs text-white/80 font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded">4d ago</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">Distribution Stability Index Becomes Key Selection Criterion</h3>
                  <p className="text-white/90 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    The Distribution Stability Index (DSI) is emerging as a critical factor for income-focused investors. Funds with Ultra-Stable ratings are commanding premium valuations, while those with moderate stability require careful portfolio positioning to manage variability.
                  </p>
                </div>
              </article>
            </div>
          </div>
        )}

        <div className={activeTab === "control-center" ? "w-full py-8" : "container mx-auto px-4 py-8"}>
          {activeTab === "home" && (
            <Suspense fallback={
              <div className="w-full max-w-7xl mx-auto">
                <div className="animate-pulse space-y-8">
                  <div className="h-64 bg-zinc-800/50 rounded-lg"></div>
                  <div className="h-96 bg-zinc-800/50 rounded-lg"></div>
                </div>
              </div>
            }>
              <HomeView engines={engines} />
            </Suspense>
          )}
          {activeTab === "control-center" && (
            <Suspense fallback={
              <div className="w-full py-8">
                <div className="animate-pulse space-y-8">
                  <div className="h-64 bg-zinc-800/50 rounded-lg"></div>
                  <div className="h-96 bg-zinc-800/50 rounded-lg"></div>
                </div>
              </div>
            }>
              <ControlCenterView engines={engines} activeTab={controlCenterTab} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
