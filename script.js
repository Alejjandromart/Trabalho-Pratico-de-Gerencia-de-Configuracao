const TOPICS = {
  all: "Todos os tópicos",
  funcao: "Função",
  limites: "Limites",
  continuidade: "Continuidade",
};

const QUESTIONS = [
  {
    id: "funcao-raiz",
    topic: "funcao",
    topicLabel: "Função",
    prompt: "Para a função f(x) = x + 1, qual é a sua raiz?",
    formula: "A raiz é o valor de x para o qual f(x) = 0.",
    options: ["x = -1", "x = 0", "x = 1", "x = 2"],
    correctIndex: 0,
    explanation: "Basta igualar a função a zero: x + 1 = 0. Portanto, x = -1.",
  },
  {
    id: "funcao-intercepto",
    topic: "funcao",
    topicLabel: "Função",
    prompt: "Na tabela x = -2, -1, 0, 1, 2 e y = 3, 2, 1, 0, -1, qual é o ponto de interseção com o eixo y?",
    formula: "No eixo y, x = 0.",
    options: ["(-2, 3)", "(0, 1)", "(1, 0)", "(2, -1)"],
    correctIndex: 1,
    explanation: "Quando x = 0, a tabela informa y = 1. O ponto de interseção é (0, 1).",
  },
  {
    id: "funcao-valor",
    topic: "funcao",
    topicLabel: "Função",
    prompt: "Se f(x) = 2x - 4, qual é o valor de f(3)?",
    formula: "f(3) = 2 · 3 - 4",
    options: ["-2", "0", "2", "6"],
    correctIndex: 2,
    explanation: "Substituindo x por 3: f(3) = 6 - 4 = 2.",
  },
  {
    id: "funcao-massa",
    topic: "funcao",
    topicLabel: "Função",
    prompt: "A massa de um reagente passa por (10, 80) e (30, 40). Qual é a taxa de variação linear?",
    formula: "m = (40 - 80) / (30 - 10)",
    options: ["-4 g/s", "-2 g/s", "2 g/s", "4 g/s"],
    correctIndex: 1,
    explanation: "A taxa é m = -40 / 20 = -2 g/s. O sinal negativo indica redução da massa.",
  },
  {
    id: "limite-polinomio",
    topic: "limites",
    topicLabel: "Limites",
    prompt: "Qual é o valor de lim x→2 (x² + 5x + 10)?",
    formula: "Em polinômios, o limite pode ser calculado por substituição direta.",
    options: ["14", "20", "24", "34"],
    correctIndex: 2,
    explanation: "Substituindo x = 2: 2² + 5 · 2 + 10 = 4 + 10 + 10 = 24.",
  },
  {
    id: "limite-laterais",
    topic: "limites",
    topicLabel: "Limites",
    prompt: "Em x = 1, o limite pela esquerda vale 3 e o limite pela direita vale 1. O limite bilateral existe?",
    formula: "lim x→1⁻ f(x) = 3  e  lim x→1⁺ f(x) = 1",
    options: ["Sim, e vale 1", "Sim, e vale 2", "Sim, e vale 3", "Não, pois os limites laterais são diferentes"],
    correctIndex: 3,
    explanation: "O limite bilateral só existe quando os dois limites laterais são iguais. Como 3 ≠ 1, ele não existe.",
  },
  {
    id: "continuidade-algoritmo",
    topic: "continuidade",
    topicLabel: "Continuidade",
    prompt: "Para tornar contínua em n = 100 a função T(n) = 2n + 10 antes de 100 e T(n) = n + 110 depois de 100, qual deve ser o valor de k?",
    formula: "T(n) = 2n + 10, se n < 100; k, se n = 100; n + 110, se n > 100.",
    options: ["100", "110", "200", "210"],
    correctIndex: 3,
    explanation: "Os dois limites laterais valem 210. Para haver continuidade, T(100) = k também deve valer 210.",
  },
  {
    id: "continuidade-modular",
    topic: "continuidade",
    topicLabel: "Continuidade",
    prompt: "Considere f(x) = -1 se x < 0, f(0) = 0 e f(x) = 1 se x > 0. A função é contínua em x = 0?",
    formula: "lim x→0⁻ f(x) = -1  e  lim x→0⁺ f(x) = 1",
    options: ["Sim, porque f(0) está definida", "Sim, porque os valores são opostos", "Não, porque os limites laterais são diferentes", "Não, apenas porque f(0) = 0"],
    correctIndex: 2,
    explanation: "A continuidade exige que os limites laterais sejam iguais e coincidam com f(0). Aqui, -1 ≠ 1.",
  },
];

