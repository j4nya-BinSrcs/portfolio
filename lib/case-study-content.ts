export const dirstudioCaseStudy = `# DirStudio — Case Study

> A full-stack directory intelligence platform: analyze, organize, and optimize your filesystem.

---

## 01 — Overview

**DirStudio** is a local-first, full-stack application for filesystem intelligence. It scans directories, extracts rich file metadata, detects exact and near-duplicate files, visualizes storage composition, and leverages a Large Language Model (Mistral AI via LangChain) to suggest smarter folder organizations. It also provides safe, dry-run-capable file transformations (compress, convert, resize, move, copy, delete).

The project is built as two cooperating components:

| Component | Stack | Role |
|---|---|---|
| **Backend** (\`dirstudio/server/\`) | Python 3.13, FastAPI, SQLAlchemy (SQLite), LangChain + Mistral AI | Scanning, hashing, metadata extraction, duplicate detection, AI organization, file transforms, REST API |
| **Frontend** (\`dirstudio/client/\`) | Vanilla JavaScript, Bootstrap 5, Chart.js | Interactive dashboard — home screen, overview analytics, filesystem tree, duplicates/AI organize, transforms |

There is no cloud component and no external file uploads: every byte of file content stays on the user's machine. Only file names, types, sizes, and structure are optionally shared with Mistral for the AI organizing feature.

> **Status:** actively developed. The live local instance currently holds **8 completed scans**, indexing **7,897 files** and **~10.6 GB** of storage, with **5,025 duplicate groups** detected.

---

## 02 — The Problem

Managing files at scale becomes messy, inefficient, and error-prone. Common pain points the project set out to solve:

1. **Storage is opaque.** Users rarely know *what* is consuming their disk — which file types dominate, which directories are bloated, and how deep their folder trees actually go.
2. **Duplicates silently waste space.** Copies scattered across \`Downloads/\`, backups, and sync folders accumulate without any way to see the total reclaimable storage.
3. **Organization is manual and subjective.** Deciding where a file "should" live is tedious, and established tools don't help propose structure — they only execute what the user already decided.
4. **Bulk file operations are risky and slow.** Moving, converting, or compressing many files by hand is error-prone, with no "dry run" safety net.
5. **Existing solutions are either too simple or too heavy.** Duplicate finders solve one narrow problem; full DLP/cloud suites are overkill and raise privacy concerns.

The project therefore needed a **single, local-first tool** that combines analytics, duplicate detection, AI-assisted organization, and safe batch transforms behind one clean interface.

---

## 03 — Goals

### Product goals
- **G1 — Insight:** Provide instant, visual answers to "what's in this folder, and how much space does it use?"
- **G2 — Recovery:** Identify exact and near-duplicate files and quantify the storage they waste.
- **G3 — Intelligence:** Use AI to propose folder structures instead of relying purely on user judgement.
- **G4 — Safety:** Allow destructive operations (delete, move) only with explicit, dry-run-first confirmation.
- **G5 — Simplicity:** No build step for the frontend, one-command launch, and a clean tab-based UX.

### Engineering goals
- **E1 — Speed:** Parallelize file processing so large directories don't take linear wall-clock time.
- **E2 — Correctness:** Streaming hashing for large files; consistent, reproducible results.
- **E3 — Persistence:** Survive server restarts instead of living only in memory.
- **E4 — Extensibility:** A modular service/core/API layout so features can be added without rewrites.
- **E5 — Privacy:** Keep processing local; send only metadata to the AI layer when requested.

---

## 04 — Architecture

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│  Frontend (Vanilla JS + Bootstrap + Chart.js)                │
│  Home · Overview · Tree · Organize · Transform               │
│  Fetch (REST/JSON) → http://localhost:8000/api               │
└──────────────────────────────┬───────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│  Backend — FastAPI (uvicorn, port 8000)                      │
│                                                              │
│  api/         endpoints.py  (routes)      models.py (Pydantic)│
│  services/    scan · duplicate · transform · organize        │
│               hash · snapshot                                │
│  core/        filesystem (tree) · metadata · processor       │
│  db/          schema (ORM) · crud · database (SQLite)        │
└───────────────┬──────────────────────────┬───────────────────┘
                │                          │
    ┌───────────▼───────────┐   ┌──────────▼──────────────┐
    │ Local filesystem       │   │ SQLite (dirstudio.db)   │
    │ (read + safe writes)   │   │ scans · files ·         │
    │                        │   │ duplicate_groups        │
    └────────────────────────┘   └─────────────────────────┘
                │
    ┌───────────▼──────────────────────────────────────────┐
    │ AI layer — LangChain + Mistral (optional, metadata   │
    │ only; requires MISTRAL_API_KEY)                      │
    └──────────────────────────────────────────────────────┘
\`\`\`

### Data flow (a scan lifecycle)

1. **Frontend** collects a directory path (drag-drop, folder picker, or typed prompt) and \`POST /api/scans\`.
2. **Backend** validates the path, inserts a \`pending\` scan row, and enqueues the work as a FastAPI **background task**, returning the \`scan_id\` immediately.
3. The background task marks the scan \`running\`, then runs \`Scanner.scan()\`:
   - \`os.scandir\` recursive walk with exclusion patterns (\`.git\`, \`node_modules\`, \`.venv\`, etc.) and permission-error tolerance.
   - A queue of file paths is drained by a **threaded \`ProcessorPool\`** that extracts metadata and computes hashes in parallel.
4. Workers attach results to a shared \`FilesystemTree\` under a lock; the tree is then serialized (\`tree_json\`) and persisted to SQLite along with aggregate stats and per-file rows.
5. The frontend polls \`GET /api/scans/{id}\` (2s interval) until \`completed\`, then loads all tab data.
6. \`GET /api/scans/{id}/overview\` returns stats for charts; \`GET /api/scans/{id}/duplicates\` runs on-the-fly duplicate detection and persists groups; \`GET /api/scans/{id}/organize\` invokes Mistral; \`POST /api/scans/{id}/transform\` performs batch operations.

### Key API surface (all under \`/api\`)

| Method | Path | Purpose |
|---|---|---|
| \`POST\` | \`/scans\` | Start a scan (background task) |
| \`GET\` | \`/scans\` | List scans |
| \`GET\` | \`/scans/{id}\` | Scan status/progress |
| \`GET\` | \`/scans/{id}/overview\` | Aggregate stats + top extensions |
| \`GET\` | \`/scans/{id}/tree\` | Full serialized filesystem tree |
| \`GET\` | \`/scans/{id}/duplicates\` | Exact + near-duplicate groups |
| \`GET\` | \`/scans/{id}/organize\` | AI organization suggestions (Mistral) |
| \`POST\` | \`/scans/{id}/transform\` | compress/convert/resize/move/copy/delete |
| \`DELETE\` | \`/scans/{id}\` | Delete scan (cascades) |
| \`GET\` | \`/stats\` | Global aggregate stats |
| \`GET\` | \`/health\`, \`/\` | Liveness / API root |

---

## 05 — Engineering Decisions

### D1 — Separate server and client, no frontend build step
The frontend is **static HTML/CSS/JS** with no bundler or framework. Reusable fragments (header, sidebar, page templates) are fetched at runtime and injected by a tiny \`Loader\` module; each page is a plain-JS IIFE exposing a global (e.g. \`OverviewPage\`, \`HomePage\`). This keeps tooling minimal (any static file server works) and matches the "local, low-friction" goal. The trade-off — no type-checking or tree-shaking — is accepted in exchange for zero build complexity.

### D2 — Component-loader over a router
Navigation is **Bootstrap tabs** rather than a URL router. Each tab maps to a loaded page fragment; \`Loader\` fetches all shell + page HTML on boot and fires an \`onAppReady\` callback that each controller uses to wire DOM listeners. A \`Store\` (small observable state) and an \`API\` client module centralize shared state and backend calls. This made adding a **Home tab** a five-step, pattern-consistent change (fragment → controller → loader registry → tab in \`index.html\` → \`app.js\` wiring).

### D3 — Threaded worker pool for file processing
Hashing and metadata extraction are CPU/IO-bound, so the scanner feeds a \`queue.Queue\` to \`ProcessorPool\` of \`n\` worker threads. Results attach to the shared \`FilesystemTree\` under a \`threading.Lock\`. This decouples walking from processing and lets the pool saturate on large directories.

### D4 — Streaming SHA-256 + perceptual hashing
SHA-256 is computed in **8 KB chunks** (\`config.SHA256_CHUNK_SIZE\`) so multi-GB files don't load into memory. \`imagehash\` pHash (64-bit) is computed only for image files; a Hamming-distance threshold decides "near-duplicate" images. A \`BKTree\` implementation exists for scalable similarity search.

### D5 — Persistence via SQLAlchemy + serialized tree
The \`FilesystemTree\` is stored in SQLite both structurally (scans, files, duplicate_groups tables) and as a serialized \`tree_json\` blob. Aggregate stats (\`total_files\`, \`total_size\`, \`tree_depth\`) live on the \`scans\` row so global stats and lists don't need to re-parse the tree. \`GET /api/stats\` reads these precomputed columns.

### D6 — Background tasks + polling over WebSockets
Scans run as **FastAPI \`BackgroundTasks\`** so \`POST /scans\` returns instantly. The frontend **polls** status every 2 s as a pragmatic fallback (a WebSocket endpoint is designed but not implemented).

### D7 — Safe-by-default transforms
Every file operation (\`Transformer\`) supports \`dry_run\`, returns per-file \`TransformResult\` objects, and only executes on explicit user confirmation. Images convert RGBA→RGB before JPEG saves; resize uses LANCZOS; zip/tar compress with deflate/gzip.

### D8 — Two scan zones, one wiring path
The scan zone lives both in the **sidebar** (visible on working tabs) and on the **Home** screen. Instead of duplicating logic, \`Scanner\` holds a \`ZONES\` registry and wires each zone (ids, drag-drop, browse, path prompt) through the same \`_wireZone\` function.

### D9 — Cross-platform launch
\`launch.sh\` (Linux/macOS) and \`launch.bat\` (Windows) start the static server + uvicorn and open the browser with one command; \`uv\` manages the Python environment.

### D10 — Platform-scoped dependencies
\`python-magic-bin\` ships wheels **only for Windows/macOS**; on Linux \`python-magic\` uses the system \`libmagic\`. The dependency is scoped with \`sys_platform\` markers in \`pyproject.toml\` so \`uv sync\` works everywhere.

---

## 06 — Implementation

### Frontend structure
\`\`\`
client/
├── index.html              # Shell: header/sidebar/footer containers + tabs
├── components/             # Injected fragments (header, sidebar, page-*.html)
├── css/                    # base (tokens) · layout (shell) · components · pages
└── js/
    ├── app.js              # Bootstrap: Loader → theme → controllers → Scanner
    ├── modules/            # utils · api · loader · store · scanner
    └── pages/              # home · overview · tree · organize · transform
\`\`\`

Notable frontend pieces:

- **Home tab** (default landing): a *New Scan* zone beside a *Scan Stats* panel (global totals), plus *Recent Scans* (click to load a scan) and *Explore* shortcuts to the other tabs. The sidebar **collapses** on this tab (\`.no-sidebar\` layout class toggled on \`shown.bs.tab\`).
- **Overview tab**: stat cards, a Chart.js doughnut of file categories, a top-5 extension bar list, and a scan details card.
- **Tree tab**: recursive, expandable directory tree with a metadata preview panel; tree state is shared via \`Store\` for the transform modals.
- **Organize tab**: duplicate groups (bulk select / clean) and AI suggestion cards.
- **Transform tab**: modals for compress, convert, resize (file selection reuses the tree builder), with per-file results rendered in a table.

### Backend structure
\`\`\`
server/src/
├── main.py                 # CLI mode + --server entrypoint (.env loading)
├── config.py               # Constants: excludes, thresholds, hashing, DB URL
├── api/                    # FastAPI app, router, Pydantic models, endpoints
├── core/                   # filesystem (FileNode/DirNode/Tree), metadata, processor
├── db/                     # schema (ORM), crud, database (engine/session)
└── services/               # scan, duplicate, transform, organize, hash, snapshot
\`\`\`

Notable backend pieces:

- **\`FilesystemTree\`** — a nested \`DirNode\`/\`FileNode\` model with BFS \`traverse()\`, \`query_dir()\`, \`compute_stats()\`, merge support, and full \`to_dict\`/\`from_dict\` (de)serialization.
- **\`Metadata\`** — a frozen \`@slots\` dataclass extracted via \`stat\`, \`mimetypes\`, and optional \`python-magic\`; classifies files into \`FileType\` enums (image, video, audio, document, code, archive, …).
- **\`DuplicateDetector\`** — SHA-256 indexed exact duplicates + pHash near-duplicates; each \`DuplicateGroup\` tracks \`total_size\`, \`wastage\`, and a "representative" file.
- **\`AIOrganizer\`** — compacts the tree (depth ≤ 5, capped children) into JSON, sends it with a strict JSON-response system prompt to \`ChatMistralAI\`, then parses suggestions (\`target_path\`, \`reason\`, \`files\`, \`confidence\`).
- **\`Transformer\`** — zip/tar compression, PIL image convert/resize, move/copy/delete, all with dry-run support and per-file result reporting.
- **\`endpoints.py\`** — 10+ routes with validation, \`HTTPException\` error patterns, and a \`perform_scan_task\` background worker.

### Persistence schema
- **\`scans\`** — \`scan_id\` (UUID, unique), \`path\`, \`status\`, \`total_files\`, \`total_dirs\`, \`total_size\`, \`tree_depth\`, \`tree_json\`, \`error\`.
- **\`files\`** — \`scan_id\` FK (cascade), \`path\`, \`name\`, \`extension\`, \`size\`, \`mime_type\`, \`file_type\`, \`sha256\`, \`phash\`, \`duplicate_group_id\`.
- **\`duplicate_groups\`** — \`scan_id\` FK, \`group_id\`, \`duplicate_type\` (\`exact\`/\`near\`), \`file_count\`, \`total_size\`, \`wastage\`.

---

## 07 — Challenges & Solutions

### C1 — Cross-platform install failure (\`python-magic-bin\`)
\`uv sync\` failed on Linux because \`python-magic-bin==0.4.14\` has **no Linux wheel**, while it's redundant on Linux anyway (\`python-magic\` binds the system \`libmagic\`).
**Solution:** scoped the dependency with \`sys_platform == 'win32' or sys_platform == 'darwin'\` in \`pyproject.toml\`; verified \`libmagic.so\` was present. Install now succeeds everywhere.

### C2 — Browser sandbox blocks real directory paths
\`<input webkitdirectory>\` reveals a virtual relative path, so the backend can't scan the real directory.
**Solution:** the folder picker uses the relative root to **pre-fill a confirm prompt**, letting the user complete/confirm the absolute path before the scan starts; a typed-path prompt remains the primary input.

### C3 — Duplicate DOM ids between the sidebar and Home scan zones
Adding a second scan zone on the Home page with the same ids (\`#uploadZone\`, …) would make \`getElementById\` hit the hidden sidebar copy.
**Solution:** a \`ZONES\` registry in \`Scanner\` maps each zone to its own id set, and \`_wireZone\` is driven by that config — one wiring path, no duplicated logic.

### C4 — "Appearing" sidebar that shouldn't exist on Home
The sidebar scan zone is redundant when the Home page already owns the New Scan experience.
**Solution:** app.js toggles \`.no-sidebar\` on \`.main-container\` from \`shown.bs.tab\` events (plus an initial call), and CSS transitions the sidebar to \`width: 0; opacity: 0\`. The content area expands full-width on Home and the sidebar returns on the working tabs.

### C5 — No real-time progress
The scan runs in a background task, so the frontend can't observe live progress; large directories looked frozen.
**Solution:** pragmatic 2-second **polling** of \`GET /api/scans/{id}\` with a fallback; a WebSocket endpoint is designed as the next step.

### C6 — Fabricated timestamps / unordered scan lists
The \`scans\` table has **no timestamp columns**; the API fabricates \`created_at\`/\`completed_at\` at response time, so "recent" sorting is meaningless and \`GET /api/scans\` has no \`ORDER BY\`.
**Solution:** ordering is done client-side by the (best-effort) timestamp for now; the durable fix is adding real timestamp columns to the schema (see What's Next).

### C7 — Stale documentation vs. live API
\`docs/api.md\` documents an older surface (\`POST /scan\`, \`GET /overview/{id}\`) that doesn't match the running routes (\`/api/scans/...\`).
**Solution:** the case study and live code are the source of truth; doc regeneration is on the roadmap.

### C8 — Big-directory performance
Walking + hashing tens of thousands of files serially is slow.
**Solution:** a \`ProcessorPool\` of worker threads consumes a bounded queue; SHA-256 streams in chunks; exclusions prune junk trees early. Depth limits and worker counts are configurable via the API.

### C9 — LLM response reliability
Mistral can return markdown-wrapped or malformed JSON; overly deep trees can blow token limits.
**Solution:** a strict JSON-only system prompt, defensive JSON extraction (\`find('{')\` → \`rfind('}')\`), capped tree depth (≤ 5) and child counts (50 files / 20 subdirs per node), and graceful empty-suggestion fallback on parse failure.

### C10 — Safe destructive operations
Deleting/moving user files from a web UI is high-risk.
**Solution:** dry-run-first design, explicit confirmation buttons, per-file \`TransformResult\` reporting, and representative-file selection logic that prefers the most recently modified copy.

---

## 08 — Performance / Results

Measured on the live local instance (sample directories; 8 completed scans):

| Metric | Value |
|---|---|
| Completed scans | 8 |
| Files indexed | 7,897 |
| Total storage analyzed | ~10.6 GB (≈9.89 GiB) |
| Duplicate groups detected (all scans) | 5,025 |

### What works well
- **Scan pipeline** completes reliably on the sample corpus, from \`POST /scans\` → background task → persisted tree/stats → frontend render.
- **Duplicate detection** scales because SHA-256 indexing is a dict lookup; near-duplicate grouping uses Hamming distance against the pHash index.
- **Global stats** (\`GET /api/stats\`) are near-instant since they read precomputed \`scans\` columns rather than re-parsing trees.
- **Frontend** stays responsive thanks to polling for status and lazy tab rendering; the Home dashboard renders global stats and recent scans from two cheap endpoints.

### Known performance caveats
- Near-duplicate detection is currently O(n²) over distinct pHashes — fine for image sets, but the \`BKTree\` path is the intended O(n log n) improvement.
- Very large directories (50k+ files) are still IO/CPU bound; worker count is configurable but not yet adaptive.
- No incremental scanning: every re-scan re-walks and re-hashes everything.

---

## 09 — What I Learned

1. **Structure enables feature velocity.** The component-loader + page-controller pattern meant adding a full Home dashboard was a mechanical, low-risk change — the design pays for itself on the first new tab.
2. **"Local-first" is a real constraint set.** Browser path sandboxing, cross-platform wheels, and filesystem permission handling each forced concrete design decisions that a pure web app wouldn't hit.
3. **Parallelism needs a shared-structure strategy.** A queue + worker threads + a lock-protected tree was simple and effective; the same shape generalizes to any batch processing.
4. **Safety UX is an engineering feature, not an afterthought.** Dry-run modes and per-file results made destructive operations usable and trustworthy.
5. **Persistence and reporting feed each other.** Keeping aggregate columns on the scan row made stats endpoints trivial and cheap.
6. **API design degrades quickly without discipline.** The stale docs vs. live-route mismatch is a reminder that endpoints and their documentation must evolve together.
7. **Small, consistent CSS tokens beat one-off styling.** Reusing the design-token system (surfaces, text, borders, gradients) kept a growing UI visually coherent across light/dark themes.
8. **Polling-first is a legitimate MVP choice.** WebSockets are nicer, but 2-second polling shipped the feature and left a clean upgrade path.

---

## 10 — What's Next

### Near-term
- [ ] **Real scan timestamps + ordered lists** — add \`created_at\`/\`completed_at\` columns and \`ORDER BY id DESC\` so "recent scans" is meaningful.
- [ ] **WebSocket scan progress** — stream status/progress instead of polling.
- [ ] **Wire \`BKTree\` into near-duplicate detection** — replace the O(n²) scan for large image sets.
- [ ] **Expand the test suite** — current tests cover the scan→process→hash→tree pipeline; add endpoint integration, duplicate grouping, and transform (dry-run vs. real) coverage.
- [ ] **Refresh \`docs/api.md\`** to match the live \`/api/scans/...\` surface.

### Medium-term
- [ ] **Incremental/diff-based scanning** — only process changed files on re-scan.
- [ ] **Snapshot & rollback** — the \`snapshot.py\` service exists; wire it to the API for safe undo of transforms.
- [ ] **Advanced filtering** — filter scans by size/date/type in the UI.
- [ ] **File previews** — image thumbnails and PDF first-page previews.
- [ ] **Export reports** — CSV/JSON/PDF export of scan and duplicate reports.

### Longer-term
- [ ] **Semantic similarity search** — embedding vectors with pgvector/FAISS.
- [ ] **Cloud connectors** — scan S3/Drive alongside local directories.
- [ ] **Scheduled scans** — background scanning on a schedule.
- [ ] **Multi-user / auth** — currently local-only; add authentication before any external exposure.

---

*Case study generated from the DirStudio codebase — frontend, backend, database schema, tests, and live API behavior.*`;
export const qwryCaseStudy = `# QWRY — Self-Hosted Search & Research Engine

A portfolio case study of building a private, AI-assisted web research platform.

---

## 01 · Overview

QWRY is a self-hosted search and research engine that gives a single user a complete
"search → collect → read → synthesize → organize" pipeline — without relying on a third-party
search API or sending queries to a cloud provider.

Search the open web, pull results into persistent **workspaces**, annotate them in a
**Station** (reads, highlights, notes, pins, tags, comparisons), lay them out as a visual mind-map
on a **Canvas**, and ask an LLM to summarize, answer, or chat about the collected material. Every
layer runs locally: a React frontend, a FastAPI orchestrator, a Rust crawler + Tantivy indexer,
SearXNG metasearch, Postgres, Valkey, and Ollama.

**Scale of the build (as of v0.1.0)**

| Metric | Value |
|---|---|
| Total code | ~25,000 lines across 3 languages |
| Client (React) | ~12,300 lines |
| Server (Python/FastAPI) | ~6,500 lines |
| Engine (Rust) | ~6,200 lines |
| REST endpoints | 83 |
| Database tables | 25 |
| Commits | 175 |

**Stack**

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Zustand, Tailwind 4, dnd-kit, react-resizable-panels |
| Backend | Python 3.13, FastAPI, SQLAlchemy (async), Alembic |
| Search engine | Rust, Tantivy (BM25), BGE-small embeddings, RRF fusion, cross-encoder rerank |
| Data stores | PostgreSQL, Valkey (Redis-compatible cache), Tantivy on-disk index |
| AI | Ollama (\`gemma3:1b\`) — overviews, summaries, grounded chat |
| Metasearch | SearXNG (Docker) — web, images, videos, news, suggestions |

---

## 02 · The Problem

Mainstream search has three pain points that compound for anyone doing deep research:

1. **You don't own your results.** Results come and go as indexes change; pages get de-indexed,
   paywalled, or redesigned, and the references you collected break over time.
2. **Discovery and synthesis are disconnected.** You search in one tool, clip snippets into notes
   in another, summarize in a third, and never form a coherent research trail.
3. **No private middle ground.** Consumer AI products route your queries and reading history
   through a third-party cloud. Running a *truly* private search stack that combines live web
   results, a personal index, and LLM assistance normally means stitching together several
   unmaintained open-source tools.

The core challenge this project set out to solve: **build a single, self-contained system where a
researcher can search the open web, build a personal, lasting index of what they've read, and use a
local LLM to make sense of it — all without any third-party API keys or cloud dependencies.**

---

## 03 · Goals

1. **Truly self-hosted search.** Live web results (SearXNG) *and* a local, persistent crawl-and-index
   engine (Rust + Tantivy) — with no API keys required.
2. **A research workflow, not just a results page.** Capture results into named workspaces, then
   read, annotate, summarize, compare, and connect sources.
3. **Local, private AI.** LLM overviews, summaries, and chat all served by Ollama on-device.
4. **Unified search UX.** One query should return web results, images, videos, news, suggestions,
   an infobox, and an AI overview in a single coherent interface.
5. **Polite, production-minded crawling.** robots.txt compliance, per-host rate limiting, retries,
   and crash-safe batch indexing.
6. **Good performance where it matters.** Cached search, concurrent provider fan-out, and a fast
   native indexer.
7. **A pleasant interface.** A polished, themeable UI (Catppuccin themes, animated home screen,
   skeleton loading) — this had to feel like a product, not a demo.

---

## 04 · Architecture

QWRY is a four-tier system. The React client talks only to the FastAPI server; the server
orchestrates search across two backends, persists state, and drives the LLM; the Rust engine does
the heavy native work of crawling and indexing.

\`\`\`
flowchart LR
    C[React client :5173] -->|HTTP /api| S[FastAPI server :8000]
    S -->|search / status| E[Rust engine :8001]
    S -->|search| X[SearXNG :8080]
    S --> C1[(Valkey cache :6379)]
    S --> P[(Postgres :5432)]
    S -->|generate / summarize| O[Ollama :11434]
    E --> P
    E --> I[(Tantivy index)]
\`\`\`

### Tiers

- **Client (\`client/\`)** — a React 19 + Vite SPA. No router library: navigation is a single
  \`contextMode\` string in the Zustand \`uiStore\` that swaps between Home, SearchAssist, Workspace,
  Reader, and Summarizer views. A three-pane resizable layout hosts Sources / Context / Discovery
  panels; the Workspace view is itself a Station↔Canvas tab switcher.
- **Server (\`server/\`)** — FastAPI is the orchestrator. It fans search out to SearXNG and/or the
  engine, merges and dedupes results, caches to Valkey, persists to Postgres, and calls Ollama for
  overviews, summaries, and workspace chat. Identity is a client-supplied \`X-Session-Id\` header
  that scopes all history, profiles, and workspace data.
- **Engine (\`engine/\`)** — a Rust workspace of three crates:
  - \`shared\` — Postgres access, batch upserts, brute-force vector search over stored embeddings.
  - \`crawler\` — polite web crawler: robots.txt, per-host \`Crawl-delay\`, retries, batched DB writes,
    optional distributed mode via a Postgres job queue.
  - \`indexer\` — Tantivy indexing, BGE-small embeddings, hybrid search (BM25 + vector with RRF
    fusion), optional cross-encoder reranking, and an Axum HTTP API on :8001.
- **Infra (\`infra/\`)** — Docker Compose for SearXNG + Valkey, plus launch/teardown scripts
  (\`launch.sh\`, \`launch.bat\`, \`shutdown.sh\`) that bootstrap all services in order.

### Lifecycle of a query

\`\`\`
Client → GET /api/search?q=...        FastAPI checks Valkey cache
  (miss) → SearXNG (concurrent) + Engine (concurrent)
          → merge + dedupe by URL → cache for 300s → return
Client → POST /api/llm/generate       Ollama produces a short/elaborate/study overview
Server → log search + save overview   Postgres
\`\`\`

### Crawl → index → search pipeline

\`\`\`
Seeds → Crawler workers (robots.txt, politeness, retries)
      → Postgres crawled_pages (indexed=false)
      → Indexer pulls batches of 500 → shard by URL hash → parallel Tantivy writers
      → commit + mark indexed → embed (BGE-small, 384-dim) → page_embeddings
      → HTTP search API: BM25 | vector | hybrid (RRF fusion) | rerank
\`\`\`

---

## 05 · Engineering Decisions

### Rust for the crawl + index engine

The engine is performance-critical: crawling thousands of pages, parsing HTML, writing to an
inverted index. Rust with \`tokio\` + \`rayon\` gives a native, memory-safe implementation with
predictable performance, and **Tantivy** (a Lucene-style library) provides the BM25 inverted index.
Result: BM25 search with field boosts (title 2.5 / description 1.5 / content 1.0) and generated
snippets.

### Hybrid search with pluggable fusion

Vector-only or keyword-only search both fail in different ways. The engine supports
\`bm25 | vector | hybrid\` modes and two fusion strategies: **RRF** (Reciprocal Rank Fusion, \`k=60\`)
by default, and weighted score fusion when custom \`alpha\`/\`beta\` weights are supplied:

\`\`\`
score(url) = alpha * bm25_norm(url) + beta * vec_norm(url)
\`\`\`

An optional cross-encoder (BGE-reranker-base) re-ranks the top-30 candidates for better precision.

### Sharded index for parallel indexing

The index is split into N shards (power of two), URL-hashed to a shard, so indexing batches can be
written by multiple Tantivy writers in parallel (\`rayon\`). This turned single-threaded indexing
into a scalable pipeline and isolates index write contention.

### Crash-safe indexing

The indexer marks pages \`indexed\` **immediately after the Tantivy commit**, before embeddings are
generated — so a crash during embedding never leaves a page perpetually unindexed. A
\`recover_missing_embeddings\` pass fills embedding gaps left by partial crashes.

### Polite crawling as a first-class feature

Rather than a throwaway scraper, the crawler implements a real web-crawl policy: robots.txt fetched
once per host, per-host \`Crawl-delay\` overrides, connection/redirect/timeout limits, exponential
backoff with error classification, and batched writes (100 rows or 5s) through an mpsc channel to
avoid hammering Postgres.

### Cache-first architecture

Search results, LLM overviews, reader extractions, and summaries are all cached in Valkey with
appropriate TTLs (300s search, 1800s overviews, 3600s reader/summary). The cache degrades
gracefully — if Valkey is down, every operation no-ops and the system keeps working.

### Concurrent hybrid provider merging

The server runs SearXNG and engine queries **concurrently** (\`asyncio.gather\`), then merges and
dedupes by URL. A provider can fail without taking the query down (exceptions are collected, the
surviving provider's results are returned).

### Session-scoped identity (no auth)

For a single-user self-hosted tool, auth adds complexity without benefit. Identity is a client
generated \`X-Session-Id\` stored in localStorage; profiles, history, and workspaces are scoped by it.
This is documented as a deliberate trade-off with a hardening path (the schema keys off
\`session_id\`, so real auth could slot in as middleware).

### Zustand + no router for a fast, fluid SPA

View routing is a single string in the UI store rather than a router library — trivially simple,
keeps the whole app in one state graph, and makes cross-panel actions (e.g. dragging a result
straight into a workspace) trivial to wire up.

---

## 06 · Implementation

### Engine (\`engine/\` — Rust)

- **Crawler** (\`crawler/\`): seed-URL discovery loop with per-domain politeness maps, prefetched
  robots rules, a retry classifier, HTML parsing on a blocking pool, and a \`BatchWriter\` fed by an
  mpsc channel. A \`--distributed\` flag swaps the in-memory queue for a Postgres-backed \`crawl_jobs\`
  table claimed with \`FOR UPDATE SKIP LOCKED\` — so multiple crawler nodes can split the work.
- **Indexer** (\`indexer/\`): \`ShardedIndex\` opens N Tantivy indexes, pulls 500 unindexed pages per
  batch, indexes them in parallel, marks them, then embeds content in batches of 64 with
  BGE-small-en-v1.5 (384-dim). Search (\`GET /search\`) supports \`mode=bm25|vector|hybrid\`,
  \`offset\`/\`limit\`, and \`rerank\`. A \`/status\` endpoint reports index/embedding counts and model
  names for the frontend stats view.

### Server (\`server/\` — Python/FastAPI)

- **83 endpoints** across health, search, stats, LLM, reader, summarizer, workspaces, station
  (reads/highlights/notes/pins/images/videos/tags/comparisons/timeline), canvas, AI responses,
  tasks, profiles, and history.
- **Search orchestration** (\`search_orch.py\`): provider dispatch (\`searxng | engine | hybrid\`),
  cache read/write, and concurrent merge logic.
- **SearXNG client** (\`searxng.py\`): primary engines (Google, DuckDuckGo) with a fallback tier
  (Bing, Wiby) when the primary tier returns nothing, plus retry with backoff and robust duration
  parsing for videos.
- **Content services**: \`ReaderService\` detects content type (article / image / YouTube), extracts
  with \`trafilatura\`, and rejects JS-boilerplate pages; \`Summarizer\` builds content-aware prompts
  for the LLM; \`Chat\` implements stateless RAG over up to 5 workspace items with numbered source
  citations.

### Client (\`client/\` — React)

- **State**: seven Zustand stores (session, ui, search, content, workspace, station, canvas);
  session id and reads/summaries persist to localStorage.
- **Search**: one query fires **5 parallel requests** — results, images, videos, news, and
  suggestions — gated by a monotonically increasing \`searchSeq\` token so stale responses are
  dropped. Results stream into a three-pane layout with category filters and infinite pagination.
- **Capture**: results move into workspaces by drag-and-drop (dnd-kit), a per-card \`+\`, or a
  bulk "transfer all" that dedupes across result sets by URL.
- **Canvas**: a self-contained SVG/HTML mind-map with drag-pan, scroll-zoom toward cursor, node
  connections, multi-select, an inspector, minimap, and fit-to-screen — station objects render as
  rich cards, and notes/comparisons created on the canvas sync back through the station API.
- **Polish**: themeable Catppuccin palettes, animated home background (WebGL/particle), skeleton
  loaders, and a consistent popup/dropdown component system.

---

## 07 · Challenges & Solutions

**Challenge: merging two unrelated search result sets into one coherent list.**
SearXNG and the local engine return different shapes, scores, and qualities.
*Solution:* normalize both into a single \`SearchResultItem\` schema on the server, run them
concurrently, then interleave a two-pointer merge with URL dedup (\`search_orch.py\`) — live results
stay prominent while local index hits fill in what the web misses.

**Challenge: crawling without being abusive or getting blocked.**
*Solution:* made politeness a core requirement, not an afterthought — robots.txt rules cached per
host, per-host \`Crawl-delay\` and last-request tracking, timeouts and redirect limits, exponential
backoff, and a hard \`max_pages\` counter. Commits show successive \`perf\` improvements from early
crawler versions to the final parallel worker pool.

**Challenge: slow indexing and embedding.**
*Solution:* three compounding optimizations — sharded Tantivy writers running in parallel via
\`rayon\`, batching DB reads (500 pages) and embedding (64 chunks), and batch-writing crawled pages
(100 rows or 5s) to stop Postgres from becoming the bottleneck.

**Challenge: crash safety across a long pipeline (crawl → DB → index → embed).**
A crash between indexing and embedding could wedge pages in an unindexed state.
*Solution:* mark pages \`indexed\` immediately after the Tantivy commit, then generate embeddings;
add a recovery pass that re-embeds any indexed-but-embedding-less pages on startup.

**Challenge: JS-heavy pages that yield garbage when scraped.**
*Solution:* the reader detects boilerplate patterns ("enable JavaScript", browser-required pages)
and rejects them; article extraction uses \`trafilatura\`, YouTube falls back to the meta
description, and all reader/summary output is cached to avoid repeat fetches.

**Challenge: distributed crawling without double-visiting pages across nodes.**
The in-memory visited set doesn't share across processes.
*Solution:* a Postgres-backed job queue using \`FOR UPDATE SKIP LOCKED\` claim semantics so workers
don't grab the same row, with \`ON CONFLICT\` handling for re-pushes. (Documented as a known gap:
cross-node dedup is still best-effort.)

**Challenge: LLM latency and cost during interactive search.**
*Solution:* overviews are cached per query (sha256 of query+mode) for 30 minutes; a study-mode
overview reads the top pages before generating, so the heavy work is done once, not per keystroke.

**Challenge: making a search *tool* feel like a *product*.**
*Solution:* invested in the UI layer — theme system, animated backgrounds, skeleton loading,
masonry discovery grid, resizable panes — because a research tool you use daily has to be pleasant,
not just functional.

---

## 08 · Performance / Results

While QWRY is a personal tool rather than a benchmarked service, the architecture produced
measurable wins:

- **Crawl throughput** improved twice during development (a 10% speedup commit followed by a
  parallel worker-pool rewrite), and batched DB writes prevent write-contention stalls.
- **Search latency** is dominated by cache: repeat queries hit Valkey and return instantly;
  first-time hybrid queries fan out concurrently rather than sequentially (two providers in
  parallel, LLM overviews in a separate request).
- **Indexing throughput** scales with shard count — parallel Tantivy writers turn a
  single-threaded bottleneck into an N-way pipeline.
- **Resilience:** a failed provider never fails a query (the other provider's results are
  returned); a dead cache never fails a request; a crash mid-embedding never corrupts the index.
- **Coverage:** one query yields web + local results + images + videos + news + suggestions +
  infobox + an AI overview — eight distinct content streams in a single interface.

**Codebase health indicators:** 83 documented endpoints, 25 relational tables, a 15-document
technical wiki (\`docs/\`) covering architecture, API reference, deployment, security, and
troubleshooting, plus server pytest suites and engine integration tests.

---

## 09 · What I Learned

1. **Polyglot systems are worth the coordination cost.** Rust where speed and safety matter,
   Python where iteration speed matters, React where UX matters — the seams were the hard part
   (typed HTTP contracts at every boundary), but each language ended up doing what it does best.
2. **Ranking is a layered problem.** BM25 nails keyword matches, embeddings capture semantics,
   RRF fusion combines them robustly, and a cross-encoder buys precision on top. Knowing *which*
   technique fits *when* is the actual skill.
3. **Search infrastructure is mostly plumbing.** The interesting work was in orchestration:
   caching, concurrency, dedup, failure isolation — not the scoring formulas.
4. **Crawling ethically is an engineering discipline.** robots.txt, rate limits, and retries
   aren't nice-to-haves; they're what keep a crawler working instead of getting blocked.
5. **Caching is a resilience feature, not just a performance one.** A cache layer that degrades
   gracefully (and isolates TTLs per content type) made the whole system robust to infrastructure
   hiccups.
6. **Documentation forced better design.** Writing \`architecture.md\`, \`known-issues.md\`, and the
   security model made implicit decisions explicit — and surfaced real bugs (missing migrations,
   bypassed ownership checks) that code review alone had missed.
7. **Scope discipline.** Shipping a genuinely complete vertical slice (search → workspace → station
   → canvas) was more valuable than a broader but shallower feature set.

---

## 10 · What's Next

**Short term (correctness):**
- Alembic migrations for the ~14 tables currently created only at runtime.
- Enforce session ownership on all update/delete endpoints (station, canvas, AI, tasks).
- Fix the crawler's 5xx retry classification and distributed re-push handling.

**Medium term (capability):**
- Full-content embeddings (index all chunks, not just chunk 0) for genuinely semantic long-document
  search.
- Replace brute-force vector search with an ANN index (HNSW) so the index scales past demo size.
- Add real authentication (the \`session_id\`-scoped schema is already auth-ready).

**Longer term (product):**
- An LLM-powered "research agent" that walks the crawl → read → summarize loop autonomously.
- Scheduled re-crawling and freshness tracking for saved sources.
- Multi-user support with per-user indexes and workspace sharing.
- A PWA/desktop shell so QWRY feels like an installed app rather than a dev server.`;
