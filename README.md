# Class 3 Joyful Hub

A single-page, zero-build practice app for **NCERT Class 3** — Maths, English and EVS.
Static HTML/CSS/JS, deployable to GitHub Pages with no build step.

Live entry point: **`index.html`**

---

## What it does

| Mode | Description |
|---|---|
| 🎯 **Practice** | Unlimited questions from the chosen chapters. Wrong answer → shows the correct answer, the hint, and an explanation. |
| 🏆 **Quiz** | Up to 20 non-repeating questions spread across chapters, then a full answer review with explanations. |
| 🎓 **School Test** | Practice locked to a real school exam syllabus (see *Exam presets*). |
| 🔬 **Fun Lab** | Base-10 block builder, English word inspector, EVS STEAM cards. |
| ⭐ **Progress** | Name, stars, streak, accuracy, per-subject stats and quiz history — stored in the browser. |

Designed for 8–9 year olds: Fredoka font, 17–18px base text, 52px touch targets,
confetti and praise on correct answers, gentle non-punishing sound on wrong ones.

---

## File map

```
index.html              markup only (~620 lines)
app.js                  all UI logic
styles.css              kid-friendly theme, animations
theme.js                Tailwind colour/font tokens (must load right after the Tailwind CDN)

config.js               ⚙️  SET YOUR ANALYTICS ENDPOINT HERE
exam-presets.js         📅 SET SCHOOL EXAM DATES + SYLLABUS HERE

bank/core.js            question engine: buildQuestion, bankGenerator, mix, selfTest
bank/math-mela.js       NCERT Math Mela        — 22 chapters
bank/english-santoor.js NCERT Santoor + Echoes — 15 topics
bank/evs-wondrous-world.js  NCERT Our Wondrous World — 10 chapters

analytics.js            visitor tracker (name, IP, device, events)
analytics.html          🔒 private admin dashboard
apps-script/Code.gs     backend to paste into Google Apps Script

robots.txt  404.html  .nojekyll
```

Load order matters: `config.js` → `exam-presets.js` → `bank/core.js` → the three book files → `analytics.js` → `app.js`. All are `defer`red.

---

## Question bank

| Book | Chapters | Distinct questions reachable |
|---|---|---|
| Math Mela | 22 | ~10,300 |
| Santoor 3 & Echoes | 15 | ~350 |
| Our Wondrous World | 10 | ~210 |

Two kinds of generator:
* **Procedural** — build fresh numbers each call (place value, addition, tables…)
* **Static banks** — hand-written exam-paper items

`buildQuestion()` in `bank/core.js` **guarantees** the correct answer is always present in
the options exactly once, with 4 unique choices. This was the root cause of the original
"wrong answer doesn't show the correct one" bug — some questions literally had no correct option.

### Adding questions

Open the relevant `bank/*.js`, find the `PAPER` (or `REVISION`) object, add an item:

```js
ch6_placeval: [
  { q: 'What is the place value of 7 in <strong>472</strong>?',
    ans: 70,
    wrong: [7, 700, 2],
    hint: '7 sits in the tens place.',
    exp: '7 tens = 70.' }
]
```

`q`, `hint` and `exp` accept HTML. `wrong` may be short — `buildQuestion` pads it.

### Adding a whole new chapter

1. Write the generator in the book file
2. Add it to the `mathGenerators` / `englishGenerators` / `evsGenerators` object
3. Add a matching `{ id, label }` to the `topics` array in `B.registerBook({...})`

The id in the generators object **must** match the id in the topics array.

---

## Exam presets (the CARES Test buttons)

Everything lives in **`exam-presets.js`**. The home page automatically renders one
dated button per upcoming paper, soonest first; past papers disappear on their own.

```js
{
  id: 'cares-2-2026',
  name: 'CARES Test-2',
  school: 'ASIA English School',
  session: '2026-27',
  grade: 'Grade III',
  format: 'MCQs',
  subjects: {
    english: { date: '2026-08-31', day: 'Monday',   chapters: ['eng_nouns', ...] },
    math:    { date: '2026-09-01', day: 'Tuesday',  chapters: ['ch4_shapes', ...] },
    evs:     { date: '2026-09-02', day: 'Wednesday',chapters: ['evs_ch3_festivals', ...] }
  }
}
```

To add the next test: copy the block, change `id` / `name` / dates, list the chapter ids.
Chapter ids must match generator keys in `bank/*.js` — nothing else to change.

### Test mode lock

Tapping a dated button enters **test mode**. While it's on, the syllabus is enforced everywhere:

