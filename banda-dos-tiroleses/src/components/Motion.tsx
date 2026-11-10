"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Camada única de animação. As páginas declaram intenções por atributos:
 *  .line-in        linhas de título que sobem por trás de uma máscara
 *  data-reveal     entrada suave ao entrar na viewport
 *  data-stagger    filhos entram em sequência
 *  data-mask       fotografia revelada por máscara (clip-path) + leve zoom-out
 *  data-parallax   deslocamento discreto ligado ao scroll (valor = intensidade)
 *  data-count      número que conta até o valor final
 *  data-draw       linha vertical desenhada conforme o scroll (linha do tempo)
 *  data-grow       barra horizontal que cresce (gerações de regentes)
 * Com prefers-reduced-motion nada é ocultado nem animado (ver layout.tsx).
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger);
    const ease = "expo.out";

    const ctx = gsap.context(() => {
      const groups = new Set<Element>();
      document.querySelectorAll<HTMLElement>(".line-in").forEach((el) => groups.add(el.closest("[data-lines]") ?? el.parentElement!));
      groups.forEach((g) => {
        gsap.to(g.querySelectorAll(".line-in"), {
          y: 0, duration: 1.35, ease, stagger: 0.11, delay: g.hasAttribute("data-hero") ? 0.25 : 0,
          scrollTrigger: { trigger: g, start: "top 88%", once: true },
        });
      });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease, stagger: 0.09 }),
      });

      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(el.children, { y: 26, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease, stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
        const inner = el.querySelector(".foto-in");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "expo.inOut" });
        if (inner) tl.fromTo(inner, { scale: 1.22 }, { scale: 1, duration: 1.9, ease }, 0.1);
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const k = parseFloat(el.dataset.parallax || "0.1");
          gsap.fromTo(el, { yPercent: -k * 50 }, {
            yPercent: k * 50, ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseInt(el.dataset.count || "0", 10);
        const o = { v: Math.max(0, end - Math.min(end, 40)) };
        gsap.to(o, {
          v: end, duration: 2, ease: "power3.out",
          onUpdate: () => { el.textContent = String(Math.round(o.v)); },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.to(el, {
          scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: el.parentElement, start: "top 60%", end: "bottom 70%", scrub: 0.4 },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-grow]").forEach((el, i) => {
        gsap.to(el, {
          scaleX: 1, duration: 1.6, ease: "expo.inOut", transformOrigin: "left", delay: (i % 8) * 0.08,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); };
  }, [pathname]);

  return null;
}
