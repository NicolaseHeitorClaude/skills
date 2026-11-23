// Servidor local sem dependências: arquivos de public/ e fallback para index.html (rotas do guia).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const ROOT = new URL('./public/', import.meta.url).pathname;
const PORT = Number(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  let path;
  try { path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, ''); }
  catch { res.writeHead(400).end('Endereço inválido'); return; }
  let file = join(ROOT, path);
  // arquivos reais em /assets e /data.json; qualquer outra rota (inclusive /local/45/Av. X) abre o guia
  const isAsset = path.startsWith('/assets/') || /^\/[^/]+\.(js|css|json|png|webp|svg|ico|txt)$/.test(path);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
  catch { file = isAsset ? null : join(ROOT, 'index.html'); }
  if (!file || !file.startsWith(ROOT)) { res.writeHead(404).end('Não encontrado'); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' }).end(body);
  } catch { res.writeHead(404).end('Não encontrado'); }
}).listen(PORT, () => console.log(`Guia em http://localhost:${PORT}/`));
