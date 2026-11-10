import type { ReactNode } from "react";

export default function PageHero({ kicker, linhas, children }: { kicker: string; linhas: ReactNode[]; children?: ReactNode }) {
  return (
    <section className="grain grain-dark relative overflow-hidden bg-forest text-ivory">
      <div className="wrap relative pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(9rem,20vw,15rem)]">
        <p className="kicker text-gold" data-reveal>{kicker}</p>
        <h1 className="display t-1 mt-6 max-w-[16ch]" data-lines data-hero>
          {linhas.map((l, i) => <span className="line" key={i}><span className="line-in">{l}</span></span>)}
        </h1>
        {children && <div className="lead mt-10 max-w-[34ch] text-ivory/80 lg:ml-[33%]" data-reveal>{children}</div>}
      </div>
      <div className="staff text-gold" aria-hidden="true" />
    </section>
  );
}
