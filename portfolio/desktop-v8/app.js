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


const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const byID=Object.fromEntries(projects.map(p=>[p.id,p]));
const sets={featured:["mirai","amelia","soleil","slate","workos","corpa"],delivery:["amelia","ami","corpa","mototiam"],ai:["mirai","amethyst","verticals","agentos","atlas","workos","heidi","rustyindex","sole","openbrain"],products:["soleil","slate","corpa","workos","dreamcraft","propframe","singnote","openbrain"],research:["heidi","rustyindex","pokerai","tradedesk"],all:projects.map(p=>p.id)};
const state={locked:true,app:"",group:"featured",project:"mirai",tab:"case",stack:[],gesture:null,phoneGesture:null,drag:null,dragged:false,preventClick:0};
const mobile=()=>matchMedia("(max-width:720px)").matches;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link=(url,label)=>url&&/^https:\/\/(github\.com|usemirai\.app|www\.linkedin\.com)\//.test(url)?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>':"";
function clock(){const d=new Date();const hm=new Intl.DateTimeFormat("en-SG",{hour:"2-digit",minute:"2-digit",hour12:false}).format(d);
 $("#lock-time").textContent=hm;$("#lock-status-time").textContent=hm;$("#phone-time").textContent=hm;
 $("#lock-date").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"long",day:"numeric",month:"long"}).format(d);
 $("#phone-weekday").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"short"}).format(d).toUpperCase();$("#phone-day").textContent=d.getDate();
 $("#mac-time").textContent=new Intl.DateTimeFormat("en-SG",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",hour12:false}).format(d);
}
clock();setInterval(clock,30000);
const lockEl=$("#lock-screen");
function setLock(value){state.locked=value;lockEl.hidden=!value;$("#mac-shell").inert=value;$("#iphone-shell").inert=value;
 try{if(value)sessionStorage.removeItem("deon-unlocked");else sessionStorage.setItem("deon-unlocked","yes")}catch{}
}
function unlock(dest){if(!state.locked)return;lockEl.classList.add("unlocking");setTimeout(()=>{lockEl.classList.remove("unlocking");lockEl.style.removeProperty("--drag-y");lockEl.style.removeProperty("--drag-opacity");setLock(false);if(dest)open(dest.app,dest.id);},410)}
$("#unlock").addEventListener("click",()=>unlock());
$$("[data-unlock-app],[data-unlock-project]").forEach(b=>b.addEventListener("click",()=>{if(Date.now()-state.preventClick>520)unlock({app:b.dataset.unlockProject?"project":b.dataset.unlockApp,id:b.dataset.unlockProject})}));
const start=(x,y,kind)=>{if(state.locked)state.gesture={x,y,kind,at:performance.now()}};
const move=(x,y,prevent)=>{const g=state.gesture;if(!g||!state.locked)return;const dy=y-g.y;if(dy< -10&&-dy>Math.abs(x-g.x)*.8){lockEl.style.setProperty("--drag-y",Math.max(-55,dy*.33)+"px");lockEl.style.setProperty("--drag-opacity",Math.max(.62,1+dy/380));if(prevent)prevent()}};
const finish=(x,y)=>{const g=state.gesture;state.gesture=null;if(!g||!state.locked)return;const dy=g.y-y,dx=Math.abs(x-g.x);if((dy>65||dy>40&&performance.now()-g.at<300)&&dy>dx*1.1){state.preventClick=Date.now();unlock()}else{lockEl.style.removeProperty("--drag-y");lockEl.style.removeProperty("--drag-opacity")}};
lockEl.addEventListener("pointerdown",e=>{if(e.pointerType!=="touch"&&e.button===0)start(e.clientX,e.clientY,"pointer")},true);
window.addEventListener("pointermove",e=>{if(state.gesture?.kind==="pointer")move(e.clientX,e.clientY)},true);
window.addEventListener("pointerup",e=>{if(state.gesture?.kind==="pointer")finish(e.clientX,e.clientY)},true);
lockEl.addEventListener("touchstart",e=>{const t=e.changedTouches[0];if(t)start(t.clientX,t.clientY,"touch")},{capture:true,passive:true});
lockEl.addEventListener("touchmove",e=>{const t=e.changedTouches[0];if(t&&state.gesture?.kind==="touch")move(t.clientX,t.clientY,()=>{if(e.cancelable)e.preventDefault()})},{capture:true,passive:false});
window.addEventListener("touchend",e=>{const t=e.changedTouches[0];if(t&&state.gesture?.kind==="touch")finish(t.clientX,t.clientY)},true);
window.addEventListener("touchcancel",()=>{state.gesture=null;lockEl.style.removeProperty("--drag-y")},true);
let wheel=0,wheelAt=0;lockEl.addEventListener("wheel",e=>{if(e.cancelable)e.preventDefault();if(performance.now()-wheelAt>400)wheel=0;wheelAt=performance.now();wheel=Math.max(0,wheel+e.deltaY);if(wheel>100){wheel=0;unlock()}},{passive:false});
const tabs=()=>[["case","The Case"],["engineering","Engineering"],["proof","Proof + Limits"]].map(([k,v])=>'<button data-tab="'+k+'" class="'+(state.tab===k?'selected':'')+'">'+v+'</button>').join("");
function caseView(p){if(!p)return "<p>Not found.</p>";
 const body=state.tab==="case"?'<h3>THE PROBLEM</h3><p>'+esc(p.challenge)+'</p><h3>MY CONTRIBUTION</h3><p>'+esc(p.contribution)+'</p>':state.tab==="engineering"?'<h3>IMPLEMENTATION</h3><ul>'+p.engineering.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':'<h3>VERIFIED EVIDENCE</h3><p>'+esc(p.proof)+'</p><h3>LIMITS AND READINESS</h3><p>'+esc(p.limits)+'</p>';
 const urls=link(p.website,"Product website")+link(p.demo,"Interactive demo")+link(p.link,p.linkLabel||"Engineering case");
 return '<article class="case-pane"><span class="case-overline">'+esc(p.scope)+' / '+esc(p.stage)+'</span><h2>'+esc(p.name)+'</h2><p class="case-lede">'+esc(p.summary)+'</p><div class="case-hero">'+(p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+' public illustration" onerror="this.remove()" loading="lazy">':'')+'<span>'+esc(p.name)+'</span></div><div class="case-facts">'+p.facts.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div><nav class="case-tabs">'+tabs()+'</nav><div class="case-text">'+body+'</div>'+(urls?'<div class="case-links">'+urls+'</div>':'<p class="private-note">Private source · No public code link available</p>')+'</article>';
}
function fileRows(ids){return ids.map(id=>byID[id]).filter(Boolean).map(p=>'<button data-project="'+p.id+'" class="file-row '+(state.project===p.id?'selected':'')+'"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="./icons.svg#document"></use></svg><span><strong>'+esc(p.name)+'</strong><small>'+esc(p.scope)+' · '+esc(p.stage.split(" / ")[0])+'</small></span></button>').join("")}
function finder(){
 if(mobile())return '<div class="app-doc"><span class="overline">FILES / ENGINEERING WORK</span><h2>Projects</h2><p>Explore 21 engineering case files, from real client delivery to local agent runtimes.</p><div class="finder-list">'+fileRows(sets.all)+'</div></div>';
 const cats=[["featured","Favorites"],["delivery","Client delivery"],["ai","AI systems"],["products","Products"],["research","Research"],["all","All projects"]];
 return '<div class="finder-layout"><aside class="finder-sidebar"><p class="finder-group">Favorites</p>'+cats.map(([k,v])=>'<button data-group="'+k+'" class="finder-side-button '+(state.group===k?'selected':'')+'"><svg viewBox="0 0 64 64"><use href="./icons.svg#folder"></use></svg>'+v+'</button>').join("")+'</aside><div class="finder-main"><header class="finder-top"><h2>'+esc(cats.find(x=>x[0]===state.group)[1])+'</h2><span>'+sets[state.group].length+' files</span></header><div class="finder-split"><div class="finder-list">'+fileRows(sets[state.group])+'</div>'+caseView(byID[state.project])+'</div></div></div>';
}
function documentView(name,heading,content){return '<div class="app-doc"><span class="overline">'+name+'</span><h2>'+heading+'</h2><div class="app-paper">'+content+'</div></div>'}
function notes(){return documentView("NOTES / MY APPROACH","Notes to self.",'<p><strong>Models propose. Systems authorize.</strong> Business state needs deterministic boundaries.</p><p><strong>The difficult part begins beyond the demo.</strong> Error handling, permissions, retries, and integrations are product features.</p><p><strong>Keep the receipts.</strong> Idempotency, provenance, evaluation, and rollback should be inspectable.</p><p><strong>Make it useful.</strong> Software matters when people can actually use it.</p><p>— Deon</p>')}
function readme(){return documentView("READ ME FIRST / RECRUITERS","Hey, I am Deon.",'<p><strong>Applied AI and Software Engineer in Singapore.</strong> I build systems beyond model prompts.</p><p><strong>Mirai:</strong> Founder and lead engineer of a multi-tenant AI operating platform, with governed tools, services and evaluations.</p><p><strong>Amelia Bot:</strong> Real client staff use the Telegram/document workflow. The new version is staged behind 69 shadow tests, not falsely claimed deployed.</p><p><strong>Engineering range:</strong> Swift and Metal, Rust local-first memory, Python, TypeScript, PostgreSQL, Redis, React, and developer tooling.</p><p>My case studies distinguish what is shipped, internally evaluated, and experimental.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","Get in touch")+link("https://github.com/joyboy257","View code")+'</div>'}
function photos(){return '<div class="app-doc"><span class="overline">PHOTOS / SELECTED WORK</span><h2>Work, in pictures.</h2><p>Public project imagery and sanitized systems diagrams.</p><div class="photo-grid">'+projects.filter(p=>p.image).slice(0,11).map(p=>'<button data-project="'+p.id+'"><img src="'+esc(p.image)+'" alt="'+esc(p.name)+' screenshot" loading="lazy" onerror="this.style.display=\'none\'"><span>'+esc(p.name)+'</span></button>').join("")+'</div></div>'}
function browser(){const destinations=[["https://usemirai.app/","Mirai","Product website"],["https://usemirai.app/demo","Mirai demo","Product demo"],["https://github.com/joyboy257/mirai-showcase","Architecture","Engineering case"],["https://github.com/joyboy257","GitHub","Public code"],["https://www.linkedin.com/in/deonquek","LinkedIn","Get in touch"]];return '<div class="app-doc"><span class="overline">SAFARI / FAVORITES</span><h2>Favorites</h2><p>Explore the products and engineering evidence.</p><div class="app-links">'+destinations.map(([u,n,d])=>'<a target="_blank" rel="noopener noreferrer" href="'+u+'">'+n+' ↗<span>'+d+'</span></a>').join("")+'</div></div>'}
function about(){return documentView("ABOUT THIS MAC / OWNER","Deon Quek",'<p>AI and software engineer based in Singapore. I work across systems design, product engineering, agents, native apps, and real integrations.</p><p>Founder and lead engineer of Mirai, plus production client automation, research software, and developer tools.</p><p>Python · TypeScript · PostgreSQL · React · Rust · Swift · Metal · Redis · Docker · MCP.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","LinkedIn")+link("https://github.com/joyboy257","GitHub")+'</div>'}
function content(){if(state.app==="finder")return finder();if(state.app==="project")return caseView(byID[state.project]);if(state.app==="notes")return notes();if(state.app==="photos")return photos();if(state.app==="browser")return browser();if(state.app==="calendar")return readme();if(state.app==="about")return about();if(state.app==="contact")return documentView("CONTACT / SINGAPORE","Let us talk.",'<p>Interested in Applied AI, Forward-Deployed Engineering, and Software Engineering.</p>')+'<div class="case-links">'+link("https://www.linkedin.com/in/deonquek","Connect")+'</div>';if(state.app==="terminal")return '<div class="terminal-panel"><p>deon@macbook ~ % whoami</p><p class="term-green">Deon Quek · Applied AI & Software Engineer</p><p>Try opening a project through Finder or Spotlight (⌘K).</p></div>';return finder()}
const title=()=>({finder:"Finder",project:byID[state.project]?.name,notes:"Notes",photos:"Photos",browser:"Safari",calendar:"Calendar",about:"About",contact:"Contact",terminal:"Terminal"})[state.app]||"Finder";
function render(){if(mobile()){const pane=$("#phone-app");pane.hidden=false;$("#phone-app-name").textContent=title();$("#phone-app-body").innerHTML=content();$("#phone-app-body").scrollTop=0;}else{const w=$("#mac-window");w.hidden=false;w.classList.remove("minimized");$("#mac-window-name").textContent=title();$("#active-app-name").textContent=title();$("#mac-window-content").innerHTML=content();}}
function open(app,id){if(state.locked){unlock({app,id});return;}if(mobile()&&!$("#phone-app").hidden)state.stack.push([state.app,state.project]);state.app=app;state.project=id||state.project;state.tab="case";render();if(id&&byID[id]){const url=new URL(location.href);url.searchParams.set("project",id);history.replaceState(null,"",url);}}
function close(){state.app="";state.stack=[];$("#phone-app").hidden=true;$("#mac-window").hidden=true;$("#mac-window").classList.remove("minimized");const url=new URL(location.href);url.searchParams.delete("project");history.replaceState(null,"",url);}
function back(){if(state.stack.length){const [app,id]=state.stack.pop();state.app=app;state.project=id;state.tab="case";render()}else close()}
const matches=q=>projects.filter(p=>[p.name,p.summary,p.scope,p.tags.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase())).slice(0,12);
function searching(q){$("#search-results").innerHTML=matches(q).map(p=>'<button class="search-result" data-project="'+p.id+'"><svg viewBox="0 0 64 64"><use href="./icons.svg#document"></use></svg><span><strong>'+esc(p.name)+'</strong><small>'+esc(p.summary.slice(0,90))+'</small></span></button>').join("")||'<p>No results.</p>'}
function search(){if(state.locked)return;$("#spotlight").hidden=false;$("#spotlight-input").value="";searching("");$("#spotlight-input").focus()}
function endSearch(){$("#spotlight").hidden=true}
$("#desktop-search").addEventListener("click",search);
$("#spotlight-input").addEventListener("input",e=>searching(e.target.value));
$("#spotlight-close").addEventListener("click",endSearch);
$("#spotlight").addEventListener("click",e=>{if(e.target===$("#spotlight"))endSearch()});
$("#mac-close").addEventListener("click",close);
$("#mac-min").addEventListener("click",()=>$("#mac-window").classList.add("minimized"));
$("#mac-full").addEventListener("click",()=>$("#mac-window").classList.toggle("maximized"));
$("#phone-back").addEventListener("click",back);
$("#phone-home").addEventListener("click",close);
$("#home-indicator").addEventListener("click",close);
document.addEventListener("click",e=>{
 const t=e.target.closest("[data-tab]");if(t){state.tab=t.dataset.tab;render();return}
 const g=e.target.closest("[data-group]");if(g){state.group=g.dataset.group;state.project=sets[state.group][0];render();return}
 const p=e.target.closest("[data-project]");if(p){endSearch();open("project",p.dataset.project);return}
 const a=e.target.closest("[data-app]");if(a){open(a.dataset.app,a.dataset.project);return}
});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search();return}if(e.key==="Escape"){if(!$("#spotlight").hidden)endSearch();else if(mobile())back();else close()}if(state.locked&&["ArrowUp","PageUp"].includes(e.key)){e.preventDefault();unlock()}});
/* Desktop draggable title bar */
$("#mac-window-drag").addEventListener("pointerdown",e=>{
 if(mobile()||e.target.closest("button")||$("#mac-window").classList.contains("maximized"))return;
 const rect=$("#mac-window").getBoundingClientRect();state.drag={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top};e.currentTarget.setPointerCapture(e.pointerId);
});
$("#mac-window-drag").addEventListener("pointermove",e=>{if(!state.drag)return;const w=$("#mac-window");w.style.transform="none";w.style.left=Math.max(0,Math.min(innerWidth-130,state.drag.left+e.clientX-state.drag.x))+"px";w.style.top=Math.max(31,Math.min(innerHeight-100,state.drag.top+e.clientY-state.drag.y))+"px"});
$("#mac-window-drag").addEventListener("pointerup",()=>state.drag=null);
$("#mac-window-drag").addEventListener("pointercancel",()=>state.drag=null);
/* Mobile home swipe and edge-back */
$("#iphone-shell").addEventListener("touchstart",e=>{if(state.locked)return;const t=e.changedTouches[0];state.phoneGesture=t?{x:t.clientX,y:t.clientY,mode:t.clientX<22?"back":t.clientY>innerHeight-58?"home":""}:null},{passive:true});
$("#iphone-shell").addEventListener("touchend",e=>{const g=state.phoneGesture,t=e.changedTouches[0];state.phoneGesture=null;if(!g||!t)return;if(g.mode==="back"&&t.clientX-g.x>70&&Math.abs(t.clientY-g.y)<75)back();if(g.mode==="home"&&g.y-t.clientY>55)close()},{passive:true});
const request=new URLSearchParams(location.search).get("project");
let seen=false;try{seen=sessionStorage.getItem("deon-unlocked")==="yes"}catch{}
if(seen||request&&byID[request]){setLock(false);if(request&&byID[request])open("project",request)}else setLock(true);
