"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Foto from "./Foto";
import type { Midia, Video } from "@/lib/content";

const colecoes = [
  { id: "todas", t: "Tudo" },
  { id: "atuais", t: "Atuais" },
  { id: "historicas", t: "Históricas" },
  { id: "documentos", t: "Documentos" },
  { id: "videos", t: "Vídeos" },
] as const;
type Colecao = (typeof colecoes)[number]["id"];
const tons = ["forest", "bordo", "charcoal", "paper"] as const;

export default function Galeria({ itens, videos }: { itens: Midia[]; videos: Video[] }) {
  const [colecao, setColecao] = useState<Colecao>("todas");
  const [evento, setEvento] = useState("todos");
  const [ano, setAno] = useState("todos");
  const [aberta, setAberta] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const origem = useRef<HTMLElement | null>(null);

  const eventosLista = useMemo(() => [...new Set(itens.map((i) => i.evento))].sort(), [itens]);
  const anos = useMemo(() => [...new Set(itens.map((i) => i.ano).filter(Boolean))].sort().reverse(), [itens]);
  const lista = useMemo(
    () => itens.filter((i) => (colecao === "todas" || i.colecao === colecao) && (evento === "todos" || i.evento === evento) && (ano === "todos" || i.ano === ano)),
    [itens, colecao, evento, ano],
  );

  const abrir = (i: number, el: HTMLElement) => { origem.current = el; setAberta(i); };
  const fechar = useCallback(() => { setAberta(null); origem.current?.focus(); }, []);
  const mover = useCallback((d: number) => setAberta((a) => (a === null ? a : (a + d + lista.length) % lista.length)), [lista.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (aberta !== null && !d.open) d.showModal();
    if (aberta === null && d.open) d.close();
  }, [aberta]);

  useEffect(() => {
    if (aberta === null) return;
    const key = (e: KeyboardEvent) => { if (e.key === "ArrowRight") mover(1); if (e.key === "ArrowLeft") mover(-1); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [aberta, mover]);

  // Gesto de deslizar no celular
  const toque = useRef(0);
  const atual = aberta !== null ? lista[aberta] : null;
  const sel = "border-b border-forest/30 bg-transparent py-2 pr-8 text-[0.9rem] focus:border-bordo";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-forest/20 pb-6">
        <div role="tablist" aria-label="Coleções" className="flex flex-wrap gap-x-7 gap-y-2">
          {colecoes.map((c) => (
            <button key={c.id} role="tab" aria-selected={colecao === c.id} onClick={() => setColecao(c.id)}
              className={`link display text-[clamp(1.3rem,2.4vw,2rem)] transition-colors ${colecao === c.id ? "text-bordo" : "text-forest/55 hover:text-forest"}`}>
              {c.t}
            </button>
          ))}
        </div>
        {colecao !== "videos" && (
          <div className="flex flex-wrap gap-6">
            <label className="kicker flex flex-col gap-1 text-forest/60">Evento
              <select className={sel} value={evento} onChange={(e) => setEvento(e.target.value)}>
                <option value="todos">Todos</option>{eventosLista.map((e) => <option key={e}>{e}</option>)}
              </select>
            </label>
            <label className="kicker flex flex-col gap-1 text-forest/60">Ano
              <select className={sel} value={ano} onChange={(e) => setAno(e.target.value)}>
                <option value="todos">Todos</option>{anos.map((a) => <option key={a}>{a}</option>)}
              </select>
            </label>
          </div>
        )}
      </div>

      {colecao === "videos" ? (
        <ul className="mt-10">
          {videos.map((v) => (
            <li key={v.id} className="border-b border-forest/20">
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-6 py-7">
                <span className="numeral text-[2rem] text-bordo">{v.ano}</span>
                <span>
                  <span className="display block text-[clamp(1.4rem,2.6vw,2.2rem)] transition-colors group-hover:text-bordo">{v.titulo}</span>
                  <span className="kicker mt-1 block text-forest/55">{v.evento} · YouTube{!v.canalOficial && " · canal de terceiros"}</span>
                </span>
                <span className="kicker flex items-center gap-2">Assistir <span aria-hidden="true">↗</span><span className="sr-only">(abre em nova aba)</span></span>
              </a>
            </li>
          ))}
          <li className="pt-6 text-[0.85rem] text-forest/60">Os vídeos abrem no YouTube; nada é reproduzido automaticamente. Canal oficial da banda a confirmar.</li>
        </ul>
      ) : (
        <>
          <p className="mt-6 text-[0.85rem] text-forest/60" aria-live="polite">{lista.length} {lista.length === 1 ? "imagem" : "imagens"}</p>
          <div className="masonry mt-6">
            {lista.map((m, i) => (
              <button key={m.id} type="button" onClick={(e) => abrir(i, e.currentTarget)} className="group block w-full text-left" aria-label={`Ampliar: ${m.titulo}`}>
                <Foto m={m} tom={tons[i % 4]} hover />
                <span className="mt-3 flex items-baseline justify-between gap-4 text-[0.85rem]">
                  <span className="font-display text-[1.05rem]">{m.evento}</span>
                  <span className="kicker text-forest/55">{m.ano || "s/d"}</span>
                </span>
              </button>
            ))}
          </div>
          {lista.length === 0 && <p className="lead mt-10">Nenhuma imagem com esses filtros.</p>}
        </>
      )}

      <dialog ref={dialog} onClose={fechar} onClick={(e) => e.target === e.currentTarget && fechar()} aria-label="Visualizador de imagens"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-forest-deep p-0 text-ivory backdrop:bg-transparent open:flex open:flex-col"
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - toque.current; if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1); }}>
        {atual && aberta !== null && (
          <>
            <div className="wrap flex items-center justify-between py-5">
              <p className="numeral-sm text-gold">{String(aberta + 1).padStart(2, "0")} <span className="text-ivory/40">/ {String(lista.length).padStart(2, "0")}</span></p>
              <button type="button" onClick={fechar} className="link kicker" autoFocus>Fechar ✕</button>
            </div>
            <div className="wrap flex min-h-0 flex-1 items-center justify-center">
              <div key={atual.id} className="lightbox-in max-h-full w-full" style={{ maxWidth: atual.formato === "retrato" ? "min(100%, 60vh)" : atual.formato === "quadrado" ? "min(100%, 72vh)" : "min(100%, 110vh)" }}>
                <Foto m={atual} tom="forest" sizes="100vw" />
              </div>
            </div>
            <div className="wrap flex items-end justify-between gap-6 py-6">
              <div>
                <p className="font-display text-[1.3rem] leading-tight">{atual.titulo}</p>
                <p className="kicker mt-1 text-ivory/55">{atual.evento}{atual.ano && ` · ${atual.ano}`}{atual.credito && ` · Foto: ${atual.credito}`}</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button type="button" onClick={() => mover(-1)} className="btn !px-5" aria-label="Imagem anterior">←</button>
                <button type="button" onClick={() => mover(1)} className="btn !px-5" aria-label="Próxima imagem">→</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
