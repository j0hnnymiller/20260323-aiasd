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
name: react-testing-library
description: Standards and practices for React Testing Library tests in the web calculator project
applyTo: "{src,tests}/**/*.{test,spec}.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["react-testing-library", "testing", "react", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# React Testing Library Standards

## Overview

Use React Testing Library to verify component behavior through user-oriented interactions and accessible queries.

## Core Rules

- Prefer queries that match how users find elements.
- Test interaction flows, not component internals.
- Assert visible outcomes and accessible state.
- Keep tests aligned with slice use cases.

## Query Guidance

- Prefer role, label, text, and accessible-name queries.
- Use test IDs only when semantic queries are not practical.
- Keep assertions focused on what the user can perceive.

## Interaction Guidance

- Use realistic input flows for clicks, keyboard interaction, and focus movement.
- Verify error and status changes that matter to users.
- Cover accessibility-critical behavior when it changes UI outcomes.

## Anti-Patterns

- Do not test implementation-specific class names or hook internals.
- Do not rely on brittle DOM structure assertions when user-facing assertions are enough.
- Do not ignore accessible names when testing controls.

## Checklist

- [ ] Queries are user-oriented
- [ ] Test covers observable behavior
- [ ] Accessibility-sensitive behavior is asserted where relevant
- [ ] Test remains resilient to harmless refactors

## Summary

Use React Testing Library to keep component tests grounded in real user behavior and accessible interaction patterns.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react.instructions.md](.github/instructions/react.instructions.md), [.github/instructions/vitest.instructions.md](.github/instructions/vitest.instructions.md)
