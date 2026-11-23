# Guia turístico de Treze Tílias (versão local)

Redesenho do guia https://mapa.trezetilias.com.br/ com conteúdo dos cadastros da Asturtílias
(www.trezetilias.com.br, lidos em 23/11/2026).

## Rodar

```sh
npm install          # Leaflet e fontes (só para copiar para public/assets/vendor)
npm run vendor
npm start            # http://localhost:4173/
```

`public/` é um site estático. O `server.mjs` só serve os arquivos e devolve `index.html` para as rotas.

## Rotas

- `/` abertura · `/explorar?grupo=&cat=&q=&vista=mapa` · `/local/<id>` ficha completa · `/local/<id>?vista=mapa&ficha=resumo` resumo em meia altura (celular)
- `/categoria/<id>/<nome>`: mesmos endereços de categoria do guia atual
- `/telefones-uteis`: atalho
- `/local/45/…` e `/local/131/…`: IDs do guia atual com correspondência confirmada (campo `legacy` em `tools/places.py`). Outro ID numérico abre a busca pelo nome que vem no endereço.

## Dados

- `tools/places.py`: cadastros curados (fonte, coordenadas, pendências em `confirm`).
- `python3 tools/build_data.py` regera `public/data.json` e as fotos (`public/assets/photos`).
- Coordenadas só entram quando o link de mapa do próprio cadastro aponta para o lugar.

## Pendências

Veja `PENDENCIAS.md` (uso interno; nada disso aparece no guia).

## Marca

- Logo: `public/assets/brand/` foi recortada do JPG oficial (1080 px) com fundo transparente. Um SVG original ainda seria melhor.
- Cores da logo: vermelho `#FF2E34` e grafite `#353132`. Botões usam `#E60007` (mesmo matiz, contraste AA) — ver `public/styles.css`.

## Movimento

Três momentos visíveis, ligados pelo vermelho da Asturtílias: troca de categoria (sublinhado desliza), seleção do ponto
(um anel se expande e some; o ponto fica destacado) e ficha (no celular sobe da base até meia altura quando vem do mapa,
completa quando vem da lista; no computador abre ao lado do mapa). Tempos em `public/styles.css` (`--t-press`, `--t-menu`,
`--t-indicator`, `--t-sheet`). Com `prefers-reduced-motion` tudo vai direto ao estado final.

No mapa, o toque escolhe o ponto mais próximo do dedo (até 26 px); lugares com a mesma coordenada ficam lado a lado.
