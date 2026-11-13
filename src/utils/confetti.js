import confetti from 'canvas-confetti';

export const dispararConfetiRomantico = () => {
  // Ráfaga central con forma de corazón y colores románticos
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ff758c', '#ff7eb3', '#f6d365', '#fda085', '#ff9a9e', '#fecfef'],
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const dispararLluviaCorazones = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const skew = 1;

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const ticks = Math.max(200, 500 * (timeLeft / duration));

    confetti({
      particleCount: 2,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ff758c', '#ff4b72', '#ffccd5', '#f6d365'],
      shapes: ['circle'],
      gravity: 0.6,
      scalar: 1.2,
      drift: (Math.random() - 0.5) * 1.5,
      zIndex: 9999,
    });
  }, 40);
};
