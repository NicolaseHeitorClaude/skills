# CONTENT_AUDIT — Banda dos Tiroleses

Auditoria de conteúdo para o novo site. Data da pesquisa: **10 de novembro de 2026**.

## 0. Limitações de acesso (ler primeiro)

O ambiente de desenvolvimento em nuvem bloqueou o acesso direto a praticamente todas as fontes indicadas:

| Fonte | Resultado |
|---|---|
| `web.archive.org` (site antigo: home, história, músicos, galerias) | **Bloqueado** — nem a ferramenta de leitura de páginas nem o proxy de rede do container alcançam o host |
| `www.trezetilias.com.br` (grupos culturais, eventos) | **Bloqueado** (host fora da lista de rede do ambiente) |
| `tirolerfest.com.br`, `tropicalfm99.com.br` | **Bloqueado** |
| `angelinawittmann.blogspot.com`, `nsctotal.com.br`, `oestemais.com` | **Bloqueado** |
| Instagram / Facebook oficiais | Não identificados nas buscas |

O pedido para liberar esses hosts no ambiente foi rejeitado pelo serviço. **Tudo o que consta abaixo veio de buscas na web (títulos e trechos indexados das páginas)**, não da leitura integral das páginas. Consequências:

- Nenhum texto foi copiado literalmente do site antigo; os textos do novo site são redações próprias a partir dos fatos recuperados.
- **Nenhuma fotografia pôde ser baixada.** Todo o site usa espaços reservados identificados como "Fotografia oficial pendente".
- A lista de músicos e a lista de galerias do site de 2024 **não foram recuperadas**.
- Antes da publicação, cada item marcado como "trecho indexado" deve ser conferido na página original.

Para refazer a recuperação: liberar `web.archive.org`, `www.trezetilias.com.br`, `tirolerfest.com.br` e `tropicalfm99.com.br` nas configurações de rede do ambiente e repetir a Fase 1.

## 1. Dados históricos recuperados

Legenda de confiança: **A** = confirmado em duas ou mais fontes independentes · **B** = uma fonte (trecho indexado) · **C** = incerto / divergente.

| # | Informação | Conf. | Fontes |
|---|---|---|---|
| H1 | Em setembro de 1933 os emigrantes reuniram-se em Innsbruck e seguiram para Gênova; embarcaram no navio **Principessa Maria** | A | bandadostiroleses.com/historia; blog Angelina Wittmann (2024) |
| H2 | Número de emigrantes do primeiro grupo: **83** (site da banda / blog) ou **85** (imprensa) | C | idem; Super Rádio Tupi; BM&C News |
| H3 | Alguns músicos formaram a **Musikkapelle Dreizehnlinden** ainda durante a viagem e ensaiaram a bordo | A | bandadostiroleses.com/historia; trezetilias.com.br/gruposculturais; mk13linden.com/historia; weltbund.at |
| H4 | Primeira apresentação: **Ilha das Flores (RJ)**, para o embaixador da Áustria, **Dr. Anton Retschek** | B | bandadostiroleses.com/historia |
| H5 | Chegada do primeiro grupo e fundação de Treze Tílias: **13 de outubro de 1933** | A | trezetilias.com.br/historia; Wikipedia; blog Wittmann |
| H6 | Colonização liderada por **Andreas Thaler**, ex-ministro da Agricultura da Áustria | A | Wikipedia; imprensa diversa |
| H7 | Atividades **ininterruptas** desde a fundação | B | trezetilias.com.br/gruposculturais |
| H8 | Regentes: Johann Mitterer (1933–1935); Johann Völgefy (1935–1938); Gabriel Hausberger (1938–1981); Bernardo Moser (1981–2016); Markus Astner (2016–2023); **Roberto Luiz da Maia (2023–)** | A | trezetilias.com.br/gruposculturais; blog Wittmann (2024, 2025, 2026) |
| H9 | Grafia do 2º regente: "Völgefy" (portal municipal) × "Hans Völgyvy" (site da banda / mk13linden) | C | idem |
| H10 | Völgefy era engenheiro, deu aulas de regência e preparou o clarinetista Gabriel Hausberger como sucessor | B | bandadostiroleses.com/historia; mk13linden.com |
| H11 | Hausberger compôs e arranjou muitas peças para a banda | B | mk13linden.com/historia |
| H12 | **Adi Rinner** (Terfens, Tirol) deu aulas à banda a partir de 1999; regente honorário (Ehrenkapellmeister) | B | mk13linden.com/historia; arquivo municipal de Terfens |
| H13 | Markus Astner (Tirol, Conservatório de Innsbruck) ensinava na banda desde 2012, como vice-regente | B | mk13linden.com/historia |
| H14 | **2013**: primeira viagem da banda ao Tirol, lema "Z'ruck zu die Wurz'ln", ~45 músicos, passagem pela Wildschönau; 80 anos | A | Gemeindezeitung Wildschönau 09/2013; YouTube "80 Jahre Musikkapelle Dreizehnlinden" |
| H15 | **Outubro de 2023**: 90 anos; Bürgermeistermusikkapelle Bezirk Schwaz no Brasil de 11 a 24/10/2023 (57 participantes); banda com "quase 50 músicos"; oferta de apoio à formação de regentes no Tirol | B | Zillertaler Zeitung, 15.11.2023; Austria Kultur International, 24.10.2023 |
| H16 | Plano de novos trajes tendo o traje da banda de Patsch como modelo (2023) | C | Zillertaler Zeitung — **não usado no site** |
| H17 | Bernardo Moser compôs o hino de Treze Tílias | C | trecho de imprensa tirolesa — **não usado no site** |

