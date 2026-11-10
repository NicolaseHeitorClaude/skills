import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const dir = path.join(process.cwd(), "content");
const read = <T,>(file: string): T => JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as T;

export type Site = {
  nome: string; nomeAlemao: string; entidade: string; cnpj: string; cidade: string; estado: string; pais: string;
  fundacao: string; email: string; endereco: string; telefone: string;
  redes: { nome: string; url: string }[]; regente: string; regenteDesde: number;
};
export type Marco = { ano: string; data: string; titulo: string; titulo_de: string; texto: string; midia: string; fontes: string[] };
export type Maestro = { nome: string; inicio: number; fim: number | null; nota: string };
export type Fonte = { titulo: string; url: string };
export type Evento = {
  id: string; titulo: string; subtitulo: string; data: string; dataFim?: string; dataAproximada?: string; hora: string;
  local: string; categoria: string; descricao: string; confirmacao?: string; link: string; midia: string; fonte: string;
};
export type Midia = {
  id: string; titulo: string; evento: string; ano: string; colecao: "atuais" | "historicas" | "documentos";
  formato: "paisagem" | "retrato" | "quadrado"; arquivo: string; credito: string; fonte: string; autorizacao: string;
};
export type Video = { id: string; titulo: string; ano: string; evento: string; url: string; canalOficial: boolean };
export type Naipe = { nome: string; nome_de: string; musicos: { nome: string; instrumento?: string; midia?: string }[] };
export type Pessoa = { nome: string; funcao: string; desde: string; bio: string; midia: string };
export type Parceiro = { nome: string; tipo: string; contexto: string; url: string; logo: string; autorizado: boolean };
export type Noticia = {
  slug: string; titulo: string; data: string; categoria: string; resumo: string; midia: string; arquivo: boolean;
  fontes: string[]; html: string;
};

export const site = () => read<Site>("site.json");
export const historia = () => read<{ linhaDoTempo: Marco[]; maestros: Maestro[]; fontes: Record<string, Fonte> }>("historia.json");
export const galeria = () => read<{ itens: Midia[]; videos: Video[] }>("galeria.json");
export const musicos = () => read<{ aviso: string; naipes: Naipe[]; regencia: Pessoa[] }>("musicos.json");
export const parceiros = () => read<{ itens: Parceiro[] }>("parceiros.json").itens;

export function midia(id: string): Midia | undefined {
  return galeria().itens.find((m) => m.id === id);
}

/** Data de hoje no fuso de Treze Tílias (YYYY-MM-DD). */
export function hoje(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}

export function eventos() {
  const todos = read<{ itens: Evento[] }>("eventos.json").itens;
  const h = hoje();
  const fim = (e: Evento) => e.dataFim ?? e.data;
  return {
    proximos: todos.filter((e) => fim(e) >= h).sort((a, b) => a.data.localeCompare(b.data)),
    anteriores: todos.filter((e) => fim(e) < h).sort((a, b) => b.data.localeCompare(a.data)),
  };
}

export function noticias(): Noticia[] {
  const pasta = path.join(dir, "noticias");
  return fs
    .readdirSync(pasta)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(pasta, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        titulo: String(data.titulo ?? ""),
        data: String(data.data ?? ""),
        categoria: String(data.categoria ?? "Notícias"),
        resumo: String(data.resumo ?? ""),
        midia: String(data.midia ?? ""),
        arquivo: Boolean(data.arquivo),
        fontes: Array.isArray(data.fontes) ? data.fontes.map(String) : [],
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}

const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const abrev = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
export function partesData(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return { dia: String(d).padStart(2, "0"), mes: meses[m - 1], mesAbrev: abrev[m - 1], ano: String(a) };
}
export function dataLonga(iso: string) {
  const p = partesData(iso);
  return `${Number(p.dia)} de ${p.mes} de ${p.ano}`;
}
export function anosDeHistoria() {
  const [a, m, d] = hoje().split("-").map(Number);
  return a - 1933 - (m < 10 || (m === 10 && d < 13) ? 1 : 0);
}
