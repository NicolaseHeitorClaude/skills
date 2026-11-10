import Link from "next/link";
import { site } from "@/lib/content";
import { Marca, TrezeTilias } from "./Ornamentos";

const cols = [
  { t: "A instituição", l: [["/historia", "História"], ["/banda", "A Banda"], ["/colaboradores", "Colaboradores"]] },
  { t: "Agenda e acervo", l: [["/eventos", "Eventos"], ["/galeria", "Galeria"], ["/noticias", "Notícias"]] },
] as const;

export default function Footer() {
  const s = site();
  return (
    <footer className="grain grain-dark bg-forest-deep text-ivory">
      <div className="wrap pb-10 pt-[clamp(4rem,9vw,8rem)]">
        <p className="display t-1 max-w-[14ch]" data-reveal>Musik <em className="text-gold">verbindet.</em></p>
        <p className="kicker mt-5 text-ivory/60" data-reveal>A música une — desde 1933</p>
        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-12 border-t border-ivory/15 pt-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Marca />
            <p className="mt-6 max-w-[34ch] text-[0.95rem] text-ivory/70">{s.entidade}. Fundada pelos imigrantes austríacos de {s.cidade}, {s.estado}.</p>
          </div>
          {cols.map((c) => (
            <nav key={c.t} aria-label={c.t}>
              <h2 className="kicker font-sans text-gold">{c.t}</h2>
              <ul className="mt-5 space-y-2.5">
                {c.l.map(([h, t]) => <li key={h}><Link className="link" href={h}>{t}</Link></li>)}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="kicker font-sans text-gold">Contato</h2>
            <ul className="mt-5 space-y-2.5">
              <li><a className="link break-all" href={`mailto:${s.email}`}>{s.email}</a></li>
              <li>{s.cidade} — SC, {s.pais}</li>
              <li><Link className="link" href="/contato">Convites e apresentações</Link></li>
              {s.redes.map((r) => <li key={r.url}><a className="link" href={r.url} rel="noopener noreferrer" target="_blank">{r.nome}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-ivory/15 pt-8 text-[0.78rem] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {s.entidade} · CNPJ {s.cnpj}</p>
          <TrezeTilias className="text-gold/60" />
        </div>
      </div>
    </footer>
  );
}
