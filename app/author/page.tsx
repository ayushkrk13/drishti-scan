"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { BookPlus, CheckCircle2, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useStoryStore, type GeneratedStory } from "@/lib/store";
import { motion } from "framer-motion";
import { useCursor } from "@/lib/CursorContext";

export default function AuthorDashboard() {
  const { role } = useAuth();
  const { addStory } = useStoryStore();
  const { setVariant } = useCursor();
  
  const [inputText, setInputText] = useState("");
  const [bookType, setBookType] = useState("children");
  const [selectedLang, setSelectedLang] = useState("English");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);

  const languages = ["English", "Spanish", "French", "Japanese", "Mandarin", "German"];

  if (role !== "author") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="glass-panel p-12 text-center rounded-2xl border border-red-500/20">
          <h2 className="text-3xl font-rajdhani font-bold text-red-400 mb-4">ACCESS DENIED</h2>
          <p className="text-muted font-ubuntu">You must be in Author Mode to view this dashboard.</p>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/process-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chapterText: inputText, 
          bookType,
          language: selectedLang 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const storyResult = await response.json();
      
      const newStory: GeneratedStory = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        ...storyResult
      };

      addStory(newStory);
      setGeneratedStory(newStory);
    } catch (error) {
      console.error(error);
      alert("Failed to generate story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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
            AUTHOR <span className="text-accent">DASHBOARD</span>
          </h1>
          <p className="text-muted text-xl max-w-2xl font-ubuntu leading-relaxed">
            Welcome to the StoryMotion Engine. Turn your raw manuscripts into fully immersive, AI-generated phygital novels. Scroll down to learn the creative process and add your new book.
          </p>
        </motion.section>

        {/* How to Publish Section */}
        <motion.section 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-12 rounded-3xl"
        >
          <h2 className="text-4xl font-rajdhani font-bold text-accent mb-6">How to Publish</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">Input Your Script</h3>
              <p className="text-muted text-sm font-ubuntu">Paste a chapter or short story into the generation form below. Select your target demographic and language.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">AI Processing</h3>
              <p className="text-muted text-sm font-ubuntu">The StoryMotion Engine will automatically segment your text, generate image prompts, and create comprehension quizzes.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="font-rajdhani text-xl font-bold mb-2">Publish & Share</h3>
              <p className="text-muted text-sm font-ubuntu">Once generated, a unique QR code will be provided. Readers can scan it to instantly access your interactive novel.</p>
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
            <h2 className="text-3xl font-rajdhani font-bold text-white mb-6">Advantages for Authors</h2>
            <ul className="space-y-4 font-ubuntu text-muted">
              <li className="flex gap-3"><span className="text-green-400">✓</span> No illustration costs: AI handles visual generation.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Instant multi-language support expands your audience.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Deep analytics on reader engagement via quizzes.</li>
              <li className="flex gap-3"><span className="text-green-400">✓</span> Phygital bridging via QR code integration.</li>
            </ul>
          </div>
          <div className="glass-panel p-10 rounded-3xl border-t-4 border-red-500/50">
            <h2 className="text-3xl font-rajdhani font-bold text-white mb-6">Disadvantages</h2>
            <ul className="space-y-4 font-ubuntu text-muted">
              <li className="flex gap-3"><span className="text-red-400">✗</span> Less fine-grained control over specific visual details.</li>
              <li className="flex gap-3"><span className="text-red-400">✗</span> Requires structured input text for best segmentation.</li>
              <li className="flex gap-3"><span className="text-red-400">✗</span> High API usage costs for large manuscripts.</li>
            </ul>
          </div>
        </motion.section>

        {/* Creation Form at Bottom */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl mt-12 mb-32 border-accent/30 shadow-[0_0_50px_rgba(155,174,251,0.1)]"
        >
          <div className="flex items-center gap-3 mb-8">
            <Wand2 className="text-accent" size={32} />
            <h2 className="text-4xl font-rajdhani font-bold text-white">Create New Book</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-rajdhani font-bold text-muted mb-2 tracking-widest uppercase">Target Audience</label>
                <div className="flex gap-4">
                  {['children', 'teens', 'adults'].map(type => (
                    <button
                      key={type}
                      onClick={() => setBookType(type)}
                      onMouseEnter={() => setVariant("button")}
                      onMouseLeave={() => setVariant("default")}
                      className={`flex-1 py-3 rounded-lg font-rajdhani font-bold tracking-widest text-sm transition-all border ${
                        bookType === type 
                        ? 'bg-accent text-[#10121A] border-accent shadow-[0_0_15px_rgba(155,174,251,0.4)]' 
                        : 'bg-[#10121A]/50 text-muted border-white/10 hover:border-accent/50'
                      }`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-bold text-muted mb-2 tracking-widest uppercase">Generation Language</label>
                <select 
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  onMouseEnter={() => setVariant("button")}
                  onMouseLeave={() => setVariant("default")}
                  className="w-full bg-[#10121A]/80 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent focus:outline-none transition-colors font-ubuntu appearance-none cursor-pointer"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-bold text-muted mb-2 tracking-widest uppercase">Raw Text (Chapter 1)</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onMouseEnter={() => setVariant("text")}
                  onMouseLeave={() => setVariant("default")}
                  placeholder="Paste your story text here... The StoryMotion Engine will automatically segment this into cinematic beats."
                  className="w-full h-64 bg-[#10121A]/50 border border-white/10 rounded-lg p-4 text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none font-ubuntu"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                onMouseEnter={() => setVariant("button")}
                onMouseLeave={() => setVariant("default")}
                className="w-full bg-accent text-[#10121A] font-rajdhani font-bold text-xl py-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(155,174,251,0.2)]"
              >
                {isGenerating ? (
                  <><Loader2 className="animate-spin" size={24} /> PROCESSING...</>
                ) : (
                  <><Sparkles size={24} /> GENERATE INTERACTIVE NOVEL</>
                )}
              </button>
            </div>

            {/* Output / QR Area */}
            <div className="flex flex-col h-full">
              <label className="block text-sm font-rajdhani font-bold text-muted mb-2 tracking-widest uppercase">Output</label>
              <div className="flex-1 bg-[#10121A]/50 border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-accent animate-spin mb-4" />
                    <p className="text-accent font-rajdhani tracking-widest font-bold">ANALYZING TEXT & GENERATING SCENES</p>
                  </div>
                ) : generatedStory ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="text-green-400 w-16 h-16 mb-4" />
                    <h3 className="text-2xl font-rajdhani font-bold text-white mb-2">{generatedStory.metadata.chapter_title}</h3>
                    <p className="text-muted text-sm mb-6">{generatedStory.scenes.length} Scenes Generated</p>
                    
                    <div className="bg-white p-4 rounded-xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      {/* Fake QR Code */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`http://localhost:3000/read/${generatedStory.id}`)}&color=10121a&bgcolor=ffffff`}
                        alt="QR Code"
                        className="w-[150px] h-[150px]"
                      />
                    </div>
                    
                    <a 
                      href={`/read/${generatedStory.id}`}
                      target="_blank"
                      className="text-accent hover:text-white underline font-ubuntu text-sm transition-colors"
                    >
                      Open in Reader App
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center opacity-30">
                    <BookPlus className="w-20 h-20 text-muted mb-4" />
                    <p className="font-rajdhani tracking-widest">AWAITING INPUT...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
