---
title: "RAG and model grounding"
description: "Why a language model needs retrieved context to answer questions about specialized or private information."
tags: ["rag", "grounding", "llms"]
---

# RAG and model grounding

Chat-based language models can look like a combination of a search engine and a knowledgeable
assistant. They can answer questions and perform tasks fluently, but a language model is not
fundamentally a knowledge lookup system. It is a language transformer that generates likely
continuations from patterns learned during training.

This distinction matters when an application needs accurate, specialized, or private
information. A model can produce a plausible answer without having access to the information
that the answer should be based on.

## Supplying relevant context

One way to improve an answer is to put relevant context directly into the request. Doing this
manually does not scale, so a production application needs to retrieve useful context when the
user asks a question. This is the core idea behind **retrieval-augmented generation (RAG)**:

1. Receive a user question.
2. Retrieve information relevant to that question.
3. Add the retrieved information to the model request.
4. Generate an answer grounded in the supplied context.

The retrieval source can be simple or advanced. For example, an online store might retrieve
product information from a database through an API. Other applications may need vector
embeddings or knowledge graphs to identify the most relevant information.

## Choosing a retrieval approach

There is no single retrieval technology that is best for every application. The choice depends
on the data, how often it changes, and the effort required to transform and index it. A
practical approach is to start with the simplest source that can provide acceptable results,
then consider embeddings or knowledge graphs when the basic approach is not accurate enough.
