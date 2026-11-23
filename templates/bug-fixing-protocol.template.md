---
name: bug-fixing-protocol
description: "Chirurgický bug-fixing protokol a ochranná brzda. Triggery: bug, chyba, fix, oprava, regresní chyba, neočekávané chování."
---

# Chirurgický protokol pro odstraňování chyb (Bug-Fixing Protocol)

> **Základní axiom:** Non-negotiables v `AGENTS.md` jsou závazné vždy. Tento protokol slouží jako ochranná brzda proti destruktivnímu nebo povrchnímu chování agenta při řešení problémů.

---

## 1. Zákaz slepého přepisování (No Blind Replace)
- Před úpravou kódu si VŽDY přečti širší kontext souboru (minimálně 50–100 řádků okolo defektu).
- Nikdy neodmazávej vedlejší stavy, typy nebo obslužné handlery jen proto, že zrovna nejsou středobodem opravovaného issue.
- Prováděj výhradně **chirurgické řezy** (minimální nezbytný dif).

---

## 2. Laser Focus — Zákaz nevyžádaného refaktoringu
- Opravuj VÝHRADNĚ nahlášený defekt a bezprostřední kořenovou příčinu.
- Pokud v okolním kódu narazíš na starý zápis, styling nebo "ošklivý" kód, **nepřepisuj ho**, pokud to není nezbytně nutné k nápravě chyby.
- Velké plošné refaktoringy v rámci bugfixů zavádějí sekundární regrese a znemožňují čisté code-reviews.

---

## 3. Odmaskování příčiny namísto tichých polyfillů (Fail-Fast)
- **ZÁKAZ** opravovat chybu lepením operátorů `||` nebo `?? ""` na chybějící doménová data.
- Pokud je hodnota `undefined` nebo `null`, najdi místo, kde data vznikají nebo odkud se načítají.
- Pokud vstup porušuje kontrakt, nech systém selhat s přesnou chybovou hláškou (Fail-Fast), namísto tichého pokračování s invalidními daty.

---

## 4. TDD / Reprodukční test před opravou (Test-First)
- Kdykoliv je to technicky proveditelné:
  1. Napiš nebo identifikuj unit/integrační test, který chybu spolehlivě reprodukuje (červený test).
  2. Implementuj chirurgickou opravu v kódu.
  3. Ověř, že test nyní prochází (zelený test).
  4. Ověř, že žádný existující test nebyl rozbit.

---

## 5. Přísná typová disciplína (Zero "any")
- Zákaz obcházení typů přes `any`, `as unknown as Type` nebo `@ts-ignore` bez výslovného schválení.
- Pokud chyba plyne z nepřesného typu, nejprve oprav a zpřísni TypeScript rozhraní či Zod schéma v `src/types/`.

---

## 6. Závazná verifikace (Definition of Done)
Před ohlášením opravy VŽDY spusť kompletní validační sadu:
```bash
# Node / TypeScript:
pnpm test && pnpm lint && pnpm build

# Python:
uv run pytest && uv run ruff check .

# Rust:
cargo test && cargo clippy -- -D warnings
```
Žádný commit nesmí být vytvořen, dokud projekt čistě neprojde všemi třemi kroky.
