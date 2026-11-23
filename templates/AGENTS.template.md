# AGENTS.md — Ústava projektu a Pravidla AI vývoje (AIDD)

> **Autoritativní ústava projektu pro AI agenty (Antigravity IDE, Cursor, Claude Code, VS Code / Kilo Code, GitHub Copilot).**
> Každý AI vývojář pracující v tomto repozitáři je povinen bezpodmínečně dodržovat tato pravidla a axiomy.

---

## 1. Non-negotiables (Neměnné principy & Fail-Fast Guardrails)

1. **Fail-Fast Schémata namísto tichých polyfillů:**
   - Zákaz lepení chybějících dat operátory `||` nebo `?? ""` na doménových datech. Pokud vstup nebo AI model vrátí neplatná data, validace (např. Zod/Pydantic) musí okamžitě selhat a reportovat přesnou příčinu.
2. **Striktní typová bezpečnost (Zero "any"):**
   - Zákaz volného `any`, zákaz obcházení typů bez explicitního zdůvodnění. Všechny modely a entity musí mít přesné typy v definované vrstvě kontraktů (např. `src/types/`).
3. **Řízený a neměnný stav (Immutability & State Stores):**
   - Zákaz přímé mutace objektů ve stavových strukturách (`.push()`, `.splice()`). Veškeré změny probíhají přes čisté akce ve storech nebo reducerech.
4. **Zákaz placeholderů a nekompletního kódu:**
   - Žádné komentáře typu `// ... existing code ...`, `// TODO implement later` nebo prázdné funkce. Každá implementace musí být funkční a úplná.
5. **Soukromí a bezpečnost API klíčů:**
   - Tajné klíče, API tokeny a hesla se NIKDY nesmí ukládat do git repozitáře ani zapisovat do nekrytých logů. Používej proměnné prostředí (`.env.local`) nebo zabezpečené lokální úložiště.
6. **Výhradně relativní cesty v dokumentaci:**
   - V žádném markdownu ani konfiguraci nesmí být absolutní cesty (žádné `C:\...` ani `/home/...`). Vše musí odkazovat relativně (např. `./docs/ARCHITECTURE.md`).
7. **Laser Focus při opravách chyb:**
   - Při řešení nahlášeného bugu neprováděj nevyžádaný plošný refaktoring okolního kódu. Dělej chirurgické zásahy.

---

## 2. Režimy autonomie agenta (Agent Autonomy Modes)

Agent podporuje dva standardizované režimy práce:

### A. Režim `guided` (Výchozí interaktivní režim)
- Vhodný pro architektonická rozhodnutí, nové moduly a běžnou práci.
- Agent postupuje po krocích a na klíčových křižovatkách žádá o potvrzení směru.

### B. Režim `batch_run [issues/úkoly...]` (Autonomní dávkový režim)
- Vhodný pro odbavení série připomínek, issues nebo bugfixů najednou.
- **Povinný postup:** Agent se řídí runbookem `batch-runner-protocol`:
  1. Předem sestaví **Dependency & Impact Matrix**.
  2. Před každým dalším issue povinně projde **Dynamic Re-evaluation Gate** (ověří, že změny z předchozího issue nerozbily předpoklady dalšího).
  3. Každé issue má vlastní atomický commit (`fix(#X): ...`) a okamžité spuštění testů.

---

## 3. Skill Routing Table (Matice specializovaných úloh)

Než začneš analyzovat nebo upravovat kód, VŽDY zkontroluj, zda úkol nespadá pod specializovaný runbook v `.agents/skills/` (nebo `.github/skills/`):

