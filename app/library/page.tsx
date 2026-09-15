"use client";

import Link from "next/link";
import { useState } from "react";
import { useStoryStore } from "@/lib/store";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCursor } from "@/lib/CursorContext";

export default function LibraryPage() {
  const { stories, isLoaded } = useStoryStore();
  const { setVariant } = useCursor();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");

  const languages = ["English", "Spanish", "French", "Japanese", "Mandarin", "German"];

  return (
    <div className="flex-1 w-full relative min-h-[300vh] bg-black overflow-hidden">
      
      {/* Immersive Continuous Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          src="/subpage-bg.mp4" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen"
          muted 
          autoPlay 
          loop 
          playsInline
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#10121A]/80 via-transparent to-[#10121A]/90" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-20 flex flex-col gap-32">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="min-h-[60vh] flex flex-col justify-center"
        >
          <h1 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="text-6xl md:text-8xl font-rajdhani font-bold mb-6 text-white drop-shadow-2xl"
          >
            YOUR <span className="text-accent">LIBRARY</span>
          </h1>
          <p className="text-muted text-xl max-w-2xl font-ubuntu leading-relaxed">
            All your generated phygital reading experiences in one place. Scroll down to learn how to master the DRISTI-SCAN experience and search for new worlds.
          </p>
        </motion.section>

        {/* How to Use Section */}
        <motion.section 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-12 rounded-3xl"
        >
          <h2 className="text-4xl font-rajdhani font-bold text-accent mb-6">How to Use DRISTI-SCAN</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">Find a Book</h3>
              <p className="text-muted text-sm font-ubuntu">Use the forum below to search for a book or generate one via Author Mode. Select your preferred language for the narration.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">Immersive Reading</h3>
              <p className="text-muted text-sm font-ubuntu">Click on any book in your library to enter the cinematic reader. Scroll to progress through the story beats seamlessly.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">Gamified Quizzes</h3>
              <p className="text-muted text-sm font-ubuntu">At the end of each chapter, test your comprehension with our AI-generated quizzes to earn XP and unlock more features.</p>
            </div>
          </div>
        </motion.section>

        {/* Advantages & Disadvantages Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="glass-panel p-10 rounded-3xl border-t-4 border-green-500/50">
            <h2 className="text-3xl font-rajdhani font-bold text-white mb-6">Advantages</h2>
            <ul className="space-y-4 font-ubuntu text-muted">
              <li className="flex gap-3"><span className="text-green-400">✓</span> Highly immersive, multimodal learning.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Instant multi-language translation and TTS.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Gamification increases retention and focus.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Dynamic cinematic pacing controlled by scroll.</li>
            </ul>
          </div>
          <div className="glass-panel p-10 rounded-3xl border-t-4 border-red-500/50">
            <h2 className="text-3xl font-rajdhani font-bold text-white mb-6">Disadvantages</h2>
            <ul className="space-y-4 font-ubuntu text-muted">
              <li className="flex gap-3"><span className="text-red-400">✗</span> Requires higher bandwidth for background videos.</li>
              <li className="flex gap-3"><span className="text-red-400">✗</span> Might be too stimulating for traditional readers.</li>
              <li className="flex gap-3"><span className="text-red-400">✗</span> AI image consistency can sometimes vary across scenes.</li>
            </ul>
          </div>
        </motion.section>

        {/* Existing Stories Display */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <h2 className="text-4xl font-rajdhani font-bold text-accent mb-8">My Shelf</h2>
          {!isLoaded ? (
            <div className="text-accent animate-pulse font-rajdhani text-xl tracking-widest">LOADING LIBRARY...</div>
          ) : stories.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl flex flex-col items-center">
              <BookOpen className="w-16 h-16 text-muted mb-4 opacity-50" />
              <h2 className="text-2xl font-rajdhani font-bold mb-2">No Stories Yet</h2>
              <p className="text-muted max-w-md mx-auto mb-6">You haven't added any stories to your library.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map(story => (
                <Link key={story.id} href={`/read/${story.id}`} className="group relative glass-panel p-6 rounded-2xl overflow-hidden hover:border-accent transition-colors block border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-rajdhani tracking-widest text-muted border border-white/10 uppercase">
                        {story.book_type}
                      </span>
                      <span className="text-xs text-accent font-ubuntu">{story.metadata.estimated_listen_time_minutes} min read</span>
                    </div>
                    <h3 className="text-xl font-rajdhani font-bold mb-2">{story.metadata.chapter_title}</h3>
                    <p className="text-sm text-muted font-ubuntu line-clamp-2 mb-4">{story.scenes[0]?.narration_script}</p>
                    <div className="text-xs font-rajdhani text-accent font-bold tracking-widest group-hover:translate-x-1 transition-transform inline-block">
                      READ NOW &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.section>

        {/* Forum / Search Section at bottom */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-12 rounded-3xl mt-12 mb-32 border-accent/30 shadow-[0_0_50px_rgba(155,174,251,0.1)]"
        >
          <h2 className="text-4xl font-rajdhani font-bold text-white mb-4">Find New Books</h2>
          <p className="text-muted font-ubuntu mb-8">Search the global repository for new phygital stories and select your preferred narration language.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input 
                type="text" 
                placeholder="Search by title, author, or genre..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onMouseEnter={() => setVariant("text")}
                onMouseLeave={() => setVariant("default")}
                className="w-full bg-[#10121A]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent focus:outline-none transition-colors font-ubuntu"
              />
            </div>
            
            <div className="w-full md:w-64">
              <select 
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={() => setVariant("default")}
                className="w-full bg-[#10121A]/80 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-accent focus:outline-none transition-colors font-ubuntu appearance-none cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang} Narration</option>
                ))}
              </select>
            </div>
            
            <button 
              onMouseEnter={() => setVariant("button")}
              onMouseLeave={() => setVariant("default")}
              className="bg-accent text-[#10121A] font-rajdhani font-bold text-xl px-10 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(155,174,251,0.3)] flex items-center justify-center gap-2"
            >
              SEARCH <ArrowRight size={20} />
            </button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
