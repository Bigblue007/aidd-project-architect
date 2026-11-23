# Spec Proposal: [Název Funkce / Modulu]

- **ID:** `PROP-[YYYYMMDD]-[nazev]`
- **Autor / Iniciátor:** [Uživatel / AI Agent]
- **Datum návrhu:** [YYYY-MM-DD]
- **Status:** `DRAFT` (Čeká na schválení) | `APPROVED` | `IMPLEMENTED`
- **Dotčené moduly:** [např. `src/types/`, `src/store/`, `src/components/export/`]

---

## 1. Záměr a Rozsah (Lastenheft / User Requirements)

### 1.1 Problém a Kontext
*Popiš stručně, jaký problém řešíme a jakou hodnotu nová funkce přináší.*

### 1.2 Klíčové požadavky (Must-Have)
- [ ] Požadavek 1: ...
- [ ] Požadavek 2: ...
- [ ] Požadavek 3: ...

### 1.3 Hranice záběru (Out of Scope / Co v této fázi neděláme)
- *Výslovně uveď, co se v této fázi NEBUDE implementovat, aby se předešlo feature creepu.*

---

## 2. Technické řešení & Datové kontrakty (Pflichtenheft)

### 2.1 Datové struktury & Schémata (Zod / TypeScript)
```typescript
// Přesná definice datového kontraktu před psaním kódu:
export interface FeatureConfig {
  id: string;
  enabled: boolean;
  // ...
}
```

### 2.2 Zvolené knihovny a závislosti
- Knihovna X (verze Y) — Důvod volby: ...

### 2.3 Architektonický dopad & Komponenty
- **Types:** `src/types/...`
- **Services / Logic:** `src/services/...`
- **State Store:** `src/store/...`
- **UI:** `src/components/...`

---

## 3. Ochranné mantinely (Guardrails)

- [ ] **Fail-Fast:** Vstupní data validována schématem, žádné tiché polyfilly `||`.
- [ ] **UI Layout:** Dodržen `min-w-0` u flex prvků a z-index stupnice (pokud obsahuje UI).
- [ ] **Bezpečnost:** Žádné citlivé tokeny v kódu ani v logu.

---

## 4. Kontrolní seznam implementace (Tasklist)

- [ ] **Krok 1:** Vytvoření typů a schémat v `src/types/`.
- [ ] **Krok 2:** Implementace čisté byznys logiky s unit testem.
- [ ] **Krok 3:** Propojení se stavem (store/databáze).
- [ ] **Krok 4:** Implementace UI komponenty s ošetřením layoutu.
- [ ] **Krok 5:** Spuštění plné verifikace (`test`, `lint`, `build`).
