import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContatoForm from "@/components/ContatoForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contato",
  description: "Convide a Banda dos Tiroleses para uma apresentação, fale com a diretoria ou contribua com o acervo histórico.",
  alternates: { canonical: "/contato" },
};

export default function Contato() {
  const s = site();
  return (
    <>
      <PageHero kicker="Kontakt · Contato" linhas={["Grüß Gott!", <em key="e" className="text-gold">Fale com a banda.</em>]}>
        Convites para apresentações, apoio institucional, imprensa — ou uma fotografia antiga que merece voltar para casa.
      </PageHero>
      <section className="section grain bg-ivory">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4" data-stagger>
            <div className="border-t border-forest/20 py-6">
              <h2 className="kicker font-sans text-gold-deep">E-mail</h2>
              <a href={`mailto:${s.email}`} className="link mt-2 break-all font-display text-[1.4rem]">{s.email}</a>
            </div>
            <div className="border-t border-forest/20 py-6">
              <h2 className="kicker font-sans text-gold-deep">Sede</h2>
              <p className="mt-2 font-display text-[1.4rem] leading-snug">{s.endereco || <>{s.cidade} — {s.estado}<br />{s.pais}</>}</p>
              {!s.endereco && <p className="mt-2 text-[0.82rem] italic text-forest/55">Endereço completo e telefone a confirmar com a diretoria.</p>}
            </div>
            <div className="border-t border-forest/20 py-6">
              <h2 className="kicker font-sans text-gold-deep">Redes sociais</h2>
              {s.redes.length ? (
                <ul className="mt-2 space-y-1">{s.redes.map((r) => <li key={r.url}><a className="link font-display text-[1.4rem]" href={r.url} target="_blank" rel="noopener noreferrer">{r.nome}</a></li>)}</ul>
              ) : (
                <p className="mt-2 text-[0.92rem] text-forest/70">Os perfis oficiais serão listados aqui assim que verificados pela banda.</p>
              )}
            </div>
            <div className="border-t border-forest/20 py-6">
              <h2 className="kicker font-sans text-gold-deep">Entidade</h2>
              <p className="mt-2 text-[0.95rem] text-forest/75">{s.entidade}<br />CNPJ {s.cnpj}</p>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display t-2 mb-12" data-reveal>Escreva para nós</h2>
            <ContatoForm email={s.email} />
          </div>
        </div>
      </section>
    </>
  );
}
