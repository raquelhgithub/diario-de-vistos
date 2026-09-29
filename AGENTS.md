# Diretrizes Oficiais - Diário Digital de Vistos
**E.E. José Marcelino de Almeida (Barretos/SP)**

Regras obrigatórias permanentes para desenvolvimento e agentes de IA neste projeto:

### 1. Integridade de Dados & Custo Zero
- **Zero Data Loss:** Nunca perder dados, vistos ou registros de professores entre atualizações. Usar salvaguardas e migrações defensivas permanentes.
- **100% Gratuito:** O projeto deve permanecer completamente gratuito (sem custos de infraestrutura ou APIs pagas) até ordem em contrário.

### 2. Engenharia de Software & Arquitetura
- **Profissionalismo & Tendências:** Padrões modernos de engenharia web (PWA resiliente, offline-first, performance).
- **Fundamentos Clássicos Obrigatórios:**
  - *Clean Code (Uncle Bob):* Nomes intencionais, SRP (funções pequenas e focadas), SLAP, DRY rigoroso, guard clauses.
  - *The Pragmatic Programmer (Hunt & Thomas):* Ortogonalidade, lógica de domínio desacoplada da UI, tolerância a falhas.
  - *A Philosophy of Software Design (Ousterhout):* Módulos profundos com interfaces simples, definir erros fora de existência (defaults seguros), redução da complexidade cognitiva.
  - *Code Complete (McConnell):* Alta coesão, baixo acoplamento, table-driven methods, validação no perímetro, otimização de laços.

### 3. Usabilidade & Interface (UX/UI)
- **Foco Primordial em Usabilidade:** Interface ergonômica, rápida, acessível e intuitiva para professores em sala de aula.
- **Modo Claro por Padrão:** O Modo Claro é sempre o padrão inicial. O Modo Escuro só é ativado por escolha explícita do usuário.
- **Qualidade do Dark Mode:** Contrastes suaves baseados em Slate/Navy (`#0c121e`, `#141e30`, `#18243a`), sem pretos puros nem caixas desbotadas.

### 4. Fluxo de Trabalho, Testes e Aprovação
- **Execução Automática:** Aprovar e executar automaticamente todas as tarefas internas de codificação, refatoração, correções e testes locais.
- **Link de Teste Obrigatório:** A cada alteração realizada no código, fornecer link/servidor local para teste e validação do usuário antes de qualquer deploy.
- **Deploy Somente sob Aprovação:**
  - O usuário irá testar e: (1) Aprovar para Deploy Git/Vercel; ou (2) Solicitar mais alterações.
  - NUNCA commitar ou enviar push para GitHub/Vercel sem a aprovação explícita prévia do usuário.

### 5. Versionamento & Deploy (Apenas Pós-Aprovação)
- **Momento do Versionamento:** O incremento de versão só ocorre no ato do envio aprovado para GitHub e Vercel:
  - Mudanças estruturais / grandes: `+1.0` (ex: `6.0 -> 7.0`).
  - Ajustes / melhorias / correções: `+0.1` (ex: `6.5 -> 6.6`).
  - Sincronizar em `index.html` (`APP_VERSION`), `version.json` e cache do `sw.js`. Exibir na Tela de Login e no Cabeçalho.
- **Deploy Git/Vercel:** A Vercel puxa da branch `main`. Commitar na branch `Usuarios-e-login-firebase`, mesclar na `main` e realizar push em ambas.
