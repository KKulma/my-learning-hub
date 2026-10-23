# Content Workflow & Guide

This guide describes the workflow for adding, organizing, and tagging new content in your Learning Hub.

---

## Content Organization

All markdown and MDX files live in `src/content/` under three collections:

```text
src/content/
├── resources/    # Links, tools, papers, bookmarks with your commentary
├── notes/        # Short & long-form technical notes, architecture writeups
└── courses/      # Course curriculum tracking, certifications, and module notes
```

---

## 1. Adding a Resource (`src/content/resources/`)

Use this for external bookmarks, research papers, YouTube videos, blog posts, or toolkits you want to save with notes.

Create a new file, for example: `src/content/resources/my-new-resource.md`:

```markdown
---
title: "Article or Paper Title"
description: "A concise 1-2 sentence description of what this resource is and why it matters."
url: "https://example.com/link-to-article"
tags: ["LLMs", "Evaluation", "Paper"]
category: "Model Evaluation"
date: 2026-10-22
rating: 5 # Optional rating 1-5
---

# Your Personal Title or Header

Summarize your thoughts or paste excerpts here.

## Key Takeaways
- What makes this resource stand out
- Concrete insights or formulas
- Personal commentary on how to apply it
```

---

## 2. Adding a Technical Note (`src/content/notes/`)

Use this for your own distilled guides, architectural patterns, cheatsheets, and deep dives.

Create a new file, for example: `src/content/notes/vector-databases-comparison.md`:

```markdown
---
title: "Vector Databases: Pinecone vs Qdrant vs Milvus"
description: "Comparison of managed and open-source vector databases for production RAG."
tags: ["Vector DB", "RAG", "Database", "Architecture"]
category: "Infrastructure"
date: 2026-10-22
updatedDate: 2026-10-25 # Optional
---

# Vector Databases Comparison

## Tradeoffs Overview
Write your notes, embed code blocks, formulas, or mermaid diagrams.

```python
# Code blocks are automatically syntax highlighted
import chromadb
client = chromadb.Client()
```

---

## 3. Adding a Course / Certificate (`src/content/courses/`)

Use this to log courses you are taking or certificate preparation (e.g. AWS, GCP, DeepLearning.AI). A course can be a **single file** (short courses) or a **folder with chapters and many pages of notes** (most courses).

### Option A: Multi-chapter course (recommended for detailed notes)

Use one folder per course, one subfolder per chapter, and one Markdown file per lecture or topic:

```text
src/content/courses/
└── aws-ai-practitioner/
    ├── index.md                         # Course overview + course metadata (required)
    ├── 01-fundamentals-of-ai-ml/
    │   ├── index.md                     # Chapter intro (optional)
    │   ├── 01-ml-lifecycle.md
    │   ├── 02-evaluation-metrics.md
    │   └── images/
    │       └── confusion-matrix.png
    └── 02-generative-ai/
        ├── 01-foundation-models.md
        └── 02-bedrock-pricing.md
```

URLs follow the folders:

```text
/courses/aws-ai-practitioner                                          # overview + table of contents
/courses/aws-ai-practitioner/01-fundamentals-of-ai-ml                 # chapter page
/courses/aws-ai-practitioner/01-fundamentals-of-ai-ml/02-evaluation-metrics
```

**What you get automatically:**

- `/courses` shows **one card per course**, with "N chapters · N pages".
- The course page lists every chapter and page in a **table of contents**.
- Every note page has **breadcrumbs**, a **sidebar** with all chapters (the current one is expanded), and **previous/next** buttons that continue from one chapter into the next.
- Tags on individual note pages show up on the matching `/tags/<tag>` page.
- **Ordering** comes from the numeric filename prefixes (`01-`, `02-`…). You never maintain a list by hand: to add a page, add a file.

#### Course overview: `aws-ai-practitioner/index.md` (required)

Holds the course metadata. The body is for the summary: why you're taking the course and your overall takeaways.

```markdown
---
title: "AWS Certified AI Practitioner Prep"
description: "Study notes and domain reviews for AIF-C01."
provider: "AWS / Coursera"
status: "in-progress" # "not-started" | "in-progress" | "completed"
tags: ["AWS", "Certification", "Cloud"]
date: 2026-10-22
certificateUrl: "https://example.com/badge" # Optional, add once completed
---

