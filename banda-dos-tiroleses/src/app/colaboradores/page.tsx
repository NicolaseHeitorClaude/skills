import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Titulo from "@/components/Titulo";
import { Seta, Tilia } from "@/components/Ornamentos";
import { parceiros } from "@/lib/content";

export const metadata: Metadata = {
  title: "Colaboradores",
  description: "Apoiadores e parceiros institucionais da Banda dos Tiroleses, e como apoiar a preservação da tradição musical tirolesa em Treze Tílias.",
  alternates: { canonical: "/colaboradores" },
};

const formas = [
  ["Instrumentos e trajes", "A renovação do instrumental e dos trajes tiroleses é o maior investimento de uma Musikkapelle."],
  ["Formação", "Aulas, partituras e cursos de regência garantem a próxima geração de músicos."],
  ["Concertos e viagens", "Sommerkonzerte gratuitos, intercâmbios com o Tirol e apresentações fora da cidade."],
];

export default function Colaboradores() {
  const lista = parceiros();
  return (
    <>
      <PageHero kicker="Förderer · Colaboradores" linhas={["Quem sustenta", <em key="e" className="text-gold">a tradição.</em>]}>
        A banda é uma associação cultural sem fins lucrativos. Cada concerto existe porque instituições e pessoas decidem apoiá-lo.
      </PageHero>

      <section className="section grain bg-ivory">
        <div className="wrap">
          <Titulo kicker="Partner · Apoio institucional" linhas={["Com o apoio de"]} />
          <ul className="mt-14 grid border-l border-t border-forest/20 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {lista.map((p) => {
              const corpo = (
                <>
                  <div className="flex h-28 items-center">
                    {p.logo && p.autorizado ? (
                      <Image src={p.logo} alt={`Logotipo: ${p.nome}`} width={220} height={90} className="max-h-24 w-auto object-contain" />
                    ) : (
                      <span className="display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.05]">{p.nome}</span>
                    )}
                  </div>
                  <p className="kicker mt-6 text-gold-deep">{p.tipo}</p>
                  <p className="mt-2 text-[0.92rem] text-forest/70">{p.contexto}</p>
                  {!(p.logo && p.autorizado) && <p className="mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-forest/45">Logotipo aguardando autorização</p>}
                </>
              );
              return (
                <li key={p.nome} className="border-b border-r border-forest/20">
                  {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="block h-full p-8 transition-colors duration-500 hover:bg-paper md:p-10">{corpo}</a> : <div className="h-full p-8 md:p-10">{corpo}</div>}
                </li>
              );
            })}
            <li className="border-b border-r border-forest/20">
              <Link href="/contato?assunto=apoio" className="group flex h-full flex-col justify-between bg-bordo p-8 text-ivory md:p-10">
                <Tilia className="w-8 text-gold" />
                <span><span className="display mt-10 block text-[clamp(1.6rem,2.4vw,2.2rem)]">Sua instituição aqui</span><span className="kicker mt-4 inline-flex items-center gap-3">Seja um apoiador <Seta /></span></span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="section on-dark grain grain-dark bg-verde text-ivory">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Titulo className="lg:col-span-5" kicker="Unterstützen · Como apoiar" linhas={["O que o seu apoio", <em key="e" className="text-gold">faz soar.</em>]} />
          <ol className="lg:col-span-6 lg:col-start-7" data-stagger>
            {formas.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ivory/20 py-7">
                <span className="numeral-sm text-[1.2rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="t-3">{t}</h3><p className="mt-2 text-ivory/75">{d}</p></div>
              </li>
            ))}
            <li className="border-t border-ivory/20 pt-10"><Link href="/contato?assunto=apoio" className="btn">Fale com a diretoria <Seta /></Link></li>
          </ol>
        </div>
      </section>
    </>
  );
}
