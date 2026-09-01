# Quiz de Cálculo 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar um quiz de Cálculo 1 local, responsivo e interativo para praticar os tópicos das listas fornecidas.

**Architecture:** Uma página vanilla com um banco de questões em `script.js`, uma árvore semântica em `index.html` e tokens CSS centralizados em `style.css` conforme `DESIGN.md`. O estado da rodada permanece em memória; apenas melhor pontuação e tema são persistidos no `localStorage`.

**Tech Stack:** HTML5 semântico, CSS3 com custom properties e media queries, JavaScript ES2020 sem dependências.

---

### Task 1: Criar a estrutura semântica da aplicação

**Files:**
- Create: `index.html`

- [ ] **Step 1: Criar landmarks e regiões nomeadas**

Adicionar `header`, `main`, navegação de tópicos, área de progresso, área da questão e região de resultado, incluindo `lang="pt-BR"`, `title`, description e `aria-live` para feedback.

- [ ] **Step 2: Inserir conteúdo inicial acessível**

Adicionar o cabeçalho “Cálculo em prática”, controles de tema, botões de tópico, placeholders semânticos para pergunta/opções, barra de progresso e ações de resposta/reinício.

- [ ] **Step 3: Validar a estrutura sem JavaScript**

Abrir o arquivo diretamente e confirmar que o conteúdo-base, landmarks e textos não dependem de recursos de rede.

### Task 2: Implementar o sistema visual responsivo

**Files:**
- Create: `style.css`
- Read: `DESIGN.md`

- [ ] **Step 1: Definir tokens de cor, tipografia, espaçamento e superfície**

Implementar as custom properties documentadas em `DESIGN.md`, incluindo os valores claro/escuro sob `[data-theme="dark"]`.

- [ ] **Step 2: Estilizar os componentes e estados**

Implementar TopBar, CategoryTabs, QuestionCard, OptionButton, ProgressPanel e ResultPanel com estados default, hover, focus-visible, selecionado, correto, incorreto e desabilitado.

- [ ] **Step 3: Implementar os breakpoints**

Usar grid de duas colunas acima de `1024px`, coluna única abaixo de `768px` e uma adaptação intermediária entre esses limites. Garantir alvo de toque de pelo menos `44px` nos controles.

- [ ] **Step 4: Implementar redução de movimento**

Adicionar `@media (prefers-reduced-motion: reduce)` para tornar transições não essenciais instantâneas sem ocultar estados.

### Task 3: Implementar o banco de questões e o fluxo do quiz

**Files:**
- Create: `script.js`

- [ ] **Step 1: Modelar as oito questões aprovadas**

Representar cada questão com `id`, `topic`, `topicLabel`, `prompt`, `formula`, `options`, `correctIndex` e `explanation`, preservando as respostas definidas na especificação.

- [ ] **Step 2: Criar estado, filtros e renderização**

Implementar estado inicial, seleção de tópico, renderização da questão atual, atualização de progresso e pontuação por rodada.

- [ ] **Step 3: Implementar resposta e feedback**

Ao clicar ou pressionar uma alternativa, registrar apenas a primeira resposta, aplicar classes de estado, mostrar a explicação e habilitar “Próxima questão”.

- [ ] **Step 4: Implementar conclusão e persistência**

Calcular percentual e desempenho por tópico, atualizar o melhor resultado no `localStorage`, renderizar o resultado final e permitir reinício.

- [ ] **Step 5: Implementar o tema persistente**

Ler tema salvo com fallback para preferência do sistema, aplicar `data-theme` e atualizar `aria-label` e texto do botão.

### Task 4: Validar o comportamento e a superfície

**Files:**
- Verify: `index.html`
- Verify: `style.css`
- Verify: `script.js`

- [ ] **Step 1: Executar checagens estáticas**

Verificar ausência de placeholders, referências quebradas, erros de sintaxe JavaScript e uso de cores fora dos tokens documentados.

- [ ] **Step 2: Exercitar o fluxo principal**

Testar filtro de cada tópico, seleção correta, seleção incorreta, avanço até o final, reinício, tema claro/escuro e persistência do melhor resultado.

- [ ] **Step 3: Exercitar teclado e viewport**

Usar Tab, Enter e barra de espaço nas ações principais e abrir a página em `375px`, `768px` e `1280px`, verificando ausência de cortes e rolagem horizontal.
