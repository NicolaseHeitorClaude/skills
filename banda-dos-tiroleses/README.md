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

## Direção de arte
- **Paleta** (extraída da logo oficial e dos trajes, harmonizada para tela): vermelho-bordô `#8F1A22` como destaque principal; dourado da lira `#E2B33C` (e `#86610F` para texto sobre claro); marfim `#FAF6EC` e papel `#F1E9D8` como base; preto quente `#1B1512` para textos e seções escuras; verde dos trajes `#1E3B2C` como cor complementar, em poucas seções.
- **Tipografia**: UnifrakturMaguntia nos títulos principais e de seção (peso único, sem itálico nem negrito sintetizados); Fraunces para numerais, datas e subtítulos; Instrument Sans para parágrafos, menus, formulários e informações de eventos.
- **Marca**: logotipo oficial (`public/media/logos/banda/banda-dos-tiroleses.webp`) no cabeçalho, rodapé e favicon, sobre placa branca porque a arte tem fundo branco e letras pretas. Uma versão vetorial com fundo transparente dispensaria a placa.
- **Acabamento**: botões de canto reto (3 px), moldura fina dourada nas fotografias, pauta de cinco linhas como divisor, folha de tília como ornamento, grão de papel.

## Animação
Uma única camada (`src/components/Motion.tsx`) lê atributos declarados nas páginas: linhas de título que sobem por máscara, revelação de fotografias por `clip-path`, parallax discreto (só ≥ 768 px), contadores, linha do tempo desenhada pelo scroll e barras das gerações de regentes. Menu, lightbox e microinterações usam apenas CSS. Com `prefers-reduced-motion`, nada é ocultado nem animado. Não há áudio nem vídeo com reprodução automática.

## Decisões
- **Fotografias**: nenhuma imagem real pôde ser obtida nesta fase; o componente `Foto` mostra um espaço reservado rotulado e passa a exibir a imagem assim que o inventário marcar `autorizada`. Não há imagens geradas por IA.
- **Formação atual**: a lista de 2024 não foi reutilizada; a página A Banda traz a estrutura por naipe pronta para receber nomes confirmados.
- **Datas incertas** aparecem com aviso e fonte na própria agenda.
- **CMS em arquivos + Git** em vez de banco de dados: sem custo, com histórico de alterações, e o site segue estático e rápido.
