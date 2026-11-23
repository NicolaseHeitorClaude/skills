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

- `/` abertura · `/explorar?grupo=&cat=&q=&vista=mapa` · `/local/<id>` ficha
- `/categoria/<id>/<nome>`: mesmos endereços de categoria do guia atual
- `/telefones-uteis`: atalho

## Dados

- `tools/places.py`: cadastros curados (fonte, coordenadas, pendências em `confirm`).
- `python3 tools/build_data.py` regera `public/data.json` e as fotos (`public/assets/photos`).
- Coordenadas só entram quando o link de mapa do próprio cadastro aponta para o lugar.

## Pendências de marca

- Logo da Asturtílias: espaço reservado no cabeçalho (`.logo-slot`), aguardando o arquivo original.
- Cor principal provisória `--accent: #9b1c2c` (vermelho da Águia do Tirol), em `public/styles.css`.
