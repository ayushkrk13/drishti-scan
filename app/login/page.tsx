"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: "user" | "author") => {
    login(role);
    if (role === "author") {
      router.push("/author");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* Decorative Blobs */}
      <div className="absolute w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] top-1/4 left-1/4 pointer-events-none" />
      
      <div className="glass-panel p-10 rounded-2xl w-full max-w-md relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <div className="w-6 h-6 rounded-full bg-[#10121A]"></div>
        </div>
        
        <h1 className="text-3xl font-rajdhani font-bold mb-2">Welcome Back</h1>
        <p className="text-muted text-center mb-8">Sign in to experience interactive phygital reading or create your own.</p>
        
        <div className="w-full space-y-4">
          <button
            onClick={() => handleLogin("user")}
            className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-rajdhani font-semibold tracking-wider flex items-center justify-center gap-3"
          >
            SIGN IN AS READER
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-muted text-sm">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <button
            onClick={() => handleLogin("author")}
            className="w-full py-3 rounded-lg bg-accent text-[#10121A] hover:bg-white transition-all font-rajdhani font-bold tracking-wider shadow-[0_0_15px_rgba(155,174,251,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3"
          >
            SIGN IN AS AUTHOR
          </button>
        </div>
      </div>
    </div>
  );
}
