---
name: ui-layout-guard-protocol
description: Vizuální audit, ochrana layoutu a prevence nechtěného přetékání či překrývání prvků v UI. Triggery: layout, ui, css, overflow, scroll, překryv, z-index, vizuální audit.
---

# UI Layout Guard & Visual Audit Protocol

> **Cíl:** Zajistit, aby aplikace měla stabilní, responzivní layout bez nechtěného horizontálního scrollu, bez překrývání prvků a s jasnou hierarchií vrstev (z-index) napříč všemi zařízeními.

---

## 1. Pravidlo 1: Striktní uzavření viewportu (Strict Viewport Containment)

U aplikací typu dashboard, editor, webová pracovní plocha či herní rozhraní nesmí kořenový prvek okna NIKDY nechtěně přetékat:
- **Root Container:**
  ```tsx
  <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground">
    <Header className="flex-shrink-0" />
    <main className="flex-1 min-h-0 flex overflow-hidden">
      {/* Vnitřní panely */}
    </main>
    <Footer className="flex-shrink-0" />
  </div>
  ```
- **Zlaté pravidlo vnitřního scrollu:**
  Každý posuvný panel uvnitř flex kontejneru **MUSÍ mít `min-h-0`** (ve vertikálním směru) a **`overflow-y-auto`**. Bez `min-h-0` flexbox ignoruje výšku rodiče a přeteče celou obrazovku.

---

## 2. Pravidlo 2: Flexbox Overflow Prevention (`min-w-0`)

Nejčastější příčinou nechtěného horizontálního scrollbaru na celé stránce je flexbox položka s dlouhým textem nebo tabulkou:
- Jakýkoliv flex potomní prvek obsahující text, tagy, cesty k souborům nebo tabulku **MUSÍ mít třídu `min-w-0`** (nebo `overflow-hidden truncate`).
- Bez `min-w-0` má flex položka výchozí `min-width: auto`, což donutí rodiče expandovat mimo šířku viewportu.

---

## 3. Pravidlo 3: Sémantická Z-Index Stupnice (Stacking Context)

Zákaz náhodných hodnot typu `z-[9999]`, `z-[999]`, které vedou k válce z-indexů a překrývání dialogů:

| Třída / Hodnota | Název vrstvy | Použití |
|---|---|---|
| `z-0` / `z-base` | Základní obsah | Text, karty, gridy, běžné komponenty |
| `z-10` / `z-dropdown` | Lokální nabídky | Rozbalovací menu, autocomplete našeptávač |
| `z-20` / `z-sticky` | Připnuté lišty | Pevný header, postranní navigace (sidebar) |
| `z-30` / `z-drawer` | Výsuvné panely | Boční detailní panely (drawer, sheet) |
| `z-40` / `z-backdrop` | Podklad modálů | Tmavý backdrop (`fixed inset-0 bg-black/60`) |
| `z-50` / `z-modal` | Modální okna | Dialogy, potvrzovací okna, editační modály |
| `z-60` / `z-toast` | Globální notifikace | Toast alerts, in-app error bannery |

---

## 4. Pravidlo 4: In-App Dev Layout Guardian (Detekce v reálném čase)

Do kořenové komponenty aplikace (pouze v `development` režimu) vlož lehký detektor přetečení:

```tsx
// src/utils/devLayoutGuardian.ts
export function initLayoutGuardian(): void {
  if (process.env.NODE_ENV !== 'development' && !import.meta.env?.DEV) return;

  const checkOverflow = () => {
    const docWidth = document.documentElement.offsetWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    if (scrollWidth > docWidth) {
      console.warn(
        `[LAYOUT GUARDIAN] Detekován nechtěný horizontální scroll! Viewport: ${docWidth}px, Obsah: ${scrollWidth}px.`
      );
    }
  };

  window.addEventListener('resize', checkOverflow);
  setInterval(checkOverflow, 3000);
}
```

---

## 5. Pravidlo 5: Vizuální inspekce přes Browser DevTools / Subagenta

Při změnách rozložení stránky nebo přidávání nových dialogů:
1. **Ověření kolizí prvků:**
   - Otevři aplikaci v headless prohlížeči (nebo přes DevTools MCP).
   - Zkontroluj bounding box (`element.getBoundingClientRect()`) otevřeného modálu vůči headeru a postrannímu panelu.
2. **Responzivní breakpointy:**
   - Otestuj layout minimálně ve 2 rozlišeních:
     - Desktop standard: `1920x1080` (a `1366x768`)
     - Mobil / tablet: `390x844` (nebo `768x1024`)
3. **Screenshot verifikace:**
   - Pořídit screenshot pro ověření kontrastu a nepřekrývání textů před finálním schválením.
