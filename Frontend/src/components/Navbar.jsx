import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

import darkLogo from "../assets/logo-dark.png";
import lightLogo from "../assets/logo-light.png";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  const indicatorRef = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/download", label: "Download" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector(
      'a[aria-current="page"]'
    );

    if (activeLink && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${activeLink.offsetLeft}px)`;
    }
  }, [location]);

  const toggleTheme = () => {
    if (!mounted) return;

    const html = document.documentElement;

    // start flip
    setFlip(true);

    setTimeout(() => {
      if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    }, 300);

    // stop flip (so it only flips once)
    setTimeout(() => {
      setFlip(false);
    }, 700);
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-background/90 backdrop-blur
        supports-[backdrop-filter]:bg-background/70
        shadow-sm dark:shadow-md
      "
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">

            <div className="logo-wrapper">
              <img
                src={isDark ? darkLogo : lightLogo}
                alt="ReconSphere Logo"
                className={`logo-img ${flip ? "flip-logo" : ""}`}
              />
            </div>

            <span className="font-bold text-lg text-foreground hidden sm:inline">
              ReconSphere
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div
            ref={navRef}
            className="relative hidden md:flex items-center gap-6"
          >
            <span
              ref={indicatorRef}
              className="
                absolute top-0 bottom-0 rounded-full
                bg-cyan-500/20 dark:bg-cyan-400/10
                border border-cyan-500/20 dark:border-cyan-400/20
                transition-all duration-300 ease-out
              "
            />

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  relative z-10 px-5 py-2
                  flex items-center justify-center
                  text-sm font-medium rounded-full
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-cyan-700 dark:text-cyan-300"
                      : "text-foreground/70 hover:text-foreground"
                  }
                  `
                }
              >
                {item.label}
              </NavLink>
            ))}

            {mounted && (
              <button
                onClick={toggleTheme}
                className="
                  ml-4 inline-flex items-center justify-center rounded-lg
                  bg-card p-2 text-foreground
                  transition-colors hover:bg-secondary
                "
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-card"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-card"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-secondary"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}