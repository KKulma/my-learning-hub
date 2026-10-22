# Running the Website Locally

This guide explains how to set up, run, and preview the **AI Learning Hub** on your local machine.

---

## Prerequisites

* **Node.js**: Version 18.17.1 or higher (v20 or v22 recommended).
  * Check your installed version:
    ```bash
    node -v
    ```
* **Git**: Installed and configured.

---

## 1. Setup & Installation

Clone your repository (if working on a new machine) and navigate into the folder:

```bash
cd my-learning-hub
npm install
```

---

## 2. Start the Local Development Server

Run the development server with hot-reloading:

```bash
npm run dev
```

* Astro will start locally (typically at `http://localhost:4321/`).
* Open `http://localhost:4321/` in your browser.
* Any edits made to files in `src/content/`, `src/pages/`, or `src/components/` will instantly update in the browser without reloading manually.

---

## 3. Test the Production Build & Search Indexing

To verify how the site compiles for GitHub Pages and build the static Pagefind search index:

```bash
npm run build
```

This runs three steps:
1. `astro check`: Validates your TypeScript and Content Collection frontmatter (ensuring no required tags, titles, or dates are missing or malformed).
2. `astro build`: Compiles all static HTML, CSS, and assets into the `dist/` directory.
3. `pagefind --site dist`: Indexes all compiled pages to generate the offline search database.

To preview this compiled production build locally:

```bash
npm run preview
```

---

## 4. Useful Commands Cheatsheet

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Validates frontmatter, compiles static site, and builds search index |
| `npm run preview` | Serves the production build from `dist/` locally |
| `npx astro check` | Runs frontmatter and type checks without building |
