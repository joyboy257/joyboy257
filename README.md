<div align="center">

# Deon Quek

### AI Systems Engineer · Applied AI · Backend Engineering

**I build AI software that works beyond the demo.**

I turn LLMs, agents, APIs, and business workflows into systems that can take real actions, handle failures, and be tested and operated responsibly.

**Singapore** · Interested in **AI Engineering, Software Engineering & Forward-Deployed Engineering** roles

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/deonquek)
[![Mirai](https://img.shields.io/badge/Mirai-Product%20site-24292f?style=flat-square)](https://usemirai.app)
[![GitHub](https://img.shields.io/badge/GitHub-Explore%20code-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/joyboy257?tab=repositories)

</div>

---

## Featured engineering work

Three projects show how I approach **AI systems engineering, real-world delivery, and software reliability**. Each has a public case study; proprietary production code stays private.

### 01 · Mirai — AI agents for real business operations

<table>
<tr>
<td width="47%" valign="top">
<a href="https://github.com/joyboy257/mirai-showcase"><img src="https://raw.githubusercontent.com/joyboy257/mirai-showcase/main/assets/operator-home.png" alt="Mirai chat-first operator workspace" width="100%" /></a>
</td>
<td valign="top">

**The problem:** AI agents are useful only if they can act on business systems without bypassing permissions, losing work, or silently changing important data.

**What I built:** A multi-tenant, chat-first business platform with persistent agents, customer conversations, knowledge, tool execution, developer interfaces, and operational workflows.

**My contribution:** Founder and lead engineer — product design, backend architecture, agent runtime, integrations, security boundaries, evaluation, and delivery.

**Engineering evidence:** A July 2026 internal evaluation completed **500/500 iterations**, with **201/201 active safety cases** passing and **49 governed tools** in the registry. These are internal test results, not customer-outcome metrics.

**[Case study & architecture](https://github.com/joyboy257/mirai-showcase)** · **[Product walkthrough](https://usemirai.app/demo)** · **[Website](https://usemirai.app)**

</td>
</tr>
</table>

### 02 · Amelia Bot — AI automation used by real staff

<table>
<tr>
<td width="47%" valign="top">
<a href="https://github.com/joyboy257/joyboy257/tree/main/showcases/amelia-bot"><img src="https://raw.githubusercontent.com/joyboy257/joyboy257/main/showcases/amelia-bot/assets/operator-workflow.svg" alt="Sanitized Telegram, n8n, Google Drive and PostgreSQL workflow" width="100%" /></a>
</td>
<td valign="top">

**The problem:** Staff at a professional-services client needed a practical way to manage intake, files, follow-ups, and document processing without juggling disconnected manual steps.

**What I delivered:** A **staff-used production workflow** built around Telegram, n8n, Google Drive, Google Sheets, AI enrichment, and PostgreSQL knowledge records.

**My contribution:** Workflow discovery, integration engineering, operational debugging, data design, and a staged reliability-hardening programme.

**Engineering evidence:** A **69-case shadow replay** achieved zero unexpected differences; a PostgreSQL replacement slice is test-verified but **not cut over**. The original n8n production flow remains authoritative.

**[Client-safe case study](https://github.com/joyboy257/joyboy257/tree/main/showcases/amelia-bot)** · **[Technical evidence](https://github.com/joyboy257/joyboy257/blob/main/showcases/amelia-bot/engineering-evidence.md)**

</td>
</tr>
</table>

### 03 · Amethyst — trusted company context for AI

<table>
<tr>
<td width="47%" valign="top">
<a href="https://github.com/joyboy257/amethyst-showcase"><img src="https://raw.githubusercontent.com/joyboy257/amethyst-showcase/main/assets/company-brain-overview.svg" alt="Sanitized Amethyst company-intelligence interface" width="100%" /></a>
</td>
<td valign="top">

**The problem:** An agent shouldn't act on a company fact simply because an LLM generated it. Business decisions need evidence, freshness, permission checks, approval, and recovery.

**What I built:** A governed company-intelligence system that packages evidence-backed context for AI-assisted work, with explicit approval flows, audit records, controlled learning, and rollback.

**My contribution:** Product and backend architecture, data and policy contracts, evaluation, deployment and recovery controls.

**Engineering evidence:** Protected **internal production** with documented readiness checks and rollback proof. **External customer pilots and live provider writes remain disabled**.

**[Case study & product visuals](https://github.com/joyboy257/amethyst-showcase)** · **[Architecture](https://github.com/joyboy257/amethyst-showcase/blob/main/docs/architecture.md)**

</td>
</tr>
</table>

> **How to read these case studies:** I distinguish implemented code, local tests, internal deployment, customer use, and future work. Client details and private production artifacts are excluded intentionally. Reconstructed visuals are identified as such in their source case studies.

---

## Explore the code

The projects above emphasize architecture and delivery. These **public repositories** make it easier to inspect how I write and structure software.

| Project | What it demonstrates | Status |
| --- | --- | --- |
| **[AgentOS](https://github.com/joyboy257/agentos)** | Full-stack AI coworker canvas, orchestration concepts, runtime contracts, permissions, and product UX. **Next.js, TypeScript, PostgreSQL, Redis.** | Active prototype; not a hosted production system |
| **[DreamCraft](https://github.com/joyboy257/dreamcraft)** | Natural-language-to-3D worlds, procedural generation, browser game systems, and evaluation. **TypeScript, WebGL, generative AI.** | Locally playable; live-provider and deployment gates remain |
| **[Atlas](https://github.com/joyboy257/atlas)** | Developer-focused agent runtime with typed contracts, policy checks, local simulator, and execution receipts. **TypeScript, CLI, MCP.** | Public alpha; local-first, no published npm package yet |
| **[RustyIndex](https://github.com/joyboy257/rustyindex)** | Evidence-based retrieval with tenant boundaries, document extraction, traces and graph traversal. **Rust, Python, PostgreSQL.** | Research prototype in maintenance mode |
| **[PokerAI](https://github.com/joyboy257/pokerai-public)** | Reinforcement-learning experiments with DQN agents, opponent baselines, and evaluation tools. **Python, TensorFlow.** | Educational research prototype |

## Currently building

**Heidi — agent-mediated commerce and coordination for Southeast Asia.**

I am exploring a network where personal agents can discover merchants, negotiate offers, and coordinate transactions through explicit permissions and user approval. Work is in the **specification and early implementation stage**, not a claim of launched consumer adoption. The engineering repository is private.

This work lets me connect **AI product thinking** with protocol design, privacy, human control, and the economics of agent actions.

---

## How I engineer

- **Agents propose; systems enforce.** Authentication, permissions, policy, approvals, and canonical data stay outside probabilistic model output.
- **Failures are first-class.** Idempotency, retry handling, durable state, observability, and rollback are designed in—not bolted on.
- **Evaluation must reflect the task.** I use deterministic tests, integration proofs, replay, tool-use evaluations, and explicit release gates.
- **Shipping means proving what actually works.** A demo, a passing test, a live integration, and customer adoption are different claims.

### Tools I work with

**Languages:** Python · TypeScript · JavaScript · SQL · Rust · C++

**AI & agents:** LLM orchestration · tool calling · MCP · retrieval/RAG · evaluation harnesses · PyTorch · TensorFlow · scikit-learn

**Backend & infrastructure:** Node.js · NestJS · FastAPI · PostgreSQL · Redis · Docker · CI/CD · GitHub Actions · n8n

**Product engineering:** React · Next.js · REST APIs · event-driven workflows · testing and observability

---

<div align="center">

**Building AI software people can rely on.**

[Connect on LinkedIn](https://www.linkedin.com/in/deonquek) · [Browse public repositories](https://github.com/joyboy257?tab=repositories)

<sub>Most client and production systems are private. Public case studies prioritize truthful engineering boundaries over invented commercial metrics.</sub>

</div>
