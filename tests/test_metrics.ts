import { evaluateResponse } from "../src/core/evaluator";

(async () => {
  const result = await evaluateResponse({
    promptConfig:
      "Você é um assistente educado e direto. Responda somente sobre planos de assinatura e preços da empresa.",
    expectedContext:
      "Usuário perguntou sobre planos de assinatura e preços disponíveis.",
    responseText:
      "Olá! Posso ajudar com nossos planos de assinatura: mensal e anual. Os preços estão na nossa página de planos.",
    kbSnippets: [
      "Planos de assinatura: mensal e anual. Para preços, consulte a página de planos.",
      "Contato do suporte: suporte@empresa.com."
    ]
  });

  console.log(result);
})();
