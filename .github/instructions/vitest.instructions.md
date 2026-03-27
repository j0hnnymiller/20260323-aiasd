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
name: vitest
description: Standards and practices for Vitest unit and integration tests in the web calculator project
applyTo: "{src,tests}/**/*.{test,spec}.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["vitest", "testing", "typescript", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# Vitest Standards

## Overview

Use Vitest for unit and slice-level integration testing of domain logic, command behavior, selectors, and small application integrations.

## Core Rules

- Test behavior, not implementation trivia.
- Keep pure domain tests separate from UI tests.
- Name tests by user-visible or domain-relevant outcome.
- Cover both happy-path and failure-path behavior.

## Coverage Priorities

- Command validation and state transitions
- Query selector determinism
- Arithmetic, percent, memory, and scientific rules
- Recovery behavior and regressions across slices

## Test Design

- Prefer table-driven tests when behavior varies by input matrix.
- Keep tests isolated and deterministic.
- Use realistic state shapes.
- Avoid over-mocking pure logic.

## Anti-Patterns

- Do not test framework internals.
- Do not assert incidental implementation details when outcome assertions are enough.
- Do not skip edge cases on critical calculation paths.

## Checklist

- [ ] Test names describe behavior
- [ ] Happy path and failure path are covered
- [ ] Critical calculations are regression-protected
- [ ] Tests are deterministic and isolated

## Summary

Use Vitest to prove the correctness of calculator behavior at the logic and slice-integration level before release hardening.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react-testing-library.instructions.md](.github/instructions/react-testing-library.instructions.md), [.github/instructions/playwright.instructions.md](.github/instructions/playwright.instructions.md)
