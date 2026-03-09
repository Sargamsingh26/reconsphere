import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";

import SearchSection from "../components/SearchSection";
import LoadingScreen from "../components/LoadingScreen";
import cctvAnim from "../assets/CCTV Camera.json";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [reportData, setReportData] = useState(null);

  const [hasTyped, setHasTyped] = useState(false);
  const searchWrapperRef = useRef(null);

  const API = "https://reconsphere.onrender.com";

  const handleAnalyzeStart = async (domain, selectedTools) => {
    setIsLoading(true);
    setAnalysisComplete(false);

    try {
      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain_name: domain,
          tools: Array.from(selectedTools),
        }),
      });

      const data = await response.json();
      setReportData(data);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!reportData) return;
    const file = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "reconsphere-report.json";
    element.click();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        const input = searchWrapperRef.current.querySelector("input");
        if (input && input.value.trim() === "") {
          setHasTyped(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="relative flex-1 px-4 sm:px-6 md:px-8">

          {/* CAMERA */}
          <div
            className={`
              fixed left-0
              top-12 sm:top-[12px]
              z-0 pointer-events-none
              transition-all duration-500
              ${hasTyped ? "opacity-0 -translate-x-6" : "opacity-100"}
            `}
          >
            <Lottie
              animationData={cctvAnim}
              loop
              className="
                w-[14rem] h-[14rem]
                sm:w-[20rem] sm:h-[20rem]
                md:w-[24rem] md:h-[24rem]
              "
            />
          </div>

          {/* HERO */}
          <div
            className={`
              relative z-10 text-center
              transition-all duration-500 ease-in-out
              ${hasTyped ? "mt-16 sm:mt-10 md:mt-12" : "mt-32 sm:mt-32 md:mt-40"}
            `}
          >
            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl
                font-bold
                bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600
                bg-clip-text text-transparent
                leading-[1.35] pb-2
                drop-shadow-[0_2px_12px_rgba(34,211,238,0.25)]
              "
            >
              Domain Intelligence
            </h1>

            {!hasTyped && (
              <p className="mt-2 text-slate-500 text-sm sm:text-base md:text-lg px-2">
                Enter a domain to begin comprehensive security analysis
              </p>
            )}
          </div>

          {/* SEARCH */}
          <div
            ref={searchWrapperRef}
            onInputCapture={(e) => {
              if (
                e.target.tagName === "INPUT" &&
                e.target.value.trim().length > 0
              ) {
                setHasTyped(true);
              }
            }}
            className="
              relative z-30
              mt-14 sm:mt-8 md:mt-10
              w-full
              max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
              mx-auto
            "
          >
            <SearchSection
              onAnalyze={handleAnalyzeStart}
              analysisComplete={analysisComplete}
              onDownload={handleDownload}
              compact={hasTyped}
            />
          </div>

        </main>
      )}
    </div>
  );
}
