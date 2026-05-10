---
name: brand-kit
version: 0.1.0
description: |
  Generate a full brand kit for a project — custom geometric SVG mark
  drawn from the project's actual subject matter, mark variations grid,
  size system, app icon mockups (iOS / macOS / Android / browser),
  wordmark lockups, color palette, typography specimens, and
  client-side downloadable SVG/PNG assets. Produces THREE distinct
  directions side-by-side first (different mark + palette + type voice
  for each) so the user can choose, then commits to a single
  ~750-line brand.html. Heavy emphasis on reading the project's actual
  files and pulling motifs from its real domain — not generic startup
  gloss. Use when asked to "make app icons", "design a logo for X",
  "create a brand page", "generate an identity", "make this look good
  on a separate page", or /brand-kit.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

You are generating a complete brand identity for a project — not a generic logo, but a system the user could ship with. The output is two files:

1. **`brand-explore.html`** — a side-by-side comparison page showing three fully-realized brand directions (each = its own mark + palette + type + tagline voice). The user picks one, or asks for a fourth.
2. **`brand.html`** — the chosen direction, fully built out as a ~750-line self-contained brand kit page.

The skill is **domain-driven** and **high-effort**. Generic geometric blobs that could fit any SaaS dashboard are a failure mode. The mark must derive from the project's real subject matter — read the project files, understand the domain, then design.

## What you produce (recap)