### Conteúdo do site antigo NÃO recuperado
- Textos integrais de `/historia`, lista de `/musicos` (formação e diretoria de 2024), índice de `/galerias`, todas as fotografias, logotipo, lista de patrocinadores.
- Segundo domínio `www.mk13linden.com` (versão em alemão) — identificado, não lido.

## 2. Dados recentes (2024–2026)

| Data | Evento | Detalhes | Conf. | Fonte |
|---|---|---|---|---|
| out. 2024 | Tirolerfest 2024 | Apresentação da banda | B | YouTube `iANCTHAg_MM`; Tropical FM |
| 25.10.2024 | Oktoberfest Blumenau | Noite, Setor 1; regência de Roberto Luiz da Maia; Vinícius Thaler citado como regente do grupo de acesso e infantil | B | blog Wittmann, nov. 2024 |
| fim de 2024 | Cäcilienkonzert | Missa às 19h na Igreja Matriz N. Sra. do Perpétuo Socorro; coral Tiroler Echo convidado; presidente citado: Werner Thaler | B | Tropical FM |
| 18.01 / 01.02 / 15.02 / 01.03.2025 | Sommerkonzert 2025 | Concha Acústica, 20h15, gratuito; 01.03 "Konzert am Schloss" no Castelinho; apoio Prefeitura e Asturtílias | B (anúncio prévio) | Tropical FM |
| 01.05.2025 | Maiblasen | 8h–11h35, encerramento na Igreja Matriz | B | Tropical FM |
| 10.10.2025 | Tirolerfest 2025 | Início; 4 dias; 92 anos | B | Tropical FM; NSC Total |
| 25.10.2025 | 40ª Oktoberfest Blumenau | 11h–13h30, Parque Vila Germânica | B | blog Wittmann, nov. 2025 |
| 31.01.2026 | 2º Sommerkonzert 2026 | Concha Acústica, 20h15; série de 4 concertos; presença de Bernardo Moser | B | blog Wittmann, fev. 2026; YouTube `9-wgagbmxDw` |
| 30.04–03.05.2026 | Expotílias 2026 | Show após a abertura oficial | B | Tropical FM; Tílias News |
| 09–13.10.2026 | Tirolerfest 2026 | 93 anos; entrada gratuita; banda no palco principal 20h–21h30 na abertura | A (dia: C) | tirolerfest.com.br; Oeste Mais 07.10.2026; ederluiz.com.vc |
| 17–18.10.2026 | Oktoberfest Blumenau 2026 | Horários divergem entre fontes | C | oktoberfestblumenau.com.br; NSC Total |
| 02.11.2026 | Missa de Finados | Com a banda | B | trezetilias.com.br/eventos; NSC Total |
| 08.11.2026 | Missa pelos Mortos nas Grandes Guerras | Com a banda | B | trezetilias.com.br/eventos |
| **21.11.2026** | **Cäcilienkonzert** | Missa + concerto, Igreja Matriz; Banda Dorfmusik convidada | A (horário: pendente) | trezetilias.com.br/eventos; NSC Total |
| 01.05.2027 | Maiblasen | Listado no portal municipal (trecho embaralhado) | C | trezetilias.com.br/eventos |
| set. 2027 | Festa de Primavera | "Realização: Banda dos Tiroleses" | C | trezetilias.com.br/eventos |

Outros dados atuais:
- **Regência**: Roberto Luiz da Maia, desde 2023 (A). Concluiu curso de regência no Instituto Grillhof (Tirol); moção da ALESC proposta pelo dep. Neodi Saretta — data do documento não vista (B).
- **Banda jovem / grupos de acesso**: Vinícius Thaler (B).
- **Entidade**: Associação Cultural Austríaca Banda dos Tiroleses, CNPJ 04.056.302/0001-32 (B — cadastro público).
- **E-mail**: bandadostiroleses@gmail.com (B — portal municipal).

## 3. Projeto Chile 2027 — estado

**Não confirmado.** Três buscas dedicadas (português e alemão, modo estendido) não encontraram nenhuma menção pública a uma viagem da banda ao Chile em 2027. No site, o item aparece apenas na página História, com o selo "Pendente de confirmação", e **não** consta da agenda. Remover ou atualizar após resposta da diretoria.

## 4. Pendências de confirmação com a banda

