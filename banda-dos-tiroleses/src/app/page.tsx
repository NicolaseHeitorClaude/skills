import Link from "next/link";
import Foto from "@/components/Foto";
import Titulo from "@/components/Titulo";
import EventoLinha from "@/components/EventoLinha";
import { Seta, TrezeTilias, Losango } from "@/components/Ornamentos";
import { anosDeHistoria, dataLonga, eventos, historia, midia, noticias, parceiros, partesData } from "@/lib/content";

export const revalidate = 3600;

const anoMusical = [
  ["Jan – Mar", "Sommerkonzerte", "Concertos de verão na Concha Acústica"],
  ["1º de maio", "Maiblasen", "A banda toca pelas ruas da cidade"],
  ["Outubro", "Tirolerfest", "A festa da imigração austríaca"],
  ["Outubro", "Oktoberfest Blumenau", "Nos palcos do Parque Vila Germânica"],
  ["Novembro", "Cäcilienkonzert", "Missa e concerto de Santa Cecília"],
];

export default function Home() {
  const { proximos } = eventos();
  const prox = proximos[0];
  const news = noticias().filter((n) => !n.arquivo).slice(0, 3);
  const { maestros } = historia();
  const anos = anosDeHistoria();

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest-deep text-ivory">
        <Foto m={midia("hero-banda")} formato="livre" tom="forest" className="!absolute inset-0" legendaTopo parallax={0.12} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/20" aria-hidden="true" />
        <div className="wrap relative pb-[clamp(2rem,5vw,4rem)] pt-40">
          <p className="kicker text-gold" data-reveal>Musikkapelle Dreizehnlinden · Treze Tílias, Brasil</p>
          <h1 className="display t-hero mt-6" data-lines data-hero>
            <span className="line"><span className="line-in">A tradição</span></span>
            <span className="line"><span className="line-in md:pl-[12%]">atravessa</span></span>
            <span className="line"><span className="line-in"><em className="text-gold">gerações.</em></span></span>
          </h1>
          <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-8 border-t border-ivory/20 pt-6 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-16" data-stagger>
            <p className="lead max-w-[24ch] text-ivory/85">A música permanece viva — desde 1933.</p>
            {prox && (
              <Link href="/eventos" className="group block">
                <span className="kicker text-gold">Próxima apresentação</span>
                <span className="mt-2 flex items-baseline gap-4">
                  <span className="numeral text-[2.6rem]">{partesData(prox.data).dia}.{prox.data.slice(5, 7)}</span>
                  <span className="link font-display text-[1.35rem]">{prox.titulo}</span>
                </span>
              </Link>
            )}
            <a href="#apresentacao" className="kicker hidden items-center gap-3 text-ivory/70 md:inline-flex">Role <span className="block h-10 w-px origin-top animate-pulse bg-gold" /></a>
          </div>
        </div>
      </section>

      {/* 2 — Apresentação */}
      <section id="apresentacao" className="section grain bg-ivory">
        <div className="wrap grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="kicker mb-8 text-gold-deep" data-reveal>A instituição</p>
            <p className="display t-2 !leading-[1.06]" data-lines>
              {["Fundada a bordo de um navio,", "a caminho do Brasil, a Banda", "dos Tiroleses é a memória", <>sonora de <em className="text-bordo">Treze Tílias.</em></>].map((l, i) => (
                <span className="line" key={i}><span className="line-in">{l}</span></span>
              ))}
            </p>
          </div>
          <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-24" data-stagger>
            <p>Em 1933, os emigrantes que deixaram o Tirol levaram seus instrumentos na bagagem. Ainda na travessia, formaram a <strong className="font-medium">Musikkapelle Dreizehnlinden</strong> — e nunca mais deixaram de tocar.</p>
            <p>Hoje, com o traje tirolês e o repertório das bandas alpinas, o grupo marca o compasso da vida cultural da cidade: dos concertos de verão à missa de Santa Cecília.</p>
            <Link href="/banda" className="btn mt-4 text-forest" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>Conheça a banda <Seta /></Link>
          </div>
          <dl className="grid grid-cols-3 gap-6 border-t border-forest/20 pt-10 lg:col-span-12" data-stagger>
            {[[anos, "anos de atividade ininterrupta"], [maestros.length, "regentes em nove décadas"], [13, "de outubro de 1933: a chegada"]].map(([n, t]) => (
              <div key={String(t)}>
                <dt className="numeral text-[clamp(3rem,9vw,8.5rem)] text-bordo" data-count={n}>{n}</dt>
                <dd className="mt-3 max-w-[18ch] text-[0.85rem] uppercase tracking-[0.14em] text-forest/70">{t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — Desde 1933 */}
      <section className="section on-dark grain grain-dark overflow-hidden bg-forest text-ivory">
        <p className="numeral outline-num pointer-events-none absolute -right-[4vw] top-[6%] select-none text-[38vw] text-gold/25" data-parallax="0.25" aria-hidden="true">1933</p>
        <div className="wrap relative">
          <Titulo kicker="Seit 1933 · Desde 1933" size="t-1" linhas={["Uma banda que", <>nasceu <em className="text-gold">no mar.</em></>]} />
          <div className="mt-[clamp(3rem,8vw,7rem)] grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Foto m={midia("hist-1933-navio")} tom="charcoal" formato="retrato" mask parallax={0.08} />
              <p className="kicker mt-4 text-ivory/50">Travessia do Atlântico, 1933</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-[18%]">
              <ol className="space-y-10" data-stagger>
                {[
                  ["Innsbruck → Gênova", "Em setembro de 1933 os primeiros emigrantes se reúnem em Innsbruck e embarcam no Principessa Maria."],
                  ["A bordo", "Músicos de várias aldeias formam a Musikkapelle Dreizehnlinden e ensaiam no convés."],
                  ["Ilha das Flores", "Primeira apresentação, no Rio de Janeiro, para o embaixador da Áustria, Dr. Anton Retschek."],
                  ["13 de outubro", "Chegada a Santa Catarina. Nasce Treze Tílias — com banda."],
                ].map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ivory/20 pt-6">
                    <span className="numeral-sm text-[1.25rem] text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3 className="t-3">{t}</h3><p className="mt-2 max-w-[46ch] text-ivory/75">{d}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/historia" className="btn mt-12" data-reveal>A história completa <Seta /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — A banda hoje */}
      <section className="section grain bg-paper">
        <div className="wrap">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <Titulo className="lg:col-span-7" kicker="Die Kapelle heute · A banda hoje" size="t-1" linhas={["O mesmo som,", <><em className="text-bordo">outra</em> geração.</>]} />
            <p className="lg:col-span-4 lg:col-start-9" data-reveal>Desde 2023 a regência está com <strong className="font-medium">Roberto Luiz da Maia</strong>, músico formado na própria banda. Ao seu lado, uma banda jovem prepara quem vai tocar nas próximas décadas.</p>
          </div>
          <Foto m={midia("atual-banda-formacao")} className="mt-14 !aspect-[4/3] md:!aspect-[21/9]" mask parallax={0.1} sizes="100vw" />
          <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12">
            <h3 className="kicker font-sans text-gold-deep lg:col-span-3">Das Musikjahr<br />O ano musical</h3>
            <ul className="lg:col-span-9" data-stagger>
              {anoMusical.map(([q, n, d]) => (
                <li key={n} className="group grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 border-t border-forest/20 py-5 transition-[padding] duration-500 hover:pl-3 md:grid-cols-[10rem_1fr_1fr]">
                  <span className="kicker text-forest/60">{q}</span>
                  <span className="display text-[clamp(1.5rem,3vw,2.6rem)] transition-colors duration-500 group-hover:text-bordo">{n}</span>
                  <span className="col-start-2 text-[0.95rem] text-forest/70 md:col-start-auto md:text-right">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — Próximos eventos */}
      <section className="section on-dark grain grain-dark bg-bordo text-ivory">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Titulo kicker="Termine · Agenda" size="t-1" linhas={["Próximas", <em key="e">apresentações</em>]} />
            <Link href="/eventos" className="btn" data-reveal style={{ "--btn-fill": "var(--color-ivory)", "--btn-ink": "var(--color-bordo)" } as React.CSSProperties}>Calendário completo <Seta /></Link>
          </div>
          <div className="mt-14" data-stagger>
            {proximos.slice(0, 3).map((e) => <EventoLinha key={e.id} e={e} />)}
            {proximos.length === 0 && <p className="lead border-t border-ivory/20 pt-8">Novas datas serão anunciadas em breve.</p>}
          </div>
        </div>
      </section>

      {/* 6 — Galeria */}
      <section className="section grain bg-ivory">
        <div className="wrap">
          <Titulo kicker="Galerie · Momentos" size="t-1" linhas={["Imagens de", <>noventa <em className="text-bordo">anos.</em></>]} />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
            <Foto m={midia("atual-sommerkonzert-2026")} className="col-span-2 md:col-span-7" mask hover />
            <Foto m={midia("hist-1950-hausberger")} tom="bordo" className="md:col-span-4 md:col-start-9 md:mt-24" mask hover />
            <Foto m={midia("atual-instrumentos")} tom="paper" className="md:col-span-3 md:col-start-2 md:-mt-10" mask hover />
            <Foto m={midia("hist-2013-tirol")} tom="charcoal" className="col-span-2 md:col-span-6 md:col-start-6" mask hover />
          </div>
          <div className="mt-12 text-center" data-reveal>
            <Link href="/galeria" className="btn text-forest" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>Abrir a galeria <Seta /></Link>
          </div>
        </div>
      </section>

      {/* 7 — Notícias */}
      <section className="section grain border-t border-forest/15 bg-ivory !pt-[clamp(4rem,8vw,7rem)]">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Titulo kicker="Aktuelles · Notícias" linhas={["Do coreto", "para a cidade"]} />
            <Link href="/noticias" className="link kicker inline-flex items-center gap-3" data-reveal>Todas as notícias <Seta /></Link>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8" data-stagger>
            {news.map((n, i) => (
              <article key={n.slug} className={i === 1 ? "md:mt-16" : ""}>
                <Link href={`/noticias/${n.slug}`} className="group block">
                  <Foto m={midia(n.midia)} alt={n.titulo} tom={i === 1 ? "bordo" : "forest"} formato={i === 1 ? "retrato" : "paisagem"} hover />
                  <p className="kicker mt-6 text-gold-deep">{n.categoria} · <time dateTime={n.data}>{dataLonga(n.data)}</time></p>
                  <h3 className="t-3 mt-3 transition-colors duration-500 group-hover:text-bordo">{n.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] text-forest/75">{n.resumo}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Homenagem */}
      <section className="section on-dark grain grain-dark bg-forest-deep text-center text-ivory">
        <div className="wrap">
          <Losango className="text-gold" />
          <p className="kicker mt-8 text-gold" data-reveal>In Dankbarkeit · Em gratidão</p>
          <h2 className="display t-1 mx-auto mt-6 max-w-[15ch]" data-lines>
            <span className="line"><span className="line-in">A quem guardou</span></span>
            <span className="line"><span className="line-in"><em className="text-gold">a melodia.</em></span></span>
          </h2>
          <p className="mx-auto mt-8 max-w-[52ch] text-ivory/75" data-reveal>Regentes, músicos, famílias e amigos que, por mais de noventa anos, ensaiaram depois do trabalho, ensinaram os filhos a ler partitura e mantiveram viva uma tradição a um oceano de distância de onde ela nasceu.</p>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-8 text-left sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {maestros.map((m) => (
              <li key={m.nome} className="border-t border-ivory/20 pt-4">
                <span className="numeral-sm block text-[1.05rem] text-gold">{m.inicio} — {m.fim ?? "hoje"}</span>
                <span className="mt-1 block font-display text-[1.45rem]">{m.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — Apoio */}
      <section className="section grain bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Titulo className="lg:col-span-6" kicker="Förderer · Apoio institucional" linhas={["Uma tradição se mantém", <>com <em className="text-bordo">muitas mãos.</em></>]} />
          <div className="lg:col-span-5 lg:col-start-8" data-stagger>
            <p>Instrumentos, trajes, partituras e a formação de novos músicos dependem de quem acredita na cultura. Conheça as instituições que caminham com a banda — e saiba como apoiar.</p>
            <ul className="mt-8 border-b border-forest/20">
              {parceiros().map((p) => (
                <li key={p.nome} className="flex items-baseline justify-between gap-6 border-t border-forest/20 py-4">
                  <span className="font-display text-[1.35rem]">{p.nome}</span><span className="kicker text-forest/60">{p.tipo}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/colaboradores" className="btn text-forest" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>Colaboradores <Seta /></Link>
              <Link href="/contato" className="btn border-bordo bg-bordo text-ivory" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>Seja um apoiador <Seta /></Link>
            </div>
          </div>
          <TrezeTilias className="justify-center text-forest/40 lg:col-span-12 lg:mt-10" />
        </div>
      </section>
    </>
  );
}
