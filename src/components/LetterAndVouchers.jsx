import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Sparkles, Gift, Send, RefreshCw, Feather } from 'lucide-react';
import { configCumple } from '../data/contenido';
import ScratchCard from './ScratchCard';
import { dispararLluviaCorazones } from '../utils/confetti';

export default function LetterAndVouchers({ onRestart }) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    dispararLluviaCorazones();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10 max-w-xl mx-auto w-full">
      {/* 1. SECCIÓN: CARTA DE AMOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-12"
      >
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-400/20 mb-2">
            <Feather className="w-3.5 h-3.5 text-amber-300" />
            Palabras desde el Corazón
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
            Una Carta para Ti, Ari 💌
          </h2>
        </div>

        {/* Sobre cerrado o Carta desplegada */}
        <div className="w-full">
          {!isLetterOpen ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenLetter}
              className="glass-panel rounded-3xl p-8 text-center cursor-pointer border-rose-400/40 hover:border-rose-400/80 shadow-[0_0_30px_rgba(255,117,140,0.15)] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MailOpen className="w-8 h-8 text-rose-300" />
              </div>

              <h3 className="text-xl font-serif font-bold text-rose-100 mb-2">
                Tienes una carta sellada con amor
              </h3>
              <p className="text-sm text-rose-200/80 mb-6">
                Toca aquí para romper el sello y leer lo que siento por ti.
              </p>

              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold shadow-md shadow-rose-500/30">
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>Abrir Carta</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="glass-panel rounded-3xl p-6 sm:p-9 relative overflow-hidden border-rose-400/40 shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-rose-400 to-pink-500" />

              {/* Encabezado de la Carta */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs text-rose-300/80">
                <span className="font-serif italic">{configCumple.carta.fecha}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-[11px] font-semibold">
                  Exclusivo para Ariana Itzel
                </span>
              </div>

              {/* Saludo */}
              <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-300 mb-4">
                {configCumple.carta.saludo}
              </h3>

              {/* Párrafos de la Carta */}
              <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light">
                {configCumple.carta.parrafos.map((parrafo, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                  >
                    {parrafo}
                  </motion.p>
                ))}
              </div>

              {/* Despedida y Firma */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <p className="text-sm italic font-serif text-rose-200">
                  {configCumple.carta.despedida}
                </p>
                <p className="text-base sm:text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-300">
                  {configCumple.carta.firma}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 2. SECCIÓN: VALES TIPO "RASCA Y GANA" */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-10"
      >
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-200 text-xs font-medium border border-amber-400/20 mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            Tus Regalos Sorpresa
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
            Vales Especiales "Rasca y Gana" 🎟️
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
            Usa tu dedo o ratón para rascar la superficie de cada tarjeta y revelar tu regalo.
          </p>
        </div>

        {/* Lista de Vales Interactivos */}
        <div className="space-y-5 w-full">
          {configCumple.vales.map((vale) => (
            <ScratchCard key={vale.id} vale={vale} />
          ))}
        </div>
      </motion.div>

      {/* Botón de celebración final */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-4"
      >
        <button
          onClick={dispararLluviaCorazones}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>¡Lanzar más confeti y corazones! 🎉</span>
        </button>

        {onRestart && (
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium text-rose-300/70 hover:text-rose-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
