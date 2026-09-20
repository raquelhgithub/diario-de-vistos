# Diretrizes Oficiais do Projeto - Diário Digital de Vistos
**Escola Estadual José Marcelino de Almeida (Barretos/SP)**

Este arquivo estabelece as diretrizes permanentes de desenvolvimento, versionamento e design para este projeto. Todos os agentes e desenvolvedores devem seguir estas regras estritamente em todas as tarefas e conversas.

---

## 1. 📌 Diretriz Obrigatória de Versionamento Incremental

### Regra Fundamental
**Cada novo commit DEVE representar uma nova versão do software.**
O próprio assistente/desenvolvedor é responsável por realizar a contagem e a atualização da versão a cada entrega.

### Critério de Incremento
* **Grandes mudanças / Mudanças estruturais (`+1.0`):**
  * Se o commit for muito extenso, alterar a arquitetura, introduzir novos módulos de ponta a ponta ou remodelar grandes fluxos do sistema:
  * **Exemplo:** `Versão 5.2` &rarr; `Versão 6.0`
* **Pequenas mudanças / Correções / Ajustes visuais (`+0.1`):**
  * Se o commit for de correções de bugs, pequenas melhorias de interface, ajustes de estilo, responsividade ou refinamento de funções existentes:
  * **Exemplo:** `Versão 5.2` &rarr; `Versão 5.3`

### Onde a Versão Deve Estar Sincronizada
1. **Código-fonte (`index.html`):**
   * Na constante `const APP_VERSION = 'X.Y';` declarada no `setup()` da aplicação Vue.
   * Exportada no `return` do `setup()` para consumo reativo em templates: `{{ APP_VERSION }}`.
2. **Tela de Login:**
   * No cabeçalho do card de login (badge destacada: `v{{ APP_VERSION }}`).
   * No rodapé do formulário de login (`Diário Digital de Vistos • Versão {{ APP_VERSION }}`).
3. **Cabeçalho Principal (quando autenticado):**
   * Ao lado do título da escola: `<span ...>v{{ APP_VERSION }}</span>`.
4. **Exportações e Backups:**
   * No payload gerado pela função `exportarBackup()` (`versao: APP_VERSION`).
5. **Mensagens de Commit:**
   * É recomendável registrar a nova versão na mensagem de commit (ex.: `feat: ... (v5.3)`).

---

## 2. 🎨 Diretriz de Design & Modo Escuro (Dark Mode)

### Filosofia Visual
O sistema deve priorizar **descanso visual para professores** com contrastes ergonômicos, modernos e suaves, evitando fadiga ocular em salas de aula e à noite.

### Regras de Cores do Modo Escuro
* **Fundo Geral (`body`):** Tom ardósia/azul escuro profundo (`#0c121e`), nunca preto puro (`#000000`).
* **Cards e Painéis Principais (`bg-white`):** Tom navy refinado (`#141e30`) com bordas suaves (`#22314d`) e sombras aveludadas.
* **Superfícies Secundárias (`bg-slate-50`, `bg-slate-100`):** Levemente contrastantes (`#18243a` e `#1a273f`).
* **Tipografia:** 
  * Títulos: `#ffffff` / `#f8fafc`.
  * Textos de corpo e botões: `#cbd5e1` (suave e legível).
  * Auxiliares e legendas: `#94a3b8`.
* **Controles de Formulário (`input`, `select`, `textarea`):**
  * Fundo `#0f1827`, borda `#2a3b56`, foco com anel suave `rgba(99, 102, 241, 0.35)`.
* **Gradientes do Tailwind:**
  * Sempre sobrescrever as variáveis `--tw-gradient-from` e `--tw-gradient-to` para as classes de gradiente (ex.: `.from-indigo-50`, `.to-purple-50`) em modo escuro, evitando blocos pastéis ou desbotados.
* **Cores de Destaque Semântico:**
  * **Vistos Caderno:** Âmbar suave (`#fef08a`, borda `rgba(245, 158, 11, 0.32)`).
  * **Vistos Livro:** Céu/Sky suave (`#bae6fd`, borda `rgba(14, 165, 233, 0.32)`).
  * **Vistos Atividade / Pontos Extras:** Esmeralda suave (`#a7f3d0`, borda `rgba(16, 185, 129, 0.32)`).
  * **Descontos / Faltas / Erros:** Rosa suave (`#fecdd3`, borda `rgba(244, 63, 94, 0.32)`).

---

## 3. 🚀 Diretriz de Deploy e Branches

* A branch padrão de produção configurada na **Vercel** é a **`main`**.
* A branch de desenvolvimento ativo com autenticação e sincronização é **`Usuarios-e-login-firebase`**.
* Ao finalizar commits na branch de trabalho, **sempre sincronizar ou fazer merge na `main`** e realizar o push em ambas para que o deploy da Vercel seja acionado automaticamente.
