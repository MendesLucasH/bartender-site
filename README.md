# PHP Bartenders

Landing page migrada de React/Vite para Next.js 16 (App Router), React 19 e Tailwind CSS 4. Mantém as seções, imagens, vídeo, cores e conteúdo do projeto original, com renderização no servidor e interatividade isolada no menu, vídeo e galeria.

## Desenvolvimento

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

Use Node.js 22.13+ (a versão 20.18 instalada nesta máquina gera aviso de engine nas dependências do ESLint).

## Estrutura TBrWeb

- `src/app`: rotas, layout, metadados, robots e sitemap.
- `src/components/navbar`, `sections`, `seo`: componentes por responsabilidade, como no default-template.
- `src/lib/api.ts`: cliente SGC no servidor com os headers do template, timeout e cache de três horas.
- `src/lib/content.ts`: adaptação dos dados do CMS para a landing page.
- `src/@types`: contratos de conteúdo.
- `src/mocks`: conteúdo local e dados de contato.
- `public`: mídias originais, favicons e imagem social.

O projeto mantém o Tailwind 4 instalado pelo create-next-app. Os tokens `primary` e `brand-orange` ficam em `src/app/globals.css`, equivalentes às cores de marca do template. Os componentes usam a escala do Tailwind, sem classes com valores arbitrários entre colchetes. Animações decorativas respeitam a preferência de movimento reduzido; o vídeo tem controle de pausa.

## Configurar o SGC

Copie `.env.example` para `.env.local` e preencha as variáveis do cliente PHP Bartenders. Nenhuma chave de outro projeto foi copiada.

| Variável | Uso |
| --- | --- |
| `SGC_KEY` | Chave do cliente, somente no servidor. Também aceita `NEXT_PUBLIC_SGC_KEY` para compatibilidade com o template, mas prefira `SGC_KEY`. |
| `SGC_API_URL` | API do SGC; padrão `https://sgc.tbrweb.com.br`. |
| `NEXT_IS_SSR_ENABLED`, `NEXT_SSR_HEADER`, `NEXT_SSR_ORIGIN` | Headers de SSR fornecidos pela TBrWeb. Preencha somente com a configuração do cliente. |
| `SGC_IMAGE_HOSTS` | Hosts HTTPS usados pelas imagens do CMS, separados por vírgula. SGC e Pexels já estão liberados. |
| `SITE_URL` | Origem HTTPS definitiva do site; usada em canonical, Open Graph, JSON-LD e sitemap. |
| `SITE_INDEXABLE` | `true` no ambiente de produção; mantenha `false` em homologação. |

Execute um novo build após configurar as variáveis de produção. Sem chave, sem registros ou com falha na API, o conteúdo local mantém a landing page disponível. Falhas da API são registradas apenas no servidor.

### Ferramentas conectadas

| Ferramenta | Endpoint | Aplicação |
| --- | --- | --- |
| SEO | `GET /seo` | Título, descrição e autoria nos metadados. |
| Banners | `GET /heros/available` | Primeiro banner disponível por ordem: título acessível, descrição, imagem de fundo e CTA. Sem imagem, mantém o vídeo original. |
| Serviços | `GET /services/available` | Título, resumo e imagem dos cards. Botão gera orçamento no WhatsApp para o serviço. |
| Galerias | `GET /galleries/available` | Cada galeria funciona como categoria do filtro. |
| Fotos | `GET /galleries/photos/available/{gallery_id}` | Usa o ID documentado no Swagger; aceita array de fotos ou objeto com `photos`, como no template. |

Referência: https://sgc.tbrweb.com.br/api-docs/

Os dados são buscados no servidor e os textos não são injetados como HTML do CMS. Não há formulário de contato no original: telefone, email e WhatsApp foram preservados. Textos de Sobre, estatísticas e contato permanecem locais. Não foram adicionados módulos de blog, produtos, popup, rastreamento ou coleta de consentimento que não existem nessa landing page.

## SEO e acessibilidade

- Uma única H1 por página, H2 nas seções e H3 nos seus itens.
- HTML inicial contém todo o conteúdo principal, sem depender de animações ou carregamento pelo navegador.
- Metadata API, canonical, Open Graph, Twitter Card e JSON-LD de Organization.
- Imagens com `next/image`, dimensões reservadas, `sizes` e carregamento sob demanda; logo principal com preload.
- `robots.txt` e `sitemap.xml` coerentes com domínio e flag de indexação. Por padrão a prévia não é indexável.
- Menu com estado acessível, link de pular conteúdo e galeria com dialog nativo, Escape, bloqueio de scroll e retorno de foco.
- Links vazios do rodapé foram corrigidos; links genéricos de Facebook/LinkedIn foram retirados.

## Validação

Build de produção, TypeScript e ESLint. Verificação no navegador em desktop e celular, filtros da galeria, abertura/fechamento por Escape e hierarquia de títulos. A consulta autenticada ao SGC precisa ser validada com a chave e os registros reais do cliente.

## Vídeo do hero

O arquivo original `public/media/VideoFundo.mp4` foi preservado. O hero usa `hero-background.mp4`, uma versão H.264 Main/yuv420p de 720×1280, 25 fps, sem faixa de áudio e com faststart (índice no início do MP4). Isso reduz o download e o custo de decodificação mantendo as cenas e a duração originais.

Para recriar com FFmpeg:

```sh
ffmpeg -i public/media/VideoFundo.mp4 -map 0:v:0 -an -vf "scale=720:1280:flags=lanczos,setsar=1" -c:v libx264 -profile:v main -level:v 3.1 -pix_fmt yuv420p -preset medium -crf 23 -r 25 -g 50 -movflags +faststart public/media/hero-background.mp4
```

Com a preferência do sistema de movimento reduzido, o vídeo inicia pausado; o botão permite reproduzi-lo explicitamente. Não há autoplay concorrente antes da verificação dessa preferência.

Avisos de hidratação que mostram `data-scribe-recorder-ready` ou `cz-shortcut-listen` indicam atributos inseridos por extensões. Para isolar, desative a extensão para localhost ou use um perfil sem extensões. O projeto não suprime avisos de hidratação globalmente.

## Conteúdo atualizado pelo formulário do cliente

Textos revisados a partir de `novo formulario de SEO.docx`: história (ideia em 2021 e operação em novembro de 2023), oito serviços, diferenciais, região de atendimento, responsável, endereço e contatos. Dados centrais estão em `src/mocks/brand.ts`; serviços e FAQ ficam em `src/mocks/content.ts`.

O formulário informa números distintos: WhatsApp (19) 97030-5628 e telefone (19) 97130-5628. Horário, domínio, preços e condições de pagamento não foram preenchidos; não foram inventados no site. As estatísticas antigas de 15 anos, 500 drinks, 1.000 clientes e aprovação de 100% foram removidas. As respostas do FAQ sobre condições comerciais orientam contato para esclarecimento.

Metadados e JSON-LD usam os contatos atualizados, endereço completo e região. O SGC continua tendo prioridade para os módulos integrados quando responder com registros; para manter o conteúdo sincronizado, esses registros também precisam refletir o formulário. Na validação desta atualização os endpoints do SGC retornaram HTTP 500, e o fallback local atualizado foi exibido corretamente.
