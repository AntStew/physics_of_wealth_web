"use client";

import { Home, Rocket, Star } from "lucide-react";

type MainTabType = "home" | "control-center";
type BookmarkType = "news" | "definitions" | "top-performers" | "database";
type ControlTabType = "rocketship" | "flight-log" | "flight-path";

interface HeaderProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  tickers?: string[];
  onBookmarkClick?: (bookmark: BookmarkType) => void;
  activeBookmark?: BookmarkType | null;
  controlCenterTab?: ControlTabType;
  onControlCenterTabChange?: (tab: ControlTabType) => void;
}

export function Header({ activeTab, onTabChange, tickers = [], onBookmarkClick, activeBookmark, controlCenterTab, onControlCenterTabChange }: HeaderProps) {
  const bookmarks = [
    { id: "news" as BookmarkType, label: "News" },
    { id: "definitions" as BookmarkType, label: "Definitions" },
    { id: "top-performers" as BookmarkType, label: "Top Performers" },
    { id: "database" as BookmarkType, label: "Database" },
  ];

  const controlCenterTabs = [
    { id: "rocketship" as ControlTabType, label: "Control Center" },
    { id: "flight-log" as ControlTabType, label: "Flight Log" },
    { id: "flight-path" as ControlTabType, label: "Flight Path Projection" },
  ];

  // Duplicate tickers for seamless infinite loop
  const duplicatedTickers = tickers.length > 0 
    ? [...tickers, ...tickers, ...tickers]
    : [];

  // Generate random value with +/- sign for each ticker
  const getTickerValue = (ticker: string, index: number) => {
    const seed = ticker.charCodeAt(0) + index;
    const random = Math.sin(seed) * 10000;
    const value = Math.abs(random % 100).toFixed(2);
    const isPositive = Math.floor(random) % 2 === 0;
    return {
      value,
      isPositive,
      sign: isPositive ? '+' : '-'
    };
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-3 md:px-4 py-1 md:py-2">
        {/* Infinite Scrolling Ticker List */}
        {duplicatedTickers.length > 0 && (
          <div className="w-screen -ml-[calc(50vw-50%)] relative overflow-hidden py-0.5 md:py-1 mb-1 md:mb-2">
            <div className="flex gap-3 md:gap-6 items-center animate-ticker-scroll">
              {duplicatedTickers.map((ticker, index) => {
                const tickerValue = getTickerValue(ticker, index);
                return (
                  <div key={`${ticker}-${index}`} className="flex items-center gap-3 md:gap-6 flex-shrink-0">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span
                        className="text-white font-mono font-semibold text-sm md:text-lg tracking-wider"
                        style={{
                          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        {ticker}
                      </span>
                      <span
                        className={`font-mono font-semibold text-xs md:text-sm ${
                          tickerValue.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}
                        style={{
                          textShadow: tickerValue.isPositive 
                            ? '0 0 10px rgba(34, 197, 94, 0.5)'
                            : '0 0 10px rgba(239, 68, 68, 0.5)'
                        }}
                      >
                        {tickerValue.sign}{tickerValue.value}
                      </span>
                    </div>
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-white/60 fill-white/20 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Layout: Stacked */}
        <div className="md:hidden space-y-1 mb-1">
          {/* Top Row: Title and Control Center Button */}
          <div className="flex items-center justify-between">
            {/* Title */}
            <h1 
              className="text-xl font-bold text-white leading-tight tracking-tight"
              style={{
                textShadow: `
                  0 0 40px rgba(255, 255, 255, 0.3),
                  0 0 20px rgba(255, 255, 255, 0.2),
                  0 2px 4px rgba(0, 0, 0, 0.4)
                `,
                letterSpacing: '-0.02em'
              }}
            >
              Physics of Wealth
            </h1>

            {/* Control Center Button */}
            <button
              onClick={() => onTabChange(activeTab === "home" ? "control-center" : "home")}
              className={`
                px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 
                flex items-center gap-1.5 relative overflow-hidden text-xs
                ${activeTab === "home" 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-105' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105'
                }
              `}
            >
              {activeTab === "home" ? (
                <>
                  <Rocket className="w-3.5 h-3.5 animate-pulse" />
                  <span>Control Center</span>
                </>
              ) : (
                <>
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </>
              )}
            </button>
          </div>

          {/* Bookmarks or Control Center Nav */}
          {activeTab === "control-center" ? (
            <div className="flex items-center gap-2 flex-wrap">
              {controlCenterTabs.map((tab) => {
                const isActive = controlCenterTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onControlCenterTabChange?.(tab.id)}
                    className={`
                      text-xs font-medium transition-colors duration-300 relative
                      ${isActive 
                        ? 'text-cyan-400 font-bold bookmark-active' 
                        : 'text-white hover:text-cyan-300'
                      }
                    `}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <span 
                        className="absolute inset-0 bg-cyan-400/20 blur-sm rounded transition-opacity duration-300"
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 hover:w-full" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {bookmarks.map((bookmark) => {
                const isActive = activeBookmark === bookmark.id;
                return (
                  <button
                    key={bookmark.id}
                    onClick={() => onBookmarkClick?.(bookmark.id)}
                    className={`
                      text-xs font-medium transition-colors duration-300 relative
                      ${isActive 
                        ? 'text-cyan-400 font-bold bookmark-active' 
                        : 'text-white hover:text-cyan-300'
                      }
                    `}
                  >
                    <span className="relative z-10">{bookmark.label}</span>
                    {isActive && (
                      <span 
                        className="absolute inset-0 bg-cyan-400/20 blur-sm rounded transition-opacity duration-300"
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 hover:w-full" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Layout: Horizontal */}
        <div className="hidden md:flex items-center gap-4 mb-2 relative">
          {/* Title - Left */}
          <h1 
            className="text-3xl font-bold text-white leading-tight tracking-tight"
            style={{
              textShadow: `
                0 0 40px rgba(255, 255, 255, 0.3),
                0 0 20px rgba(255, 255, 255, 0.2),
                0 2px 4px rgba(0, 0, 0, 0.4)
              `,
              letterSpacing: '-0.02em'
            }}
          >
            Physics of Wealth
          </h1>

          {/* Bookmarks or Control Center Nav - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {activeTab === "control-center" ? (
              <>
                {controlCenterTabs.map((tab) => {
                  const isActive = controlCenterTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onControlCenterTabChange?.(tab.id)}
                      className={`
                        text-sm font-medium transition-colors duration-300 relative
                        ${isActive 
                          ? 'text-cyan-400 font-bold bookmark-active' 
                          : 'text-white hover:text-cyan-300'
                        }
                      `}
                    >
                      <span className="relative z-10">{tab.label}</span>
                      {isActive && (
                        <span 
                          className="absolute inset-0 bg-cyan-400/20 blur-sm rounded transition-opacity duration-300"
                        />
                      )}
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 hover:w-full" />
                      )}
                    </button>
                  );
                })}
              </>
            ) : (
              <>
                {bookmarks.map((bookmark) => {
                  const isActive = activeBookmark === bookmark.id;
                  return (
                    <button
                      key={bookmark.id}
                      onClick={() => onBookmarkClick?.(bookmark.id)}
                      className={`
                        text-sm font-medium transition-colors duration-300 relative
                        ${isActive 
                          ? 'text-cyan-400 font-bold bookmark-active' 
                          : 'text-white hover:text-cyan-300'
                        }
                      `}
                    >
                      <span className="relative z-10">{bookmark.label}</span>
                      {isActive && (
                        <span 
                          className="absolute inset-0 bg-cyan-400/20 blur-sm rounded transition-opacity duration-300"
                        />
                      )}
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 hover:w-full" />
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Toggle Button - Right */}
          <div className="ml-auto">
            <button
              onClick={() => onTabChange(activeTab === "home" ? "control-center" : "home")}
              className={`
                px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 
                flex items-center gap-2 relative overflow-hidden
                ${activeTab === "home" 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] hover:scale-105' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105'
                }
              `}
            >
              {activeTab === "home" ? (
                <>
                  <Rocket className="w-4 h-4 animate-pulse" />
                  <span>Control Center</span>
                </>
              ) : (
                <>
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