Why I'm taking this course and my overall takeaways.
```

#### Chapter intro: `01-fundamentals-of-ai-ml/index.md` (optional)

Without this file, the chapter title comes from the folder name (`01-fundamentals-of-ai-ml` → "Fundamentals Of Ai Ml"). Add it when you want a proper title, a description, or an intro paragraph.

```markdown
---
title: "Fundamentals of AI and ML"
description: "Domain 1: core ML concepts and the ML lifecycle."
---

Short chapter summary (optional).
```

#### Note pages: `01-fundamentals-of-ai-ml/02-evaluation-metrics.md`

Only `title` is required:

```markdown
---
title: "Evaluation Metrics"
description: "Precision, recall, F1 and when to use each." # optional
tags: ["Evaluation"]                                    # optional
order: 2                                                # optional, overrides the filename prefix
---

## Confusion Matrix

![Confusion matrix](./images/confusion-matrix.png)
```

#### Workflow for a new course

1. Create `src/content/courses/<course-slug>/index.md` with the course metadata.
2. Create one folder per chapter: `01-…`, `02-…`.
3. Add one file per lecture or topic inside each chapter: `01-….md`, `02-….md`.
4. As you progress, update `status` in the course `index.md`.
5. Check it in `npm run dev`, then commit.

> **Rules:** Keep to three levels (course → chapter → page). Every course folder needs an `index.md`, and the build fails with a clear message if one is missing. See `src/content/courses/example-course/` for a working example.

### Option B: Single-file course

For a short course, a single file is fine: `src/content/courses/aws-cloud-quest.md`, with the same frontmatter as the course `index.md` above and your notes in the body. You can convert it later by moving it to `aws-cloud-quest/index.md` and adding chapter folders. The URL stays the same. Example:

```markdown
---
title: "AWS Certified AI Practitioner Prep"
description: "Study notes, domain reviews, and exam flashcard concepts for AIF-C01."
provider: "AWS / Coursera"
status: "in-progress" # "not-started" | "in-progress" | "completed"
tags: ["AWS", "Certification", "Cloud", "MLOps"]
date: 2026-10-22
certificateUrl: "https://example.com/badge" # Optional link when completed
---

# AWS Certified AI Practitioner Prep

## Study Plan & Progress
- [x] Domain 1: Fundamentals of AI and ML
- [ ] Domain 2: Fundamentals of Generative AI
- [ ] Domain 3: Applications of Foundation Models
- [ ] Domain 4: Guidelines for Responsible AI
- [ ] Domain 5: Security, Compliance, and Governance

## High-Yield Concepts & Formulas
- Confusion Matrix & F1-score notes...
- Bedrock pricing models (On-demand vs Provisioned Throughput)...
```

---

## 4. Tagging Best Practices

* **Consistency**: Use title case or lowercase consistently (e.g. `["RAG", "Agents", "Evaluation"]`). The search and bubble filters handle tag matching case-insensitively.
* **Granularity**: Mix high-level tags (e.g. `LLMs`, `Cloud`) with specific subtopics (e.g. `Chunking`, `Quantization`, `Fine-Tuning`).
* Tags automatically turn into interactive bubble chips on the card and generate dedicated filter pages (`/tags/<tag-name>`).

---

## 5. Adding Content from Any Machine (Zero-Install Workflow)

When you are on another laptop or away from your primary setup:
1. Navigate to your repository on **GitHub.com** in any browser.
2. Press the `.` (period) key on your keyboard. This opens the **github.dev web-based VS Code editor** directly in your browser.
3. In `src/content/`, click **New File** (e.g. `src/content/notes/new-concept.md`).
4. Paste the template, write your notes, and commit via the Source Control tab in the left sidebar.
5. GitHub Actions will automatically compile and deploy your updates within ~40 seconds!
