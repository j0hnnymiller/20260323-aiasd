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
name: zustand
description: Standards and practices for Zustand state management in the web calculator project
applyTo: "src/**/*.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["zustand", "state-management", "cqrs", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# Zustand Standards

## Overview

Use Zustand as the lightweight application store for calculator state, command execution, and query selection.

## Core Rules

- Treat store actions as command entry points.
- Treat selectors as query surfaces.
- Keep store shape explicit and small.
- Keep domain calculations outside the store when they can remain pure functions.

## Store Design

- Model calculator state centrally.
- Keep actions named by intent.
- Keep read-model selectors derived and deterministic.
- Split store concerns when clarity improves, but avoid premature fragmentation.

## CQRS Alignment

- Commands should update state through explicit actions.
- Queries should read derived state through selectors.
- Do not mix heavy mutation logic inside selectors.
- Keep validation close to command execution boundaries.

## React Integration

- Subscribe to only the slice of state a component needs.
- Avoid broad subscriptions that rerender the whole UI.
- Keep selectors stable and readable.

## Anti-Patterns

- Do not treat the store as a dumping ground for all utilities.
- Do not hide business rules in component event handlers instead of store actions or domain functions.
- Do not mutate state outside approved store update paths.

## Checklist

- [ ] Store actions map to meaningful commands
- [ ] Selectors are side-effect free
- [ ] State shape is explicit and readable
- [ ] Components subscribe narrowly

## Summary

Use Zustand as the application boundary between React components and calculator behavior. Keep actions intentional and selectors deterministic.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react.instructions.md](.github/instructions/react.instructions.md), [.github/instructions/typescript.instructions.md](.github/instructions/typescript.instructions.md)