* topic dropdown is rebuilt with **only** the syllabus chapters
* the Chapters button is hidden and `openChapterModal()` refuses to open
* `getActiveChapters()` returns the lock first, ignoring anything saved in `localStorage`
* the Quiz tab draws from the lock too

An amber bar shows what's active with an **Exit test mode** button.
The lock also clears on **← Change** and **🏠 Home**.

---

## Analytics (optional)

Every visitor posts to the **same** backend URL, so all devices collect into one place.

### Setup

1. Create a Google Sheet → **Extensions ▸ Apps Script**
2. Paste `apps-script/Code.gs`
3. Change `SECRET` to a long private passphrase — **only inside the Apps Script editor**
4. **Deploy ▸ New deployment ▸ Web app** — *Execute as: Me*, *Access: Anyone* → copy the `/exec` URL
5. Paste that URL into `config.js` → `ENDPOINT`
6. Open `analytics.html`, enter the URL + same passphrase

Firebase Realtime Database is also supported: set `PROVIDER: 'firebase'` and `FIREBASE_URL`.

Until `ENDPOINT` is set, everything stays in the browser and `analytics.html` reads local data only.

### ⚠️ Security & privacy

* **Never commit a real `SECRET`** into `apps-script/Code.gs` — GitHub Pages serves that file publicly.
* The app collects **children's names, IP addresses and approximate city**. The footer
  *"Privacy & what we store"* modal discloses this; the server paragraph only appears once a
  backend is configured. Keep the sheet private and tell parents.
* Set `LOOKUP_IP: false` in `config.js` to stop IP/location collection entirely.

---

## Running locally

No build step. Any static server works:

```bash
python3 -m http.server 8765
# open http://localhost:8765/index.html
```

Opening via `file://` will break the `defer`red module loading — use a server.

---

## Testing

The bank has a built-in validator. In the browser console:

```js
ClassThreeBank.selfTest(500)   // [] means healthy
ClassThreeBank.countBank()     // chapters per subject
```

It checks every generator for: answer present in options, exactly 4 unique options,
and hint/explanation/badge all set.

Headless (macOS, no Node needed — uses VS Code's bundled runtime):

```bash
ELECTRON_RUN_AS_NODE=1 "/Applications/Visual Studio Code.app/Contents/MacOS/Code" script.js
```

---

## Deploying

1. Set `ENDPOINT` in `config.js` (and `DEFAULT_ENDPOINT` in `analytics.html`)
2. **Bump `?v=1` → `?v=2`** on the script/link tags in `index.html` so returning devices don't run stale code
3. Push to `main`
4. Repo ▸ Settings ▸ Pages ▸ deploy from `main` / root

`.nojekyll` stops Jekyll interfering. `robots.txt` hides `analytics.html` and `apps-script/`.

---

## Known trade-offs

| Item | Status |
|---|---|
| **Tailwind via CDN** | ~120 KB JS that compiles CSS in the browser on every load, and prints a console warning. Works fine; a precompile would cut it to ~20 KB of static CSS but adds a build step and is required before any offline/PWA work. ~371 utility classes are in use. |
| **Answer-length tell** | ~24% of questions have a correct answer noticeably longer than the distractors. Inherent to explanation-style answers; fixing it risks introducing factual errors. |
| **Small chapters** | Some chapters have fewer than 20 distinct questions. The quiz **shortens the paper** rather than repeating; below 5 it asks you to pick more chapters. |

---

## History / decisions

* `class_3_learning.html` was an older duplicate page — **deleted**; `index.html` was a strict superset once the chapter picker was ported across.
* The question bank was one 158 KB `questions.js` — **split per book** under `bank/` so each book is independent and cached separately.
* Inline `<style>`/`<script>` were **extracted** to `styles.css` / `app.js` to keep `index.html` readable.
* FontAwesome was **removed entirely** (~100 KB saved) — the UI is emoji-based, which also reads better to a child.
* Separate pages per exam were considered and **rejected** — they would duplicate the app and lose shared progress. Test mode locking achieves the same result.

### Notable bugs fixed

* Questions whose correct answer was missing from their own options (Rainbow syllables, Eid festival type)
* `rounded-blob` used everywhere but missing from the Tailwind theme → every card rendered square
* A new `AudioContext` per sound — browsers cap these, so audio died after a few questions
* Duplicate question wording inside a single quiz paper
* `const el = el(...)` shadowing (TDZ crash in the Lab tab)
* `role="button"` cards that ignored Enter/Space
* Distractors that were arithmetically **true**, creating two valid answers
* Biased `sort(() => Math.random() - 0.5)` shuffle → Fisher–Yates
* XSS in the English word inspector
