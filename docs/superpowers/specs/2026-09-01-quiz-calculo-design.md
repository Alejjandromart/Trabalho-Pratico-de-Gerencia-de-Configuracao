# Quiz de Cálculo 1 Design

## Objetivo

Criar um quiz local, responsivo e executável no navegador para praticar conteúdos presentes nas listas de Cálculo 1 fornecidas pelo usuário. O projeto também servirá como artefato do trabalho de Gerência de Configuração, portanto deve ter arquivos separados, histórico de alterações compreensível e uma documentação visual mínima.

## Escopo aprovado

- Aplicação vanilla, sem backend e sem dependências externas.
- Três arquivos de produto: `index.html`, `style.css` e `script.js`.
- Oito questões iniciais baseadas nos tópicos observados nos PDFs: função de primeiro grau, análise gráfica, limites, continuidade e funções definidas por sentenças.
- Filtro por tópico que reinicia o conjunto visível de questões.
- Resposta de múltipla escolha com feedback imediato, explicação e ação explícita para avançar.
- Contador de acertos, progresso, desempenho por tópico e resultado final.
- Melhor pontuação persistida em `localStorage`.
- Alternância entre tema claro e escuro, com preferência salva localmente.
- Interface em português brasileiro e conteúdo matemático legível em telas pequenas.

## Experiência

1. A tela inicial apresenta o título, a quantidade de questões e as categorias.
2. O aluno escolhe uma categoria ou mantém “Todos os tópicos”.
3. A questão atual mostra enunciado, fórmula quando necessário e quatro alternativas.
4. Ao selecionar uma alternativa, o quiz revela imediatamente se está correta, marca a alternativa certa e exibe uma explicação curta.
5. O botão “Próxima questão” só fica disponível depois da resposta.
6. Ao terminar, o aluno vê pontuação, percentual, melhor resultado e desempenho por tópico.
7. “Tentar novamente” reinicia a categoria atual e volta o foco para o título.

## Questões iniciais

| Tópico | Enunciado resumido | Resposta |
|---|---|---|
| Função | Para `f(x) = x + 1`, qual é a raiz? | `x = -1` |
| Função | Na tabela `x = -2, -1, 0, 1, 2` e `y = 3, 2, 1, 0, -1`, qual é o intercepto em `y`? | `(0, 1)` |
| Função | Para `f(x) = 2x - 4`, qual é `f(3)`? | `2` |
| Função | Uma massa passa por `(10, 80)` e `(30, 40)`. Qual é a taxa linear? | `-2 g/s` |
| Limites | Qual é `lim x→2 (x² + 5x + 10)`? | `24` |
| Limites | Em uma função com limite lateral esquerdo `3` e direito `1` em `x = 1`, o limite bilateral existe? | Não |
| Continuidade | Para `T(n) = 2n + 10` antes de `100` e `T(n) = n + 110` depois, qual `k` torna a função contínua? | `210` |
| Continuidade | Para `f(x) = -1` se `x < 0`, `0` se `x = 0`, e `1` se `x > 0`, ela é contínua em `0`? | Não |

## Arquitetura e estado

O estado será mantido em um único objeto JavaScript com `questionIndex`, `selectedTopic`, `score`, `answered`, `bestScore` e `theme`. A função de renderização atualiza apenas as regiões necessárias do DOM e mantém o banco de questões como dados imutáveis. Não há chamadas de rede, autenticação, banco ou risco de perda de dados externos.

As respostas inválidas são bloqueadas pela própria sequência da interface: uma alternativa já respondida fica desabilitada e a ação de avançar não funciona antes da seleção. Se o `localStorage` estiver indisponível, o quiz continua funcionando em memória.

## Critérios de aceite

- Abrir `index.html` exibe a aplicação sem erros no console.
- É possível alternar entre Todos, Função, Limites e Continuidade.
- Cada alternativa pode ser selecionada por mouse e teclado.
- A alternativa correta e a explicação aparecem depois da resposta.
- O progresso e a pontuação mudam sem recarregar a página.
- O resultado final informa acertos, percentual, melhor pontuação e tópicos.
- Recarregar a página preserva o melhor resultado e o tema, mas inicia uma nova rodada.
- O layout permanece utilizável em `375px`, `768px` e `1280px` de largura.
- O foco visível, textos em português, contraste e redução de movimento são preservados.

## Fora de escopo

- Correção algébrica aberta com entrada digitada.
- Cadastro de usuários, ranking online ou banco de dados.
- Importação automática dos PDFs para gerar questões.
- Bibliotecas de gráficos ou frameworks.
