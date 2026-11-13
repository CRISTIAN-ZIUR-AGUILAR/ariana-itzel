import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { configCumple } from '../data/contenido';

const AudioPlayer = forwardRef(({ onAudioStart }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    const audio = new Audio(configCumple.musica.archivo);
    audio.loop = true;
    audio.preload = 'auto';

    audio.addEventListener('error', () => {
      console.warn('El archivo de audio aún no se encuentra en public/assets/cancion.mp3');
      setHasError(true);
    });

    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = async () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioElement.play();
        setIsPlaying(true);
        setHasError(false);
        if (onAudioStart) onAudioStart();
      } catch (err) {
        console.warn('Autoplay bloqueado o archivo no encontrado:', err);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startPlaying: async () => {
      if (audioElement && !isPlaying) {
        try {
          await audioElement.play();
          setIsPlaying(true);
          setHasError(false);
        } catch (err) {
          console.warn('No se pudo reproducir el audio automáticamente:', err);
        }
      }
    },
    pauseAudio: () => {
      if (audioElement && isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      }
    },
    resumeAudio: async () => {
      if (audioElement && !isPlaying) {
        try {
          await audioElement.play();
          setIsPlaying(true);
          setHasError(false);
        } catch (err) {
          console.warn('No se pudo reanudar el audio automáticamente:', err);
        }
      }
    },
    isPlaying,
  }));

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={togglePlay}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
        className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-full transition-all duration-300 ${
          isPlaying
            ? 'bg-rose-500/20 border border-rose-400/50 shadow-[0_0_20px_rgba(255,117,140,0.35)]'
            : 'bg-slate-900/60 border border-white/10 hover:border-rose-400/40'
        } backdrop-blur-md`}
      >
        {isPlaying ? (
          <>
            {/* Animación de barras de onda de sonido */}
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-1 bg-gradient-to-t from-pink-400 to-rose-300 rounded-full animate-wave-1" />
              <span className="w-1 bg-gradient-to-t from-rose-400 to-pink-300 rounded-full animate-wave-2" />
              <span className="w-1 bg-gradient-to-t from-amber-300 to-rose-400 rounded-full animate-wave-3" />
              <span className="w-1 bg-gradient-to-t from-pink-400 to-rose-400 rounded-full animate-wave-4" />
            </div>
            <Volume2 className="w-4 h-4 text-rose-300" />
            <span className="text-xs font-medium text-rose-200 hidden sm:inline-block tracking-wide">
              Música Sonando
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-rose-200/60 group-hover:text-rose-200 transition-colors" />
            <span className="text-xs text-rose-200/70 hidden sm:inline-block">
              {hasError ? 'Sin audio' : 'Poner música'}
            </span>
          </>
        )}
      </button>
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
