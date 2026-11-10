import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Titulo from "@/components/Titulo";
import EventoLinha from "@/components/EventoLinha";
import { eventos } from "@/lib/content";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda da Banda dos Tiroleses: próximas apresentações, concertos, festas e registros de eventos anteriores.",
  alternates: { canonical: "/eventos" },
};

export default function Eventos() {
  const { proximos, anteriores } = eventos();
  const porAno = anteriores.reduce<Record<string, typeof anteriores>>((a, e) => { (a[e.data.slice(0, 4)] ??= []).push(e); return a; }, {});
  const ld = proximos.filter((e) => !e.dataAproximada).map((e) => ({
    "@context": "https://schema.org", "@type": "MusicEvent", name: `${e.titulo} — Banda dos Tiroleses`, startDate: e.data, ...(e.dataFim ? { endDate: e.dataFim } : {}),
    location: { "@type": "Place", name: e.local }, performer: { "@type": "MusicGroup", name: "Banda dos Tiroleses" }, description: e.descricao,
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero kicker="Termine · Eventos" linhas={["Onde a banda", <em key="e" className="text-gold">toca.</em>]}>
        Concertos, festas, missas e desfiles. Datas e horários podem mudar — confirme sempre na fonte indicada.
      </PageHero>

      <section className="section on-dark grain grain-dark bg-bordo text-ivory">
        <div className="wrap">
          <Titulo kicker="Demnächst · Em breve" size="t-1" linhas={["Próximas", <em key="e">apresentações</em>]} />
          <div className="mt-14" data-stagger>
            {proximos.map((e) => <EventoLinha key={e.id} e={e} />)}
            {proximos.length === 0 && <p className="lead border-t border-ivory/20 pt-8">Novas datas serão anunciadas em breve.</p>}
          </div>
        </div>
      </section>

      <section className="section grain bg-ivory text-forest">
        <div className="wrap">
          <Titulo kicker="Rückblick · Eventos anteriores" size="t-1" linhas={["Já", <em key="e" className="text-bordo">tocamos.</em>]} />
          {Object.keys(porAno).sort().reverse().map((ano) => (
            <div key={ano} className="mt-16 grid gap-x-10 lg:grid-cols-12">
              <h3 className="numeral outline-num sticky top-28 self-start text-[clamp(4rem,9vw,8rem)] text-bordo lg:col-span-3" data-reveal>{ano}</h3>
              <div className="lg:col-span-9" data-stagger>{porAno[ano].map((e) => <EventoLinha key={e.id} e={e} passado />)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