| Typ úkolu | Primární Runbook / Skill | Popis a klíčové zaměření |
|---|---|---|
| **Architektura projektu** | `<project>-aidd-architect` | Celková koncepce, modulární hranice, technologické standardy |
| **Specifikace & Velké celky (OpenSpec)** | `spec-driven-protocol` | Návrhy modulů, schémata, Lastenheft + Pflichtenheft před psaním kódu |
| **Oprava chyb & Bugfix** | `bug-fixing-protocol` | Chirurgický řez, TDD reprodukce, zákaz fallbacků `||` a `??` |
| **Dávkové řešení issues** | `batch-runner-protocol` | Autonomní odbavení issues, Dynamic Re-evaluation Gate |
| **Layout & Vizuální audit** | `ui-layout-guard-protocol` | Prevence overflow, flexbox `min-w-0`, z-index hierarchie |
| **Správa GitHub Issues** | `github-issues-protocol` | Práce výhradně přes `gh` CLI bez halucinací a tokenových přepadů |

---

## 4. Technologické standardy & Architektura

* **Stack:** [Doplň: např. TypeScript 5, React 19 / Vite, Tailwind CSS v4]
* **Architektonický vzor:** [Doplň: např. Modular Monolith / Feature-Sliced Design]
* **Vrstvení kódu:**
  - `src/types/` — Datové kontrakty, Zod schémata, TypeScript interface (Single Source of Truth).
  - `src/store/` — Stavový management (Zustand / Redux Toolkit / Pinia).
  - `src/services/` — Repozitářová vrstva, API klienti, externí služby.
  - `src/components/` — UI komponenty s důslednou ochranou layoutu.
  - `src/utils/logger.ts` — In-App diagnostický logger s ring bufferem od Day 1.

---

## 5. Workflow zkratky & Release Management

Agent reaguje na tyto standardizované povely uživatele:
* `done` $\rightarrow$ Spustí validační suite (build + lint + test), aktualizuje `docs/CHANGELOG.md` (`[Unreleased]`), navrhne Conventional Commit. Pokud byl dokončen ucelený milník, **nejprve se VŽDY zeptá uživatele na vydání nové verze** dle pravidel níže.
* `checkpoint` $\rightarrow$ Rychle zaznamená aktuální stav do `docs/PROGRESS.md` bez commitu.
* `test_project` $\rightarrow$ Spustí kompletní validační suite projektu.
* `batch_run` $\rightarrow$ Spustí autonomní zpracování fronty issues dle `batch-runner-protocol`.
* `spec_propose [název]` $\rightarrow$ Vytvoří návrh specifikace (Lastenheft + schémata + tasklist) v `docs/proposals/` a čeká na schválení.
* `spec_apply [název]` $\rightarrow$ Po schválení provede exekuci schváleného návrhu dle `spec-driven-protocol`.
* `spec_archive [název]` $\rightarrow$ Začlení dokončený návrh do trvalé specifikace `docs/specs/`.

### Pravidla sémantického verzování (Release Approval Gate)
1. **Průběžná evidence:** Změny se zapisují do sekce `## [Unreleased]` v `docs/CHANGELOG.md`.
2. **Povinný dotaz před vytvořením verze:**
   - Agent **NIKDY nesmí sám bez výslovného souhlasu uživatele** bumpovat verzi v `package.json`, uzavírat blok v `CHANGELOG.md` ani vytvářet git tag.
   - Po dokončení významného milníku se agent nejprve zeptá a navrhne SemVer úroveň (MAJOR / MINOR / PATCH) a zdůvodnění.

---

## 6. Definition of Done (DoD)

Žádná úloha není považována za hotovou, dokud:
1. Build projde bez chyb (`pnpm build` / ekvivalent).
2. Linter a typecheck nehlásí žádná varování ani chyby (`pnpm lint` / `pnpm typecheck`).
3. Všechny unit a integrační testy projdou (`pnpm test`).
4. Nové datové struktury mají schéma i typový kontrakt.
5. UI komponenty nezpůsobují horizontální scroll a dodržují z-index stupnici.
6. Commit zpráva odpovídá Conventional Commits (např. `feat(scope): message` nebo `fix(#12): message`).
