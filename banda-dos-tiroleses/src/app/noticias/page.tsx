import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Titulo from "@/components/Titulo";
import Foto from "@/components/Foto";
import { dataLonga, midia, noticias } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias recentes e arquivo histórico da Banda dos Tiroleses — Musikkapelle Dreizehnlinden.",
  alternates: { canonical: "/noticias" },
};

export default function Noticias() {
  const todas = noticias();
  const recentes = todas.filter((n) => !n.arquivo);
  const arquivo = todas.filter((n) => n.arquivo);
  const [destaque, ...resto] = recentes;
  return (
    <>
      <PageHero kicker="Aktuelles · Notícias" linhas={["O que a banda", <em key="e" className="text-gold">anda tocando.</em>]} />
      <section className="section grain bg-ivory !pt-20">
        <div className="wrap">
          {destaque && (
            <article>
              <Link href={`/noticias/${destaque.slug}`} className="group grid items-end gap-8 lg:grid-cols-12">
                <Foto m={midia(destaque.midia)} alt={destaque.titulo} className="lg:col-span-7" mask hover priority />
                <div className="lg:col-span-5 lg:pb-6">
                  <p className="kicker text-gold-deep" data-reveal>{destaque.categoria} · <time dateTime={destaque.data}>{dataLonga(destaque.data)}</time></p>
                  <h2 className="display t-2 mt-4 transition-colors duration-500 group-hover:text-bordo" data-reveal>{destaque.titulo}</h2>
                  <p className="mt-5 text-forest/75" data-reveal>{destaque.resumo}</p>
                  <span className="link kicker mt-6 inline-block" data-reveal>Ler notícia</span>
                </div>
              </Link>
            </article>
          )}
          <div className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {resto.map((n, i) => (
              <article key={n.slug} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <Link href={`/noticias/${n.slug}`} className="group block">
                  <Foto m={midia(n.midia)} alt={n.titulo} tom={(["bordo", "forest", "charcoal"] as const)[i % 3]} hover />
                  <p className="kicker mt-6 text-gold-deep">{n.categoria} · <time dateTime={n.data}>{dataLonga(n.data)}</time></p>
                  <h3 className="t-3 mt-3 transition-colors duration-500 group-hover:text-bordo">{n.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] text-forest/75">{n.resumo}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section grain bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Titulo className="lg:col-span-4" kicker="Archiv · Arquivo histórico" linhas={["Páginas", <em key="e" className="text-bordo">guardadas.</em>]} />
          <ul className="lg:col-span-7 lg:col-start-6" data-stagger>
            {arquivo.map((n) => (
              <li key={n.slug} className="border-t border-forest/20">
                <Link href={`/noticias/${n.slug}`} className="group grid grid-cols-[5rem_1fr] gap-6 py-7">
                  <span className="numeral text-[2.2rem] text-bordo">{n.data.slice(0, 4)}</span>
                  <span>
                    <span className="kicker text-forest/55">{n.categoria}</span>
                    <span className="t-3 mt-1 block font-display transition-colors duration-500 group-hover:text-bordo">{n.titulo}</span>
                    <span className="mt-2 block text-[0.95rem] text-forest/70">{n.resumo}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
