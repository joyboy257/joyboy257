"use strict";
/* Deon's Desktop — static portfolio. No analytics, backends or credentials. */
const projects=[
{
id:"mirai",name:"Mirai",group:"ai",glyph:"MI",tone:"",rank:1,flags:["ai","fde","swe"],stage:"ACTIVE / PRIVATE CORE",scope:"FOUNDING ENGINEERING",tags:["TypeScript","PostgreSQL","Redis","Agents","MCP"],facts:["49 governed tools","201/201 safety cases","500/500 eval iterations"],
summary:"Mirai is a WhatsApp-first Revenue OS for service operators: customer conversations, Atlas AI, bookings, loyalty and governed business actions.",
challenge:"An agent can propose business actions. How do you keep tenant data, permissions, asynchronous state and tool effects trustworthy when models are probabilistic?",
contribution:"Founder and lead engineer across product direction, system architecture, backend and agent runtime, developer APIs, evaluation and delivery.",
engineering:["Tool invocation guard checks immutable binding revisions, tenancy, permission scope and approval immediately before execution.","Transactional outbox persists events alongside business changes; idempotent enqueue prevents duplicate effects on retry.","Core services, orchestrators and workers separate model decisions from canonical business state.","MiraiEval provides release-evidence paths and capability-level gates."],
proof:"The public case study records a July 2026 internal 500-iteration evaluation, 49 governed tools and 201/201 active safety cases. Recent engineering PRs also address deployment promotion and avoiding false-positive tests.",
limits:"Internal test and system-readiness figures are not external adoption or performance claims. Production monorepo remains private; some vertical-slice release gates are blocked or staged.",
link:"https://github.com/joyboy257/mirai-showcase",linkLabel:"ENGINEERING CASE ↗",website:"https://usemirai.app/",demo:"https://usemirai.app/demo",
image:"https://raw.githubusercontent.com/joyboy257/mirai-showcase/main/assets/operator-home.png",mood:"ENGINEERED / GOVERNED"
},
{
id:"amelia",name:"Amelia Bot",group:"delivery",glyph:"AM",tone:"pink",rank:2,flags:["fde","ai","swe"],stage:"STAFF-USED / LIVE PATH",scope:"CLIENT DELIVERY",tags:["Telegram","n8n","PostgreSQL","Google Drive","Automation"],facts:["Staff-used production","69-case shadow replay"],
summary:"Production intake and document automation for a professional-services client.",
challenge:"A live staff workflow touches messaging providers, documents and databases. How do you improve correctness without interrupting daily operations?",
contribution:"Translated operational needs into Telegram/n8n, Drive and AI workflows, then led fault investigation, data model review, replay verification and safe modernization work.",
engineering:["Integrated Telegram intake with Google Drive/Sheets, PostgreSQL, and AI enrichment.","Inspected hidden workflow state, duplicate events and cross-provider operational failures.","Designed a replacement with durable database-authoritative state, using a shadow-replay strategy rather than risky direct cutover."],
proof:"Actual staff-used workflow. The project reports 69 shadow replay cases with zero unexpected differences in its preserved evidence.",
limits:"The original n8n production flow remains authoritative. The newer PostgreSQL replacement slice is test-verified, not cut over. No invented ROI figures.",
link:"https://github.com/joyboy257/joyboy257/tree/main/showcases/amelia-bot",linkLabel:"CLIENT-SAFE CASE STUDY ↗",
image:"https://raw.githubusercontent.com/joyboy257/joyboy257/main/showcases/amelia-bot/assets/operator-workflow.svg",mood:"REAL / DEPLOYED"
},
{
id:"soleil",name:"Soleil",group:"products",glyph:"SO",tone:"gold",rank:3,flags:["swe","ai"],stage:"iOS / NOT RELEASE READY",scope:"NATIVE SOFTWARE",tags:["Swift","SwiftUI","Metal","StoreKit","On-device AI"],facts:["Native Metal renderer","StoreKit 2 lifetime","Release gates open"],
summary:"Privacy-oriented iOS voice journal, with a custom Metal-rendered living-sun interface.",
challenge:"Make an emotionally expressive voice app while controlling inference boundaries, rendering determinism, entitlements and mobile release quality.",
contribution:"Designed and implemented SwiftUI/native rendering contracts, modular voice-engine composition and commerce/release infrastructure.",
engineering:["LivingSunRenderer.swift contains a native Metal pipeline with a tightly packed 41-float uniform ABI and deterministic visual presets.","VoiceEngine abstractions separate debug fixtures from the production engine and explicit readiness gates.","StoreKit entitlement actor handles transaction updates, verified lifetime purchase state and restricted offline caching."],
proof:"Reviewed substantial Swift and Metal implementation files, interface composition, commerce services and audit gates.",
limits:"Current published source labels the product development work-in-progress, not App Store ready. Physical-device, model and release checks are not all certified.",
link:null,image:null,mood:"NATIVE / EXPERIMENTAL"
},
{
id:"slate",name:"Slate",group:"products",glyph:"SL",tone:"blue",rank:4,flags:["swe","ai"],stage:"BUILD / INTEGRATION",scope:"AGENT-NATIVE PRODUCT",tags:["Python","Django","PostgreSQL","Agent runs","React"],facts:["Durable Run models","Connection lifecycle","Upstream Plane base"],
summary:"Project manager where human and AI collaborators share work, progress and review.",
challenge:"AI workers are not human teammates. How can a PM product represent delegated attempts, interruptions, input requests, approvals and replayable outcomes?",
contribution:"Product framing and implementation of agent identities, workspace-scoped connections, durable execution models and agent workspace flows, built on a Plane-derived foundation.",
engineering:["Django Run model tracks attempts, parent lineage, idempotency keys, provider IDs, context digests, timestamps and failure classes.","AgentConnection stores reviewed grants, state, health and credential references rather than plaintext secrets.","Run, input request, and review domains separate human work from agent execution."],
proof:"Inspected fork/slate_runs/models.py and fork/slate_agents/models.py, plus agent programme evidence and merged work-graph PRs.",
limits:"Clearly credit the upstream Plane foundation. Programme acceptance or passing tests does not imply a public hosted production service.",
link:null,image:null,mood:"HUMANS + AGENTS"
},
{
id:"corpa",name:"Corpa",group:"products",glyph:"CO",tone:"pink",rank:5,flags:["fde","swe","ai"],stage:"PRIVATE / DEVELOPMENT",scope:"REGULATED WORKFLOWS",tags:["TypeScript","Supabase","Rules engine","ACRA","IRAS"],facts:["ACRA/IRAS obligations","Deterministic rules","Human review"],
summary:"Singapore corporate-compliance product turning statutory obligations into inspectable software workflows.",
challenge:"Tax and statutory deadlines cannot be guessed from chat. Rules need source dates, company facts, explicit calculations and human-controlled filing.",
contribution:"Product design and compliance workflow engineering, including a rule-driven obligation engine, company profile aggregation, deadline tracking and operator flows.",
engineering:["src/lib/compliance/rules.ts implements pure rules for Annual Return, AGM, ECI, Form C-S and Form C eligibility.","Obligation loader ties company facts to stable namespaced obligation IDs and produces the canonical scan source.","Source references and verified-at dates are modeled alongside calculations rather than presented as timeless knowledge."],
proof:"Inspected the actual rules engine, obligation loader and filing workflow code.",
limits:"Not proof of regulatory certification or automated government filing. Legal rules and deadlines require up-to-date official verification.",
link:null,image:null,mood:"RULES / AUDIT"
},
{
id:"workos",name:"WorkOS",group:"ai",glyph:"WO",tone:"violet",rank:6,flags:["ai","swe"],stage:"DESKTOP MVP",scope:"LOCAL AI RUNTIME",tags:["Rust","Tauri 2","React 19","SQLite","FTS5"],facts:["Rust sidecar","Local-first memory","Tauri desktop"],
summary:"Local-first desktop AI coworker, with a Rust core and persistent, searchable memory.",
challenge:"Build agent capabilities that remain usable on a personal machine without outsourcing core state, file operations and tool policy to a remote service.",
contribution:"Worked on the Tauri desktop architecture, Rust-side orchestration and the memory/storage model, including policy and local tooling.",
engineering:["Five-layer design: Tauri shell, Rust JSON-RPC sidecar, bounded agent loop, tool surface and local persistence.","Rust memory module ingests, chunks and indexes into SQLite and an Obsidian-compatible Markdown vault.","Hybrid search combines FTS5 with optional vector retrieval; supports an embedding-free fallback."],
proof:"Inspected crates/workos-core/src/memory/mod.rs and docs/site/architecture.md. Repository describes a Tauri 2 MVP.",
limits:"Not a claim of a production distributed service or independent installer certification. Confirm packaging and real-machine reliability before claiming shipping readiness.",
link:null,image:null,mood:"LOCAL / RUST"
},
{
id:"amethyst",name:"Amethyst",group:"ai",glyph:"AM",tone:"violet",rank:7,flags:["ai","swe","fde"],stage:"INTERNAL PRODUCTION",scope:"COMPANY INTELLIGENCE",tags:["TypeScript","Policy","AI governance","PostgreSQL"],facts:["Point-in-time context","Policy decisions","Approved writeback"],
summary:"Evidence-grounded company context and governed decisions for AI-assisted work.",
challenge:"AI shouldn't turn a freshly scraped statement into an authoritative company fact. Context needs provenance, freshness and approved transitions.",
contribution:"Product and systems architecture for source/claim lifecycles, policy/approvals, audit-backed context and guarded writeback.",
engineering:["Source documents enter candidate claim flows; only approved, non-stale claims enter scoped agent context.","Policy effects distinguish allow, deny, review and approval; decisions include reasons and remediation.","Writeback, decision receipts, supersession and recovery are modeled as first-class backend operations."],
proof:"July internal consolidation review reports 1,122/1,122 Vitest and 32/32 Playwright tests on a merged baseline; public case study includes product and architecture proof.",
limits:"Protected internal production, not live customer pilots. Autonomous provider writes and external rollout remain gated.",
link:"https://github.com/joyboy257/amethyst-showcase",linkLabel:"PUBLIC CASE STUDY ↗",
image:"https://raw.githubusercontent.com/joyboy257/amethyst-showcase/main/assets/company-brain-overview.svg",mood:"SOURCE / PROVENANCE"
},
{
id:"verticals",name:"Verticals",group:"ai",glyph:"VE",tone:"blue",rank:8,flags:["ai","swe"],stage:"PRIVATE / ENGINEERING",scope:"ENTERPRISE KNOWLEDGE",tags:["Python","Next.js","RAG","Connectors","Multi-tenancy"],facts:["Onyx CE foundation","Tenant isolation","Source health"],
summary:"Connected company knowledge and search workspace built upon the Onyx Community Edition foundation.",
challenge:"Company data lives across many incompatible services; retrieval must not leak tenants, stale content or unapproved credentials.",
contribution:"Verticals-specific product layer: source catalogue, connection flows, tenancy posture, readiness surfaces and plugin-oriented extensibility.",
engineering:["SourceCatalogue.tsx implements a Verticals-specific connected-source product surface with tests.","Backend patterns cover tenant-specific DB/schema/session context and Redis key isolation.","Search/Ask, recommendation and source-health surfaces support trustworthy cross-source context."],
proof:"Inspected repo README and SourceCatalogue code search. Foundation and derived code explicitly identified.",
limits:"Onyx Community Edition code is upstream, not all original. Need separate audit of exact per-file contribution and release status before claiming complete authorship.",
link:null,image:null,mood:"KNOWLEDGE / TENANCY"
},
{
id:"agentos",name:"AgentOS",group:"ai",glyph:"AO",tone:"blue",rank:9,flags:["ai","swe"],stage:"PUBLIC / PROTOTYPE",scope:"AGENT WORKSPACE",tags:["TypeScript","Next.js","Approvals","SSE","Checkpoints"],facts:["Inspectable public source","Human tool approvals"],
summary:"Visual environment for composing and supervising agent coworkers.",
challenge:"Operators need to understand what an agent is doing and intervene safely without reading raw traces or terminal logs.",
contribution:"Full-stack agent workspace prototype spanning canvas interaction, typed runtime contracts, checkpoint states, SSE events and approval UX.",
engineering:["Per-tool-call approval coordinator pauses actions, snapshots trace context and emits SSE updates.","RuntimeEngine contract defines start, resume, checkpoint and human approval outcomes.","Agent canvas makes plans, progress and operational controls visible to users."],
proof:"Inspected approval-manager.ts, typed runtime contracts and public project README.",
limits:"Not a deployed production service. Some provider integrations, runtime paths and technical claims remain prototype-level.",
link:"https://github.com/joyboy257/agentos",linkLabel:"INSPECT PUBLIC CODE ↗",
image:"https://raw.githubusercontent.com/joyboy257/agentos/main/docs/assets/readme/canvas.png",mood:"CANVAS / AGENTS"
},
{
id:"atlas",name:"Atlas",group:"ai",glyph:"AT",tone:"blue",rank:10,flags:["ai","swe","fde"],stage:"PUBLIC ALPHA",scope:"DEVELOPER TOOLS",tags:["TypeScript","CLI","Policy","Simulation","Agent SDK"],facts:["Local policy and approvals","Deterministic replay"],
summary:"Agent SDK and business-messaging runtime with a locally verifiable first-agent loop.",
challenge:"An agent SDK should prove safe actions without forcing developers to buy a model, connect a provider or mutate business state.",
contribution:"Developer runtime contracts, CLI experience, tool policy, local simulator, workbench and receipt/replay design.",
engineering:["Local quickstart runs customer request → knowledge evidence → tool proposal → policy → approval → committed action → simulated delivery.","Replay verifies duplicates and receipt sequences in an isolated sandbox.","Explicitly separate provider-connected operations from local conformance."],
proof:"Read packages/atlas/docs/QUICKSTART.md and public source, including simulated front-desk use case.",
limits:"The npm package is not confirmed published; current README npx command may fail. No proven live messaging-provider certification.",
link:"https://github.com/joyboy257/atlas",linkLabel:"INSPECT ALPHA CODE ↗",
image:null,mood:"SDK / GOVERNED"
},
{
id:"dreamcraft",name:"DreamCraft",group:"products",glyph:"DR",tone:"gold",rank:11,flags:["swe","ai"],stage:"PUBLIC / LOCAL DEMO",scope:"GENERATIVE INTERACTIVE",tags:["TypeScript","Three.js","WebGL","Voxel","Procedural"],facts:["192/192 tests reported","9 browser journeys","Playable local runtime"],
summary:"Turn a natural-language dream into a first-person voxel world.",
challenge:"Model output is not safe executable game code. Convert structured descriptions into deterministic, playable worlds with bounded rules.",
contribution:"Browser runtime, typed dream manifest, generator adapter, procedural geometry, entity staging, gameplay and evaluation.",
engineering:["adaptDreamManifest materializes a TrustedDreamManifest into chunks, voxel structures, entities and physics profiles.","Game scenarios, player movement and narrative structure are compiled from typed specifications.","README documents 192 unit tests and 9 browser journeys at recorded build state."],
proof:"Public implementation and dreamRuntimeAdapter.ts reviewed, with playable local build documented.",
limits:"Live-provider and public deployment proofs still pending; local deterministic experience isn't a hosted AI generation benchmark.",
link:"https://github.com/joyboy257/dreamcraft",linkLabel:"VIEW PLAYABLE SOURCE ↗",
image:"https://raw.githubusercontent.com/joyboy257/dreamcraft/main/output/playwright/g7-3-family-final.png",mood:"WORLD / GENERATION"
},
{
id:"rustyindex",name:"RustyIndex",group:"research",glyph:"RI",tone:"gold",rank:12,flags:["ai","swe"],stage:"MAINTENANCE",scope:"RETRIEVAL ENGINE",tags:["Rust","Axum","Python","PostgreSQL","RAG"],facts:["Tenant-scoped extraction","Evidence citations","Retrieval traces"],
summary:"Research retrieval engine with document parsing, tenant boundaries and evidence-linked responses.",
challenge:"Generic vector search often loses source structure and tenant context; reliable retrieval needs citations, traceability and explicit knowledge gaps.",
contribution:"Rust/Axum API and tenant extraction, document processing, structured retrieval and Mirai-adapter experimentation.",
engineering:["Axum TenantContext rejects missing or invalid server-side tenant scope.","Indexing pipeline combines parsed document sources, structured traversal and evidence-bearing answers.","Adapter can shadow existing retrieval to compare outputs before adoption."],
proof:"Read Rust tenant_context.rs, technical spec, README and migration plan.",
limits:"Project is in maintenance mode. Dependency/version compatibility and test environment issues prevent claims of immediate production readiness.",
link:"https://github.com/joyboy257/rustyindex",linkLabel:"READ RUST SOURCE ↗",image:null,mood:"RUST / EVIDENCE"
},
{
id:"heidi",name:"Heidi Network",group:"research",glyph:"HE",tone:"pink",rank:13,flags:["ai","fde","swe"],stage:"FOUNDER / SPEC",scope:"AGENT COMMERCE",tags:["A2A","MCP","Protocols","Negotiation","Consent"],facts:["HNL draft 0.4.2","Signed offers","Approval required"],
summary:"Protocol and product thesis for AI agents coordinating deals with Southeast Asian merchants.",
challenge:"How can independent agents make a negotiated offer meaningful without exposing personal preferences or committing anyone without consent?",
contribution:"Founder-led product thesis and protocol design: merchant Shopfronts, signed offers, negotiation rules, group plans and approval-bound commitments.",
engineering:["HNL negotiation specifies rounds, immutable signed/hash offers and separate commitment submission.","Agents keep owner limits private; merchants issue revised offers within rules; owners approve exact final terms.","Conformance tests and examples distinguish valid, invalid, unsafe and incomplete network messages."],
proof:"Reviewed spec/network/README.md and 05-negotiation.md; draft 0.4.2 enumerates conformance obligations.",
limits:"Draft specification is not yet founder-confirmed or shipped; no live network, merchant adoption or commercial transaction proof.",
link:null,image:null,mood:"FOUNDING / PROTOCOL"
},
{
id:"propframe",name:"PropFrame",group:"products",glyph:"PF",tone:"pink",rank:14,flags:["swe","ai","fde"],stage:"PUBLIC / PROTOTYPE",scope:"MEDIA INFRASTRUCTURE",tags:["Next.js","Drizzle","GPU workers","R2","Video"],facts:["Background render jobs","User credit ledger","Photo ownership checks"],
summary:"Property photo-to-cinematic-video product with asynchronous media rendering.",
challenge:"Media generation takes time and money. How can a user request become an authorized, trackable render job with fair accounting and recovery?",
contribution:"Next.js full-stack application, render and GPU worker pipelines, database models, storage integration, and payment/credit logic.",
engineering:["Clip API validates user session and project ownership before inserting a queued render job.","Worker entry points consume clip jobs and use storage-backed assets for rendering.","Credit debits and enqueue operations exist, but require transactional hardening review for failure/concurrency paths."],
proof:"Read app/api/clips/generate/route.ts, credit code and render-worker sources.",
limits:"Do not call this production-hardened billing: current route deducts credits and enqueues separately, creating potential failure gaps. Product prototype only.",
link:"https://github.com/joyboy257/PropFrame",linkLabel:"INSPECT MEDIA PIPELINE ↗",image:null,mood:"MEDIA / QUEUES"
},
{
id:"ami",name:"AMI",group:"delivery",glyph:"MI",tone:"blue",rank:15,flags:["fde","swe","ai"],stage:"INTERNAL / PROTOTYPE",scope:"MARKET INTELLIGENCE",tags:["n8n","Next.js","PostgreSQL","FastAPI","Crawling"],facts:["Source-backed signals","Competitor scoring","robots.txt checks"],
summary:"Automated competitor intelligence for a Singapore wellness holding group.",
challenge:"Market research is scattered across changing websites, SEO signals, company properties and ranking data.",
contribution:"Crawl and normalization pipeline, scoring model, source-linked intelligence and internal dashboard.",
engineering:["Separate FastAPI robots service parses published crawl rules before ingestion.","Discovery, crawling, scoring and monitoring flows link source evidence to dashboard outputs.","Schema and SQL assertions check intelligence and scoring behaviors."],
proof:"Inspected public repository README, services/robots/main.py and scoring pipeline code.",
limits:"Internal prototype, not confirmed production rollout. Current robots service permits failed checks on error; should not be described as strict fail-closed compliance.",
link:"https://github.com/joyboy257/ami-awhl",linkLabel:"INSPECT PUBLIC PIPELINE ↗",image:null,mood:"DATA / SOURCES"
},
{
id:"sole",name:"Sole",group:"ai",glyph:"SE",tone:"gold",rank:16,flags:["ai","fde","swe"],stage:"PUBLIC / SYNTHETIC",scope:"SAFETY EVALUATION",tags:["Python","Guardrails","Agents","Evals","SQLite"],facts:["Code-enforced caps","Keyless evals","Synthetic customer data"],
summary:"Small autonomous-support prototype built around deterministic enforcement.",
challenge:"A customer-support model must not refund, credit or disclose order information simply because it chose to.",
contribution:"Implemented tool-use design, domain limits, identity verification and keyless evaluation cases around model-independent guardrails.",
engineering:["guardrails.py enforces credit caps, verified order identity and eligibility outside the model.","Forbidden tool classes have no executable path; allowed effects use typed tools.","Deterministic and live smoke eval paths are separated."],
proof:"Read app/core/guardrails.py and suite documentation; synthetic retail environment.",
limits:"All customer data is fake. This does not constitute a public production support system.",
link:"https://github.com/joyboy257/sole",linkLabel:"INSPECT POLICY CODE ↗",image:null,mood:"SAFETY / PROOF"
},
{
id:"openbrain",name:"OpenBrain",group:"products",glyph:"OB",tone:"violet",rank:17,flags:["ai","swe"],stage:"PRIVATE / BETA",scope:"PERSONAL / COMPANY MEMORY",tags:["Tauri","React","Sources","Memory","FTS5"],facts:["v0.3.0 beta recorded","Local memory","Context-aware drafts"],
summary:"Local-first company memory product with cross-source context, search and drafting.",
challenge:"Context scattered across apps should compound into usable memory without forcing a remote vendor to hold the only copy.",
contribution:"Desktop product workflows connecting source integrations, local memory search, contextual drafting and release packaging.",
engineering:["Tauri desktop combines a native shell with indexed memory, citations and people graph surfaces.","Beta notes describe source ingestion, local vault export and context-triggered workflows.","Connected providers depend on external integrations and separate authorization."],
proof:"Reviewed RELEASE.md and supporting project architecture and beta documentation.",
limits:"Claims of 123 integrations are provider-adapter coverage, not 123 independently verified live connections. Hosted tier not deployed.",
link:null,image:null,mood:"MEMORY / CONTEXT"
},
{
id:"singnote",name:"SingNote",group:"products",glyph:"SN",tone:"violet",rank:18,flags:["swe","ai","fde"],stage:"PRIVATE / PROTOTYPE",scope:"VOICE / HEALTHCARE UX",tags:["SwiftUI","Apple Speech","en-SG","AVFoundation"],facts:["Live speech capture","Singapore locale","Clinical workflow"],
summary:"Singapore-focused psychologist note-taking prototype using live voice transcription.",
challenge:"Design a session recording and note workflow for clinicians, including local speech recognition and sensitive information boundaries.",
contribution:"SwiftUI session flows, AVFoundation capture, Apple Speech transcription and editing-oriented UI.",
engineering:["TranscriptionService uses SFSpeechRecognizer(locale: en-SG) and audio-buffer recognition.","Supports partial live transcription and speech authorization; recording lifecycle is explicit.","Clinical notes and client forms are modeled in the app."],
proof:"Read Sources/Services/TranscriptionService.swift, README and UI flow references.",
limits:"Code explicitly sets requiresOnDeviceRecognition=false. Do not claim guaranteed offline processing, E2EE or regulatory compliance.",
link:null,image:null,mood:"VOICE / UX"
},
{
id:"pokerai",name:"PokerAI",group:"research",glyph:"PK",tone:"gold",rank:19,flags:["ai","swe"],stage:"PUBLIC / RESEARCH",scope:"REINFORCEMENT LEARNING",tags:["Python","TensorFlow","DQN","Simulation"],facts:["DQN experiment","Strategy baseline","Simulation harness"],
summary:"Heads-up poker reinforcement-learning research, comparing a DQN agent with a structured opponent.",
challenge:"How do you know a learned policy is better than a deterministic one in an incomplete-information game?",
contribution:"Developed Abel's DQN/replay components, Kane rule-based baseline and simulation/evaluation workflows.",
engineering:["Reinforcement learning training loop with replay-based value estimation.","Rule-based opponent provides a stable yardstick.","Game simulation and evaluation telemetry separate experiments from claims of optimal play."],
proof:"Reviewed public README, DQN design and evaluation framing.",
limits:"Educational prototype. No guarantee of convergence, equilibrium, profitability or real-money readiness.",
link:"https://github.com/joyboy257/pokerai-public",linkLabel:"EXPLORE RL CODE ↗",image:null,mood:"RESEARCH / RL"
},
{
id:"tradedesk",name:"Trading Lab",group:"research",glyph:"TL",tone:"gold",rank:20,flags:["swe","ai"],stage:"PRIVATE / PAPER ONLY",scope:"QUANT RESEARCH",tags:["Python","Backtesting","Forward testing","Data"],facts:["Sealed holdout","Paper trading","No money automation"],
summary:"A disciplined trading research lab built to reject weak edges before they reach capital.",
challenge:"Prevent backtest optimism from being mistaken for live strategy evidence.",
contribution:"Experiment and forward-verification workflow combining hypothesis discovery, holdout gates, review pages and daily market briefs.",
engineering:["Two-lock process separates exploratory analysis from sealed validation.","Data and chart captures back review surfaces and paper-robot monitoring.","Failures and candidates remain inspectable in a research ledger."],
proof:"TradeDesk README describes the actual paper workflow, schedules, data review and forward-proof goal.",
limits:"No live autonomous trading, no real-money results and no claim of a profitable trading edge.",
link:null,image:null,mood:"RESEARCH / QUANT"
},
{
id:"mototiam",name:"Mototiam",group:"products",glyph:"MT",tone:"pink",rank:21,flags:["fde","swe"],stage:"PRIVATE / PROJECT",scope:"LOCAL COMMERCE",tags:["Python","FastAPI","PostgreSQL","Telegram","Next.js"],facts:["Marketplace scraper","Deal scoring","Telegram alerts"],
summary:"Singapore motorcycle-deal discovery with ingestion, pricing heuristics and alerts.",
challenge:"Spot interesting listings early in a noisy local marketplace and turn raw pages into a useful shortlist.",
contribution:"Scraping, deal scoring, structured PostgreSQL storage, FastAPI endpoints, Telegram notification and dashboard design.",
engineering:["Listing data is normalized and deduplicated before scoring.","Configurable deal heuristics evaluate candidates.","New high-scoring entries feed user notifications and a dashboard."],
proof:"Reviewed private repository README and feature/test documentation.",
limits:"Not proof of current always-on scraper reliability or commercial adoption. Source remains private.",
link:null,image:null,mood:"MARKETPLACE / DATA"
}
];
const folders={
 featured:{label:"SELECTED WORK",list:["mirai","amelia","soleil","slate","corpa","workos"]},
 delivery:{label:"CLIENT DELIVERY",list:["amelia","ami","corpa","mototiam"]},
 ai:{label:"AI SYSTEMS",list:["mirai","amethyst","verticals","agentos","atlas","workos","sole","openbrain","heidi","rustyindex"]},
 products:{label:"PRODUCTS",list:["soleil","slate","corpa","workos","dreamcraft","propframe","singnote","openbrain","mototiam"]},
 research:{label:"RESEARCH",list:["heidi","rustyindex","pokerai","tradedesk","dreamcraft"]},
 all:{label:"ALL PROJECTS",list:projects.map(p=>p.id)}
};
const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
const byId=Object.fromEntries(projects.map(p=>[p.id,p]));
let currentFolder="featured",currentLens="all",currentProject="mirai",currentTab="overview",focusWindow="finder",zTop=80,toastTimer=null;
function escapeHtml(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function appToast(message){const toast=$("#toast");toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,2400);}
function showWindow(name){
 const el=$("#"+name+"-window");if(!el)return;
 el.hidden=false;el.classList.remove("minimized");focusWin(name);
 if(name==="terminal")setTimeout(()=>$("#terminal-command").focus(),80);
}
function focusWin(name){focusWindow=name;const el=$("#"+name+"-window");if(!el)return;el.style.zIndex=++zTop;$$(".os-window").forEach(w=>w.classList.toggle("active-window",w===el));}
function openApp(name){if(["finder","about","brief","terminal"].includes(name)){showWindow(name);return;}appToast("Application not found.");}
function performAction(name,target){const el=$("#"+target+"-window");if(!el)return;if(name==="close")el.hidden=true;else if(name==="minimize")el.classList.add("minimized");else if(name==="maximize")el.classList.toggle("maximized");}
function renderFolder(name){
 currentFolder=folders[name]?name:"featured";
 const folder=folders[currentFolder];
 $$(".side-item[data-folder]").forEach(b=>b.classList.toggle("selected",b.dataset.folder===currentFolder));
 $("#folder-breadcrumb").textContent="DESKTOP / "+folder.label;
 const items=folder.list.map(id=>byId[id]).filter(Boolean).filter(p=>currentLens==="all"||p.flags.includes(currentLens));
 $("#list-count").textContent=items.length+" PROJECTS / OPEN TO INSPECT";
 $("#project-list").innerHTML=items.map(p=>'<button role="option" aria-selected="'+String(p.id===currentProject)+'" class="file-row '+(p.id===currentProject?'selected':'')+'" data-project="'+p.id+'"><span class="file-glyph '+(p.tone||'')+'">'+PortfolioIcons.file(p.glyph,p.tone)+'</span><span class="file-row-copy"><strong>'+escapeHtml(p.name)+'</strong><small>'+escapeHtml(p.scope)+' · '+escapeHtml(p.stage.split(" / ")[0])+'</small></span></button>').join('');
 if(!items.some(p=>p.id===currentProject)){if(items[0])currentProject=items[0].id;}
 if(!items.length){$("#project-list").innerHTML='<p class="spotlight-empty">No projects in this category for this role.</p>';return;}
 renderProject(currentProject);
}
function renderProject(id){
 const p=byId[id];if(!p)return;currentProject=id;showWindow("finder");
 $$(".file-row").forEach(b=>{const hit=b.dataset.project===id;b.classList.toggle("selected",hit);b.setAttribute("aria-selected",String(hit));});
 $("#project-kicker").textContent=p.scope+" / "+p.mood;
 $("#project-title").textContent=p.name;
 $("#project-deck").textContent=p.summary;
 $("#project-facts").innerHTML=p.facts.map(s=>"<span>"+escapeHtml(s)+"</span>").join("");
 const url=new URL(window.location.href);url.searchParams.set("project",id);history.replaceState(null,"",url.pathname+url.search+url.hash);
 const visual=$("#project-visual");visual.innerHTML="";
 const fallback=document.createElement("div");fallback.className="visual-fallback";fallback.textContent=p.name.toUpperCase();visual.append(fallback);
 const tag=document.createElement("span");tag.className="visual-tag";tag.textContent=p.stage;visual.append(tag);
 if(p.image){const img=document.createElement("img");img.src=p.image;img.loading="lazy";img.alt=p.name+" project evidence image";img.addEventListener("load",()=>fallback.hidden=true);img.addEventListener("error",()=>{img.remove();fallback.hidden=false});visual.insertBefore(img,fallback);}
 const website=$("#project-website"), demo=$("#project-demo");
 website.hidden=!p.website;if(p.website)website.href=p.website;
 demo.hidden=!p.demo;if(p.demo)demo.href=p.demo;
 const link=$("#project-primary");
 if(p.link){link.href=p.link;link.textContent=p.linkLabel||"OPEN PUBLIC EVIDENCE ↗";link.hidden=false;}else{link.hidden=true;}
 renderTab();
}
function renderTab(){
 $$(".file-tab").forEach(b=>{const active=b.dataset.tab===currentTab;b.classList.toggle("on",active);b.setAttribute("aria-selected",String(active));});
 const p=byId[currentProject];let html="";
 if(currentTab==="overview"){
  html='<h3>THE REAL PROBLEM</h3><p>'+escapeHtml(p.challenge)+'</p><h3>WHAT I OWNED</h3><p>'+escapeHtml(p.contribution)+'</p><h3>TOOLS</h3><p>'+p.tags.map(t=>'<span class="skill-token">'+escapeHtml(t)+'</span>').join(' ')+'</p>';
 }else if(currentTab==="engineering"){
  html='<h3>IMPLEMENTATION NOTES</h3><ul>'+p.engineering.map(x=>"<li>"+escapeHtml(x)+"</li>").join("")+'</ul><h3>THE APPROACH</h3><p>Inspect the boundaries and trade-offs, not just the feature list.</p>';
 }else{
  html='<h3>WHAT THE REPOSITORY SUPPORTS</h3><p>'+escapeHtml(p.proof)+'</p><h3>WHAT IT DOES NOT PROVE</h3><p class="honesty">'+escapeHtml(p.limits)+'</p>';
 }
 $("#tab-content").innerHTML=html;
}
function openProject(id){
 const p=byId[id];if(!p)return;
 if(!folders[currentFolder].list.includes(id)){currentFolder="all";$("#folder-breadcrumb").textContent="DESKTOP / ALL PROJECTS";}
 if(currentLens!=="all"&&!p.flags.includes(currentLens)){currentLens="all";$$(".lens").forEach(b=>b.classList.toggle("active",b.dataset.lens==="all"));}
 currentProject=id;currentTab="overview";renderFolder(currentFolder);showWindow("finder");
}
function selectLens(lens){currentLens=lens;$$(".lens").forEach(b=>b.classList.toggle("active",b.dataset.lens===lens));renderFolder(currentFolder);}
function spotlightOpen(){const s=$("#spotlight");s.hidden=false;$("#spotlight-input").value="";searchRender("");setTimeout(()=>$("#spotlight-input").focus(),0);}
function spotlightClose(){$("#spotlight").hidden=true;}
function matchesSearch(p,q){const hay=[p.name,p.summary,p.scope,p.tags.join(" "),p.stage,p.challenge].join(" ").toLowerCase();return hay.includes(q.toLowerCase());}
function searchRender(q){
 const matches=projects.filter(p=>matchesSearch(p,q)).slice(0,12);
 $("#spotlight-results").innerHTML=matches.length?matches.map(p=>'<button class="spotlight-result" data-search-project="'+p.id+'"><span class="file-glyph '+p.tone+'">'+PortfolioIcons.file(p.glyph,p.tone)+'</span><span><b>'+escapeHtml(p.name)+'</b><small>'+escapeHtml(p.scope)+' / '+escapeHtml(p.summary.slice(0,100))+'</small></span></button>').join(""):'<p class="spotlight-empty">No matching projects. Try a language, tool or problem.</p>';
}
function submitTerminal(input){
 const out=$("#terminal-output");const command=String(input).trim();if(!command)return;
 const line=document.createElement("p");line.textContent="deon@portfolio % "+command;out.append(line);
 let reply="";
 const words=command.toLowerCase().split(/\s+/);
 if(words[0]==="help")reply="help · whoami · ls · open <project> · stack · contact · clear";
 else if(words[0]==="whoami")reply="Deon Quek / Applied AI & Software Engineer / Singapore\nFounder-led platforms, real client automation, native app systems and testable implementations.";
 else if(words[0]==="ls")reply=projects.map(p=>p.name).join("  ·  ");
 else if(words[0]==="stack")reply="Python, TypeScript, Rust, Swift, PostgreSQL, Redis, React, Tauri, Metal, Docker, MCP, evaluation systems";
 else if(words[0]==="contact")reply="LinkedIn: https://www.linkedin.com/in/deonquek\nGitHub: https://github.com/joyboy257";
 else if(words[0]==="open"){
  const query=words.slice(1).join(" ");const found=projects.find(p=>p.id===query||p.name.toLowerCase().includes(query)&&query);
  if(found){openProject(found.id);reply="Opened "+found.name+" in Finder."; }else reply="Project not found. Type ls for names.";
 }else if(words[0]==="clear"){out.replaceChildren();return;}else reply="Unknown command. Type help.";
 const p=document.createElement("p");p.textContent=reply;out.append(p);out.scrollTop=out.scrollHeight;
}
function copyToClipboard(value,message){
 if(!navigator.clipboard || !navigator.clipboard.writeText){appToast("Clipboard unavailable in this browser");return;}
 navigator.clipboard.writeText(value).then(()=>appToast(message)).catch(()=>appToast("Clipboard access denied"));
}
function tickClock(){const now=new Date();$("#desktop-time").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",hour12:false}).format(now).toUpperCase();}
function installDrag(){
 $$(".window-titlebar").forEach(header=>{
  let start=null;
  header.addEventListener("pointerdown",e=>{
   if(e.target.closest("button"))return;
   const name=header.dataset.drag,el=$("#"+name+"-window");if(!el||matchMedia("(max-width:720px)").matches||el.classList.contains("maximized"))return;
   focusWin(name);
   const rect=el.getBoundingClientRect();
   start={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top};header.setPointerCapture(e.pointerId);
  });
  header.addEventListener("pointermove",e=>{
   if(!start)return;
   const x=Math.max(8,Math.min(innerWidth-140,start.left+(e.clientX-start.x)));
   const y=Math.max(40,Math.min(innerHeight-125,start.top+(e.clientY-start.y)));
   const el=$("#"+header.dataset.drag+"-window");el.style.left=x+"px";el.style.top=y+"px";
  });
  header.addEventListener("pointerup",()=>start=null);
  header.addEventListener("pointercancel",()=>start=null);
 });
}
document.addEventListener("click",e=>{
 const action=e.target.closest("[data-window-action]");if(action){performAction(action.dataset.windowAction,action.dataset.target);return;}
 const app=e.target.closest("[data-app]");if(app){openApp(app.dataset.app);return;}
 const start=e.target.closest("[data-start-project]");if(start){openProject(start.dataset.startProject);if(matchMedia("(max-width:720px)").matches)$("#finder-window").scrollIntoView({behavior:"smooth",block:"start"});return;}
 const folder=e.target.closest("[data-folder]");if(folder){showWindow("finder");currentProject=folders[folder.dataset.folder]?.list[0]||"mirai";currentTab="overview";renderFolder(folder.dataset.folder);if(matchMedia("(max-width:720px)").matches)$("#finder-window").scrollIntoView({behavior:"smooth",block:"start"});return;}
 const project=e.target.closest("[data-project]");if(project){currentTab="overview";renderProject(project.dataset.project);return;}
 const tab=e.target.closest("[data-tab]");if(tab){currentTab=tab.dataset.tab;renderTab();return;}
 const lens=e.target.closest("[data-lens]");if(lens){selectLens(lens.dataset.lens);return;}
 const found=e.target.closest("[data-search-project]");if(found){spotlightClose();openProject(found.dataset.searchProject);return;}
 if(e.target===$("#spotlight"))spotlightClose();
 const windowEl=e.target.closest(".os-window");if(windowEl)focusWin(windowEl.dataset.window);
});
$("#finder-search").addEventListener("click",spotlightOpen);
$("#spotlight-toggle").addEventListener("click",spotlightOpen);
$("#spotlight-input").addEventListener("input",e=>searchRender(e.target.value.trim()));
$("#terminal-form").addEventListener("submit",e=>{e.preventDefault();const input=$("#terminal-command");submitTerminal(input.value);input.value="";});
$("#copy-project").addEventListener("click",()=>{
 const p=byId[currentProject];const summary=p.name+": "+p.summary+"\nMy contribution: "+p.contribution+"\nEngineering: "+p.engineering.join(" ")+"\nEvidence: "+p.proof+"\nLimits: "+p.limits+(p.link?"\n"+p.link:"");
 copyToClipboard(summary,"Project summary copied");
});
$("#copy-brief").addEventListener("click",()=>{
 const text="Deon Quek — Singapore-based Applied AI & Software Engineer. Founder/lead engineer of Mirai, a multi-tenant AI business platform; built Amelia Bot, staff-used automation for a professional-services client. Also built native Swift/Metal iOS work, Rust local agent systems, governed knowledge tools and product engineering projects. Engineering evidence: https://github.com/joyboy257/mirai-showcase; https://github.com/joyboy257/joyboy257/tree/main/showcases/amelia-bot";
 copyToClipboard(text,"Recruiter summary copied");
});
document.addEventListener("keydown",e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#spotlight").hidden?spotlightOpen():spotlightClose();return;}
 if(e.key==="Escape"){if(!$("#spotlight").hidden){spotlightClose();return;}if(focusWindow!=="finder"){const w=$("#"+focusWindow+"-window");if(w)w.hidden=true;focusWin("finder");}return;}
 if($("#spotlight").hidden&&focusWindow==="finder"&&!["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)&&(e.key==="ArrowDown"||e.key==="ArrowUp")){
  e.preventDefault();
  const entries=folders[currentFolder].list.map(id=>byId[id]).filter(p=>currentLens==="all"||p.flags.includes(currentLens));
  const index=entries.findIndex(p=>p.id===currentProject);
  const next=entries[(index+(e.key==="ArrowDown"?1:-1)+entries.length)%entries.length];
  if(next){currentTab="overview";renderProject(next.id);}
 }
});
installDrag();renderFolder("featured");tickClock();setInterval(tickClock,30000);
const requested=new URLSearchParams(location.search).get("project");if(requested&&byId[requested])openProject(requested);
const lens=new URLSearchParams(location.search).get("role");if(["ai","fde","swe"].includes(lens))selectLens(lens);
