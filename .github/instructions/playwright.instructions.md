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
name: playwright
description: Standards and practices for Playwright end-to-end testing in the web calculator project
applyTo: "tests/e2e/**/*.{ts,tsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["playwright", "e2e", "testing", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# Playwright Standards

## Overview

Use Playwright to verify end-to-end calculator behavior, accessibility-critical flows, responsive behavior, and release readiness across supported browsers.

## Core Rules

- Organize tests by user workflow or implementation slice.
- Keep scenarios readable and traceable to documented use cases.
- Prefer stable selectors based on accessible semantics.
- Use Playwright to verify release confidence, not to duplicate every unit test.

## Coverage Priorities

- Slice-level happy paths
- Cross-slice regression flows
- Keyboard workflows
- Mobile-width usability checks
- Error recovery flows
- Final release hardening scenarios

## Browser Strategy

- Cover Chrome, Edge, Firefox, and Safari-equivalent targets as supported by the project.
- Keep the MVP matrix realistic and maintainable.

## Anti-Patterns

- Do not move heavy business-rule verification out of lower-level tests into only E2E coverage.
- Do not depend on brittle selectors.
- Do not build massive end-to-end tests when smaller scenario-focused coverage is sufficient.

## Checklist

- [ ] Scenarios map to real user flows
- [ ] Selectors are stable and semantic
- [ ] Responsive and keyboard checks are included where relevant
- [ ] Release-blocking flows are covered

## Summary

Use Playwright to confirm that the implemented slices behave correctly in real browser conditions and remain releaseable across supported environments.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react-testing-library.instructions.md](.github/instructions/react-testing-library.instructions.md), [.github/instructions/css-modules.instructions.md](.github/instructions/css-modules.instructions.md)
