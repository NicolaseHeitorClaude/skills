import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Foto from "@/components/Foto";
import { Seta } from "@/components/Ornamentos";
import { dataLonga, midia, noticias } from "@/lib/content";

type P = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return noticias().map((n) => ({ slug: n.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const n = noticias().find((x) => x.slug === slug);
  if (!n) return {};
  return { title: n.titulo, description: n.resumo, alternates: { canonical: `/noticias/${slug}` }, openGraph: { type: "article", publishedTime: n.data, title: n.titulo, description: n.resumo } };
}

export default async function Noticia({ params }: P) {
  const { slug } = await params;
  const todas = noticias();
  const i = todas.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const n = todas[i];
  const prox = todas[i + 1] ?? todas[0];
  const ld = { "@context": "https://schema.org", "@type": "NewsArticle", headline: n.titulo, datePublished: n.data, description: n.resumo, publisher: { "@type": "Organization", name: "Banda dos Tiroleses" } };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="grain grain-dark bg-forest text-ivory">
        <div className="wrap pb-16 pt-[clamp(9rem,18vw,13rem)]">
          <p className="kicker text-gold" data-reveal>
            <Link href="/noticias" className="link">Notícias</Link> · {n.categoria}{n.arquivo && " · Arquivo"} · <time dateTime={n.data}>{dataLonga(n.data)}</time>
          </p>
          <h1 className="display t-1 mt-6 max-w-[18ch]" data-reveal>{n.titulo}</h1>
          <p className="lead mt-8 max-w-[38ch] text-ivory/80" data-reveal>{n.resumo}</p>
        </div>
      </header>
      <div className="grain bg-ivory">
        <div className="wrap grid gap-12 py-[clamp(3rem,7vw,6rem)] lg:grid-cols-12">
          {n.midia && <Foto m={midia(n.midia)} alt={n.titulo} className="lg:col-span-10 lg:col-start-2 lg:-mt-28 !aspect-[16/9]" mask priority sizes="100vw" />}
          <div className="prose lg:col-span-7 lg:col-start-4" dangerouslySetInnerHTML={{ __html: n.html }} />
          {n.fontes.length > 0 && (
            <aside className="border-t border-forest/20 pt-6 text-[0.85rem] text-forest/70 lg:col-span-7 lg:col-start-4">
              <h2 className="kicker font-sans text-gold-deep">Fontes</h2>
              <ul className="mt-3 space-y-1.5">{n.fontes.map((f) => <li key={f}><a className="link break-all" href={f} target="_blank" rel="noopener noreferrer">{f.replace(/^https?:\/\/(www\.)?/, "")}</a></li>)}</ul>
            </aside>
          )}
        </div>
      </div>
      <Link href={`/noticias/${prox.slug}`} className="grain grain-dark group block bg-bordo text-ivory">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 py-16">
          <div><p className="kicker text-gold">Próxima leitura</p><p className="display t-2 mt-3 max-w-[22ch]">{prox.titulo}</p></div>
          <Seta className="!w-16 transition-transform duration-500 group-hover:translate-x-3" />
        </div>
      </Link>
    </article>
  );
}
