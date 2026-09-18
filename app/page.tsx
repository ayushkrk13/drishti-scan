"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCursor } from "@/lib/CursorContext";
import { ArrowRight, Sparkles, Scan, MonitorPlay, Volume2, Gamepad2, AlertCircle, Mail, MapPin, Phone } from "lucide-react";

export default function Home() {
  const { setVariant } = useCursor();
  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden font-ubuntu selection:bg-accent/30 selection:text-white">
      
      {/* Sleek Dark Glowing Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[150px] opacity-30 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[150px] opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-0">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden" animate="visible" variants={stagger}
          className="flex flex-col items-center text-center max-w-4xl mx-auto pt-12 md:pt-24 mb-32"
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-6">
            <span className="text-accent font-rajdhani font-bold tracking-widest text-sm flex items-center gap-2">
              <Sparkles size={14} /> THE VISIONARY PRINT-TO-VIDEO PLATFORM
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp}
            onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}
            className="font-rajdhani text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl"
          >
            SCAN THE PRINT.<br/>UNLEASH THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">VISION.</span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl leading-relaxed"
          >
            DRISTI-SCAN bridges the physical page and the animated screen. Authors upload manuscripts to embed dynamic smart-QRs; readers simply point their phone camera to watch books transform into synchronized 3D cinematic scenes and multi-dialect audiobooks.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="#how-to-use"
              onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-rajdhani font-bold text-lg hover:opacity-80 transition-all shadow-[0_0_20px_rgba(155,174,251,0.4)]"
            >
              Test Dristi-Scan with Sample QR <ArrowRight size={18} />
            </Link>
            <Link 
              href="/author"
              onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-rajdhani font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Upload Manuscript (Creator Studio)
            </Link>
          </motion.div>
        </motion.section>

        {/* HOW TO USE SECTION */}
        <motion.section
          id="how-to-use"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="font-rajdhani text-5xl font-black text-white tracking-widest uppercase mb-4">How To Use</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">Experience the magic of DRISTI-SCAN in three simple steps. Point your camera at any supported book or magazine to begin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-black font-rajdhani mb-6">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Open the Scanner</h3>
                <p className="text-gray-400 text-sm">Click "Open Dristi Scanner" in the navigation bar to grant camera access.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-black font-rajdhani mb-6">2</div>
                <h3 className="text-xl font-bold text-white mb-3">Align the QR</h3>
                <p className="text-gray-400 text-sm">Point your camera at the Dristi SmartQR printed on the page margins or book cover.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-black font-rajdhani mb-6">3</div>
                <h3 className="text-xl font-bold text-white mb-3">Watch it Come Alive</h3>
                <p className="text-gray-400 text-sm">The text instantly transforms into an interactive 3D cinema on your screen.</p>
             </div>
          </div>
        </motion.section>

        {/* DUAL LANGUAGE & VISION ENGINE DEMO (UNDER CONSTRUCTION) */}
        <motion.section
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="glass-panel p-8 md:p-12 border border-accent/20 rounded-3xl bg-gradient-to-b from-white/5 to-black/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-500 text-xs font-bold px-4 py-1 rounded-bl-xl border-l border-b border-yellow-500/30 flex items-center gap-2">
              <AlertCircle size={12} /> SHORT-TERM ROADMAP
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="font-rajdhani text-4xl font-bold text-white mb-4">DRISTI VISION & DUAL-LANG SYNC</h2>
                <p className="text-gray-400 mb-6">
                  Maintain English as the master layout language, while applying a dynamic subscript highlighter to instantly translate and explain complex terms in your selected regional dialect. Perfect for learning and accessibility.
                </p>
                
                {/* Mockup of Dual Language Text */}
                <div className="p-6 bg-black/60 rounded-xl border border-white/10 font-serif text-lg leading-loose">
                  <span className="text-gray-300">The </span>
                  <span className="relative inline-block cursor-help group">
                    <span className="text-white border-b-2 border-accent/50 pb-1">archipelago</span>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-rajdhani text-accent font-bold tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      [द्वीपसमूह - Dweepsamooh]
                    </span>
                  </span>
                  <span className="text-gray-300"> was covered in a dense, glowing fog.</span>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-black/80 border border-white/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
                  <MonitorPlay size={48} className="text-accent/50 mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <span className="font-rajdhani font-bold text-gray-400 tracking-widest">DRISTI VISION ENGINE</span>
                  <span className="text-xs text-gray-600 mt-2">Text-to-Video Generation Active</span>
                  
                  {/* Subtle video generation scanning effect */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_10px_rgba(155,174,251,0.8)] animate-scan" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CORE FEATURE ARCHITECTURE */}
        <motion.section
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="mb-32"
          id="features"
        >
          <div className="text-center mb-16">
            <h2 className="font-rajdhani text-5xl font-black text-white tracking-widest uppercase mb-4">Core Feature Architecture</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <MonitorPlay size={32}/>, title: "Dristi Vision Engine", action: "Watch in Dristi Cinema", desc: "Converts paragraphs into multi-style animated video sequences matching reading speed." },
              { icon: <Volume2 size={32}/>, title: "Dristi Vaani", action: "Listen in Native Dialect", desc: "Multi-language AI voice dubbing (Hindi, English, regional Indian dialects, and world languages)." },
              { icon: <Scan size={32}/>, title: "Dristi SmartQR", action: "Generate Print Matrix", desc: "Scalable vector QR generator for authors to print directly on book margins or covers." },
              { icon: <Gamepad2 size={32}/>, title: "Dristi Quest", action: "Claim Reading XP", desc: "Gamified comprehension quizzes, vocabulary discovery vaults, and daily reading streaks." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start backdrop-blur-sm group hover:border-accent/50 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{feature.desc}</p>
                <button className="text-xs font-rajdhani font-bold tracking-widest text-accent uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                  {feature.action} <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* ELEVATOR PITCH SECTION */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-900/20 blur-[100px] z-0" />
          <div className="relative z-10 glass-panel border-t border-b border-accent/30 py-20 px-8 text-center">
            <p className="font-rajdhani text-2xl md:text-3xl lg:text-4xl leading-snug font-medium text-white max-w-5xl mx-auto italic">
              "Judges, reading in the digital age faces two major crises: dwindling attention spans and language barriers. Over 70% of local regional literature never gets adapted into film or audio due to astronomical studio costs. <br/><br/>
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">DRISTI-SCAN</strong> changes this equation. With one upload, our AI engine turns static manuscripts into animated cinema and multi-dialect speech, linked to the physical book via a print-ready QR code. The reader doesn't need to download an app—they scan with their phone, and the text gains true visual life. We make every printed book an interactive, multilingual theater."
            </p>
          </div>
        </motion.section>

      </div>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="relative z-10 w-full bg-black/80 border-t border-white/10 pt-20 pb-10 px-6 md:px-12 mt-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block mb-6" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>
              <span className="font-rajdhani text-3xl font-black tracking-widest uppercase text-white">
                DRISTI-SCAN
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
              Join the revolution in reading. Subscribe to our newsletter to receive regular updates on new articles, platform feature upgrades, and author tools directly to your inbox.
            </p>
            <form className="flex max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-white/5 border border-white/10 rounded-l-full px-6 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}
              />
              <button 
                type="submit"
                onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}
                className="bg-accent text-white font-rajdhani font-bold tracking-wider px-6 py-3 rounded-r-full hover:opacity-80 transition-all flex items-center gap-2"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Ideation & Construction Team */}
          <div>
            <h4 className="font-rajdhani text-lg font-bold text-white tracking-widest uppercase mb-6">Ideation & Construction Team</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <strong className="text-gray-200">Visionaries</strong>
                <p>Leading the next generation of interactive literature.</p>
              </li>
              <li>
                <strong className="text-gray-200">Engineering Core</strong>
                <p>Architecting robust AI and scanning infrastructures.</p>
              </li>
              <li>
                <strong className="text-gray-200">Design & UX</strong>
                <p>Crafting immersive cinematic reading experiences.</p>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-rajdhani text-lg font-bold text-white tracking-widest uppercase mb-6">Contact & Service</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-accent transition-colors flex items-center gap-2" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>
                  <Mail size={16} /> support@dristiscan.ai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors flex items-center gap-2" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>
                  <Phone size={16} /> 1-800-DRISTI (Helpdesk)
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> Innovation Hub, Bangalore
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-rajdhani tracking-wider">
            &copy; {new Date().getFullYear()} DRISTI-SCAN AI STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-rajdhani tracking-wider uppercase" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs font-rajdhani tracking-wider uppercase" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>Privacy Policy</a>
            <div className="flex items-center gap-4 ml-4">
              <a href="#" className="text-gray-500 hover:text-accent transition-colors text-xs font-rajdhani tracking-wider" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>
                TWITTER
              </a>
              <a href="#" className="text-gray-500 hover:text-accent transition-colors text-xs font-rajdhani tracking-wider" onMouseEnter={() => setVariant("button")} onMouseLeave={() => setVariant("default")}>
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Required CSS for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
