# AGENTS.md: Cohort Vault UI

Read this before touching anything in UI/. It states what we are building and the
rules that do not bend.

## What this is

A resource vault for the cohort 2 frontend web dev class. Classmates browse solved
class activities, trusted external links, videos, quizzes, and Canva icebreaker
decks, and their progress is tracked over time. Everything is local: progress lives
in localStorage, there are no accounts, no backend, and no login ever.

The parent repo (weeks 01 to 05) is the course archive. This UI is the study surface
on top of it.

## Hard rules

1. Component size: no .jsx file in src/features/ or src/ui/ may exceed 150 lines.
   If it grows, split it or move logic into a hook or a service.
2. Service separation: one concern per file in src/services/. Components and hooks
   call services; components never touch localStorage, fetch, or the Groq SDK
   directly. Services never import React or render UI.
3. No em dashes (the long dash character) or en dashes anywhere in the UI or in
   anything written: components, JSON data, markdown, comments, docs, commit
   messages. Use commas, colons, periods, or parentheses instead. This is a repo
   wide rule and scripts/check-dashes.js fails the build on violations (it is
   extended to scan .jsx for this project).
4. Theme: light theme is the default, and it is Frutiger Aero: glossy blue and
   green, water, bubbles, open sky, friendly rounded chrome. The theme lives in
   index.css as a custom daisyUI theme named "aero" with depth 1 and 1.25rem to
   1.5rem radii. Sky blue is primary, grass green secondary, sunny yellow accent,
   deep water neutral. The ALU logo in public/logo.png is the mark in the navbar
   and the hero. No flat grey enterprise dashboard, no harsh dark mode, no
   gradients on text.
5. Secrets: the Groq API key goes in UI/.env (gitignored) as VITE_GROQ_API_KEY, or
   in Vercel env vars later. Never write a real key into any committed file.
6. Commit messages: short subject only, no body, no descriptions.
7. Em dash rule applies to this file too. Keep it true if you edit it.

## Design system

The direction is Frutiger Aero, built on daisyUI. The vault should feel like
optimistic early 2000s consumer technology: glossy, rounded, wet, friendly.

- Type: Ubuntu for headings and numbers, Nunito Sans for body copy, Ubuntu Mono for
  eyebrows, week labels, counts and code. Loaded in index.html.
- Colour and the daisyUI theme tokens are all in index.css. Use them, do not
  hardcode hex in components.
- Progress is bubbles, not bars. BubbleMeter is the house metaphor: a cluster of
  spheres that fill with aqua as work gets done. Use it for xp, module progress and
  anything else that is a percentage of a known total. Linear ProgressBar is only
  for dense rows where bubbles will not fit.
- Completion also gets a highlight: the Mark utility puts a highlighter swipe behind
  a finished title.
- Surfaces are .glass: white gel panels with a lit top edge and a soft drop shadow.
  Sky panels (.sky-panel) are reserved for the home hero, the level card, the quiz
  score and the tutor header. Everything else is light.
- Chrome icons come from ui/Icon.jsx. Emoji are content, not interface, so use them
  only for badges and empty states.
- Motion is buoyant but restrained: rising bubbles in BubbleField, a slow bob on
  the logo, a gentle swell on empty state orbs, and lift on hover. The gloss on
  buttons is static, not a travelling sweep, because a sweep on a small button
  reads as a smudge. The reduced motion guard in index.css handles the rest.

### Border radius, all in one place

Every radius in the project comes from one block at the very top of
`src/index.css`. No component may hardcode a radius.

```css
--r-scale: 1;                                        /* master multiplier */
--r-card:  calc(1.5rem  * var(--r-scale));            /* cards, panels, hero, modal */
--r-inner: calc(1.25rem * var(--r-scale));            /* quiz options, video frames */
--r-tile:  calc(0.75rem * var(--r-scale));            /* logo, chart bars, focus ring */
--r-pill:  calc(9999px  * var(--r-scale));            /* buttons, badges, chips, inputs */
```

Set `--r-scale: 0` for a sharp, square, technical look. Everything squares off at
once, including every daisyUI component, because the theme wires
`--radius-box`, `--radius-field`, `--radius-selector`, `--btn-radius` and
`--badge-radius` to these four values.