const LETTERS = ["A", "B", "C", "D"];
const STORAGE_KEYS = {
  best: "calculo-pratica-best",
  theme: "calculo-pratica-theme",
};

const state = {
  selectedTopic: "all",
  questions: [...QUESTIONS],
  questionIndex: 0,
  score: 0,
  answered: false,
  answers: {},
  bestResult: readBestResult(),
};

const elements = {
  html: document.documentElement,
  themeToggle: document.querySelector("#theme-toggle"),
  themeLabel: document.querySelector("#theme-label"),
  heroQuestionCount: document.querySelector("#hero-question-count"),
  heroBestScore: document.querySelector("#hero-best-score"),
  topicTabs: document.querySelector("#topic-tabs"),
  roundTitle: document.querySelector("#round-title"),
  scoreValue: document.querySelector("#score-value"),
  questionCard: document.querySelector("#question-card"),
  questionNumber: document.querySelector("#question-number"),
  questionTopic: document.querySelector("#question-topic"),
  questionText: document.querySelector("#question-text"),
  questionFormula: document.querySelector("#question-formula"),
  options: document.querySelector("#options"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackText: document.querySelector("#feedback-text"),
  helperCopy: document.querySelector("#helper-copy"),
  nextButton: document.querySelector("#next-button"),
  progressPanel: document.querySelector("#progress-panel"),
  progressFill: document.querySelector("#progress-fill"),
  progressMeter: document.querySelector(".progress-meter"),
  progressPercent: document.querySelector("#progress-percent"),
  answeredCount: document.querySelector("#answered-count"),
  bestScore: document.querySelector("#best-score"),
  topicBreakdown: document.querySelector("#topic-breakdown"),
  questionList: document.querySelector("#question-list"),
  quizStage: document.querySelector("#quiz-stage"),
  resultPanel: document.querySelector("#result-panel"),
  resultMessage: document.querySelector("#result-message"),
  resultScoreValue: document.querySelector("#result-score-value"),
  resultPercent: document.querySelector("#result-percent"),
  resultBestScore: document.querySelector("#result-best-score"),
  resultBreakdown: document.querySelector("#result-breakdown"),
  restartButton: document.querySelector("#restart-button"),
};

function readBestResult() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.best);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveBestResult(result) {
  const currentBest = state.bestResult;
  const isBetter = !currentBest || result.percent > currentBest.percent || (result.percent === currentBest.percent && result.score > currentBest.score);

  if (!isBetter) {
    return currentBest;
  }

  state.bestResult = result;
  try {
    window.localStorage.setItem(STORAGE_KEYS.best, JSON.stringify(result));
  } catch {
  }

  return result;
}

function readTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  elements.html.dataset.theme = isDark ? "dark" : "light";
  elements.themeToggle.setAttribute("aria-pressed", String(isDark));
  elements.themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
  elements.themeLabel.textContent = isDark ? "Tema claro" : "Tema escuro";

  try {
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
  }
}

function formatBestResult(result) {
  return result ? `${result.percent}%` : "Ainda não há";
}

function getFilteredQuestions(topic) {
  return topic === "all" ? [...QUESTIONS] : QUESTIONS.filter((question) => question.topic === topic);
}

function resetRound(topic = state.selectedTopic) {
  state.selectedTopic = topic;
  state.questions = getFilteredQuestions(topic);
  state.questionIndex = 0;
  state.score = 0;
  state.answered = false;
  state.answers = {};
  elements.quizStage.hidden = false;
  elements.progressPanel.hidden = false;
  elements.resultPanel.hidden = true;
  updateTopicTabs();
  renderRound();
}