1. **Chile 2027**: existe? datas, cidade, evento anfitrião, estado atual.
2. **Presidência atual**: Raphael Scharf (portal municipal e cadastro de mar. 2025) × Werner Thaler (imprensa 2024–2025). O site não publica nenhum nome.
3. **Diretoria atual** e **lista de músicos por naipe** (a de 2024 não foi reutilizada).
4. **Naipes reais** da banda (o site lista a instrumentação típica de uma Musikkapelle, com aviso).
5. Grafia oficial: **Völgefy** ou **Völgyvy**; primeiro nome Johann/Hans.
6. Número de emigrantes do primeiro grupo (83 ou 85) — o site evita o número.
7. **Horário do Cäcilienkonzert de 21.11.2026**; datas do Sommerkonzert 2027; Maiblasen 2027; nome e data da festa de primavera (Frühlingsbaumfest?).
8. **Jahreskonzert**: nenhum registro encontrado com esse nome — é o Cäcilienkonzert?
9. **Redes sociais oficiais** (Instagram, Facebook, YouTube) — nenhuma verificada; os vídeos listados estão marcados como "canal de terceiros".
10. Endereço da sede, telefone, WhatsApp.
11. **Logotipo oficial** (vetor) — o site usa marca tipográfica provisória.
12. **Fotografias oficiais** e autorizações — ver `MEDIA_INVENTORY.md`.
13. **Apoiadores e patrocinadores atuais** e autorização de uso dos logotipos (o site lista apenas Prefeitura e Asturtílias, citados como apoio do Sommerkonzert 2025).
14. Domínio definitivo (`bandadostiroleses.com`?) e e-mail remetente para o formulário.

## 5. URLs das fontes

- https://www.bandadostiroleses.com/historia (site original, fora do ar; cópia: https://web.archive.org/web/20241103005120/https://www.bandadostiroleses.com/historia)
- https://www.mk13linden.com/historia
- https://www.trezetilias.com.br/gruposculturais · https://www.trezetilias.com.br/eventos · https://www.trezetilias.com.br/historia
- https://tirolerfest.com.br/
- https://tropicalfm99.com.br/noticia/banda-dos-tiroleses-de-treze-tilias-anuncia-datas-do-tradicional-sommerkonzert-2025
- https://tropicalfm99.com.br/noticia/banda-dos-tiroleses-de-treze-tilias-inicia-programacao-do-tradicional-sommerkonzert-2025-neste-sabado-18
- https://tropicalfm99.com.br/noticia/banda-dos-tiroleses-de-treze-tilias-realiza-nesta-quinta-feira-01-o-tradicional-maiblasen
- https://tropicalfm99.com.br/noticia/banda-dos-tiroleses-promove-nesta-sexta-concerto-de-santa-cecilia-em-treze-tilias
- https://tropicalfm99.com.br/noticia/banda-dos-tiroleses-de-treze-tilias-se-apresenta-na-oktoberfest-de-blumenau
- https://tropicalfm99.com.br/noticia/tirolerfest-2025-comeca-hoje-10-em-treze-tilias-e-promete-quatro-dias-de-festa-cultura-e-tradicao
- https://angelinawittmann.blogspot.com/2024/11/banda-dos-tiroleses-de-treze-tilias-com.html
- https://angelinawittmann.blogspot.com/2025/11/40-oktoberfest-blumenau-momentos-os.html
- https://angelinawittmann.blogspot.com/2026/02/2-sommerkonzert-banda-dos-tiroleses.html
- https://www.nsctotal.com.br/especiais-publicitarios/eventos-treze-tilias-2026
- https://www.nsctotal.com.br/entretenimento/programacao-oktoberfest-blumenau-2026
- https://www.oestemais.com/cultura/2026/10/07/tirolerfest-2026-celebra-93-anos-da-imigracao-austriaca-em-treze-tilias/
- https://ederluiz.com.vc/noticia/tirolerfest-2026-tera-entrada-gratuita-e-novo-local-em-treze-tilias-confira-a-programacao-completa/
- https://www.zillertalerzeitung.at/2023/11/15/erfolgreiche-konzertreise-der-buergermeistermusikkapelle-bezirk-schwaz-nach-brasilien/
- https://austriakulturinternational.at/2023/10/24/90-jahr-jubilaeum-tiroler-kolonie-dreizehnlinden-treze-tilias-brasilien-botschaft-brasilia/
- https://www.wildschoenau.gv.at/fileadmin/daten-gde/gemeindeamt/gemeindezeitung/2013/Gde-ztg-2013-09.pdf
- https://www.weltbund.at/neuigkeiten/dreizehnlinden-tiroler-dorf-in-brasilien/
- https://portalelegis.alesc.sc.gov.br/documentos/KD13R
- https://www.econodata.com.br/consulta-empresa/04056302000132-associacao-cultural-austriaca-banda-dos-tiroleses
- YouTube: `9-wgagbmxDw`, `iANCTHAg_MM`, `pCgHlafF5Dg`, `pAYKm_tgI6w`, `sRgmBC9hZKU`, `GB2W9to43ko`
