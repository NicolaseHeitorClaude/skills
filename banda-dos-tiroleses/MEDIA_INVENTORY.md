# MEDIA_INVENTORY — Inventário de mídia

Gerado a partir de `content/galeria.json` (fonte de verdade — editar lá ou pelo painel /admin).

**Situação em 10.11.2026:** nenhuma fotografia real foi importada. O acesso ao Wayback Machine e aos portais estava bloqueado no ambiente, e nenhuma imagem tem autorização registrada. O site exibe um espaço reservado identificado ("Fotografia oficial pendente") em cada posição.

## Como importar uma fotografia
1. Salvar o arquivo na pasta correspondente (abaixo), em JPG/WebP, lado maior ≥ 2400 px.
2. Em `content/galeria.json`, preencher `arquivo` (ex.: `/media/fotos/atuais/2026-sommerkonzert-01.jpg`), `credito`, `fonte` e mudar `autorizacao` para `autorizada`.
3. A imagem só aparece no site com `autorizacao: "autorizada"`.

## Pastas
| Pasta | Conteúdo |
|---|---|
| `public/media/fotos/historicas/` | Fotografias de acervo (1933–2023) |
| `public/media/fotos/atuais/` | Fotografias contemporâneas |
| `public/media/cartazes/` | Cartazes de eventos |
| `public/media/videos/` | Vídeos próprios (preferir links do canal oficial) |
| `public/media/logos/banda/` | Logotipo oficial (SVG) |
| `public/media/logos/parceiros/` | Logotipos autorizados de apoiadores |
| `public/media/documentos/` | Partituras, atas, recortes digitalizados |

Convenção de nomes: `AAAA-evento-NN.ext` (ex.: `1933-principessa-maria-01.jpg`).

## Fotografias
| ID | Arquivo | Descrição | Evento | Ano | Coleção | Fonte | Crédito | Autorização |
|---|---|---|---|---|---|---|---|---|
| `hero-banda` | — | Retrato oficial da banda em traje tirolês | Retrato institucional | 2026 | atuais | a obter com a banda | — | pendente |
| `atual-banda-formacao` | — | A banda em formação, hoje | Retrato institucional | 2026 | atuais | a obter com a banda | — | pendente |
| `atual-sommerkonzert-2026` | — | 2º Sommerkonzert na Concha Acústica | Sommerkonzert | 2026 | atuais | Registros públicos: blog Angelina Wittmann; YouTube 9-wgagbmxDw | — | pendente |
| `evt-caecilienkonzert` | — | Cäcilienkonzert na Igreja Matriz | Cäcilienkonzert | 2026 | atuais | a obter com a banda | — | pendente |
| `evt-tirolerfest` | — | Abertura da Tirolerfest | Tirolerfest | 2026 | atuais | a obter com a banda | — | pendente |
| `evt-oktoberfest` | — | Palco da Oktoberfest de Blumenau | Oktoberfest Blumenau | 2026 | atuais | a obter com a banda | — | pendente |
| `evt-maiblasen` | — | Maiblasen pelas ruas de Treze Tílias | Maiblasen | 2025 | atuais | a obter com a banda | — | pendente |
| `atual-instrumentos` | — | Detalhe de instrumentos e trajes | Retrato institucional | 2026 | atuais | a obter com a banda | — | pendente |
| `atual-banda-jovem` | — | Banda jovem em ensaio | Formação | 2026 | atuais | a obter com a banda | — | pendente |
| `retrato-regente` | — | Retrato de Roberto Luiz da Maia | Retrato institucional | 2026 | atuais | a obter com a banda | — | pendente |
| `retrato-banda-jovem` | — | Retrato de Vinícius Thaler | Retrato institucional | 2026 | atuais | a obter com a banda | — | pendente |
| `hist-1933-partida` | — | Emigrantes reunidos em Innsbruck | Emigração | 1933 | historicas | Acervo da banda / site original (Wayback Machine) — a recuperar | — | pendente |
| `hist-1933-navio` | — | A bordo do Principessa Maria | Emigração | 1933 | historicas | Acervo da banda / site original — a recuperar | — | pendente |
| `hist-1933-ilha-das-flores` | — | Primeira apresentação, Ilha das Flores | Emigração | 1933 | historicas | a obter com a banda | — | pendente |
| `hist-1933-chegada` | — | Chegada a Dreizehnlinden | Fundação | 1933 | historicas | a obter com a banda | — | pendente |
| `hist-1935-ensaio` | — | A banda nos primeiros anos da colônia | Primeiros anos | 1935 | historicas | a obter com a banda | — | pendente |
| `hist-1950-hausberger` | — | Gabriel Hausberger à frente da banda | Regência | 1950 | historicas | a obter com a banda | — | pendente |
| `hist-1990-moser` | — | Bernardo Moser em concerto | Regência | 1990 | historicas | a obter com a banda | — | pendente |
| `hist-2013-tirol` | — | Viagem ao Tirol — Z'ruck zu die Wurz'ln | Viagem ao Tirol | 2013 | historicas | Registros públicos: Gemeindezeitung Wildschönau 09/2013 | — | pendente |
| `hist-2016-astner` | — | Markus Astner em regência | Regência | 2016 | historicas | a obter com a banda | — | pendente |
| `hist-2023-90-anos` | — | Festividades dos 90 anos | Jubileu de 90 anos | 2023 | historicas | a obter com a banda | — | pendente |
| `doc-partitura` | — | Partitura manuscrita do acervo | Documentos | s/d | documentos | a obter com a banda | — | pendente |

## Vídeos (links externos, sem reprodução automática)
| ID | Título | Ano | Evento | URL | Canal oficial? |
|---|---|---|---|---|---|
| `vid-sommerkonzert-2026` | 2º Sommerkonzert — Treze Tílias | 2026 | Sommerkonzert | https://www.youtube.com/watch?v=9-wgagbmxDw | não verificado |
| `vid-tirolerfest-2024` | Banda dos Tiroleses na Tirolerfest 2024 | 2024 | Tirolerfest | https://www.youtube.com/watch?v=iANCTHAg_MM | não verificado |
| `vid-88-anos` | 88 anos de tradição musical | 2021 | Documentário | https://www.youtube.com/watch?v=pCgHlafF5Dg | não verificado |
| `vid-80-jahre` | 80 Jahre Musikkapelle Dreizehnlinden | 2013 | Jubileu de 80 anos | https://www.youtube.com/watch?v=sRgmBC9hZKU | não verificado |

## Logotipos
| Item | Situação |
|---|---|
| Logotipo oficial da banda | **Pendente** — o site usa marca tipográfica provisória (`src/components/Ornamentos.tsx`, componente `Marca`) |
| Prefeitura de Treze Tílias | Pendente de autorização — exibido só o nome |
| Asturtílias | Pendente de autorização — exibido só o nome |