function updateTopicTabs() {
  elements.topicTabs.querySelectorAll("[data-topic]").forEach((button) => {
    const isActive = button.dataset.topic === state.selectedTopic;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderRound() {
  const total = state.questions.length;
  const currentQuestion = state.questions[state.questionIndex];
  elements.roundTitle.textContent = TOPICS[state.selectedTopic];
  elements.heroQuestionCount.textContent = total;
  elements.heroBestScore.textContent = formatBestResult(state.bestResult);
  elements.bestScore.textContent = formatBestResult(state.bestResult);
  elements.scoreValue.textContent = state.score;
  elements.questionNumber.textContent = `Questão ${state.questionIndex + 1} de ${total}`;
  elements.questionTopic.textContent = currentQuestion.topicLabel;
  elements.questionText.textContent = currentQuestion.prompt;
  elements.questionFormula.textContent = currentQuestion.formula;
  elements.questionFormula.hidden = !currentQuestion.formula;
  elements.options.replaceChildren();
  currentQuestion.options.forEach((option, index) => {
    elements.options.append(createOptionButton(option, index));
  });
  elements.feedback.hidden = true;
  elements.feedback.className = "feedback";
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = state.questionIndex === total - 1 ? "Ver resultado" : "Próxima questão";
  elements.helperCopy.textContent = "Selecione uma alternativa para conferir seu raciocínio.";
  updateProgress();
  renderTopicBreakdown();
  renderQuestionList();
}

function createOptionButton(option, index) {
  const button = document.createElement("button");
  button.className = "option-button";
  button.type = "button";
  button.dataset.index = String(index);
  button.setAttribute("aria-label", `Alternativa ${LETTERS[index]}: ${option}`);

  const marker = document.createElement("span");
  marker.className = "option-marker";
  marker.textContent = LETTERS[index];
  marker.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.textContent = option;
  button.append(marker, label);
  button.addEventListener("click", () => selectAnswer(index));
  return button;
}

function selectAnswer(selectedIndex) {
  if (state.answered) {
    return;
  }

  const question = state.questions[state.questionIndex];
  const isCorrect = selectedIndex === question.correctIndex;
  state.answered = true;
  state.answers[question.id] = { selectedIndex, isCorrect };
  if (isCorrect) {
    state.score += 1;
  }

  elements.options.querySelectorAll(".option-button").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add("is-correct");
    }
    if (index === selectedIndex && !isCorrect) {
      button.classList.add("is-incorrect");
    }
    if (index === selectedIndex) {
      button.classList.add("is-selected");
    }
  });

  elements.feedback.hidden = false;
  elements.feedback.className = `feedback ${isCorrect ? "is-correct" : "is-incorrect"}`;
  elements.feedbackTitle.textContent = isCorrect ? "Resposta correta" : "Vamos revisar esse passo";
  elements.feedbackText.textContent = question.explanation;
  elements.nextButton.disabled = false;
  elements.helperCopy.textContent = isCorrect ? "Boa! Avance quando estiver pronto." : "A resposta certa está destacada. Leia a explicação e avance.";
  elements.scoreValue.textContent = state.score;
  updateProgress();
  renderQuestionList();
}

