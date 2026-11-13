import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Ticket, Music, Gift, Heart, Send, Moon, Tent, Utensils } from 'lucide-react';
import { dispararConfetiRomantico } from '../utils/confetti';

const ICONOS = {
  Ticket: Ticket,
  Music: Music,
  Gift: Gift,
  Moon: Moon,
  Tent: Tent,
  Utensils: Utensils,
};

export default function ScratchCard({ vale }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const IconoComponente = ICONOS[vale.icono] || Gift;

  // Inicializar Canvas con superficie rasca y gana dorada/rosa
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    
    // Configurar resolución adecuada para retina / pantallas de alta densidad
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Fondo degradado metálico dorado y rosa
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#f6d365');
    gradient.addColorStop(0.35, '#fda085');
    gradient.addColorStop(0.7, '#ff758c');
    gradient.addColorStop(1, '#ff7eb3');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Decoración: Patrón de pequeños destellos y texto
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < rect.width; i += 20) {
      for (let j = 0; j < rect.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.beginPath();
          ctx.arc(i + 10, j + 10, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Texto de invitación a rascar
    ctx.fillStyle = '#4a0e17';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rasca aquí con tu dedo ✨', rect.width / 2, rect.height / 2 - 10);

    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(74, 14, 23, 0.8)';
    ctx.fillText('Descubre tu regalo sorpresa', rect.width / 2, rect.height / 2 + 12);
  }, [isRevealed]);

  // Cálculo del porcentaje raspado
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    const totalPixels = pixels.length / 4;
    let transparentPixels = 0;

    // Muestreo rápido (cada 16 píxeles para fluidez total)
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percentage = Math.round((transparentPixels / (totalPixels / 4)) * 100);
    setScratchProgress(percentage);

    if (percentage >= 48) {
      setIsRevealed(true);
      dispararConfetiRomantico();
    }
  }, [isRevealed]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 20, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPointRef.current = { x, y };
  };

  // Eventos de Mouse
  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
    checkScratchPercentage();
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  // Eventos Táctiles (Móvil)
  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    lastPointRef.current = null;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current || !e.touches[0]) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
    checkScratchPercentage();
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const mensajeWhatsApp = encodeURIComponent(
    `¡Hola Cristian! ✨ Acabo de rascar y desbloquear mi regalo de cumpleaños:\n\n🎟️ "${vale.titulo}"\n🎁 ${vale.descripcion}\n\n¡Para hacerlo válido cuando digas! 😊`
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden glass-panel border-rose-400/30 p-5 shadow-xl flex flex-col justify-between min-h-[220px]"
    >
      {/* Contenido Revelado (Debajo del Rasca y Gana) */}
      <div className="flex flex-col h-full justify-between z-0">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wider uppercase border border-rose-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {vale.etiqueta}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
              <IconoComponente className="w-5 h-5 text-rose-300" />
            </div>
          </div>

          <h4 className="text-lg font-serif font-bold text-rose-100 mb-2">
            {vale.titulo}
          </h4>

          <p className="text-sm text-rose-200/90 leading-relaxed font-normal mb-3">
            {vale.descripcion}
          </p>

          <p className="text-xs text-rose-300/70 italic border-l-2 border-rose-400/40 pl-2.5">
            {vale.detalles}
          </p>
        </div>

        {/* Botón de Canje cuando ya está revelado */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between"
          >
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> ¡Vale desbloqueado!
            </span>
            <a
              href={`https://wa.me/?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-semibold border border-rose-400/40 transition-colors"
            >
              <span>Canjear</span>
              <Send className="w-3 h-3 text-rose-300" />
            </a>
          </motion.div>
        )}
      </div>

      {/* Capa de Rascar con Canvas */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 touch-none cursor-pointer"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full block select-none touch-none rounded-3xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
