"use client";

import { useEffect, useRef, useState } from "react";
import { Seta } from "./Ornamentos";

const assuntos = [
  ["apresentacao", "Convite para apresentação"],
  ["apoio", "Apoio e patrocínio"],
  ["imprensa", "Imprensa"],
  ["acervo", "Fotos e documentos para o acervo"],
  ["outro", "Outro assunto"],
];
type Estado = { tipo: "parado" | "enviando" | "ok" | "erro"; msg?: string; campos?: Record<string, string> };

export default function ContatoForm({ email }: { email: string }) {
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });
  const [assunto, setAssunto] = useState("apresentacao");
  const inicio = useRef(0);
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    inicio.current = Date.now();
    const a = new URLSearchParams(window.location.search).get("assunto");
    if (a && assuntos.some(([v]) => v === a)) setAssunto(a);
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const campos: Record<string, string> = {};
    if (v("nome").length < 2) campos.nome = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) campos.email = "Informe um e-mail válido.";
    if (v("mensagem").length < 10) campos.mensagem = "Escreva sua mensagem (mínimo de 10 caracteres).";
    if (!d.get("consentimento")) campos.consentimento = "É preciso autorizar o uso dos dados para resposta.";
    if (Object.keys(campos).length) {
      setEstado({ tipo: "erro", msg: "Revise os campos destacados.", campos });
      form.querySelector<HTMLElement>(`[name="${Object.keys(campos)[0]}"]`)?.focus();
      return;
    }
    setEstado({ tipo: "enviando" });
    try {
      const r = await fetch("/api/contato", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: v("nome"), email: v("email"), assunto, mensagem: v("mensagem"), site: v("site"), consentimento: true, t: Date.now() - inicio.current }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { setEstado({ tipo: "ok" }); form.reset(); }
      else setEstado({ tipo: "erro", msg: j.erro ?? "Não foi possível enviar.", campos: j.campos });
    } catch {
      setEstado({ tipo: "erro", msg: "Sem conexão. Tente novamente." });
    }
    status.current?.focus();
  }

  const err = estado.campos ?? {};
  const campo = "peer w-full border-b border-forest/30 bg-transparent py-3 font-display text-[1.25rem] placeholder:text-forest/30 focus:border-bordo focus:outline-none aria-[invalid=true]:border-bordo";
  const rot = "kicker text-forest/60";
  const Erro = ({ k }: { k: string }) => (err[k] ? <span id={`erro-${k}`} className="mt-2 block text-[0.85rem] text-bordo">{err[k]}</span> : null);

  if (estado.tipo === "ok")
    return (
      <div className="border-t border-forest/20 pt-10" role="status">
        <p className="display t-2">Vielen Dank!</p>
        <p className="mt-4 max-w-[40ch] text-forest/75">Mensagem enviada. A banda responderá pelo e-mail informado.</p>
        <button type="button" className="link kicker mt-8" onClick={() => { inicio.current = Date.now(); setEstado({ tipo: "parado" }); }}>Enviar outra mensagem</button>
      </div>
    );

  return (
    <form onSubmit={enviar} noValidate className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <label className="block"><span className={rot}>Nome</span>
          <input name="nome" autoComplete="name" required className={campo} aria-invalid={!!err.nome} aria-describedby={err.nome ? "erro-nome" : undefined} /><Erro k="nome" />
        </label>
        <label className="block"><span className={rot}>E-mail</span>
          <input name="email" type="email" autoComplete="email" required className={campo} aria-invalid={!!err.email} aria-describedby={err.email ? "erro-email" : undefined} /><Erro k="email" />
        </label>
      </div>
      <fieldset>
        <legend className={rot}>Assunto</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {assuntos.map(([v, t]) => (
            <label key={v} className="cursor-pointer">
              <input type="radio" name="assunto" value={v} checked={assunto === v} onChange={() => setAssunto(v)} className="peer sr-only" />
              <span className="block rounded-full border border-forest/30 px-4 py-2 text-[0.85rem] transition-colors duration-300 peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold hover:border-forest">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block"><span className={rot}>Mensagem</span>
        <textarea name="mensagem" rows={5} required className={`${campo} resize-y`} aria-invalid={!!err.mensagem} aria-describedby={err.mensagem ? "erro-mensagem" : undefined} /><Erro k="mensagem" />
      </label>
      {/* Campo isca contra robôs: invisível para pessoas e leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Site<input name="site" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-[0.9rem] text-forest/75">
        <input type="checkbox" name="consentimento" className="mt-1 h-4 w-4 accent-[#751F2B]" aria-invalid={!!err.consentimento} aria-describedby={err.consentimento ? "erro-consentimento" : undefined} />
        <span>Autorizo o uso destes dados apenas para responder a esta mensagem.<Erro k="consentimento" /></span>
      </label>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={estado.tipo === "enviando"} className="btn border-bordo bg-bordo text-ivory disabled:opacity-60" style={{ "--btn-fill": "var(--color-forest)", "--btn-ink": "var(--color-ivory)" } as React.CSSProperties}>
          {estado.tipo === "enviando" ? "Enviando…" : "Enviar mensagem"} <Seta />
        </button>
        <p ref={status} tabIndex={-1} role="alert" className="max-w-[44ch] text-[0.9rem] text-bordo focus:outline-none">
          {estado.tipo === "erro" && <>{estado.msg} {!estado.campos && <a className="underline" href={`mailto:${email}`}>{email}</a>}</>}
        </p>
      </div>
    </form>
  );
}
