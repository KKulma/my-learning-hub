---
title: "Fine-tuning"
description: "Use training examples to make a foundation model respond in consistent, task-specific ways."
tags: ["fine-tuning", "model-training"]
---

# Fine-tuning

Fine-tuning provides a foundation model with many completed examples. Each example can include
a system message, a prompt, and an expected response. By training on these exchanges, the model
learns patterns for responding to particular types of queries.

Once the model has been fine-tuned, the application does not need to restate every behavior in a
complex system message. The behavior is represented in the model's learned response patterns.

## What fine-tuning can shape

Fine-tuning can be used to:

- conform responses to a particular tone;
- include predefined information, such as a standard support or contact phrase; and
- perform consistent actions, such as providing a document or database reference.

## The trade-off

Fine-tuning requires a substantial set of useful training examples. Those examples must be
processed repeatedly, and the result may still require trial and error before it behaves as
intended. A fine-tuned model can nevertheless be valuable when consistency matters at scale:
it reduces variation in responses and gives the application more direct control over model
behavior than a foundation model alone.
