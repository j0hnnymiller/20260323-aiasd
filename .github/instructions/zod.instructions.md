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
name: zod
description: Standards and practices for Zod validation in the web calculator project
applyTo: "src/**/*.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["zod", "validation", "typescript", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# Zod Standards

## Overview

Use Zod for runtime validation of command inputs, configuration, and any untrusted client-side input that needs structured validation.

## Core Rules

- Validate at boundaries.
- Keep schemas close to the command or configuration they protect.
- Use parsing results to produce recoverable user-facing validation outcomes.
- Do not replace domain logic with schema validation.

## Schema Design

- Keep schemas explicit and named.
- Reuse schema fragments only when reuse is clear and stable.
- Align schema names with application concepts.
- Keep error messaging understandable to developers and translatable to user-friendly feedback.

## Usage Guidance

- Validate command payloads before state mutation.
- Validate persisted or imported configuration before use.
- Convert schema failures into typed validation results when the failure is part of normal behavior.

## Anti-Patterns

- Do not use one giant schema for unrelated concerns.
- Do not hide business rules entirely inside schemas.
- Do not skip domain validation because schema validation passed.

## Checklist

- [ ] Schema is close to the boundary it protects
- [ ] Validation failure handling is explicit
- [ ] Schema does not replace domain rules
- [ ] Names match product concepts

## Summary

Use Zod for boundary validation and clear runtime guarantees. Keep schemas focused and keep business rules separate.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/typescript.instructions.md](.github/instructions/typescript.instructions.md), [.github/instructions/zustand.instructions.md](.github/instructions/zustand.instructions.md)
