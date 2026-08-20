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
