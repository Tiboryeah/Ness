export const pad = (n) => String(n).padStart(2, '0');

// Tiempo que falta para `target` desglosado en días, horas, minutos y segundos
export function getRemaining(target) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    ms,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

// "2d 05:12:09" o "05:12:09"
export function formatCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const clock = `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
  return days > 0 ? `${days}d ${clock}` : clock;
}
