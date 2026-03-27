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
name: react
description: Standards and practices for React components in the web calculator project
applyTo: "src/**/*.{tsx,jsx}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["react", "frontend", "ui", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# React Standards

## Overview

Use React to build the web calculator UI as small, composable components with clear boundaries between presentation and application state.

## Core Rules

- Keep components focused on one user-facing responsibility.
- Prefer function components and hooks.
- Keep domain logic out of JSX and out of render paths.
- Let commands and query selectors drive behavior instead of ad hoc component state.
- Prefer controlled rendering over DOM mutation.

## Component Design

- Separate screen-level components from leaf controls.
- Keep calculator display, keypad, operators, memory actions, and scientific actions in distinct components when they become independently testable.
- Accept explicit props instead of hidden module state.
- Lift only state that is truly view-local; keep calculator business state in the application store.

## State Usage

- Use React local state only for ephemeral UI concerns such as focus hints or temporary presentation toggles.
- Use the shared application store for calculator state, command execution, and query derivation.
- Do not duplicate store state into component state unless there is a clear UI-only reason.

## Rendering Practices

- Keep render functions deterministic.
- Avoid expensive recomputation inside JSX.
- Use derived view models from selectors rather than inline branching spread across the component tree.
- Keep accessibility attributes explicit and readable.

## Event Handling

- Route user actions to named command functions.
- Keep handlers thin.
- Do not embed calculation rules directly inside button click handlers.
- Use keyboard and pointer events to trigger the same command paths.

## Accessibility

- Use semantic elements whenever possible.
- Provide accessible names for all interactive controls.
- Preserve visible focus state.
- Ensure status and error information is perceivable without color alone.

## Anti-Patterns

- Do not put calculator business rules in components.
- Do not create one large page component that owns every concern.
- Do not create separate logic paths for keyboard and pointer interaction.
- Do not use component effects for logic that belongs in commands.

## Checklist

- [ ] Component has a clear single responsibility
- [ ] Business logic is outside render code
- [ ] Interaction routes through explicit commands
- [ ] Accessibility attributes are present and intentional
- [ ] Component remains easy to test in isolation

## Summary

Use React as a thin UI layer over explicit application logic. Components should render state, invoke commands, and remain easy to reason about.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/typescript.instructions.md](.github/instructions/typescript.instructions.md), [.github/instructions/zustand.instructions.md](.github/instructions/zustand.instructions.md), [.github/instructions/evergreen-software-development.instructions.md](.github/instructions/evergreen-software-development.instructions.md)
