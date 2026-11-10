import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Titulo from "@/components/Titulo";
import Foto from "@/components/Foto";
import { midia, musicos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "A Banda",
  description: "A Banda dos Tiroleses hoje: regência, naipes, banda jovem e as tradições musicais do Tirol preservadas em Treze Tílias.",
  alternates: { canonical: "/banda" },
};

const tradicoes = [
  ["Tracht", "O traje", "A banda se apresenta em traje tirolês — parte inseparável da identidade de uma Musikkapelle."],
  ["Blasmusik", "O repertório", "Marchas, polcas e valsas da tradição alpina, ao lado de peças compostas e arranjadas pelos próprios regentes da casa."],
  ["Nachwuchs", "A formação", "Grupos infantil e de acesso e uma banda jovem preparam novos músicos, como fazem as bandas das aldeias do Tirol."],
  ["Kirchenjahr", "O calendário", "Missas, procissões e festas marcam o ano: Finados, Santa Cecília, o 1º de maio e o aniversário da imigração."],
];

export default function Banda() {
  const { naipes, regencia, aviso } = musicos();
  const s = site();
  return (
    <>
      <PageHero kicker="Die Kapelle · A Banda" linhas={["Sopros, metais", "e percussão —", <em key="e" className="text-gold">em traje tirolês.</em>]}>
        Uma associação cultural de músicos amadores que ensaia, ensina e se apresenta o ano inteiro, como as bandas das aldeias de onde vieram seus fundadores.
      </PageHero>

      <section className="section grain bg-ivory">
        <div className="wrap">
          <Foto m={midia("atual-banda-formacao")} className="!aspect-[4/3] md:!aspect-[21/9]" mask parallax={0.1} sizes="100vw" priority />
          <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-12 lg:grid-cols-12">
            <Titulo className="lg:col-span-5" kicker="Leitung · Regência" linhas={["Quem conduz", <>a <em className="text-bordo">música.</em></>]} />
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7" data-stagger>
              {regencia.map((p, i) => (
                <article key={p.nome} className={i === 1 ? "sm:mt-16" : ""}>
                  <Foto m={midia(p.midia)} tom={i ? "bordo" : "forest"} formato="retrato" hover />
                  <p className="kicker mt-5 text-gold-deep">{p.funcao}{p.desde && ` · desde ${p.desde}`}</p>
                  <h3 className="t-3 mt-2">{p.nome}</h3>
                  <p className="mt-3 text-[0.95rem] text-forest/75">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section on-dark grain grain-dark bg-forest text-ivory">
        <div className="wrap">
          <Titulo kicker="Register · Naipes" size="t-1" linhas={["Os instrumentos", <>da <em className="text-gold">Kapelle.</em></>]} />
          <p className="mt-8 max-w-[60ch] border-l border-gold pl-5 text-[0.95rem] text-ivory/75" data-reveal>{aviso} Os naipes abaixo seguem a instrumentação habitual de uma Musikkapelle tirolesa e também aguardam conferência.</p>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {naipes.map((n, i) => (
              <li key={n.nome} className="group border-t border-ivory/15 py-8 pr-8">
                <span className="numeral-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[clamp(1.7rem,2.6vw,2.4rem)] transition-colors duration-500 group-hover:text-gold">{n.nome}</h3>
                <p className="kicker mt-1 text-ivory/50" lang="de">{n.nome_de}</p>
                {n.musicos.length > 0 ? (
                  <ul className="mt-5 space-y-1 text-[0.95rem] text-ivory/80">{n.musicos.map((m) => <li key={m.nome}>{m.nome}{m.instrumento && <span className="text-ivory/50"> — {m.instrumento}</span>}</li>)}</ul>
                ) : (
                  <p className="mt-5 text-[0.85rem] italic text-ivory/45">Músicos a publicar após confirmação.</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section grain bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Titulo kicker="Brauchtum · Tradições" linhas={["O que se", <>herda, <em className="text-bordo">se toca.</em></>]} />
            <Foto m={midia("atual-instrumentos")} tom="bordo" className="mt-12 lg:w-4/5" mask parallax={0.06} />
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 lg:pt-24" data-stagger>
            {tradicoes.map(([de, pt, d]) => (
              <li key={de} className="border-t border-forest/20 py-7">
                <p className="kicker text-gold-deep" lang="de">{de}</p>
                <h3 className="display mt-2 text-[clamp(1.7rem,2.8vw,2.5rem)]">{pt}</h3>
                <p className="mt-2 max-w-[48ch] text-forest/75">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grain border-t border-forest/15 bg-ivory py-20">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 className="kicker font-sans text-gold-deep lg:col-span-3">Dados institucionais</h2>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-9">
            {[["Entidade", s.entidade], ["CNPJ", s.cnpj], ["Sede", `${s.cidade}, ${s.estado}`], ["Regência", `${s.regente} (desde ${s.regenteDesde})`], ["Presidência", "A confirmar com a diretoria — as fontes públicas divergem."], ["Fundação", "1933, durante a travessia; chegada em 13 de outubro"]].map(([k, v]) => (
              <div key={k} className="border-t border-forest/20 pt-4"><dt className="kicker text-forest/55">{k}</dt><dd className="mt-1 font-display text-[1.25rem] leading-snug">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
