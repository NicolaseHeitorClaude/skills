// Copia Leaflet e as fontes de node_modules para public/assets/vendor (sem CDN em produção).
import { cpSync, mkdirSync } from 'node:fs';
const V = 'public/assets/vendor';
mkdirSync(`${V}/fonts`, { recursive: true });
cpSync('node_modules/leaflet/dist/leaflet.js', `${V}/leaflet.js`);
cpSync('node_modules/leaflet/dist/leaflet.css', `${V}/leaflet.css`);
for (const f of ['alegreya-latin-wght-normal.woff2', 'alegreya-latin-ext-wght-normal.woff2'])
  cpSync(`node_modules/@fontsource-variable/alegreya/files/${f}`, `${V}/fonts/${f}`);
for (const w of ['400', '700'])
  for (const s of ['latin', 'latin-ext'])
    cpSync(`node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-${s}-${w}-normal.woff2`, `${V}/fonts/atkinson-${s}-${w}.woff2`);
console.log('vendor ok');
