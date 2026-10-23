---
title: "What is an AI Agent Harness?"
description: "Simple intro to AI Agent Harness concept"
url: "https://www.databricks.com/blog/ai-harness"
tags: ["ai-agent", "sql"]
category: "Study Notes"
date: 2026-10-22
---

# Notes

1. **Reason**. The model reads everything in its context, including the task, relevant memory and previous results, then decides what action to take next.
2. **Act**. The harness carries out that action by running a tool, executing code in a sandbox, calling an API or writing to storage.
3. **Observe**. The harness captures the result and feeds it back to the model as new context.
4. **Repeat**. The model uses that result to decide what to do next. The loop continues until the task is complete.
