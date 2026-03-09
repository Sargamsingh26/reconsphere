import { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";

const TOOLS = [
  "WHOIS Information",
  "WHOIS History",
  "DNS Records",
  "Subdomain Enumeration",
  "Top-Level Domain Analysis",
  "IP Address Resolution",
  "Open Ports & Services",
  "SSL Certificate",
  "Server Geolocation",
  "Technology Stack",
  "Domain Reputation",
  "Spam / Blacklist Check",
  "Robots.txt Analysis",
  "Website Category Detection",
];

const MAX_VISIBLE_TOOLS = 6;

export default function SearchSection({
  onAnalyze,
  analysisComplete,
  onDownload,
  compact = false, // still accepted, but we rely on showTools
}) {
  const [domain, setDomain] = useState("");
  const [selectedTools, setSelectedTools] = useState(new Set());
  const [showTools, setShowTools] = useState(false);

  const isAnalyzeDisabled = !domain || selectedTools.size === 0;
  const shouldScroll = TOOLS.length > MAX_VISIBLE_TOOLS;

  const toggleTool = (tool) => {
    const next = new Set(selectedTools);
    next.has(tool) ? next.delete(tool) : next.add(tool);
    setSelectedTools(next);
  };

  const selectAllTools = () => {
    selectedTools.size === TOOLS.length
      ? setSelectedTools(new Set())
      : setSelectedTools(new Set(TOOLS));
  };

  useEffect(() => {
    setShowTools(domain.length > 0);
  }, [domain]);

  return (
    <div
      className={`
        relative overflow-hidden
        ${showTools ? "pt-4" : "pt-0"}
        ${showTools ? "" : "min-h-0"}
      `}
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* Center container always */}
      <div className="relative w-full max-w-2xl mx-auto z-10">

        {/* ================= SEARCH BAR (SINGLE RECTANGLE) ================= */}
        <div className={`${showTools ? "mb-4" : "mb-2"} transition-all`}>
          <div
            className="
              flex items-center gap-3
              px-5 py-3
              rounded-xl
              bg-card
              border border-border/20
              shadow-md
              transition-all
              focus-within:border-accent/50
              focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]
            "
          >
            <Search className="h-5 w-5 text-foreground/50" />

            <input
              type="text"
              placeholder="Enter domain name (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="
                flex-1 bg-transparent
                border-none outline-none
                text-sm text-foreground
                placeholder-foreground/40
              "
            />

            <button
              onClick={() => onAnalyze(domain, selectedTools)}
              disabled={isAnalyzeDisabled}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                isAnalyzeDisabled
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              Analyze
            </button>
          </div>
        </div>

        {/* ================= TOOL SELECTION ================= */}
        {showTools && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Select Analysis Tools
              </h3>

              <button
                onClick={selectAllTools}
                className="
                  px-3 py-1.5
                  rounded-md
                  text-xs font-medium
                  text-accent/80
                  bg-muted/40
                  hover:bg-muted/60
                  transition-all
                "
              >
                {selectedTools.size === TOOLS.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div
              className={`
                grid grid-cols-1 md:grid-cols-2 gap-3
                px-2
                ${shouldScroll ? "max-h-96 overflow-y-auto py-2 scroll-smooth" : ""}
              `}
            >
              {TOOLS.map((tool) => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`
                    flex items-center gap-3
                    px-4 py-2.5
                    rounded-md
                    border border-border/20
                    text-left
                    transition-all
                    ${
                      selectedTools.has(tool)
                        ? "bg-accent/15 text-foreground"
                        : "bg-card hover:bg-muted/50 text-foreground/80"
                    }
                  `}
                >
                  <div
                    className={`h-4 w-4 rounded flex items-center justify-center ${
                      selectedTools.has(tool)
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {selectedTools.has(tool) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>

                  <span className="text-sm font-medium">{tool}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 text-xs text-foreground/50">
              {selectedTools.size} of {TOOLS.length} tools selected
            </div>
          </div>
        )}

        {/* ================= ANALYSIS COMPLETE ================= */}
        {analysisComplete && (
          <div className="mt-16 text-center animate-in fade-in duration-500">
            <div className="inline-block mb-4">
              <div className="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-foreground">
              Analysis Complete
            </h2>
            <p className="text-foreground/60 mb-6">
              Your domain intelligence report is ready to download
            </p>

            <button
              onClick={onDownload}
              className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-all"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
