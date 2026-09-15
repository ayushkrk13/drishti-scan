"use client";

import { useState, useEffect, use } from "react";
import { useStoryStore } from "@/lib/store";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Volume2, Play, CheckCircle2, XCircle } from "lucide-react";

export default function ReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getStory, isLoaded } = useStoryStore();
  
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  
  const story = getStory(resolvedParams.id);

  useEffect(() => {
    if (isLoaded && !story) {
      notFound();
    }
  }, [isLoaded, story]);

  if (!isLoaded || !story) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-accent font-rajdhani text-2xl tracking-widest">LOADING STORY...</div>
      </div>
    );
  }

  const scenes = story.scenes;
  const currentScene = scenes[currentSceneIndex];
  const isLastScene = currentSceneIndex === scenes.length - 1;

  const handleNext = () => {
    if (isLastScene) {
      setShowQuiz(true);
    } else {
      setCurrentSceneIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentSceneIndex > 0) {
      setCurrentSceneIndex(i => i - 1);
    }
  };

  const handleQuizAnswer = (qIndex: number, optIndex: number) => {
    if (quizAnswers[qIndex] !== undefined) return; // Already answered
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  // Mock a generated image gradient based on the image_prompt length just to make it visually distinct
  const hash = currentScene.image_prompt.length % 5;
  const gradients = [
    "from-slate-900 to-blue-900",
    "from-purple-900 to-indigo-900",
    "from-emerald-900 to-teal-900",
    "from-rose-900 to-red-900",
    "from-gray-900 to-zinc-800"
  ];
  const bgGradient = gradients[hash];

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden bg-black">
      
      {/* Background Visuals for current scene */}
      <AnimatePresence mode="wait">
        {!showQuiz && (
          <motion.div 
            key={`scene-bg-${currentSceneIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-60`}
          >
            {/* Cinematic Camera Motion Mock */}
            <motion.div 
              initial={{ 
                x: currentScene.camera_motion === 'pan_right' ? -20 : currentScene.camera_motion === 'pan_left' ? 20 : 0,
                y: currentScene.camera_motion === 'tilt_up' ? 20 : 0,
                scale: currentScene.camera_motion === 'zoom_in' ? 1 : 1.1
              }}
              animate={{ 
                x: 0, y: 0, 
                scale: currentScene.camera_motion === 'zoom_in' ? 1.1 : 1 
              }}
              transition={{ duration: 10, ease: "linear" }}
              className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full p-6 md:p-12">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 glass-panel px-6 py-4 rounded-full">
          <div>
            <h1 className="font-rajdhani text-xl font-bold text-white">{story.metadata.chapter_title}</h1>
            <p className="text-xs text-accent uppercase tracking-widest">{story.book_type}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted font-ubuntu">
              {showQuiz ? "QUIZ" : `SCENE ${currentSceneIndex + 1} / ${scenes.length}`}
            </span>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Volume2 size={16} className="text-accent" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div 
                key={`scene-content-${currentSceneIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-rajdhani tracking-widest text-muted border border-white/10 uppercase">
                    {currentScene.dialogue_tone}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 rounded text-[10px] font-rajdhani tracking-widest text-accent border border-accent/20 uppercase flex items-center gap-1">
                    <Play size={10} /> SFX: {currentScene.ambient_sfx}
                  </span>
                </div>

                <p className="font-ubuntu text-2xl md:text-3xl leading-relaxed text-white text-shadow-sm">
                  "{currentScene.narration_script}"
                </p>

                <div className="mt-8 text-xs text-muted/50 font-mono">
                  [Image Prompt: {currentScene.image_prompt}]
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 md:p-12 rounded-3xl"
              >
                <h2 className="font-rajdhani text-3xl font-bold text-accent mb-2">Chapter Complete!</h2>
                <p className="text-muted mb-8">Test your comprehension to earn {story.gamification.xp_reward} XP.</p>

                <div className="space-y-8">
                  {story.gamification.comprehension_quiz.map((q, qIndex) => {
                    const answered = quizAnswers[qIndex] !== undefined;
                    const selected = quizAnswers[qIndex];
                    const isCorrect = selected === q.correct_option_index;

                    return (
                      <div key={qIndex} className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="font-ubuntu text-lg mb-4">{q.question}</h3>
                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            let btnClass = "w-full text-left px-4 py-3 rounded-lg border transition-all text-sm font-ubuntu ";
                            if (!answered) {
                              btnClass += "border-white/10 hover:border-accent hover:bg-accent/10 bg-black/40";
                            } else if (optIndex === q.correct_option_index) {
                              btnClass += "border-green-500 bg-green-500/20 text-green-100";
                            } else if (selected === optIndex) {
                              btnClass += "border-red-500 bg-red-500/20 text-red-100";
                            } else {
                              btnClass += "border-white/5 bg-black/20 opacity-50";
                            }

                            return (
                              <button
                                key={optIndex}
                                disabled={answered}
                                onClick={() => handleQuizAnswer(qIndex, optIndex)}
                                className={btnClass}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{opt}</span>
                                  {answered && optIndex === q.correct_option_index && <CheckCircle2 size={16} className="text-green-500" />}
                                  {answered && selected === optIndex && selected !== q.correct_option_index && <XCircle size={16} className="text-red-500" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {answered && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`mt-4 p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 text-green-200 border border-green-500/20' : 'bg-red-500/10 text-red-200 border border-red-500/20'}`}
                          >
                            <span className="font-bold">{isCorrect ? 'Correct! ' : 'Incorrect. '}</span>
                            {q.explanation}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handlePrev}
            disabled={currentSceneIndex === 0 && !showQuiz}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>
          
          <div className="flex gap-2">
            {!showQuiz && scenes.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSceneIndex ? 'w-8 bg-accent shadow-[0_0_10px_rgba(155,174,251,0.5)]' : 'w-2 bg-white/20'}`} 
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={showQuiz}
            className="w-12 h-12 rounded-full bg-accent text-[#10121A] flex items-center justify-center hover:bg-white hover:shadow-[0_0_15px_rgba(155,174,251,0.4)] transition-all disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
