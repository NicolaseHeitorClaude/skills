# Banda dos Tiroleses — site institucional

Site da Banda dos Tiroleses · Musikkapelle Dreizehnlinden (Treze Tílias, SC — desde 1933).

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · conteúdo em arquivos (`content/`) com painel Decap CMS.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Documentos
- [`CONTENT_AUDIT.md`](CONTENT_AUDIT.md) — o que foi recuperado, fontes, e o que falta confirmar
- [`MEDIA_INVENTORY.md`](MEDIA_INVENTORY.md) — inventário de mídia e situação de autorização
- [`docs/CMS.md`](docs/CMS.md) — como editar conteúdo; o que falta para o painel e o formulário

## Páginas
`/` · `/historia` · `/banda` · `/eventos` · `/galeria` · `/noticias` · `/noticias/[slug]` · `/colaboradores` · `/contato` · `/admin` · `sitemap.xml` · `robots.txt`

## Direção de arte — "Alpine Heritage"
- **Paleta**: bordô `#751F2B`, verde floresta `#192D26` (+ `#10201A`), marfim `#F4EFE6` (+ papel `#E9E1D2`), dourado `#C7A46A`, carvão `#212321`. Seções claras e escuras alternadas; o bordô é reservado à agenda e a destaques.
- **Tipografia**: Fraunces (variável, eixos `opsz` e `SOFT`) para títulos, numerais e itálicos; Instrument Sans para texto e rótulos em versalete espaçado. Títulos em português, sobretítulos bilíngues (alemão · português).
- **Ornamentos**: a folha de tília (Treze Tílias = *Dreizehnlinden*, "treze tílias") como única marca recorrente — treze folhas em fila no rodapé; a pauta de cinco linhas como divisor; losango dourado. Nada de edelweiss, bandeiras ou xadrez.
- **Textura**: grão de papel em SVG sobre todas as superfícies.
- **Marca**: tipográfica e **provisória**, até a chegada do logotipo oficial.

## Animação
Uma única camada (`src/components/Motion.tsx`) lê atributos declarados nas páginas: linhas de título que sobem por máscara, revelação de fotografias por `clip-path`, parallax discreto (só ≥ 768 px), contadores, linha do tempo desenhada pelo scroll e barras das gerações de regentes. Menu, lightbox e microinterações usam apenas CSS. Com `prefers-reduced-motion`, nada é ocultado nem animado. Não há áudio nem vídeo com reprodução automática.

## Decisões
- **Fotografias**: nenhuma imagem real pôde ser obtida nesta fase; o componente `Foto` mostra um espaço reservado rotulado e passa a exibir a imagem assim que o inventário marcar `autorizada`. Não há imagens geradas por IA.
- **Formação atual**: a lista de 2024 não foi reutilizada; a página A Banda traz a estrutura por naipe pronta para receber nomes confirmados.
- **Datas incertas** aparecem com aviso e fonte na própria agenda.
- **CMS em arquivos + Git** em vez de banco de dados: sem custo, com histórico de alterações, e o site segue estático e rápido.
