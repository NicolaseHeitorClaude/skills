import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Titulo from "@/components/Titulo";
import Foto from "@/components/Foto";
import { Seta } from "@/components/Ornamentos";
import { historia, midia } from "@/lib/content";

export const metadata: Metadata = {
  title: "História",
  description: "Da emigração tirolesa de 1933 aos dias de hoje: a história da Musikkapelle Dreizehnlinden, a Banda dos Tiroleses de Treze Tílias.",
  alternates: { canonical: "/historia" },
};

export default function Historia() {
  const { linhaDoTempo, maestros, fontes } = historia();
  const agora = new Date().getFullYear();
  const total = agora - 1933;

  return (
    <>
      <PageHero kicker="Geschichte · História" linhas={["Noventa anos", "de música,", <em key="e" className="text-gold">um oceano de distância.</em>]}>
        Em 1933, um grupo de tiroleses atravessou o Atlântico com os instrumentos na bagagem. A banda que formaram no navio toca até hoje.
      </PageHero>

      {/* Linha do tempo */}
      <section className="section grain bg-ivory" aria-label="Linha do tempo">
        <div className="wrap relative">
          <div className="absolute bottom-0 left-[clamp(1.25rem,4.5vw,4.5rem)] top-0 w-px bg-forest/15 lg:left-1/2" aria-hidden="true">
            <div className="h-full w-full bg-bordo" data-draw />
          </div>
          <ol className="space-y-[clamp(4rem,10vw,9rem)]">
            {linhaDoTempo.map((m, i) => {
              const par = i % 2 === 0;
              return (
                <li key={m.titulo} className="relative grid gap-8 pl-8 lg:grid-cols-2 lg:gap-[clamp(3rem,8vw,8rem)] lg:pl-0">
                  <span className="absolute left-0 top-3 h-2.5 w-2.5 -translate-x-[4.5px] rotate-45 bg-bordo lg:left-1/2" aria-hidden="true" />
                  <div className={par ? "lg:text-right" : "lg:order-2"}>
                    <p className="numeral text-[clamp(4.5rem,12vw,11rem)] text-bordo" data-reveal>{m.ano}</p>
                    <p className="kicker mt-4 text-gold-deep" data-reveal>{m.data} · <span lang="de">{m.titulo_de}</span></p>
                    <Titulo as="h3" size="t-2" className="mt-4" linhas={[m.titulo]} />
                    <p className={`mt-5 max-w-[48ch] text-forest/80 ${par ? "lg:ml-auto" : ""}`} data-reveal>{m.texto}</p>
                    <p className="mt-4 text-[0.72rem] uppercase tracking-[0.14em] text-forest/50" data-reveal>
                      Fontes: {m.fontes.map((f, j) => (
                        <span key={f}>{j > 0 && " · "}<a className="link" href={`#fonte-${f}`}>{j + 1}</a></span>
                      ))}
                    </p>
                  </div>
                  <div className={par ? "" : "lg:order-1"}>
                    <Foto m={midia(m.midia)} tom={(["forest", "bordo", "charcoal", "paper"] as const)[i % 4]} className={i % 3 === 1 ? "lg:w-4/5" : ""} mask parallax={0.06} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Gerações de regentes */}
      <section className="section on-dark grain grain-dark bg-forest text-ivory">
        <div className="wrap">
          <Titulo kicker="Kapellmeister · Os regentes" size="t-1" linhas={["Seis batutas,", <>uma <em className="text-gold">só banda.</em></>]} />
          <p className="mt-8 max-w-[52ch] text-ivory/75" data-reveal>Cada barra representa o tempo de regência, na mesma escala — de 1933 a {agora}.</p>
          <ol className="mt-14">
            {maestros.map((m) => {
              const fim = m.fim ?? agora;
              return (
                <li key={m.nome} className="grid gap-x-8 gap-y-3 border-t border-ivory/15 py-7 md:grid-cols-[minmax(0,22rem)_1fr] md:items-center">
                  <div data-reveal>
                    <h3 className="t-3">{m.nome}</h3>
                    <p className="mt-1 text-[0.9rem] text-ivory/60">{m.nota}</p>
                  </div>
                  <div>
                    <div className="relative h-11">
                      <div className="absolute inset-y-0 flex items-end pb-2" style={{ left: `${((m.inicio - 1933) / total) * 100}%`, width: `${Math.max(((fim - m.inicio) / total) * 100, 1.2)}%` }}>
                        <div className={`h-[3px] w-full ${m.fim === null ? "bg-ivory" : "bg-gold"}`} data-grow />
                        <span className="numeral-sm absolute left-0 top-0 whitespace-nowrap leading-none text-[0.8rem] text-gold" style={m.inicio > 2000 ? { left: "auto", right: 0 } : undefined}>
                          {m.inicio}–{m.fim ?? "hoje"} · {fim - m.inicio} {fim - m.inicio === 1 ? "ano" : "anos"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-2 hidden justify-between border-t border-ivory/15 pt-3 text-[0.72rem] tracking-[0.14em] text-ivory/50 md:ml-[calc(22rem+2rem)] md:flex" aria-hidden="true">
            {[1933, 1950, 1970, 1990, 2010, agora].map((a) => <span key={a} className="numeral-sm">{a}</span>)}
          </div>
        </div>
      </section>

      {/* Viagens e intercâmbio */}
      <section className="section grain bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Titulo className="lg:col-span-5" kicker="Brücken · Pontes com o Tirol" linhas={["Idas, voltas", <>e <em className="text-bordo">reencontros.</em></>]} />
          <ul className="lg:col-span-6 lg:col-start-7" data-stagger>
            {[
              ["1999", "Adi Rinner em Treze Tílias", "O músico de Terfens (Tirol) inicia os cursos de aperfeiçoamento com a banda e recebe o título de regente honorário."],
              ["2013", "Primeira viagem ao Tirol", "Sob o lema Z'ruck zu die Wurz'ln, cerca de 45 músicos tocam na terra dos antepassados, 80 anos após a emigração."],
              ["2023", "O Tirol retribui a visita", "A Bürgermeistermusikkapelle do distrito de Schwaz participa das festividades dos 90 anos, em outubro."],
              ["2027", "Projeto: viagem ao Chile", "Há registros internos de um projeto de viagem ao Chile. Nenhuma fonte pública o confirma até novembro de 2026 — informação a validar com a diretoria antes da publicação."],
            ].map(([a, t, d]) => (
              <li key={a} className="grid grid-cols-[5rem_1fr] gap-6 border-t border-forest/20 py-7">
                <span className="numeral text-[2.2rem] text-bordo">{a}</span>
                <div><h3 className="t-3">{t}</h3><p className="mt-2 text-forest/75">{d}</p>{a === "2027" && <p className="kicker mt-3 inline-block border border-bordo/50 px-2 py-1 text-bordo">Pendente de confirmação</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fontes */}
      <section className="grain border-t border-forest/15 bg-ivory py-20">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 className="kicker font-sans text-gold-deep lg:col-span-3">Fontes consultadas</h2>
          <ol className="list-decimal space-y-2 pl-5 text-[0.9rem] text-forest/75 lg:col-span-8">
            {Object.entries(fontes).map(([k, f]) => (
              <li key={k} id={`fonte-${k}`} className="scroll-mt-28"><a className="link" href={f.url} target="_blank" rel="noopener noreferrer">{f.titulo}</a></li>
            ))}
          </ol>
          <div className="lg:col-span-12"><Link href="/banda" className="btn text-forest" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>A banda hoje <Seta /></Link></div>
        </div>
      </section>
    </>
  );
}
