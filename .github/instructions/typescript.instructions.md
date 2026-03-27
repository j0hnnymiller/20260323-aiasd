---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-web-calculator-project-definition-and-tech-instructions-20260327"
prompt: |
  create a project definition document that specifies the recommended tech stack. For each recommended technology create an instruction file that contains the standards and practices for using that technology.
started: "2026-03-27T03:40:00Z"
ended: "2026-03-27T04:20:00Z"
task_durations:
  - task: "current state review"
    duration: "00:08:00"
  - task: "project definition authoring"
    duration: "00:12:00"
  - task: "technology instruction authoring"
    duration: "00:15:00"
  - task: "traceability updates"
    duration: "00:05:00"
total_duration: "00:40:00"
ai_log: "ai-logs/2026/03/27/create-web-calculator-project-definition-and-tech-instructions-20260327/conversation.md"
source: "github-copilot-chat"
name: typescript
description: Standards and practices for TypeScript code in the web calculator project
applyTo: "src/**/*.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["typescript", "frontend", "cqrs", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# TypeScript Standards

## Overview

Use TypeScript to make command contracts, query models, and calculator state transitions explicit and verifiable.

## Core Rules

- Use strict typing.
- Prefer explicit domain types over loose object shapes.
- Model commands, query results, and state separately.
- Keep shared types small and purposeful.
- Prefer discriminated unions for state variants when they improve clarity.

## Modeling Guidance

- Create explicit types for calculator state, display models, errors, and memory state.
- Keep command input types immutable where practical.
- Use clear names that reflect the product language.
- Do not use `any` unless there is no viable typed alternative.

## Function Design

- Keep pure domain functions pure.
- Prefer small functions with explicit inputs and outputs.
- Return predictable result shapes for command execution.
- Keep query selectors side-effect free.

## Error Handling

- Use typed error models for recoverable user-facing failures.
- Avoid throwing for normal calculator validation outcomes.
- Reserve exceptions for truly unexpected failures.

## Boundaries

- Keep framework-specific types out of domain logic when possible.
- Keep validation schemas and derived runtime checks close to their command boundaries.
- Keep test helpers typed and readable.

## Anti-Patterns

- Do not use `any` for application state.
- Do not collapse commands and queries into one generic type.
- Do not hide nullability or optional behavior in unclear shapes.
- Do not let component props become untyped pass-through bags.

## Checklist

- [ ] Types are explicit and readable
- [ ] Commands, queries, and state are modeled separately
- [ ] Recoverable errors use typed shapes
- [ ] Domain logic stays framework-light
- [ ] `any` is not used without clear justification

## Summary

Use TypeScript to protect the application model, not just the UI surface. Strong typing should reinforce CQRS clarity and predictable calculator behavior.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react.instructions.md](.github/instructions/react.instructions.md), [.github/instructions/zod.instructions.md](.github/instructions/zod.instructions.md), [.github/instructions/vitest.instructions.md](.github/instructions/vitest.instructions.md)
