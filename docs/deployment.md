# Deploying to GitHub Pages

The repository includes a ready-to-run GitHub Actions workflow in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) that builds and deploys your site whenever changes are pushed to `main`.

---

## 1. Configure Repository Settings on GitHub

Once you create and push this repository to GitHub:

1. Open your repository on **GitHub.com**.
2. Click **Settings** (top tab) -> **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment**:
   * Set **Source** to **GitHub Actions** (do NOT choose "Deploy from a branch").
4. Save changes.

---

## 2. Configure `astro.config.mjs`

To make sure images, CSS, and navigation links resolve properly on your GitHub Pages URL, update [`astro.config.mjs`](../astro.config.mjs):

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Replace <username> with your GitHub username:
  site: 'https://<username>.github.io',
  
  // Set to your GitHub repository name:
  base: '/my-learning-hub',

  integrations: [tailwind(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

* If you are hosting the site at the root domain or user page (e.g. `https://<username>.github.io`), omit `base` or set it to `'/'`.
* If hosting at a project repository (e.g. `https://<username>.github.io/my-learning-hub/`), set `base: '/my-learning-hub'`.

---

## 3. First Push to GitHub

Initialize your remote and push your code:

```bash
git add .
git commit -m "Initial commit of my-learning-hub"
git remote add origin https://github.com/<username>/my-learning-hub.git
git push -u origin main
```

Once pushed, navigate to the **Actions** tab on GitHub to monitor the deployment pipeline. When completed, your website will be live at:

`https://<username>.github.io/my-learning-hub/`
