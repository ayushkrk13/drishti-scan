"use client";

import { useState } from "react";
import Link from "next/link";
import { useCursor } from "@/lib/CursorContext";
import { useAuth, Role } from "@/lib/AuthContext";
import { Globe, ScanLine, FileUp, ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
  const { setVariant } = useCursor();
  const { role, login, logout } = useAuth();
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = [
    { code: "EN", name: "English" },
    { code: "HI", name: "Hindi (हिन्दी)" },
    { code: "BN", name: "Bengali (বাংলা)" },
    { code: "MR", name: "Marathi (मराठी)" },
  ];

  const handleRoleToggle = () => {
    if (role === "author") {
      login("user");
    } else {
      login("author");
    }
  };

  return (
    <nav 
      onMouseEnter={() => setVariant("header")} 
      onMouseLeave={() => setVariant("default")}
      className="w-full h-20 px-6 md:px-12 flex items-center justify-between glass-panel sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl"
    >
      <Link href="/" className="flex items-baseline gap-2 group">
        <span className="font-rajdhani text-2xl md:text-3xl font-black tracking-widest uppercase text-white group-hover:text-accent transition-colors">
          DRISTI-SCAN
        </span>
        <span className="font-ubuntu text-xs text-accent font-bold tracking-widest opacity-80">
          [AI STUDIO]
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-8 font-rajdhani text-sm font-semibold tracking-widest text-gray-400">
        <Link href="/#features" className="hover:text-white transition-colors">Dristi Vision</Link>
        <Link href="/author" className="hover:text-white transition-colors">Author Portal</Link>
        <Link href="/#how-to-use" className="hover:text-white transition-colors">How to Use</Link>
      </div>

      <div className="flex items-center gap-4">
        
        {/* Language Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button 
            onMouseEnter={() => setVariant("button")}
            onMouseLeave={() => setVariant("header")}
            className="flex items-center gap-1.5 text-xs font-rajdhani tracking-wider px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-gray-300 hover:text-white"
          >
            <Globe size={14} />
            {currentLang}
            <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {langOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-rajdhani tracking-wider hover:bg-accent/20 transition-colors ${currentLang === lang.code ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Primary CTAs & Auth */}
        <div className="hidden md:flex items-center gap-3">
          
          {role ? (
            <>
              <button
                onClick={handleRoleToggle}
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={() => setVariant("header")}
                className="flex items-center gap-2 text-xs font-rajdhani tracking-wider px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white"
              >
                {role === "author" ? <LayoutDashboard size={14} /> : <User size={14} />}
                {role === "author" ? "AUTHOR MODE" : "USER MODE"}
              </button>
              <button
                onClick={logout}
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={() => setVariant("header")}
                className="flex items-center gap-2 text-xs font-rajdhani tracking-wider px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={14} />
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={() => setVariant("header")}
              className="font-rajdhani text-xs font-bold tracking-wider bg-white/10 text-white px-4 py-1.5 rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              SIGN IN
            </Link>
          )}

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          <Link
            href="/author"
            onMouseEnter={() => setVariant("button")}
            onMouseLeave={() => setVariant("header")}
            className="flex items-center gap-2 text-xs font-rajdhani font-bold tracking-wider px-4 py-2 bg-white/5 text-white hover:bg-white hover:text-black rounded-full transition-all border border-white/10"
          >
            <FileUp size={14} />
            <span className="hidden xl:inline">AUTHOR STUDIO</span> INGESTION
          </Link>
          
          <button
            onMouseEnter={() => setVariant("button")}
            onMouseLeave={() => setVariant("header")}
            className="flex items-center gap-2 text-xs font-rajdhani font-bold tracking-wider px-5 py-2 bg-accent text-white hover:opacity-80 rounded-full transition-all shadow-[0_0_15px_rgba(155,174,251,0.4)]"
          >
            <ScanLine size={14} />
            OPEN DRISTI SCANNER
          </button>
        </div>
      </div>
    </nav>
  );
}
