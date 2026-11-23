# 🚀 AIDD Project Architect

> **Švýcarský nožík pro rozumné hobby vajbkódění v Antigravity, Cursoru, Claude Code a Copilotu.**  
> *Protože kódovat s AI je boží zábava – dokud se projekt po třetím víkendu nezhroutí pod náporem halucinací, rozbitých stylů a zapomenutého kontextu.*

---

## 🎯 O co jde?

Určitě to znáš: otevřeš editor, napíšeš do chatu své vysněné zadání, AI agent začne zběsile generovat desítky souborů a první hodinu to vypadá jako naprosté kouzlo. Jenže pak:
- Agent začne „opravovat“ chyby tím, že ti přepíše půlku funkčního kódu.
- UI se při zmenšení okna rozpadne do nekonečného vodorovného scrollu.
- Po restartu chatu agent zapomene, co vlastně stavěl, a začne vymýšlet nová rozhraní.
- A když mu zadáš tři úkoly naráz, třetím úkolem ti spolehlivě rozbije ten první.

**AIDD Project Architect** je lehká metodika a sada šablon (vycházející z reálného vývoje projektů v roce 2026), která do tvého projektu od první minuty vryje osvědčená pravidla hry.

---

## 🧠 8 pilířů rozumného vajbkódění

1. **Jediná Ústava (`AGENTS.md`):**  
   Centrální pravidla projektu. Žádné zmatené instrukce na deseti místech. Cursor, Antigravity i Claude Code čtou tentýž zdroj pravdy.
2. **Modulární dovednosti (Skills / Runbooky):**  
   Pravidla pro opravu chyb nebo správu issues žijí v oddělených souborech a nezaplevelují kontextové okno modelu.
3. **Fail-Fast namísto tichých záplat:**  
   Zákaz lepení chybějících dat operátory `||` nebo `?? ""`. Když je něco špatně, systém musí zařvat hned, ne potichu spadnout o tři vrstvy dál.
4. **Chirurgický bugfix (Laser Focus):**  
   Při opravě chyby má agent přísný zákaz dělat nevyžádaný plošný refaktoring okolního kódu.
5. **Autonomní dávky s pojistkou (`batch_run`):**  
   Když zadáš agentovi více issues naráz, po každém vyřešeném úkolu znovu zkontroluje stav kódu (**Dynamic Re-evaluation Gate**), aby novou změnou nerozbil to, co právě opravil.
6. **Vizuální strážce layoutu (UI Layout Guard):**  
   Pravidla pro flexbox (`min-w-0`), uzavřený viewport bez nechtěného scrollu celého okna a sémantický Z-index (0 až 60), aby ti dialogy nepřekrývaly notifikace.
7. **In-App diagnostika od Day 1:**  
   Lehký in-memory ring buffer (500 záznamů v RAM) s automatickou cenzurou API klíčů a tlačítkem *Kopírovat report pro AI*, takže při chybě nemusíš nic složitě lovit v konzoli.
8. **OpenSpec (Spec-Driven Development) pro velké nápady:**  
   Když chceš postavit velký modul, agent nejprve v Markdownu navrhne *Lastenheft* (požadavky a hranice) + *Pflichtenheft* (Zod schémata a checklist). Ty mu to za minutu schválíš, a teprve pak jde kódovat.

---

## 📦 Co balíček obsahuje

V adresáři `templates/` najdeš připravené stavební kameny:

| Šablona | Co řeší v novém projektu |
|---|---|
| `AGENTS.template.md` | Autoritativní ústava projektu pro AI agenty s pravidly a workflow zkratkami |
| `docker-compose.template.yml` | Kontejner s live HMR pro Windows Docker Desktop (`polling: true`), loopback vazbou `127.0.0.1` a limity paměti |
| `ci.template.yml` | GitHub Actions workflow od prvního dne (lint, typy, testy, build) |
| `logger.template.ts` | In-App diagnostický logger s ring bufferem a 1-click Markdown exportem |
| `bug-fixing-protocol.template.md` | Chirurgický postup odstraňování chyb bez plošného přepisování |
| `batch-runner-protocol.template.md` | Autonomní odbavování dávek úkolů s re-evaluací závislostí |
| `ui-layout-guard-protocol.template.md` | Prevence přetékání oken a kolizí vrstev v UI |
| `spec-driven-protocol.template.md` | OpenSpec životní cyklus pro bezpečný návrh velkých funkcí |
| `proposal.template.md` | Šablona pro strukturovaný návrh nové funkce před psaním kódu |
| `github-issues-protocol.template.md` | Práce s GitHub Issues přes `gh` CLI bez tokenových přepadů |
| `gitattributes.template` | Ochrana před konflikty konců řádků (LF vs CRLF) mezi Windows a Linuxem |

---

## 🛠️ Jak to použít

### A. V Google Antigravity IDE
Skill stačí naklonovat nebo zkopírovat do tvé globální složky dovedností:
```bash
# Umístění v Antigravity:
~/.gemini/config/skills/ai-project-architect/
```
Při zakládání nového projektu v novém prázdném adresáři jen napíšeš:
```text
/ai-project-architect
```
Agent tě provede 6 fázemi (od volby stacku přes git, ústavu, docker, diagnostiku až po initial commit).

### B. V Cursoru, Claude Code nebo VS Code
Zkopíruj `templates/AGENTS.template.md` do kořene svého projektu jako `AGENTS.md` a přidej tenký ukazatel:
- V **Claude Code**: vytvoř `CLAUDE.md` s odkazem `Viz ./AGENTS.md`.
- V **Cursoru**: vytvoř `.cursorrules` s odkazem `Viz ./AGENTS.md`.
- V **GitHub Copilot**: vytvoř `.github/copilot-instructions.md` s odkazem na `AGENTS.md`.

---

## 📄 Licence

Tento projekt je otevřený pro komunitu a hobby vývojáře pod licencí MIT. Používej, upravuj a šiř dle libosti!
