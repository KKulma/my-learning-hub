---
title: "Embeddings and knowledge graphs"
description: "How vector similarity helps retrieve context, and how semantic relationships can improve ambiguous matches."
tags: ["embeddings", "knowledge-graphs", "retrieval"]
---

# Embeddings and knowledge graphs

## Embeddings

Imagine storing each recipe from a recipe book as a record in a database. An embeddings model
maps the words in each recipe into a mathematical space. Similar concepts, such as carrot and
squash, tend to be closer together, while less-related concepts are farther apart. The
resulting representation is an embedding for that recipe.

The application stores the original recipe alongside its embedding. When a user asks, “How do
I make a vegetable cake?”, the same embeddings model converts the question into a vector. Basic
mathematical comparisons can then identify recipes whose embeddings are closest to the query.
The application returns the original text from those matches as context for the RAG request.

## The limits of similarity

Similarity does not equal understanding. Consider the phrases “tomato paste” and “toothpaste”.
An ambiguous question such as “What paste do I use to make pasta?” may retrieve both because
the embedding system can identify related words without understanding the intended use.

The problem is that a vector can indicate that concepts are connected without explaining the
meaning of the connection. A relevant RAG system therefore needs more than a collection of
similar terms when the domain contains ambiguous language.

## Knowledge graphs

Knowledge graphs add direction and semantic meaning to relationships between entities. Instead
of recording only that two terms are connected, a graph can represent a relationship such as
“is used in” or “is part of”. In the example above, tomato and paste can be connected to
cooking, while tooth and paste can be connected to hygiene.

With that context, a query about paste used to make pasta can be associated with cooking and
tomato paste rather than toothpaste.

Knowledge graphs are not automatically the right choice for every RAG system. Real applications
may combine traditional databases, APIs, embeddings, and graph-based retrieval. Start with the
most straightforward option that fits the data and evaluate whether more advanced structure is
needed.