function goToNextQuestion() {
  if (!state.answered) {
    return;
  }

  if (state.questionIndex === state.questions.length - 1) {
    showResult();
    return;
  }

  state.questionIndex += 1;
  state.answered = false;
  renderRound();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  elements.questionCard.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

function updateProgress() {
  const total = state.questions.length;
  const answered = Object.keys(state.answers).length;
  const percent = Math.round((answered / total) * 100);
  elements.progressFill.style.transform = `scaleX(${answered / total})`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.answeredCount.textContent = `${answered} / ${total}`;
  elements.progressMeter.setAttribute("aria-valuemax", String(total));
  elements.progressMeter.setAttribute("aria-valuenow", String(answered));
}

function renderTopicBreakdown() {
  const topicCounts = state.questions.reduce((counts, question) => {
    counts[question.topicLabel] = (counts[question.topicLabel] || 0) + 1;
    return counts;
  }, {});

  elements.topicBreakdown.replaceChildren();
  Object.entries(topicCounts).forEach(([label, count]) => {
    const row = document.createElement("div");
    row.className = "topic-summary-row";
    const name = document.createElement("span");
    name.textContent = label;
    const total = document.createElement("strong");
    total.textContent = `${count} ${count === 1 ? "questão" : "questões"}`;
    row.append(name, total);
    elements.topicBreakdown.append(row);
  });
}

function renderQuestionList() {
  elements.questionList.replaceChildren();
  state.questions.forEach((question, index) => {
    const item = document.createElement("li");
    item.textContent = String(index + 1).padStart(2, "0");
    if (index === state.questionIndex) {
      item.classList.add("is-current");
    }
    if (state.answers[question.id]) {
      item.classList.add("is-complete");
    }
    item.setAttribute("aria-label", `Questão ${index + 1}${state.answers[question.id] ? ", respondida" : ""}`);
    elements.questionList.append(item);
  });
}

function getResultByTopic() {
  return Object.entries(
    state.questions.reduce((topics, question) => {
      if (!topics[question.topicLabel]) {
        topics[question.topicLabel] = { total: 0, score: 0 };
      }
      topics[question.topicLabel].total += 1;
      if (state.answers[question.id]?.isCorrect) {
        topics[question.topicLabel].score += 1;
      }
      return topics;
    }, {}),
  );
}

function showResult() {
  const total = state.questions.length;
  const percent = Math.round((state.score / total) * 100);
  const result = { score: state.score, total, percent, topic: state.selectedTopic };
  const bestResult = saveBestResult(result);
  const message = percent >= 80
    ? "Ótimo desempenho. Você já tem uma base consistente para avançar."
    : percent >= 50
      ? "Bom começo. Revise as explicações das questões que exigiram mais atenção."
      : "Use esta rodada como diagnóstico e tente novamente depois de revisar os conceitos-chave.";

  elements.quizStage.hidden = true;
  elements.progressPanel.hidden = true;
  elements.resultPanel.hidden = false;
  elements.resultMessage.textContent = message;
  elements.resultScoreValue.textContent = `${state.score} / ${total}`;
  elements.resultPercent.textContent = `${percent}% de aproveitamento`;
  elements.resultBestScore.textContent = formatBestResult(bestResult);
  elements.heroBestScore.textContent = formatBestResult(bestResult);
  elements.bestScore.textContent = formatBestResult(bestResult);
  renderResultBreakdown();
  elements.resultPanel.focus({ preventScroll: true });
}

function renderResultBreakdown() {
  elements.resultBreakdown.replaceChildren();
  getResultByTopic().forEach(([label, result]) => {
    const percent = Math.round((result.score / result.total) * 100);
    const row = document.createElement("div");
    row.className = "result-topic-row";
    const topic = document.createElement("span");
    topic.textContent = label;
    const meter = document.createElement("div");
    meter.className = "result-topic-meter";
    const fill = document.createElement("span");
    fill.style.transform = `scaleX(${percent / 100})`;
    meter.append(fill);
    const score = document.createElement("strong");
    score.textContent = `${result.score}/${result.total}`;
    row.append(topic, meter, score);
    elements.resultBreakdown.append(row);
  });
}

elements.themeToggle.addEventListener("click", () => {
  applyTheme(elements.html.dataset.theme === "dark" ? "light" : "dark");
});

elements.topicTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (button) {
    resetRound(button.dataset.topic);
  }
});

elements.nextButton.addEventListener("click", goToNextQuestion);
elements.restartButton.addEventListener("click", () => {
  resetRound(state.selectedTopic);
  elements.questionCard.scrollIntoView({ behavior: "auto", block: "start" });
});

applyTheme(readTheme());
resetRound();
