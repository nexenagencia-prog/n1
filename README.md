# OCTA — versão funcional local

Projeto Next.js 15 preparado para GitHub/Vercel, com navegação completa e funcionalidades locais sem backend obrigatório.

## Rotas
- `/` Início
- `/reunioes`
- `/agenda`
- `/contatos`
- `/gravacoes`
- `/reuniao-instantanea`
- `/calculadora`
- `/anotar`
- `/anotacoes`
- `/lousa`
- `/octa-ai`
- `/skills` e `/octa-skills`
- `/notificacoes`
- `/configuracoes`
- `/planos`
- `/profile`

## Funcionalidade local
Agenda, contatos, notas, preferências e reuniões criadas usam `localStorage`. A sala instantânea solicita câmera/microfone pelo navegador e mantém o vídeo vertical 9:16. A lousa usa canvas. Calculadora, buscas, links e botões principais são funcionais.

## Publicação
O projeto usa `npm run build` e está estruturado para Vercel. Não há necessidade de banco ou chaves de API nesta versão.
