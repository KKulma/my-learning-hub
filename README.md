# AI Learning Hub 🧠

A personal, fast, and structured static website for logging, summarizing, and searching AI educational resources, technical notes, papers, and certification prep.

Built with **[Astro](https://astro.build)**, **[Tailwind CSS](https://tailwindcss.com)**, and **[Pagefind](https://pagefind.app)** for deployment to **GitHub Pages**.

---

## Features

* **Card & Bubble UI**: Browse summaries with topic tags and category badges.
* **Instant Filtering & Search**: Filter entries instantly by keywords, types (`resources`, `notes`, `courses`), or tag bubbles on the homepage, with full-text search powered by Pagefind.
* **Markdown & MDX Native**: Write standard `.md` or interactive `.mdx` files with full Shiki syntax highlighting.
* **Automated Publishing**: GitHub Actions workflow builds and deploys updates on every push.
* **Future-Proof**: Easily evolves into a personal portfolio and project showcase with interactive components.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server with hot-reload
npm run dev

# Build for production and generate search index
npm run build

# Preview production build locally
npm run preview
```

---

## Documentation

Full guides are available in the [`docs/`](./docs) folder:

* 📖 **[Local Development & Setup](./docs/local-development.md)**: How to run, test, and preview locally.
* ✍️ **[Adding & Organizing Content](./docs/adding-content.md)**: Templates, schemas, tagging tips, and zero-install GitHub editing workflow.
* 🚀 **[GitHub Pages Deployment](./docs/deployment.md)**: Configuring repository settings and URLs for automated deployment.

---

## Directory Layout

```text
my-learning-hub/
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD
├── docs/                          # Guides on adding content, running, & deploying
├── public/                        # Static assets (favicons, diagrams)
├── src/
│   ├── components/                # UI components (Card, TagPill, etc.)
│   ├── content/                   # Content collections
│   │   ├── config.ts              # Zod frontmatter schema definitions
│   │   ├── courses/               # Course notes & certification trackers
│   │   ├── notes/                 # Technical notes & deep-dives
│   │   └── resources/             # Bookmarks, papers, tools with commentary
│   ├── layouts/                   # Base layout & site navigation
│   └── pages/                     # Routes (Home, Resources, Notes, Courses, Search, Tags)
├── astro.config.mjs               # Astro & GitHub Pages configuration
└── package.json                   # Dependencies and scripts
```
