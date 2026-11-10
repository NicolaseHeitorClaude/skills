import type { ReactNode } from "react";

/** Cabeçalho de seção: sobretítulo + título em linhas animadas. */
export default function Titulo({ kicker, linhas, className = "", size = "t-2", as: Tag = "h2" }: { kicker?: string; linhas: ReactNode[]; className?: string; size?: string; as?: "h2" | "h3" }) {
  return (
    <div className={className}>
      {kicker && <p className="kicker mb-5 text-gold-deep [.on-dark_&]:text-gold" data-reveal>{kicker}</p>}
      <Tag className={`display ${size}`} data-lines>
        {linhas.map((l, i) => <span className="line" key={i}><span className="line-in">{l}</span></span>)}
      </Tag>
    </div>
  );
}
