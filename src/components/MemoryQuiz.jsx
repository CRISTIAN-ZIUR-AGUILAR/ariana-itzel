import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Sparkles, ArrowRight, HelpCircle, Flame } from 'lucide-react';
import { configCumple } from '../data/contenido';
import { dispararConfetiRomantico } from '../utils/confetti';

export default function MemoryQuiz({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const preguntaActual = configCumple.preguntasTrivia[currentIdx];
  const esUltimaPregunta = currentIdx === configCumple.preguntasTrivia.length - 1;

  const handleSelect = (opcionIdx) => {
    if (isAnswered && isCorrect) return; // Ya acertó esta pregunta

    setSelectedOption(opcionIdx);
    setIsAnswered(true);

    if (opcionIdx === preguntaActual.respuestaCorrecta) {
      setIsCorrect(true);
      dispararConfetiRomantico();
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleSiguiente = () => {
    if (esUltimaPregunta) {
      onComplete();
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 max-w-xl mx-auto w-full">
      {/* Barra de Progreso Superior */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-xs text-rose-300/80 mb-2 font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Trivia de Nuestra Historia
          </span>
          <span>
            Pregunta {currentIdx + 1} de {configCumple.preguntasTrivia.length}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIdx + (isCorrect ? 1 : 0.4)) / configCumple.preguntasTrivia.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          {/* Tarjeta Principal de la Pregunta */}
          <div
            className={`glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-transform ${
              shake ? 'animate-bounce' : ''
            }`}
          >
            {/* Encabezado con número e ícono */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase border border-rose-400/20">
                Nivel {preguntaActual.numero}
              </span>
              <div className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-300 border border-rose-400/30">
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              </div>
            </div>

            {/* Pregunta */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-100 mb-6 leading-snug">
              {preguntaActual.pregunta}
            </h3>

            {/* Opciones de respuesta */}
            <div className="space-y-3">
              {preguntaActual.opciones.map((opcion, idx) => {
                const esEsta = selectedOption === idx;
                const esLaCorrecta = idx === preguntaActual.respuestaCorrecta;

                let estiloBoton = 'glass-card border-white/10 text-rose-100/90 hover:border-rose-400/50 hover:bg-rose-500/10';

                if (isAnswered) {
                  if (esEsta && isCorrect) {
                    estiloBoton = 'bg-emerald-500/20 border-emerald-400/80 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.3)]';
                  } else if (esEsta && !isCorrect) {
                    estiloBoton = 'bg-rose-500/30 border-rose-400/80 text-rose-200';
                  } else if (isCorrect && esLaCorrecta) {
                    estiloBoton = 'bg-emerald-500/20 border-emerald-400/60 text-emerald-100';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-2xl flex items-center justify-between gap-3 text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer ${estiloBoton}`}
                  >
                    <span>{opcion}</span>
                    {isAnswered && esEsta && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mensaje de retroalimentación */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-2xl text-sm leading-relaxed border ${
                  isCorrect
                    ? 'bg-rose-500/15 border-rose-400/40 text-rose-100'
                    : 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                }`}
              >
                {isCorrect ? (
                  <div className="space-y-1">
                    <p className="font-semibold text-rose-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300" /> ¡Respuesta correcta!
                    </p>
                    <p className="text-rose-100/90">{preguntaActual.mensajeExito}</p>
                  </div>
                ) : (
                  <p>
                    😅 Mmm... ¡casi! Piénsalo bien, sabes cuál es nuestra verdadera razón. ¡Inténtalo de nuevo!
                  </p>
                )}
              </motion.div>
            )}

            {/* Botón para continuar */}
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={handleSiguiente}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-500/30 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span>
                    {esUltimaPregunta ? 'Ver Nuestros Recuerdos ❤️' : 'Siguiente Pregunta'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
