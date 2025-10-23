# Arquitetura Simplificada — Medidor

O Medidor foi pensado para se integrar naturalmente à plataforma Darwin AI, aproveitando a estrutura já existente em React (frontend) e Node.js (backend).  
Abaixo está uma visão geral simples de como tudo se conecta.

---

## 🧭 Estrutura principal

| Camada | Papel | Exemplo |
|---------|--------|---------|
| **Darwin UI** | Mostra as métricas (interface visual) | “Painel Quality Monitor” |
| **Backend** | Calcula as métricas e serve os dados | API `/api/metrics` |
| **Camada de Dados** | Guarda resultados e históricos | Banco (Postgres / BigQuery) |
| **Dashboards** | Mostra evolução e relatórios | Metabase / gráficos |

---

## 🔄 Fluxo simplificado

1. O usuário abre o painel (“Quality Monitor”)  
2. O painel pede ao backend as métricas  
3. O backend calcula ou busca do banco  
4. O resultado aparece nos cards da interface  
5. Tudo é guardado no banco e usado depois para relatórios e análises

---

## 🧠 Stack da plataforma Darwin AI

| Camada | Tecnologia | Função |
|--------|-------------|--------|
| **Frontend (UI)** | **React + Next.js (TypeScript)** | Interface da plataforma Darwin |
| **Backend (API e lógica)** | **Node.js (com NestJS)** | Processamento e APIs |
| **Banco de Dados / Dados** | **PostgreSQL + BigQuery** | Armazena informações e métricas |
| **Infraestrutura** | **Vercel + Google Cloud** | Hospedagem e serviços |
| **Visualização / BI** | **Metabase** | Relatórios e dashboards |

💡 Essa arquitetura facilita a criação de novas abas, como o Medidor, dentro da plataforma existente.
