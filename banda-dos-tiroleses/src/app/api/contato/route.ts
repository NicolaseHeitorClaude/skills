import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ASSUNTOS = ["apresentacao", "apoio", "imprensa", "acervo", "outro"] as const;
const janela = 10 * 60 * 1000;
const limite = 5;
const acessos = new Map<string, number[]>(); // limite por IP em memória (por instância)

const limpo = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const origem = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origem && host && new URL(origem).host !== host) return NextResponse.json({ erro: "Origem inválida." }, { status: 403 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const agora = Date.now();
  const hist = (acessos.get(ip) ?? []).filter((t) => agora - t < janela);
  if (hist.length >= limite) return NextResponse.json({ erro: "Muitas mensagens em pouco tempo. Tente novamente mais tarde." }, { status: 429 });

  let corpo: Record<string, unknown>;
  try { corpo = await req.json(); } catch { return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 }); }

  // Anti-spam: campo isca preenchido ou envio rápido demais → finge sucesso, não envia.
  if (limpo(corpo.site, 200) || typeof corpo.t !== "number" || corpo.t < 3000) return NextResponse.json({ ok: true });

  const nome = limpo(corpo.nome, 120);
  const email = limpo(corpo.email, 200);
  const assunto = limpo(corpo.assunto, 40);
  const mensagem = limpo(corpo.mensagem, 5000);
  const campos: Record<string, string> = {};
  if (nome.length < 2) campos.nome = "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) campos.email = "Informe um e-mail válido.";
  if (!ASSUNTOS.includes(assunto as (typeof ASSUNTOS)[number])) campos.assunto = "Escolha um assunto.";
  if (mensagem.length < 10) campos.mensagem = "Escreva sua mensagem (mínimo de 10 caracteres).";
  if (corpo.consentimento !== true) campos.consentimento = "É preciso autorizar o uso dos dados para resposta.";
  if (Object.keys(campos).length) return NextResponse.json({ erro: "Revise os campos destacados.", campos }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return NextResponse.json({ erro: "O envio pelo site ainda não está configurado. Escreva diretamente para o e-mail da banda.", codigo: "nao_configurado" }, { status: 503 });
  }

  hist.push(agora);
  acessos.set(ip, hist);

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM, to: [CONTACT_TO], reply_to: email,
      subject: `[Site] ${assunto} — ${nome}`.replace(/[\r\n]/g, " "),
      html: `<p><b>Nome:</b> ${esc(nome)}<br><b>E-mail:</b> ${esc(email)}<br><b>Assunto:</b> ${esc(assunto)}</p><p>${esc(mensagem).replace(/\n/g, "<br>")}</p>`,
    }),
  }).catch(() => null);

  if (!r || !r.ok) return NextResponse.json({ erro: "Não foi possível enviar agora. Tente novamente ou use o e-mail da banda." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
