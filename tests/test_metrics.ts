import { evaluateResponse } from "../src/core/evaluator";

(async () => {
  const result = await evaluateResponse({
    promptConfig: "Você é um assistente direto e educado.",
    responseText: "Olá! Posso te ajudar com seu pedido de assinatura.",
    expectedContext: "Atendimento comercial",
    kbSnippets: ["Nossa empresa oferece planos mensais e anuais."]
  });

  console.log(result);
})();