The class names `rounded-card`, `rounded-inner`, `rounded-tile` and
`rounded-pill` are generated from the same variables, so they scale too.

One deliberate exception: spheres use the `.sphere` class, not `rounded-pill`.
Progress bubbles, glossy icon orbs and round icon buttons must stay circular at
every scale, because a squared off bubble stops reading as a bubble. If you add a
new bubble or orb, use `.sphere`.

### daisyUI layering trap, read this before styling anything

daisyUI registers its component CSS in `@layer daisyui`, and Tailwind declares
that layer last, so daisyUI beats both Tailwind utilities and
`@layer components`. Two consequences:

1. Never fight a daisyUI property with a utility. `.card-body` is
   `flex-direction: column`, so putting `flex-row` on it silently does nothing.
   Use `.card` as the surface and your own plain div for layout inside it. Same
   for `.navbar`.
2. Our own component classes are written unlayered on purpose, so they win. Do not
   wrap them in `@layer components`.

Also note daisyUI 5 removed `progress-primary` and paints `.progress` with
`base-content`. Progress fill colours are set by the `.progress-*` rules in
index.css, not by a colour class.

## Directory map

```
UI/src/
  app/          App.jsx, router.jsx, Layout.jsx, components/ providers/ hooks/
  features/     home/ modules/ icebreakers/ videos/ quizzes/ progress/ tutor/ search/
                each with components/ and hooks/, quizzes also has grading.js
  services/     storage.js progress.js tracking.js groq.js tutorContext.js
                badges.js search.js gamification.js
                tests live in services/__tests__ and run with npm run test
  data/         modules.json videos.json quizzes.json icebreakers.json
                links.json badges.json
  ui/           Button, Card, ProgressBar, Modal, Badge, EmptyState, Spinner...
                Icon, Mark, PageHeader, SectionHeading, StatTile, VideoPlayer
                BubbleMeter, BubbleField
  lib/          markdown.js format.js youtube.js utils.js icons.js
```

Router pages are lazy loaded. The tutor panel and the Groq AI SDK load only when
first used, so keep heavy imports dynamic.

Rules of the road:
- Never import across features. Share only through ui/, services/, lib/, or router.
- All content is hand-authored JSON in src/data. Every item carries a moduleId so
  progress, search, and tutor context roll up by module.
- One module equals one week, mirroring the repo: week-01 regex, week-02 html css
  basics, week-03 advanced, week-04 javascript, week-05 jquery and scraping.

## Adding content

- New lesson: add it to the lessons array of its module in data/modules.json. Body
  is a markdown string. Headings become anchors automatically, which is what the AI
  Tutor points at.
- New video: data/videos.json with a bare youtubeId, never a full URL.
- New quiz: data/quizzes.json. Question types are mcq, short, and code.
- New trusted link: data/links.json, set verifiedOn to the date you checked it.
- New badge: data/badges.json with its rule and target.

After any data change, run the checks below. CI validates shapes and cross
references (every moduleId must exist).

## Groq setup

1. Copy UI/.env.example to UI/.env and set VITE_GROQ_API_KEY.
2. The key is read only by src/services/groq.js via import.meta.env.
3. The tutor is fully contextual: it receives the current lesson, quiz question, or
   module summary, plus a digest of the student's progress. It can point at screen
   elements, spawn code snippet popups, and speak via speech synthesis when voice is
   on.

## Checks to run before pushing

In UI/: npm run lint, npm run test, then npm run build.
In the repo root: node scripts/check-links.js, node scripts/check-dashes.js,
node scripts/check-syntax.js, node scripts/check-html.js,
node scripts/check-issue-templates.js, and the data/component checks
check-data-json.js and check-component-lines.js.

## Tracking accuracy (do not weaken)

Auto tracking must never fake completion:
- Lesson: 90 percent scroll depth through the article plus proportional dwell time.
- Video: 80 percent watched with at least 30 seconds played.
- Quiz: submitted attempt only.
- External links: never auto-completed, only opened, confirmed by the student.

Anything unverifiable stays pending until the student marks it done, and any
completion can be undone.

## Where the full design lives

The detailed design spec is a gitignored local file:
docs/superpowers/specs/2026-09-26-cohort-vault-design.md
It is intentionally not on GitHub. This file must stay understandable without it.
