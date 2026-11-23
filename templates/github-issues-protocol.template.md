---
name: github-issues-protocol
description: "Standardizovaný protokol pro správu chyb, úkolů a připomínek přes GitHub CLI (gh). Triggery: issue, issues, gh, github, bug tracker, úkoly."
---

# GitHub Issues Protocol

> **Cíl:** Poskytnout čistý, strukturovaný a tokenově šetrný způsob správy chyb, vylepšení a úkolů přes oficiální GitHub CLI (`gh`).

---

## 1. Zásady práce s Issues

1. **Jediný zdroj požadavků:**
   - Každá nová netriviální připomínka, hlášení chyby nebo námět na novou funkci dostane své číslo issue (např. `#12`).
   - Commity se odkazují na issue: `fix(#12): <popis>` nebo `feat(#15): <popis>`.
2. **Práce přes GitHub CLI (`gh`):**
   - Využívá se výhradně oficiální `gh` CLI s autorizovaným účtem.
   - Příklad výpisu otevřených issues:
     ```bash
     gh issue list --state open --limit 10
     ```
   - Příklad čtení detailu issue:
     ```bash
     gh issue view <číslo>
     ```
   - Příklad založení nového issue:
     ```bash
     gh issue create --title "Chyba: ..." --body "Kroky k reprodukci..." --label "bug"
     ```
   - Příklad přidání komentáře:
     ```bash
     gh issue comment <číslo> --body "Stav řešení..."
     ```
   - Příklad uzavření:
     ```bash
     gh issue close <číslo> --comment "Vyřešeno v commitu <hash>."
     ```
3. **Zákaz tokenových přepadů:**
   - Nikdy nenačítej desítky issues naráz do kontextu modelu bez stránkování (`--limit 10`).
   - Vždy filtruj konkrétní stav a pracuj cíleně s konkrétním issue.

---

## 2. Doporučené štítky (Labels)

- `bug` $\rightarrow$ Nahlášená chyba (rozpad UI, selhání parseru, chybná validace).
- `enhancement` $\rightarrow$ Nová funkce, optimalizace nebo architektonické rozšíření.
- `refactor` $\rightarrow$ Chirurgická úprava struktury bez změny vnějšího chování.
- `documentation` $\rightarrow$ Aktualizace architektury, návodů nebo changelogu.
- `ai-prompt` $\rightarrow$ Úpravy promptů, modelů nebo systémových instrukcí pro LLM.
