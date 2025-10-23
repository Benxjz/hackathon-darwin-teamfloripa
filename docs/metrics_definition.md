# Métricas — Medidor

Este documento explica o que cada métrica do Medidor representa e por que ela é importante.  
Essas medições ajudam a avaliar se o assistente de IA está realmente entregando respostas úteis, claras e consistentes.

---

### 🔹 Prompt Fidelity Score (PFS)
**O que é:** Mede o quanto a resposta segue o **prompt-base** e a intenção esperada.  
**Por que importa:** Garante que o assistente mantenha o comportamento definido (tom, formato, objetivo).  
**Exemplo:** se o prompt pede respostas curtas e educadas, o PFS avalia se isso está sendo respeitado.

---

### 🔹 Answer Clarity Index (ACI)
**O que é:** Mede se a resposta é **clara, completa e objetiva**.  
**Por que importa:** ajuda a identificar quando o assistente está sendo confuso ou genérico demais.  
**Exemplo:** uma resposta curta demais ou cheia de “acho que” tende a ter um ACI baixo.

---

### 🔹 Deviation Rate (DR)
**O que é:** Percentual de respostas **fora do contexto esperado**.  
**Por que importa:** mostra se o assistente está desviando da proposta original.  
**Quanto menor, melhor.**

---

### 🔹 Grounding Accuracy (GA)
**O que é:** Mede se as respostas estão **baseadas corretamente na base de conhecimento (KB)** da empresa.  
**Por que importa:** garante que o assistente use informações verdadeiras e específicas.  
**Exemplo:** respostas que citam dados corretos da KB têm GA alto.

---

### 🔹 Manual Rating (MR)
**O que é:** Nota humana (de 1 a 5) atribuída por alguém da equipe após revisar respostas.  
**Por que importa:** serve para validar e ajustar as métricas automáticas.

---

### 🔹 Readiness Score (RS)
**O que é:** Indica o **quanto o assistente está pronto para ser lançado**.  
**Por que importa:** combina o progresso do checklist (FAQ, base, integrações etc.) e métricas mínimas de qualidade.  
**Exemplo:** se 4 de 5 etapas estão concluídas, RS = 0.8 (80%).

---

💡 **Resumo:**
| Métrica | Ideal | Interpretação |
|----------|--------|---------------|
| **PFS** | Alta | Segue o prompt corretamente |
| **ACI** | Alta | Respostas claras e completas |
| **DR** | Baixa | Poucas respostas fora de contexto |
| **GA** | Alta | Usa bem a base de conhecimento |
| **MR** | Alta | Boa nota humana |
| **RS** | Alta | Assistente pronto para lançamento |
