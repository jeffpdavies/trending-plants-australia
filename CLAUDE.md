# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop   # start dev server at http://localhost:8000
npm run build     # production build → public/
npm run serve     # serve the production build locally
npm run clean     # clear Gatsby cache (.cache/ and public/)
```

There is no test suite or linter configured.

## Architecture

This is a **Gatsby 5 static site** (React 18, Node 20) deployed on **Netlify**. It is a marketing/community site for an Australian indoor plant Facebook group.

### Styling

Pure **Tailwind CSS** utility classes — no custom CSS beyond the three `@tailwind` directives in `src/styles/global.css`. There are no CSS modules or styled-components. The Tailwind config is minimal with no theme extensions.

### Content / Data layer

All content is static JavaScript — there is no CMS, GraphQL data source, or API:

- `src/data/plants.js` — array of 8 plant objects. Each object has: `id`, `name`, `commonName`, `emoji`, `difficulty` (`"Easy"/"Medium"/"Hard"`), `difficultyColor`, `light`, `water`, `humidity`, `temperature`, `toxic` (boolean), `description`, `tips` (string[]), `australianNote`. Add new plants by appending to this array.
- `src/data/gallery.js` — programmatically generates 100 gallery items across 6 genera (Philodendron, Monstera, Anthurium, Syngonium, Epipremnum, Alocasia). All items currently have `hasImage: false` and `imageUrl: null` (placeholders). To add a real photo, set `hasImage: true` and `imageUrl: "/gallery/your-photo.jpg"` on the relevant item.

### Pages and routing

Gatsby file-based routing from `src/pages/`. Each page:
- Wraps content in `<Layout>` (Header + main + Footer)
- Exports a `Head` component for page-specific `<title>` and `<meta name="description">`

Pages: `/` (index), `/plant-guides`, `/gallery`, `/marketplace`, `/contact`, `/404`

### Forms

Both the contact form (`src/pages/contact.js`) and newsletter sign-up (`src/components/EmailCapture.jsx`) use **Netlify Forms** — they POST to `"/"` with `"Content-Type": application/x-www-form-urlencoded` and include `data-netlify="true"` and a honeypot field. Forms only work in the Netlify-hosted environment, not `localhost`.

### Navigation

Internal links use Gatsby's `<Link>` component. External links (always to the Facebook group) use plain `<a target="_blank" rel="noopener noreferrer">`. The Facebook group URL (`https://www.facebook.com/groups/470256795925800`) is defined as a local `FB_GROUP` constant in each file that needs it rather than a shared module.

### Component conventions

- Components live in `src/components/` and use `.jsx` extension; pages use `.js`
- `Layout.jsx` is the single shell — every page uses it
- `PlantCard.jsx` is the only reusable data-display component; it takes a single `plant` prop matching the schema in `plants.js`
- Interactive state (filter dropdowns, lightbox, form submission) is managed with local `useState` — no global state library
