# Diretrizes de Projeto para Agentes de IA (AGENTS.md)
**Diário Digital de Vistos - E.E. José Marcelino de Almeida**

Consulte o arquivo principal [`GEMINI.md`](./GEMINI.md) para os detalhes completos.

### Resumo Operacional Obrigatório para Agentes:
1. **Versionamento Incremental Obrigatório por Commit:**
   - Todo commit DEVE atualizar a versão do software em `index.html` (`const APP_VERSION = 'X.Y'`).
   - Se for um commit de grande porte / mudança estrutural / novas telas principais: somar `+1.0` (ex: `5.2 -> 6.0`).
   - Se for correções, pequenos ajustes ou melhorias visuais: somar `+0.1` (ex: `5.2 -> 5.3`).
   - A versão deve estar visível na Tela de Login e no Cabeçalho do sistema.
2. **Design & Modo Escuro (Dark Mode):**
   - Utilizar contrastes suaves, modernos e elegantes (`#0c121e`, `#141e30`, `#18243a`).
   - Nunca usar pretos puros nem contrastes agressivos que cansem os olhos dos professores.
3. **Deploy Vercel / Git:**
   - A Vercel puxa da branch `main`. Sincronize e dê push tanto na branch de trabalho (`Usuarios-e-login-firebase`) quanto na `main`.
