# hackathon-darwin-teamfloripa
Projeto da equipe Floripa para o Hackathon da Darwin AI

## 🩺 Medidor de Qualidade Darwin AI (codinome: ainda pensndo)

**?** é uma feature integrada à plataforma Darwin AI que mede a **qualidade, consistência e prontidão** dos assistentes de IA criados para empresas.  
Ela permite acompanhar **métricas de performance**, **evolução** e **aderência ao prompt configurado**, tanto durante o onboarding quanto após o lançamento do assistente.

---

## 🧩 Contexto de desenvolvimento

**Inicialmente usamos o Vercel v0 para acelerar a construção da interface**, e a partir daí estamos implementando **ajustes e camadas complementares** que adicionam lógica de avaliação, cálculo de métricas e integração com a plataforma Darwin AI.  
Este repositório concentra **o backend, documentação técnica e explicação** que somam ao código gerado no Vercel.

---

## 🎯 Objetivo

O objetivo do projeto é oferecer uma **camada de monitoramento e diagnóstico de qualidade** para cada assistente, de modo que as empresas possam:

- Entender se o assistente está **seguindo o prompt corretamente**;  
- Detectar **respostas incoerentes ou inconsistentes** com a base de conhecimento;  
- Acompanhar a **evolução da performance** ao longo do tempo;  
- Saber **quando o assistente está pronto para ser lançado** (via checklist automatizado).

💡 **Por que isso importa:**  
Hoje, os times da Darwin e os clientes precisam avaliar manualmente se um assistente “está bom”. Essa ferramenta **automatiza o processo e gera confiança** no produto.

---

## 🧭 Arquitetura (resumo)

```plaintext
Darwin UI (React) → Aba “Quality Monitor”
       │
       ▼
Backend (Node.js / NestJS ou Next.js routes no Vercel)
       │
       ▼
Camada de Dados (DW ou Postgres) + Jobs de avaliação
       │
       ▼
Dashboards (ex.: Metabase) e histórico de métricas
```
## 📏 Métricas (visão geral)

Essas são as **principais métricas** que o ? acompanha para avaliar o desempenho de um assistente:

### 🔹 Prompt Fidelity Score (PFS)
Mede o quanto a resposta **segue o prompt-base** e respeita a intenção esperada.  
> Exemplo: se o prompt pede respostas formais, o PFS avalia se o tom está realmente formal.

### 🔹 Answer Clarity Index (ACI)
Avalia se a resposta é **clara, completa e objetiva**, sem repetições desnecessárias.  
> Exemplo: respostas muito curtas ou confusas têm nota baixa.

### 🔹 Deviation Rate (DR)
Mostra **quantas respostas saíram do contexto** esperado.  
> Quanto **menor** o DR, melhor o desempenho do assistente.

### 🔹 Grounding Accuracy (GA)
Mede se as respostas estão **baseadas corretamente na base de conhecimento (KB)** da empresa.  
> Exemplo: se a resposta cita informações corretas da KB, o GA será alto.

### 🔹 Manual Rating (MR)
Nota dada **manualmente** por alguém da equipe após revisar as respostas.  
> Usada para calibrar as métricas automáticas.

### 🔹 Readiness Score (RS)
Mostra o **quanto o assistente está pronto** para ser lançado.  
É calculado com base em um checklist (FAQ, base de conhecimento, integrações etc.).  
> Exemplo: se 4 de 5 etapas foram concluídas, o RS é 0.8 (80%).

---

> 💡 Em resumo:
> - **PFS, ACI, GA, RS** → quanto **maior**, melhor.  
> - **DR** → quanto **menor**, melhor.  
> - **MR** ajuda a validar e ajustar as métricas automáticas.

## 🧭 Visão geral da arquitetura (simplificada)

| Camada | Papel | Exemplo |
|---------|--------|---------|
| **Darwin UI** | Mostra as métricas (interface visual) | “Painel Quality Monitor” |
| **Backend** | Calcula as métricas e serve os dados | API `/api/metrics` |
| **Camada de Dados** | Guarda resultados e históricos | Banco (Postgres / BigQuery) |
| **Dashboards** | Mostra evolução e relatórios | Metabase / gráficos |

💡 **Pensando como fluxo:**

1. O usuário abre o painel (“Quality Monitor”)  
2. O painel pede ao backend as métricas  
3. O backend calcula ou busca do banco  
4. O resultado aparece nos cards  
5. Tudo é guardado no banco e usado depois para relatórios


TO BE CONTINUED...
