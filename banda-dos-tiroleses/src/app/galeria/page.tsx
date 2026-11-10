import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Galeria from "@/components/Galeria";
import { galeria } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotografias históricas e atuais, documentos e vídeos da Banda dos Tiroleses, organizados por ano e evento.",
  alternates: { canonical: "/galeria" },
};

export default function Page() {
  const { itens, videos } = galeria();
  const pendentes = itens.filter((i) => i.autorizacao !== "autorizada").length;
  return (
    <>
      <PageHero kicker="Galerie · Galeria" linhas={["O acervo", <em key="e" className="text-gold">em imagens.</em>]}>
        Do convés do Principessa Maria à Concha Acústica: fotografias, documentos e vídeos de nove décadas.
      </PageHero>
      <section className="section grain bg-ivory !pt-16">
        <div className="wrap">
          {pendentes > 0 && (
            <p className="mb-10 max-w-[70ch] border-l border-bordo pl-5 text-[0.92rem] text-forest/75">
              <strong className="font-medium text-bordo">Acervo em importação.</strong> {pendentes} de {itens.length} espaços aguardam a fotografia oficial e a autorização de uso. Nenhuma imagem ilustrativa é apresentada como registro real da banda.
            </p>
          )}
          <Galeria itens={itens} videos={videos} />
        </div>
      </section>
    </>
  );
}
