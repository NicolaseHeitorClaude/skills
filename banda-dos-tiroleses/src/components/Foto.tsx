import Image from "next/image";
import type { Midia } from "@/lib/content";

const ratios = { paisagem: "aspect-[3/2]", retrato: "aspect-[4/5]", quadrado: "aspect-square" } as const;
const tons = {
  forest: "bg-verde text-ivory",
  bordo: "bg-bordo text-ivory",
  paper: "bg-paper text-forest",
  charcoal: "bg-charcoal text-ivory",
} as const;

function Motivo({ n }: { n: number }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 0.6, vectorEffect: "non-scaling-stroke" as const };
  if (n === 0)
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-40" aria-hidden="true">
        <path {...s} d="M-10 150 40 96l22 20 44-62 34 44 26-24 40 46 34-70 70 100" />
        <path {...s} opacity=".6" d="M-10 170 60 128l30 18 50-40 40 30 46-36 84 60" />
        <path {...s} opacity=".35" d="M-10 186h320M-10 192h320" />
      </svg>
    );
  if (n === 1)
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-40" aria-hidden="true">
        {[18, 34, 52, 72, 94, 118, 144].map((r) => <circle key={r} {...s} cx="205" cy="92" r={r} opacity={1 - r / 190} />)}
        <path {...s} d="M-10 150c70 0 120-20 215-58" />
      </svg>
    );
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-40" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <path key={i} {...s} d={`M-10 ${70 + i * 12}c80-22 150 22 320-6`} />)}
      {[[60, 86], [104, 100], [150, 82], [198, 96], [246, 78]].map(([x, y], i) => (
        <g key={i}><ellipse cx={x} cy={y} rx="5" ry="3.6" fill="currentColor" opacity=".7" transform={`rotate(-20 ${x} ${y})`} /><path {...s} d={`M${x + 4.5} ${y - 1}v-30`} /></g>
      ))}
    </svg>
  );
}

type Props = {
  m?: Midia; alt?: string; tom?: keyof typeof tons; formato?: keyof typeof ratios | "livre";
  className?: string; mask?: boolean; parallax?: number; priority?: boolean; sizes?: string; hover?: boolean; legendaTopo?: boolean;
};

/**
 * Fotografia do acervo. Enquanto o arquivo oficial não for importado e autorizado
 * (content/galeria.json), exibe um espaço reservado claramente identificado — nunca
 * uma imagem que possa ser confundida com um registro real da banda.
 */
export default function Foto({ m, alt, tom = "forest", formato, className = "", mask, parallax, priority, sizes = "(min-width: 1024px) 50vw, 100vw", hover, legendaTopo }: Props) {
  const f = formato ?? m?.formato ?? "paisagem";
  const pronta = m && m.arquivo && m.autorizacao === "autorizada";
  const seed = m ? [...m.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 3 : 0;
  const titulo = alt ?? m?.titulo ?? "Fotografia";
  return (
    <figure className={`foto @container ${f === "livre" ? "" : ratios[f]} ${pronta ? "" : tons[tom]} ${hover ? "foto-hover" : ""} ${className}`} {...(mask ? { "data-mask": "" } : {})}>
      <div className="foto-in" {...(parallax ? { "data-parallax": parallax, style: { inset: "-8% 0" } } : {})}>
        {pronta ? (
          <Image src={m.arquivo} alt={titulo} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <Motivo n={seed} />
        )}
      </div>
      {pronta ? (
        m.credito && <figcaption className="absolute bottom-3 right-4 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/80">Foto: {m.credito}</figcaption>
      ) : (
        <figcaption className={legendaTopo ? "wrap absolute inset-x-0 top-24 flex justify-end text-right" : "absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-[clamp(0.9rem,2vw,1.5rem)]"}>
          <span className="max-w-[26ch]">
            <span className="kicker block text-gold">Fotografia oficial pendente</span>
            <span className="mt-1.5 block font-display text-[clamp(0.95rem,1.3vw,1.2rem)] leading-tight">{titulo}</span>
          </span>
          {m && !legendaTopo && <span className="hidden text-[0.6rem] uppercase tracking-[0.18em] opacity-60 @lg:block">{m.ano || "s/d"} · {m.id}</span>}
        </figcaption>
      )}
    </figure>
  );
}
