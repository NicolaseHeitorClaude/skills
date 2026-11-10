# Gerenciamento de conteúdo

Todo o conteúdo editável fica em arquivos dentro de `content/` — nada está fixo no código das páginas.

| O quê | Arquivo |
|---|---|
| Notícias (uma por arquivo, Markdown) | `content/noticias/*.md` |
| Eventos | `content/eventos.json` |
| Músicos, naipes, regência | `content/musicos.json` |
| Galeria / inventário de mídia / vídeos | `content/galeria.json` |
| Colaboradores | `content/parceiros.json` |
| Linha do tempo, regentes, fontes | `content/historia.json` |
| Dados institucionais, redes sociais | `content/site.json` |

Eventos passam sozinhos de "Próximos" para "Anteriores" conforme a data (fuso de São Paulo; a página é regenerada a cada hora).

## Painel visual (/admin)

O painel em `/admin` usa o **Decap CMS**, que edita esses mesmos arquivos pelo navegador e grava no repositório Git. A configuração dos formulários está pronta em `public/admin/config.yml`.

### Já funciona
- Teste local, sem login: em um terminal `npx decap-server`, em outro `npm run dev`, abrir `http://localhost:3000/admin`.

### Falta para funcionar em produção (depende de credenciais suas)
1. **Repositório**: preencher `backend.repo` em `public/admin/config.yml` e conferir `branch`. Se o site for movido para a raiz de um repositório próprio, remover o prefixo `banda-dos-tiroleses/` dos caminhos do arquivo.
2. **Login**: o backend GitHub exige um provedor OAuth (um GitHub OAuth App + um pequeno serviço de troca de token; ou Netlify Identity/Git Gateway se a hospedagem for Netlify). Informar a URL em `backend.base_url`.
3. **Publicação**: configurar a hospedagem (Vercel, Netlify etc.) para refazer o build a cada commit — assim a edição no painel vai ao ar em poucos minutos.

Enquanto o login não estiver configurado, `/admin` abre mas não autentica em produção. O conteúdo continua editável direto nos arquivos.

## Formulário de contato

`POST /api/contato` valida os campos no servidor, tem campo isca e trava de tempo contra robôs, checagem de origem e limite de 5 envios por IP a cada 10 minutos (em memória, por instância).

O envio do e-mail usa a API da **Resend** e precisa de três variáveis de ambiente (ver `.env.example`): `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (remetente de um domínio verificado na Resend). **Sem elas o formulário não envia**: responde 503 e mostra ao visitante o e-mail direto da banda. O limite por IP em memória não é compartilhado entre instâncias serverless; para tráfego alto, trocar por um armazenamento externo (ex.: Upstash) ou adicionar um CAPTCHA.
