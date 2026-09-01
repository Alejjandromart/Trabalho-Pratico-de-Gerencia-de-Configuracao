# Quiz de Cálculo 1 Design System

## 1. Atmosphere & Identity

Uma mesa de estudos digital: clara, objetiva e acolhedora, com organização suficiente para reduzir a ansiedade antes de resolver cada questão. A assinatura visual é a combinação de papel aquecido, azul de ação e uma faixa de progresso que transforma a sequência de exercícios em um caminho visível.

The visual reference is the warm minimalism, restrained borders, and readable hierarchy of the Notion design reference, adapted for a local calculation-study tool. The interface is a real interactive surface, not a decorative mockup.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | `--color-canvas` | `#fbfaf8` | `#1f1e1c` | Page background |
| Surface/secondary | `--color-surface` | `#ffffff` | `#292825` | Cards and panels |
| Surface/soft | `--color-surface-soft` | `#f3f1ed` | `#33312d` | Secondary blocks |
| Text/primary | `--color-ink` | `#252321` | `#f7f5f1` | Headings and answers |
| Text/secondary | `--color-muted` | `#6b665f` | `#c3bdb3` | Descriptions and metadata |
| Text/tertiary | `--color-faint` | `#938c83` | `#928a7f` | Supporting labels |
| Border/default | `--color-border` | `#dedad4` | `#4a4742` | Cards and controls |
| Accent/primary | `--color-accent` | `#1769d2` | `#65a1f3` | Primary actions and focus |
| Accent/strong | `--color-accent-strong` | `#0e4f9f` | `#9ac4ff` | Hover and active accents |
| Status/success | `--color-success` | `#277a4d` | `#79c69a` | Correct answers |
| Status/error | `--color-error` | `#b83a3a` | `#f29c9c` | Incorrect answers |
| Status/warning | `--color-warning` | `#9a6116` | `#e4b968` | Attention and notices |

### Rules

- The page uses a single warm-neutral palette and one blue interactive accent.
- Accent is reserved for actions, focus, links, and progress. It is not a decorative gradient.
- Status colors appear only after an answer is submitted or inside result feedback.
- Dark mode is selected through `data-theme="dark"` and preserves the same semantic hierarchy.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | `clamp(2.5rem, 5vw, 4rem)` | 700 | 1.02 | Page title |
| H1 | `2rem` | 700 | 1.15 | Result title |
| H2 | `1.375rem` | 700 | 1.3 | Question text |
| Body/lg | `1.125rem` | 600 | 1.45 | Intro and score |
| Body | `1rem` | 400 | 1.55 | Explanations |
| Body/sm | `0.875rem` | 500 | 1.45 | Navigation and metadata |
| Caption | `0.75rem` | 700 | 1.3 | Labels and tags |

### Font Stack

- Primary: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Mono: `ui-monospace, SFMono-Regular, Consolas, monospace` for formulas and numeric progress.

### Rules

- Body text never goes below `0.875rem`.
- Headings use slightly compressed tracking only at display size.
- Mathematical expressions use `<span class="formula">` and semantic `<sup>` where needed.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a base of `4px`.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Icon or label separation |
| `--space-2` | `8px` | Compact groups |
| `--space-3` | `12px` | Controls and metadata |
| `--space-4` | `16px` | Card internals |
| `--space-5` | `20px` | Answer rows |
| `--space-6` | `24px` | Question card padding |
| `--space-8` | `32px` | Content groups |
| `--space-10` | `40px` | Major blocks |
| `--space-12` | `48px` | Page rhythm |
| `--space-16` | `64px` | Hero spacing |

### Grid

- Max content width: `1120px`.
- Main layout: a two-column study dashboard at `1024px+`, with a 1fr question column and a 280px progress sidebar.
- Mobile fallback below `768px`: one column, sidebar becomes a compact progress strip above the question.
- Breakpoints: `640px`, `768px`, `1024px`, `1280px`.

## 5. Components

### TopBar

- **Structure**: `<header>` with brand mark, topic label, and theme toggle.
- **Variants**: default, dark theme.
- **Spacing**: `--space-4` horizontal padding, `--space-3` item gap.
- **States**: toggle default, hover, active, focus, disabled.
- **Accessibility**: theme toggle is a labeled button and announces its state.
- **Motion**: icon and label change with a 150ms opacity/transform transition.

### CategoryTabs

- **Structure**: `<nav>` containing buttons for question topics.
- **Variants**: all, função, limites, continuidade.
- **Spacing**: `--space-2` gap, `--space-2` vertical padding.
- **States**: default, hover, active, focus, disabled.
- **Accessibility**: uses `aria-pressed`; keyboard focus is always visible.
- **Motion**: active indicator changes opacity and transform within 200ms.

### QuestionCard

- **Structure**: topic label, question heading, optional formula block, answer list, feedback region, primary action.
- **Variants**: unanswered, answered-correct, answered-incorrect, completed.
- **Spacing**: `--space-6` card padding, `--space-5` answer gaps.
- **States**: loading, empty, unanswered, selected, correct, incorrect, disabled.
- **Accessibility**: answer choices are native buttons, feedback uses `role="status"`, and action labels describe the next step.
- **Motion**: option selection uses transform/opacity only; feedback reveals with a short fade/slide.

### OptionButton

- **Structure**: button with a letter marker and answer text.
- **Variants**: default, selected, correct, incorrect, disabled.
- **Spacing**: `--space-4` padding and `--space-3` internal gap.
- **States**: hover, active, focus-visible, disabled, submitted.
- **Accessibility**: minimum 44px target height, clear text contrast, no color-only answer signal.
- **Motion**: active state scales to `0.99`; no infinite animation.

### ProgressPanel

- **Structure**: score metric, progress meter, topic summary, question index list.
- **Variants**: in-progress, complete.
- **Spacing**: `--space-4` internal padding, `--space-3` groups.
- **States**: empty, in-progress, complete.
- **Accessibility**: progress meter exposes `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- **Motion**: progress width changes over 200ms and respects reduced motion.

### ResultPanel

- **Structure**: score summary, performance message, topic breakdown, restart action.
- **Variants**: low, developing, strong, perfect.
- **Spacing**: `--space-8` panel padding, `--space-6` content groups.
- **States**: loading, complete, empty fallback.
- **Accessibility**: heading receives focus after completion and the restart button is keyboard reachable.
- **Motion**: one completion reveal using opacity and transform only.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | `120ms` | `ease-out` | Button press and focus |
| Standard | `200ms` | `ease-in-out` | Tabs, progress, option feedback |
| Emphasis | `420ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Result panel entry |

### Rules

- Animation communicates answer feedback, progress, or completion only.
- Only `transform`, `opacity`, and progress `transform: scaleX()` are animated.
- `prefers-reduced-motion: reduce` removes non-essential movement and keeps state changes immediate.
- The quiz never advances without explicit user action.

## 7. Depth & Surface

### Strategy

Mixed: whisper borders define the reading surface, while a restrained layered shadow gives the question card elevation.

- Standard card border: `1px solid var(--color-border)`.
- Card shadow: two low-opacity layers using the warm canvas hue.
- Cards use `18px` radius; functional controls use `10px`; status badges use full pill radius. This is the intentional shape rule for the project.
- No glass blur, neon glow, decorative gradients, or fake screenshot panels.
