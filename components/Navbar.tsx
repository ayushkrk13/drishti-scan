"use client";

import Link from "next/link";
import { useCursor } from "@/lib/CursorContext";
import { useAuth, Role } from "@/lib/AuthContext";
import { LogIn, LogOut, LayoutDashboard, User } from "lucide-react";
export default function Navbar() {
  const { role, login, logout } = useAuth();
  const { setVariant } = useCursor();

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
      className="w-full h-20 px-8 flex items-center justify-between glass-panel sticky top-0 z-50"
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#10121A]"></div>
        </div>
        <span className="font-rajdhani text-2xl font-bold tracking-wider uppercase">
          DRISTI-SCAN
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-rajdhani text-sm font-semibold tracking-widest text-muted">
        <Link href="/" className="hover:text-white transition-colors">HOME</Link>
        <Link href="/library" className="hover:text-white transition-colors">LIBRARY</Link>
        {role === "author" && (
          <Link href="/author" className="hover:text-white transition-colors text-accent">DASHBOARD</Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {role ? (
          <>
            <button
              onClick={handleRoleToggle}
              className="flex items-center gap-2 text-xs font-rajdhani tracking-wider px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all"
            >
              {role === "author" ? <LayoutDashboard size={14} /> : <User size={14} />}
              {role === "author" ? "AUTHOR MODE" : "USER MODE"}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs font-rajdhani tracking-wider px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-full transition-all"
            >
              <LogOut size={14} />
              LOGOUT
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="font-rajdhani text-sm font-bold tracking-wider bg-accent text-white px-6 py-2 rounded-full hover:opacity-80 transition-all shadow-[0_4px_14px_0_rgba(155,174,251,0.39)]"
          >
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  );
}