`brand-explore.html` contains three columns. Each column = one complete direction with its own:
- Mark (custom SVG, drawn from a domain motif specific to this project)
- Color palette (5–6 swatches with hex codes)
- Type stack (display / UI / mono)
- Wordmark lockup (full project name in the direction's voice)
- One-line voice sample (tagline rendered in the chosen type)

`brand.html` (the final, ~750 lines) contains:
1. Top utility bar — project name + back link + version
2. Hero stage — massive mark with idle orbit, wordmark, tagline
3. The Mark — 8 ground/color variations grid
4. Three Concepts — primary mark + 2 supporting marks
5. Size System — 16 / 24 / 32 / 48 / 64 / 96 / 128 / 256 with use labels
6. In Context — iOS squircle, macOS dock, Android adaptive, browser tab
7. Wordmark Lockups — stacked / horizontal / monogram / paper editorial / headline
8. Color System — 5–6 hex-labeled swatches by role
9. Typography — display / UI / mono specimens
10. Downloads — client-side SVG (3 marks), PNG (5 sizes), favicon (3 variants)

Both files self-contained. Google Fonts is the only external dependency. No bundler, no build step.

---

## Step 1 — Read the project. Deeply.

Before talking to the user, build a real understanding of the domain. Run these in parallel:

```bash
ls -la
cat README.md 2>/dev/null
cat CLAUDE.md 2>/dev/null
cat package.json 2>/dev/null | head -40
cat index.html 2>/dev/null | head -60
head -120 style.css 2>/dev/null
git log --oneline -20
ls Subject/ data/ docs/ 2>/dev/null
```

Then read what looks load-bearing:
- **For research / archive projects:** read the actual data sources (CSV headers, sheet names, classification taxonomies). The motif comes from the *subject matter*, not the project name.
- **For code projects:** read the main entry point and a couple of key source files. Understand what it actually does.
- **For data projects:** scan the data files (CSV headers, schemas, table names, time periods covered).
- **For everything:** look at the existing visual aesthetic — colors in style.css, typography choices, layout patterns. The brand should feel like an evolution of what's already there, not a rejection of it.

If the domain is unfamiliar (a historical period, a scientific field, a niche craft), use **WebSearch** to learn the iconography. For a Civil War-era project, search for what a Civil War-era seal looked like. For a mycology project, search for the visual conventions of mycological illustration. **Do not invent motifs from training-knowledge guesses.** Verify.

**Output a one-paragraph "domain brief" before moving on.** Tell the user what you learned about the project. This is your evidence that you read carefully — and gives them a chance to correct you before you spend effort on the wrong mental model.

---

## Step 2 — Establish the brand identity

AskUserQuestion only for what you can't infer. Most fields can come from project context.

Split into individual questions — don't dump four into one:

**Q1 — Project name (full):**
The headline name on the brand page. May differ from the repo's existing title (the user often invokes this skill to *rename*).

**Q2 — Subtitle / institutional context:**
The line that sits under the title. Format is up to the user but typically: institutional name, era range, category. Skip if not applicable.

**Q3 — One-line tagline:**
Two short sentences max. Sets the voice for the whole page.

**Q4 — Author attribution:**
Pull from CLAUDE.md ("Built by …"), git config, or the existing README footer. Confirm with the user only if uncertain.

Don't ask for "aesthetic register" here — Step 3 generates **three different registers** and the user picks one visually. Asking abstractly forces them to commit before they can see.

End with a refinement checkpoint: "I'll generate three full brand directions for **{name}** — '{tagline}'. Each will have a different mark, palette, type voice. Then you pick one. Anything to fix in the name or tagline before I start?"

---

## Step 3 — Generate three FULL directions

This is the core of the skill. Generate three **complete, distinct** brand directions. Not three variations of the same mark — three different *worlds*.

Each direction = `(mark concept) × (palette) × (type voice) × (tagline angle) × (era register)`.

### Direction matrix

Pick three from this menu (or invent a fourth if the project demands it). The three you pick should *feel different from each other* — period vs. modern vs. editorial, not three flavors of "modern minimal."

| Register | Voice | Mark feel | Color feel | Type feel |
|----------|-------|-----------|------------|-----------|
| **Period historical** (1700s–1900s) | Heraldic, institutional | Geometric heraldry — star fort, compass rose, crossed implements, sealing-wax stamp | Brass on ink, parchment ground, vermillion accents | Source Serif 4 / Playfair, oldstyle figures |
| **Modern industrial** (post-1950) | Engineered, functional | Blueprint geometry, technical drawing, isometric primitives, schematic glyphs | Steel + graphite, hazard amber, cyan accents | Inter / Söhne, mono labels |
| **Contemporary tech** (now) | Crisp, calibrated | Abstract primitives, mesh nodes, vector glyphs, generative geometry | Near-black + a single saturated hue | Inter / Geist, mono throughout |
| **Editorial / archive** | Curatorial, restrained | Typographic monogram, ornamental rule, ligature mark | Cream / bone ground, ink + bordeaux | Playfair / Source Serif, italic accents |
| **Field / observational** (lab, journal, expedition) | Empirical, hand-drawn-feeling | Diagrammatic — anatomy plate, taxonomy key, chart axis | Bone + sepia, cobalt accents | Source Serif + a tabular mono |
| **Civic / monumental** | Heavy, public | Carved-stone geometry, federal seal, monumental letterforms | Federal navy, stone gray, red oxide | Trajan / Cinzel for display, Inter for body |
| **Underground / counter-culture** | Hand-set, warm | Woodblock, riso print, off-register | Cream + a single hot color | Custom display + grotesque body |

### Mark motif selection

The mark must come from the project's *actual subject matter*. Not "things that vibe with the project name." Pull motifs from what the project actually contains.

| Domain | Possible motifs (start here, dig deeper for the project) |
|--------|----------------------------------------------------------|
| Military / fortification | star fort plan, bastion silhouette, crossed cannons, ballistic arc, compass rose, regimental cipher |
| Maritime | anchor, sextant, compass star, prow, octant, knot diagram, signal flag |
| Aerospace | wing planform, propeller arc, vector triangle, control surface, airfoil cross-section |
| Finance / ledger | coin stack, ledger column, scales, ticker bar, signet ring |
| Medicine / bio | caduceus, helix, cell membrane, stethoscope curve, anatomy plate fragment |
| Music / DJ | waveform, vinyl groove, fader stack, oscilloscope, time signature |
| Game / arcade | d20, joystick, pixel grid, scanline, controller silhouette |
| Data / archive | folio stack, drawer pull, file tab, classification mark, accession number |
| AI / language | mesh node, glyph stack, attention arc, token grid |
| Maritime defense | hull cross-section, sonar arc, radar sweep, periscope, naval ensign |
| Mycology / botany | spore print, gill structure, frond, plate-illustration silhouette |

For a project not on this list: spend a minute to brainstorm 5+ motifs internally before picking. If your first three motifs all feel generic, search the domain ("Civil War seals", "Vauban fortification plan", "1900s naval insignia") for visual references and pull from those.

### What each direction must contain

For **each of the three directions**, generate:

1. **Direction name** (3–5 words, evocative — "Brass & Bastion", "Blueprint Archive", "Field Plate")
2. **Era register** (one of the rows above)
3. **Mark SVG** — actual SVG, drawn from primitive shapes (path / circle / line / polygon). ViewBox `0 0 64 64`. Uses `currentColor`. Holds at 16px. **Must be different from the other two directions' marks** — different motif, not a recolor.
4. **Palette** — 6 named swatches with hex codes:
   - `bg` (deep background)
   - `surface` (panel/card)
   - `primary` (mark color)
   - `text` (primary text on bg)
   - `muted` (secondary text)
   - `accent` (sparingly used hot color)
5. **Type stack** — `display`, `sans`, `mono` font families (use Google Fonts that load reliably)
6. **Tagline rendition** — the user's tagline rendered in this direction's voice (different cuts: italics in editorial, all-caps tracked in industrial, etc.)
7. **One-paragraph rationale** — why this direction fits the project. Cite a specific thing you read in Step 1.

### Output format: brand-explore.html

Write `brand-explore.html` at the project root. Three vertical columns side-by-side (or stacked on mobile), each rendering one direction's full mini-kit:

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│  DIRECTION A        │  DIRECTION B        │  DIRECTION C        │
│  "Brass & Bastion"  │  "Blueprint Archive"│  "Field Plate"      │
│                     │                     │                     │
│      [MARK]         │      [MARK]         │      [MARK]         │
│   (180px, in        │   (180px, in        │   (180px, in        │
│    direction's      │    direction's      │    direction's      │
│    primary color)   │    primary color)   │    primary color)   │
│                     │                     │                     │
│  [WORDMARK]         │  [WORDMARK]         │  [WORDMARK]         │
│  in display font    │  in display font    │  in display font    │
│                     │                     │                     │
│  [TAGLINE]          │  [TAGLINE]          │  [TAGLINE]          │
│  in body voice      │  in body voice      │  in body voice      │
│                     │                     │                     │
│  ────────────────   │  ────────────────   │  ────────────────   │
│                     │                     │                     │
│  [PALETTE]          │  [PALETTE]          │  [PALETTE]          │
│  6 hex swatches     │  6 hex swatches     │  6 hex swatches     │
│  in a row           │  in a row           │  in a row           │
│                     │                     │                     │
│  [TYPE STACK]       │  [TYPE STACK]       │  [TYPE STACK]       │
│  display / sans /   │  display / sans /   │  display / sans /   │
│  mono with samples  │  mono with samples  │  mono with samples  │
│                     │                     │                     │
│  [RATIONALE]        │  [RATIONALE]        │  [RATIONALE]        │
│  why this fits      │  why this fits      │  why this fits      │
│                     │                     │                     │
│  [CHOOSE BUTTON]    │  [CHOOSE BUTTON]    │  [CHOOSE BUTTON]    │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

The "choose button" doesn't need to do anything functionally — it's a visual cue. The user tells you in chat which to commit to.

**Each column must look like its own brand.** Different fonts loaded for each, different background colors, different mark color, different lockup style. Treat each column as a complete miniature brand sheet, not a comparison row.

Use the template at `~/Github/Settings/templates/brand-kit/brand-explore.html` as the starting structure. Substitute the three directions' content.

After writing, tell the user:

> "Three directions live at `brand-explore.html`. Open it and pick one — A, B, or C — or tell me what to change. If you want a fourth direction in a different register, I'll generate it."

**Refinement checkpoint.** Don't move to Step 4 until the user signals "yes, commit to direction X."

---

## Step 4 — Refinement loop on the chosen mark

Once the user picks a direction, focus on the **mark itself** before generating the full page. The mark is the load-bearing piece — it appears 15+ times in `brand.html` and gets baked into the favicon, the iOS icon, the macOS dock icon, etc. Get it right before scaling.

Show the chosen mark inline in your chat response at three sizes (24px, 64px, 256px). Ask:

> "This is the mark at three sizes. Anything to change? More bastions, different stroke weight, simpler interior, harder corners, different proportions?"

Iterate the SVG until the user says "good." Common refinements:
- Bastion count (4 → 5 → 6 for star forts)
- Stroke vs fill
- Interior detail (add a center dot, subtract the inner ring, etc.)
- Corner sharpness (miter join vs slight round)
- Proportions (tighter or looser)

Each iteration: rewrite the SVG, paste it inline, confirm. Don't write `brand.html` until the user signs off.

---

## Step 5 — Generate brand.html

**Already-exists guard:** if `brand.html` exists, AskUserQuestion: "brand.html already exists — overwrite, save as `brand-v2.html`, or skip?" Don't silently overwrite.

Copy the template from `~/Github/Settings/templates/brand-kit/brand.html` and substitute every `{{TOKEN}}`. Don't leave any unsubstituted.

**Before editing: enumerate every token in the template with one grep, so nothing slips through:**

```bash
grep -oE '\{\{[A-Z_0-9]+\}\}' ~/Github/Settings/templates/brand-kit/brand.html | sort -u
```

Address every result. Common groups below.

### Token reference

**Project meta:**
- `{{PROJECT_NAME}}` — display name (e.g. "Fortify the Ordnance")
- `{{PROJECT_NAME_HERO}}` — hero treatment with optional `<em>` and `<br>` (e.g. `Fortify <em>the</em><br>Ordnance`)
- `{{SUBTITLE}}` — institutional context line
- `{{ERA_LINE}}` — date range or category, or remove the meta line if not applicable
- `{{META_EXTRA}}` — third meta item (e.g. "1,901 records") or remove
- `{{TAGLINE}}` — two-line description
- `{{AUTHOR}}` — from CLAUDE.md or git config
- `{{BACK_HREF}}` — usually `index.html`
- `{{BACK_LABEL}}` — usually "← back to {project shorthand}"
- `{{VERSION_LINE}}` — e.g. "v1 · 2026"

**Color tokens (CSS variables in `:root`):**
- `{{INK}}`, `{{INK_2}}`, `{{INK_3}}`, `{{LINE}}`, `{{LINE_SOFT}}`
- `{{PAPER}}`, `{{PAPER_2}}`, `{{BONE}}`
- `{{PRIMARY}}` (= mark color), `{{PRIMARY_2}}` (darker), `{{PRIMARY_SOFT}}` (lighter)
- `{{ACCENT_A}}` (e.g. steel/blue), `{{ACCENT_B}}` (e.g. vermillion)
- `{{SLATE}}`, `{{SLATE_SOFT}}`

**Type:**
- `{{FONT_SERIF}}`, `{{FONT_SANS}}`, `{{FONT_MONO}}` — full font-family CSS values
- `{{GOOGLE_FONTS_URL}}` — the `?family=...` URL for the Google Fonts `<link>`

**Marks (the actual SVG inner content — `<path>`, `<circle>`, etc., NOT the wrapping `<svg>`):**
- `{{MARK_INNER}}` — primary mark inner SVG (uses `currentColor`)
- `{{MARK_INNER_OUTLINE}}` — outline-only variant of primary
- `{{MARK_2_INNER}}`, `{{MARK_2_NAME}}`, `{{MARK_2_DESC}}` — supporting concept B
- `{{MARK_3_INNER}}`, `{{MARK_3_NAME}}`, `{{MARK_3_DESC}}` — supporting concept C
- `{{MARK_STORY}}` — one-line rationale for the primary mark

**Section ledes (italicized one-liners under each section heading):**
- `{{LEDE_MARK}}`, `{{LEDE_CONCEPTS}}`, `{{LEDE_SIZES}}`, `{{LEDE_MOCKUPS}}`, `{{LEDE_LOCKUPS}}`, `{{LEDE_COLOR}}`, `{{LEDE_TYPE}}`, `{{LEDE_DOWNLOADS}}`

**Color names (display labels in the palette grid):**
- `{{COLOR_NAME_INK}}`, `{{COLOR_NAME_PRIMARY}}`, `{{COLOR_NAME_PAPER}}`, `{{COLOR_NAME_BONE}}`, `{{COLOR_NAME_ACCENT_A}}`, `{{COLOR_NAME_ACCENT_B}}` — friendly names like "Ink", "Brass", "Parchment", "Bone", "Steel", "Vermillion"

**Wordmark variants (each lockup gets its own treatment):**
- `{{MARK_NAME}}` — primary mark name (matches the chosen direction)
- `{{WORDMARK_STACKED}}` / `{{WORDMARK_STACKED_META}}` — text for the stacked lockup
- `{{WORDMARK_HORIZ}}` / `{{WORDMARK_HORIZ_META}}` — text for the horizontal lockup
- `{{MONOGRAM_LEFT}}` / `{{MONOGRAM_RIGHT}}` — two-letter monogram (e.g. "F" + "O")
- `{{WORDMARK_EDITORIAL}}` / `{{EDITORIAL_META}}` — paper-editorial lockup
- `{{WORDMARK_HEADLINE}}` / `{{HEADLINE_META}}` — full-bleed headline lockup
- `{{TAB_URL}}` — string shown in the browser-tab mockup (e.g. project slug)

**Type specimens (real samples written in each face):**
- `{{TYPE_DISPLAY_SAMPLE}}` — short headline-voice sample (3–6 words). Allow `<em>` for italic emphasis.
- `{{TYPE_SANS_SAMPLE}}` — short UI-voice sample (3–6 words)
- `{{TYPE_MONO_SAMPLE}}` — short tabular/system-voice sample (often the project name in caps with separators)
- `{{FONT_DISPLAY_NAME}}`, `{{FONT_SANS_NAME}}`, `{{FONT_MONO_NAME}}` — friendly typeface name (e.g. "Source Serif 4")
- `{{FONT_DISPLAY_WEIGHTS}}`, `{{FONT_SANS_WEIGHTS}}`, `{{FONT_MONO_WEIGHTS}}` — listed weights (e.g. "400 / 700 italic")
- `{{FONT_DISPLAY_NOTE}}`, `{{FONT_SANS_NOTE}}` — short note (e.g. "variable", "static")

**Downloads:**
- `{{SLUG}}` — kebab-case project slug used in download filenames
- `{{MARK_INNER_FAVICON}}` — favicon-tinted mark inner SVG (already-colored, e.g. `<path fill='%23C9A24C' …/>`); URL-encoded since it lives in a data URL
- `{{MARK_2_NAME_SHORT}}`, `{{MARK_3_NAME_SHORT}}` — single-word labels for the supporting marks (button text)

**Footer:**
- `{{FOOTER_META}}` — one-line meta (e.g. "An archive of … · Built by Thomas Ou")

### Hard requirements for the marks

1. SVGs use `currentColor` for fill/stroke — they invert across light/dark sections via the parent's `color` CSS property.
2. Marks with interior holes use `fill-rule="evenodd" clip-rule="evenodd"` on the path.
3. ViewBox is `0 0 64 64` (square). Centered geometry. Coordinates are integers where possible — pixel-snapped silhouettes are crisper at small sizes.
4. The mark must hold at 16px without losing its silhouette. If you can't recognize it as a thumbnail, redesign.

### Hard requirements for the page

1. Single file. No external CSS or JS files.
2. Google Fonts only — no other CDN, no toolchain.
3. Mobile responsive — single-column at <900px (template handles this).
4. Downloads work — client-side `Blob` + `URL.createObjectURL` for SVG, `<canvas>` rasterization for PNG.
5. Favicon embedded as data URL using the primary mark in primary color.
6. The hero mark animates: idle orbit (slow `@keyframes`), rotates on hover.

---

## Step 6 — Optional propagation

After `brand.html` is written, AskUserQuestion (multiSelect): "Propagate the new mark across the project?"

- Update `index.html` favicon to the new SVG (data URL)
- Replace the wordmark in topbars / page headers
- Update `README.md` title to the new project name + drop in the SVG mark
- Add a "Brand" link in the main navigation
- Rename the project in `package.json` / `CLAUDE.md`

Each is a separate option. Only do what's checked. For each chosen, make the edit and report what changed.

---

## Step 7 — Verify

Find the project's existing dev server before suggesting a URL:

```bash
[ -x ./serve.sh ] && echo "serve.sh present" || cat package.json 2>/dev/null | grep -E '"dev"|"start"|"serve"' || echo "no server script"
```

If `serve.sh` exists, mention its port. Otherwise tell the user how to run a quick `python3 -m http.server 8000` and open `brand.html`. Don't auto-open a browser — Claude Code can't, and the user has their own preferences.

Final refinement checkpoint:

> "The page is at `brand.html`. Open it and tell me what to change — colors, mark detail, mockup variants, lockup spacing, anything. We're in the polish loop."

---

## Hard rules

- **Domain-driven, not generic.** The mark must derive from the project's actual subject matter. Generic shapes (gradient circles, abstract dots, neural mesh-for-anything, swooshes) are forbidden unless the project's domain is genuinely "abstract platform."
- **Three directions, fully realized.** Not three colors of one mark. Three different *worlds* — different motif, palette, type, voice. The user shouldn't have to imagine; the comparison page should make the choice obvious by showing each as a complete miniature brand.
- **Refinement loop on the icon before the page.** Show the SVG, ask for changes, iterate. Don't generate the full ~750-line page until the user has signed off on the primary mark geometry.
- **Read project context first.** README.md, CLAUDE.md, package.json, index.html, style.css, the actual data sources. Output a one-paragraph "domain brief" before asking anything. If the domain is unfamiliar, WebSearch — don't guess motifs from training knowledge.
- **Match the existing aesthetic if one exists.** Read the project's style.css for `--sans`, `--serif`, `--mono`, `--accent` definitions. The brand should feel like an evolution of what's there, not a rejection.
- **Single self-contained file per output.** Pure HTML/CSS/JS. Google Fonts is the only external dependency.
- **Real downloads.** The Downloads section must actually generate files via Blob URLs. No dead buttons.
- **Period-appropriate type.** Match the type voice to the era register, not "Inter for everything."
- **Guard against silent overwrite.** brand.html and brand-explore.html may already exist — AskUserQuestion before overwriting.
- **Use AskUserQuestion at decision points** — don't pick the user's project name, palette, mark, or direction for them. Surface choices.
- **Maximum effort.** This is a brand kit, not a placeholder. If a section feels phoned-in, redo it. The user invoked this skill because they want something they could ship with.

---

## Tone in chat

Builder talking to designer. Direct, concrete, no preamble. Short sentences. Show the work — paste SVGs inline, name the hex codes, cite the file you read. The user is here to make decisions and ship a brand, not to be reassured.
