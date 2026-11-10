import { partesData, type Evento } from "@/lib/content";
import { Seta } from "./Ornamentos";

export default function EventoLinha({ e, passado = false }: { e: Evento; passado?: boolean }) {
  const p = partesData(e.data);
  const f = e.dataFim ? partesData(e.dataFim) : null;
  return (
    <article className="group grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-3 border-t border-current/20 py-8 md:grid-cols-[9rem_1.3fr_1fr_auto] md:items-baseline md:gap-x-10">
      <time dateTime={e.data} className="row-span-2 md:row-span-1">
        {e.dataAproximada ? (
          <span className="numeral block text-[clamp(1.5rem,2.6vw,2.2rem)] leading-none">{p.mesAbrev}</span>
        ) : (
          <span className="numeral block text-[clamp(3rem,5.5vw,5rem)]">{p.dia}{f && <span className="text-[0.45em] opacity-60">–{f.dia}</span>}</span>
        )}
        <span className="kicker mt-2 block opacity-70">{e.dataAproximada ? p.ano : `${p.mesAbrev} ${p.ano}`}</span>
      </time>
      <div>
        <p className="kicker opacity-70">{e.categoria}</p>
        <h3 className="display mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.02]">{e.titulo}</h3>
        {e.subtitulo && <p className="serif-it mt-1 font-display text-[1.1rem] opacity-80">{e.subtitulo}</p>}
      </div>
      <div className="col-start-2 text-[0.95rem] md:col-start-auto">
        <p>{e.local}{e.hora && <> · <strong className="font-medium">{e.hora}</strong></>}</p>
        <p className="mt-2 opacity-75">{e.descricao}</p>
        {e.confirmacao && !passado && <p className="mt-2 text-[0.82rem] italic opacity-70">{e.confirmacao}</p>}
        <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] opacity-50">Fonte: {e.fonte}</p>
      </div>
      <div className="col-start-2 md:col-start-auto md:justify-self-end">
        {e.link && (
          <a href={e.link} target="_blank" rel="noopener noreferrer" className="link kicker inline-flex items-center gap-3">
            {passado ? "Registro" : "Detalhes"} <Seta /><span className="sr-only"> — {e.titulo} (abre em nova aba)</span>
          </a>
        )}
      </div>
    </article>
  );
}
