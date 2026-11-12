"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Marca } from "./Ornamentos";

const nav = [
  { href: "/historia", pt: "História", de: "Geschichte" },
  { href: "/banda", pt: "A Banda", de: "Die Kapelle" },
  { href: "/eventos", pt: "Eventos", de: "Termine" },
  { href: "/galeria", pt: "Galeria", de: "Galerie" },
  { href: "/noticias", pt: "Notícias", de: "Aktuelles" },
  { href: "/colaboradores", pt: "Colaboradores", de: "Förderer" },
  { href: "/contato", pt: "Contato", de: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      setHidden(y > 500 && y > last.current);
      last.current = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-ivory focus:px-4 focus:py-2 focus:text-forest">Ir para o conteúdo</a>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[transform,background-color,color,box-shadow] duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${
          open ? "text-ivory" : solid ? "bg-ivory/95 text-forest shadow-[0_1px_0_rgba(25,45,38,.12)] backdrop-blur" : "text-ivory"
        }`}
      >
        <div className="wrap flex h-[4.75rem] items-center justify-between">
          <Link href="/" aria-label="Banda dos Tiroleses — página inicial"><Marca /></Link>
          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-8 text-[0.74rem] uppercase tracking-[0.2em]">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="link" aria-current={active(n.href) ? "page" : undefined}>{n.pt}</Link></li>
              ))}
            </ul>
          </nav>
          <button ref={btn} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="group flex items-center gap-3 xl:hidden">
            <span className="text-[0.72rem] uppercase tracking-[0.24em]">{open ? "Fechar" : "Menu"}</span>
            <span className="relative block h-3 w-8" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[5.5px] rotate-[20deg]" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[5.5px] -rotate-[20deg]" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <div id="menu" className="menu-panel grain grain-dark fixed inset-0 z-[60] overflow-y-auto bg-forest-deep text-ivory xl:hidden" data-open={open} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="wrap flex min-h-full flex-col justify-between pb-10 pt-28">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties} className="border-b border-ivory/15">
                <Link href={n.href} tabIndex={open ? 0 : -1} className="group flex items-baseline justify-between py-[clamp(0.7rem,2.2vh,1.15rem)]" aria-current={active(n.href) ? "page" : undefined}>
                  <span className="display text-[clamp(2.1rem,9vw,3.6rem)] transition-[letter-spacing,color] duration-500 group-hover:text-gold group-aria-[current=page]:text-gold">{n.pt}</span>
                  <span className="kicker text-gold/80">{n.de}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="kicker mt-10 text-ivory/60">Treze Tílias · Santa Catarina · Desde 1933</p>
        </div>
      </div>
    </>
  );
}
