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
name: css-modules
description: Standards and practices for CSS Modules styling in the web calculator project
applyTo: "src/**/*.module.css"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["css-modules", "styling", "frontend", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# CSS Modules Standards

## Overview

Use CSS Modules for locally scoped styling in the web calculator UI.

## Core Rules

- Scope styles to the component they serve.
- Use clear class names based on role, not presentation trivia.
- Prefer layout and state clarity over visual cleverness.
- Keep responsive behavior intentional and testable.

## Styling Guidance

- Keep display, keypad, operator groups, and status treatments readable.
- Use CSS variables when shared values become repeated.
- Preserve visible focus indicators.
- Maintain sufficient contrast for text, controls, and error states.

## Responsive Design

- Design for 360 px mobile width as a minimum target.
- Keep touch targets usable.
- Avoid layout tricks that hide core controls at narrow widths.

## Anti-Patterns

- Do not use global selectors when local module styles suffice.
- Do not encode component structure so rigidly that small layout changes become brittle.
- Do not remove focus styling.

## Checklist

- [ ] Styles are component-scoped
- [ ] Naming is clear and role-based
- [ ] Focus and error states remain visible
- [ ] Mobile-width layout is usable

## Summary

Use CSS Modules to keep styles local, maintainable, and responsive. Styling should support usability first.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/react.instructions.md](.github/instructions/react.instructions.md), [.github/instructions/playwright.instructions.md](.github/instructions/playwright.instructions.md)
