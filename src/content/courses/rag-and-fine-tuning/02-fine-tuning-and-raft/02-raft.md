---
title: "RAFT: retrieval-augmented fine-tuning"
description: "Train a model to recognize useful domain context and ignore irrelevant retrieved documents."
tags: ["raft", "rag", "fine-tuning", "domain-adaptation"]
---

# RAFT: retrieval-augmented fine-tuning

**RAFT** stands for **retrieval-augmented fine-tuning**. It addresses the challenge of building
an efficient language-model application grounded in specialized domain data, such as internal
enterprise documents.

The approach uses RAG to build domain-specific fine-tuning examples. The resulting model is then
used together with RAG at runtime. This combination aims to produce answers that are grounded in
the domain while also following the language and response patterns learned during training.

## RAFT step by step

1. Create or generate domain-specific questions that represent the queries the application
   will receive.
2. Retrieve two types of domain documents for each question:
   - **Oracle documents**, which contain information needed to answer the question.
   - **Distractor documents**, which are relevant to the domain but do not answer that question.
3. Combine each question with its oracle documents to produce an answer with a detailed
   reasoning process.
4. Fine-tune with a mixture of training examples:
   - the question, oracle data, and the correct answer;
   - the question, distractor data, and the correct answer; and
   - the question, a mixture of oracle and distractor data, and the correct answer.

Using all three types of examples teaches the model to identify useful oracle context, ignore
irrelevant distractors, and determine which retrieved information matters for a particular
question.
