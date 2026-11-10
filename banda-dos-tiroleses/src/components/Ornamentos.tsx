/** Folha de tília — referência discreta a "Treze Tílias" (Dreizehnlinden). */
export function Tilia({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2c5 2.5 9.5 6.5 9.5 12 0 4.6-3.6 7.6-7.6 7.6-.8 0-1.4-.1-1.9-.3-.5.2-1.1.3-1.9.3-4 0-7.6-3-7.6-7.6C2.5 8.5 7 4.5 12 2Z" />
      <path d="M12 6v21M12 12l-4-3M12 12l4-3M12 17l-5-3.500M12 17l5-3.5" />
    </svg>
  );
}

/** Treze folhas em fila: as treze tílias. */
export function TrezeTilias({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-[clamp(0.4rem,1.6vw,1.4rem)] ${className}`} role="img" aria-label="Treze folhas de tília">
      {Array.from({ length: 13 }, (_, i) => (
        <Tilia key={i} className={`w-[clamp(0.9rem,1.7vw,1.5rem)] ${i === 6 ? "text-bordo scale-125" : ""}`} />
      ))}
    </div>
  );
}

export function Seta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 10" className={`arrow w-7 ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 5h26M21.5 1l5 4-5 4" />
    </svg>
  );
}

export function Losango({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-current opacity-50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-12 bg-current opacity-50" />
    </span>
  );
}

/** Marca provisória — substituir pelo logotipo oficial em public/media/logos/banda/. */
export function Marca({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Tilia className="w-5 shrink-0 text-gold" />
      <span className="leading-none">
        <span className="block font-display text-[1.28rem] tracking-[-0.02em]">Banda dos Tiroleses</span>
        <span className="mt-1 block text-[0.56rem] uppercase tracking-[0.3em] opacity-70">Musikkapelle Dreizehnlinden<span className="max-sm:hidden"> · 1933</span></span>
      </span>
    </span>
  );
}
