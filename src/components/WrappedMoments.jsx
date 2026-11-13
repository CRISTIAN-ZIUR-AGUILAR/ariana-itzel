import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination } from 'swiper/modules';
import { Heart, Clock, Sparkles, ArrowRight, Calendar, Play, Pause, Maximize2, X, Music } from 'lucide-react';
import { configCumple } from '../data/contenido';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// Subcomponente de Video para las Polaroids
function VideoCard({ recuerdo, onOpenModal, onPauseBackgroundMusic, onResumeBackgroundMusic }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (recuerdo.cancionFondo) {
      const audio = new Audio(recuerdo.cancionFondo);
      audio.preload = 'auto';
      audio.onended = () => {
        setIsPlaying(false);
        if (videoRef.current) videoRef.current.pause();
        if (onResumeBackgroundMusic) onResumeBackgroundMusic();
      };
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [recuerdo.cancionFondo, onResumeBackgroundMusic]);

  const togglePlay = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      if (onResumeBackgroundMusic) onResumeBackgroundMusic();
    } else {
      try {
        // 1. Pausar la música principal de fondo ("No sé vivir si no es contigo")
        if (onPauseBackgroundMusic) onPauseBackgroundMusic();

        // 2. Reproducir la canción de fondo del video ("Cuidaré de ti")
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        }

        // 3. Reproducir video en bucle y silenciado para no chocar con la música
        videoRef.current.muted = true;
        videoRef.current.loop = true;
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Error al reproducir video o audio:', err);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden swiper-no-swiping group">
      <video
        ref={videoRef}
        poster={recuerdo.poster}
        playsInline
        preload="auto"
        loop
        muted
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      >
        {recuerdo.webm && <source src={recuerdo.webm} type="video/webm" />}
        <source src={recuerdo.foto} type="video/mp4" />
      </video>

      {/* Botón Central de Play cuando está en pausa */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 hover:scale-110 active:scale-95 transition-transform mb-2">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
          <span className="text-xs font-semibold text-rose-200 tracking-wide bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20 shadow">
            Toca para reproducir 🎬
          </span>
          <span className="text-[11px] text-amber-200/90 mt-1 font-medium bg-black/50 px-2.5 py-0.5 rounded-full">
            🎵 Cuidaré de Ti (Horacio Palencia)
          </span>
        </div>
      )}

      {/* Indicador de música activa cuando está sonando */}
      {isPlaying && (
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-rose-200 font-medium border border-rose-400/30">
            <Music className="w-3 h-3 text-rose-300 animate-pulse" />
            <span>Cuidaré de Ti</span>
          </span>
        </div>
      )}

      {/* Controles flotantes en esquinas */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90"
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isPlaying) {
              videoRef.current?.pause();
              audioRef.current?.pause();
              setIsPlaying(false);
            }
            onOpenModal(recuerdo);
          }}
          className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90"
          title="Ver pantalla completa"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function WrappedMoments({ onNext, onPauseBackgroundMusic, onResumeBackgroundMusic }) {
  // 1. Contador de tiempo juntos
  const [tiempoJuntos, setTiempoJuntos] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [modalVideoData, setModalVideoData] = useState(null);
  const modalAudioRef = useRef(null);

  useEffect(() => {
    const calcularTiempo = () => {
      const inicio = new Date(configCumple.fechaInicioJuntos).getTime();
      const ahora = new Date().getTime();
      const diferencia = Math.max(0, ahora - inicio);

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempoJuntos({ dias, horas, minutos, segundos });
    };

    calcularTiempo();
    const interval = setInterval(calcularTiempo, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Manejo de audio en modal
  useEffect(() => {
    if (modalVideoData && modalVideoData.cancionFondo) {
      if (onPauseBackgroundMusic) onPauseBackgroundMusic();

      const audio = new Audio(modalVideoData.cancionFondo);
      audio.preload = 'auto';
      audio.play().catch(() => {});
      modalAudioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = '';
        if (onResumeBackgroundMusic) onResumeBackgroundMusic();
      };
    }
  }, [modalVideoData, onPauseBackgroundMusic, onResumeBackgroundMusic]);

  // 3. Manejo de imágenes con respaldo
  const [erroresImagen, setErroresImagen] = useState({});

  const handleImageError = (id) => {
    setErroresImagen((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10 max-w-xl mx-auto w-full">
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-400/20 mb-2">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          Nuestra Historia en Números
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
          Cada Segundo a Tu Lado Cuenta ✨
        </h2>
      </motion.div>

      {/* Tarjeta del Contador en Tiempo Real */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full glass-panel rounded-3xl p-5 sm:p-6 mb-8 text-center border-rose-400/30"
      >
        <p className="text-xs uppercase tracking-wider text-rose-300/80 mb-4 font-semibold">
          Tiempo Compartiendo Magia
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-pink-400">
              {tiempoJuntos.dias}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300/70 mt-1 uppercase">Días</span>
          </div>

          <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-pink-400">
              {tiempoJuntos.horas}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300/70 mt-1 uppercase">Horas</span>
          </div>

          <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-pink-400">
              {tiempoJuntos.minutos}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300/70 mt-1 uppercase">Min</span>
          </div>

          <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-rose-400">
              {tiempoJuntos.segundos}
            </span>
            <span className="text-[10px] sm:text-xs text-rose-300/70 mt-1 uppercase">Seg</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-rose-200/80">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>...y esto es apenas el comienzo de nuestra historia.</span>
        </div>
      </motion.div>

      {/* Carrusel de Recuerdos Estilo Polaroid con Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full flex flex-col items-center mb-8"
      >
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <span className="text-xs text-rose-300/70 uppercase tracking-wider font-semibold">
            Álbum de Recuerdos
          </span>
          <span className="text-xs text-rose-400 flex items-center gap-1">
            Desliza las cartas 👈👉
          </span>
        </div>

        <div className="w-full max-w-[320px] sm:max-w-[360px] relative py-2">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="mySwiper w-full"
          >
            {configCumple.recuerdos.map((recuerdo) => {
              const tieneError = erroresImagen[recuerdo.id];
              const esVideo = recuerdo.tipo === 'video' || recuerdo.foto.endsWith('.mp4');

              return (
                <SwiperSlide key={recuerdo.id} className="rounded-3xl overflow-hidden shadow-2xl">
                  {/* Marco estilo Polaroid Romántica */}
                  <div className="bg-[#1e152e] border-2 border-rose-300/20 p-3 sm:p-4 rounded-3xl flex flex-col">
                    {/* Contenedor de Foto o Video */}
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 bg-slate-900 flex items-center justify-center">
                      {!tieneError || esVideo ? (
                        esVideo ? (
                          <VideoCard
                            recuerdo={recuerdo}
                            onOpenModal={(rec) => setModalVideoData(rec)}
                            onPauseBackgroundMusic={onPauseBackgroundMusic}
                            onResumeBackgroundMusic={onResumeBackgroundMusic}
                          />
                        ) : (
                          <img
                            src={recuerdo.foto}
                            alt={recuerdo.titulo}
                            onError={() => handleImageError(recuerdo.id)}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )
                      ) : null}

                      {/* Respaldo Estético si una foto falla (no aplica a video) */}
                      {tieneError && !esVideo && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${recuerdo.colorGradiente} flex flex-col items-center justify-center p-6 text-center backdrop-blur-md`}
                        >
                          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 shadow-inner border border-white/20">
                            <Sparkles className="w-8 h-8 text-amber-200 animate-pulse" />
                          </div>
                          <span className="text-xs uppercase tracking-wider font-bold text-rose-200/90 mb-1">
                            Recuerdo en Proceso 📸
                          </span>
                          <p className="text-xs text-rose-100/80 italic font-serif">
                            "{recuerdo.subtitulo}"
                          </p>
                        </div>
                      )}

                      {/* Fecha / Nota en esquina */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-rose-200 flex items-center gap-1.5 z-20 pointer-events-none">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        <span>{recuerdo.subtitulo}</span>
                      </div>
                    </div>

                    {/* Texto al pie de la Polaroid */}
                    <div className="px-1 text-center">
                      <h4 className="text-lg font-serif font-bold text-rose-100 mb-1">
                        {recuerdo.titulo}
                      </h4>
                      <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
                        {recuerdo.descripcion}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </motion.div>

      {/* Botón para avanzar a la Carta y Vales */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full flex justify-center"
      >
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-500/25 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>Abrir Mi Carta para Ti 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Modal para ver el Video de la Primera Cita en Pantalla Completa */}
      <AnimatePresence>
        {modalVideoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setModalVideoData(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm glass-panel border border-rose-400/40 rounded-3xl p-3 shadow-2xl flex flex-col items-center overflow-hidden"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setModalVideoData(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-rose-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full aspect-[9/16] max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center mb-3 relative">
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={modalVideoData.poster}
                  className="w-full h-full object-contain"
                >
                  {modalVideoData.webm && <source src={modalVideoData.webm} type="video/webm" />}
                  <source src={modalVideoData.foto} type="video/mp4" />
                </video>

                {/* Insignia de audio sonando */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-amber-200 font-medium border border-amber-300/30">
                    <Music className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>Cuidaré de Ti • Horacio Palencia</span>
                  </span>
                </div>
              </div>

              <div className="text-center px-2 pb-2">
                <h4 className="text-base font-serif font-bold text-rose-100 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {modalVideoData.titulo}
                </h4>
                <p className="text-xs text-rose-300/80 mt-0.5">
                  {modalVideoData.subtitulo} • {modalVideoData.descripcion}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
