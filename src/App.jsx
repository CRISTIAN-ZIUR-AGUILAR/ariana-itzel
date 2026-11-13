import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundParticles from './components/BackgroundParticles';
import AudioPlayer from './components/AudioPlayer';
import IntroScreen from './components/IntroScreen';
import MemoryQuiz from './components/MemoryQuiz';
import WrappedMoments from './components/WrappedMoments';
import LetterAndVouchers from './components/LetterAndVouchers';
import { Sparkles, Heart, HelpCircle, Image as ImageIcon, Gift } from 'lucide-react';
import { configCumple } from './data/contenido';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [maxStageReached, setMaxStageReached] = useState(1);
  const audioRef = useRef(null);

  const goToStage = (stageNum) => {
    setCurrentStage(stageNum);
    if (stageNum > maxStageReached) {
      setMaxStageReached(stageNum);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartIntro = () => {
    // Iniciar música automáticamente con la interacción de usuario
    if (audioRef.current) {
      audioRef.current.startPlaying();
    }
    goToStage(2);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between selection:bg-rose-500/30 selection:text-pink-200">
      {/* Fondo de estrellas y partículas flotantes */}
      <BackgroundParticles />

      {/* Reproductor de audio flotante */}
      <AudioPlayer ref={audioRef} />

      {/* Barra de navegación de etapas (visible una vez superada la bienvenida) */}
      {currentStage > 1 && (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0f0c29]/60 border-b border-white/10 px-4 py-2.5">
          <div className="max-w-xl mx-auto flex items-center justify-between">
            <span className="font-serif font-bold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-200">
              {configCumple.nombreElla} ❤️
            </span>

            {/* Píldoras de navegación entre etapas desbloqueadas */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => goToStage(2)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  currentStage === 2
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/50'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Trivia
              </button>

              <button
                onClick={() => goToStage(3)}
                disabled={maxStageReached < 3}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  currentStage === 3
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/50'
                    : maxStageReached >= 3
                    ? 'text-rose-200/70 hover:text-white hover:bg-white/5'
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                Recuerdos
              </button>

              <button
                onClick={() => goToStage(4)}
                disabled={maxStageReached < 4}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  currentStage === 4
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/50'
                    : maxStageReached >= 4
                    ? 'text-rose-200/70 hover:text-white hover:bg-white/5'
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                Carta & Vales
              </button>
            </nav>
          </div>
        </header>
      )}

      {/* Contenido Dinámico de las 4 Etapas */}
      <main className="flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <motion.div
              key="stage-1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <IntroScreen onStart={handleStartIntro} />
            </motion.div>
          )}

          {currentStage === 2 && (
            <motion.div
              key="stage-2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <MemoryQuiz onComplete={() => goToStage(3)} />
            </motion.div>
          )}

          {currentStage === 3 && (
            <motion.div
              key="stage-3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <WrappedMoments
                onNext={() => goToStage(4)}
                onPauseBackgroundMusic={() => audioRef.current?.pauseAudio()}
                onResumeBackgroundMusic={() => audioRef.current?.resumeAudio()}
              />
            </motion.div>
          )}

          {currentStage === 4 && (
            <motion.div
              key="stage-4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LetterAndVouchers onRestart={() => goToStage(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Romántico */}
      <footer className="relative z-10 py-6 text-center text-xs text-rose-300/50">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span>Hecho con mucho cariño para</span>
          <span className="text-rose-200 font-medium">{configCumple.nombreElla}</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
        </div>
        <p className="text-[11px] text-white/30">
          Por Cristian • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
