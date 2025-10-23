// src/core/evaluator.ts
// ----------------------------------------------------------
// Medidor - Avaliador de Métricas
// Este módulo calcula pontuações básicas de qualidade
// para as respostas de um assistente de IA.
//
// Ele NÃO mostra nada na tela — apenas faz os cálculos.
// ----------------------------------------------------------

// 📘 Tipos usados para deixar o código organizado
export type EvaluationInput = {
  promptConfig: string;      // O prompt-base configurado para o assistente
  responseText: string;      // A resposta gerada pelo assistente
  expectedContext?: string;  // (Opcional) o que se esperava na resposta
  kbSnippets?: string[];     // (Opcional) trechos da base de conhecimento
};

export type EvaluationOutput = {
  promptFidelity: number;    // 0..1 → aderência ao prompt
  clarityIndex: number;      // 0..1 → clareza e completude
  deviationRate: number;     // 0..1 → desvio de contexto (quanto menor, melhor)
  groundingAccuracy: number; // 0..1 → alinhamento à base de conhecimento
};

// Função auxiliar: limita valores entre 0 e 1
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * 🔹 Função principal: evaluateResponse (versão ajustada)
 * Agora com piso (eps) para evitar notas 0 e 1 absolutas e suavizar as métricas.
 */
export async function evaluateResponse(input: EvaluationInput): Promise<EvaluationOutput> {
  const { promptConfig, responseText, expectedContext = "", kbSnippets = [] } = input;

  // Pequeno "piso" para suavizar extremos e tornar as notas mais estáveis
  const eps = 0.05;

  // --- 1️⃣ Prompt Fidelity: similaridade entre prompt/contexto e resposta
  const simWithPrompt = jaccard(promptConfig, responseText);
  const simWithExpected = jaccard(expectedContext || promptConfig, responseText);
  const sim = Math.max(simWithPrompt, simWithExpected);
  const promptFidelity = clamp01(eps + (1 - eps) * sim);

  // --- 2️⃣ Clarity Index: clareza e completude da resposta
  const clarityIndex = clamp01(clarityHeuristic(responseText));

  // --- 3️⃣ Deviation Rate: quanto a resposta foge do contexto esperado
  // (suavizado para não estourar em 1.0 quando a similaridade é baixa)
  const deviationRate = clamp01(1 - sim * (1 - eps));

  // --- 4️⃣ Grounding Accuracy: alinhamento à base de conhecimento (KB)
  const kbScore = kbSnippets.length
    ? Math.max(...kbSnippets.map(s => jaccard(s, responseText)))
    : 0;
  const groundingAccuracy = kbSnippets.length
    ? clamp01(eps + (1 - eps) * kbScore)
    : 0;

  return { promptFidelity, clarityIndex, deviationRate, groundingAccuracy };
}

// ----------------------------------------------------------
// 🔧 Funções auxiliares (versão simples, sem IA ainda)
// ----------------------------------------------------------

// Divide o texto em palavras normalizadas (minúsculas, sem pontuação)
function tokenize(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Mede a semelhança entre dois textos (Coeficiente de Jaccard)
function jaccard(a: string, b: string) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (A.size === 0 && B.size === 0) return 1;
  const inter = [...A].filter(x => B.has(x)).length;
  const uni = new Set([...A, ...B]).size;
  return uni === 0 ? 0 : inter / uni;
}

// Heurística de clareza: penaliza repetições, textos muito curtos/longos e excesso de '?'
function clarityHeuristic(text: string) {
  const len = text.length;
  if (len === 0) return 0;
  const qMarks = (text.match(/\?/g) || []).length;
  const repeats = repeatedTokenRatio(text);

  const lenScore = len < 40 ? 0.2 : len > 2000 ? 0.4 : 0.8;
  const qScore = Math.max(0, 1 - qMarks / 10);
  const repScore = Math.max(0, 1 - repeats);

  return (lenScore * 0.5 + qScore * 0.25 + repScore * 0.25);
}

// Detecta excesso de repetição de tokens
function repeatedTokenRatio(text: string) {
  const toks = tokenize(text);
  if (toks.length === 0) return 0;
  const counts = new Map<string, number>();
  toks.forEach(t => counts.set(t, (counts.get(t) || 0) + 1));
  const maxFreq = Math.max(...counts.values());
  return Math.max(0, (maxFreq - 1) / toks.length);
}
