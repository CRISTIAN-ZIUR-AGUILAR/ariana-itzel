import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { configCumple } from '../data/contenido';
import { dispararConfetiRomantico } from '../utils/confetti';

export default function IntroScreen({ onStart }) {
  const handleOpen = () => {
    dispararConfetiRomantico();
    onStart();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-xl mx-auto">
      {/* Insignia Romántica Superior */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs md:text-sm font-medium tracking-wide mb-6 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{configCumple.intro.etiqueta}</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </motion.div>

      {/* Título Principal y Nombre */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="space-y-2 mb-6"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-rose-200/90 font-light tracking-wide">
          {configCumple.intro.titulo}
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-glow-pink">
          {configCumple.intro.nombreDestacado}
        </h1>
      </motion.div>

      {/* Tarjeta de bienvenida con efecto Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 mb-10 w-full relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
        
        <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed font-normal">
          {configCumple.intro.mensajeInicial}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-rose-300/70">
          <span className="h-px w-8 bg-rose-400/30" />
          <span className="font-serif italic">Con amor, {configCumple.nombreEl}</span>
          <span className="h-px w-8 bg-rose-400/30" />
        </div>
      </motion.div>

      {/* Botón Pulsante con Brillo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="w-full flex justify-center"
      >
        <button
          onClick={handleOpen}
          className="animate-pulse-glow group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-rose-500/25"
        >
          <Gift className="w-5 h-5 text-amber-200 transition-transform group-hover:rotate-12" />
          <span className="tracking-wide">{configCumple.intro.botonAbrir}</span>
          <Sparkles className="w-5 h-5 text-amber-100" />
        </button>
      </motion.div>
    </div>
  );
}
