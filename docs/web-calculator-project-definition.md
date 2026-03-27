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
---

# Web Calculator Project Definition

## Objective

Define the recommended implementation stack for the web calculator so product, design, and engineering can align on a browser-first architecture that supports CQRS-style client behavior, vertical-slice delivery, accessibility, and low-risk MVP execution.

## Problem Statement

The repository currently contains a .NET WPF calculator and planning artifacts for a future web-based calculator. The project now needs a concrete web technology decision so implementation can begin with a consistent frontend architecture, testing strategy, and developer workflow.

## User And Business Context

### Primary User Needs

- Fast arithmetic in a browser without installation friction
- Responsive layout at desktop and mobile widths
- Deterministic command and query behavior
- Strong keyboard and assistive-technology support

### Delivery Constraints

- MVP is client-side only
- Architecture should preserve a future path to server-backed CQRS if needed later
- The stack should support vertical-slice delivery and incremental testing
- The stack should minimize setup overhead and maximize implementation speed

## Options And Tradeoffs

### Option 1: React + TypeScript + Vite

- Impact: High
- Effort: Low to moderate
- Risk: Low
- Strengths:
  - Large ecosystem for accessibility, testing, and browser delivery
  - Fast local development and build times
  - Good fit for explicit command/query separation in client state
- Weaknesses:
  - Introduces a TypeScript web stack that differs from the current WPF implementation

### Option 2: Blazor WebAssembly + .NET 8

- Impact: Medium
- Effort: Moderate
- Risk: Moderate
- Strengths:
  - Strong alignment with existing .NET familiarity
  - Future backend alignment is straightforward in a Microsoft stack
- Weaknesses:
  - Smaller ecosystem for frontend testing and accessibility tooling
  - Heavier than needed for a lightweight calculator MVP

### Option 3: Vanilla TypeScript

- Impact: Medium
- Effort: Moderate
- Risk: Moderate
- Strengths:
  - Minimal runtime and dependency footprint
  - Fine for a very small utility application
- Weaknesses:
  - More custom architecture work
  - Higher maintenance burden once slices and tests expand

## Recommendation

Use a React-based frontend stack with TypeScript, Vite, Zustand, Zod, CSS Modules, Vitest, React Testing Library, Playwright, and pnpm.

This recommendation optimizes for delivery speed, testability, accessibility coverage, and maintainability while keeping the MVP fully client-side.

## Recommended Tech Stack

| Technology            | Role                                 | Why It Is Recommended                                                                | Instruction File                                             |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| React                 | UI framework                         | Strong component model, broad ecosystem, excellent accessibility and testing support | `.github/instructions/react.instructions.md`                 |
| TypeScript            | Application language                 | Strong typing for command/query contracts and state models                           | `.github/instructions/typescript.instructions.md`            |
| Vite                  | Build tool and dev server            | Fast feedback loop and simple frontend setup                                         | `.github/instructions/vite.instructions.md`                  |
| Zustand               | Client state management              | Lightweight store model that fits explicit CQRS-style command/query separation       | `.github/instructions/zustand.instructions.md`               |
| Zod                   | Runtime validation                   | Clear validation of command payloads and config inputs                               | `.github/instructions/zod.instructions.md`                   |
| CSS Modules           | Styling strategy                     | Simple scoped styling without large design-system overhead                           | `.github/instructions/css-modules.instructions.md`           |
| Vitest                | Unit and integration test runner     | Fast TypeScript-native test loop with Vite alignment                                 | `.github/instructions/vitest.instructions.md`                |
| React Testing Library | Component and interaction testing    | Tests behavior the way users interact with the UI                                    | `.github/instructions/react-testing-library.instructions.md` |
| Playwright            | End-to-end and cross-browser testing | Strong fit for slice verification and release hardening                              | `.github/instructions/playwright.instructions.md`            |
| pnpm                  | Package manager                      | Fast installs, deterministic lockfile behavior, good workspace support               | `.github/instructions/pnpm.instructions.md`                  |

## Recommended Architecture Shape

### Frontend Structure

- `src/app/` for application bootstrap and routing
- `src/features/` for vertical slices
- `src/domain/` for calculator state rules and pure calculation logic
- `src/shared/` for reusable UI primitives and utilities that are justified by repeated use
- `tests/` for end-to-end and slice-level integration coverage

### CQRS Alignment

- Commands mutate client-side calculator state through explicit application functions
- Queries derive read models for display, status, error, and memory indicators
- Validation occurs at command boundaries before state mutation
- Domain logic remains framework-light and testable in isolation

## Delivery Guidance

### MVP Stack Scope

Mandatory for MVP:

- React
- TypeScript
- Vite
- Zustand
- Zod
- CSS Modules
- Vitest
- React Testing Library
- Playwright
- pnpm

Deferred until justified:

- Backend API infrastructure
- Persistent storage
- PWA packaging
- Large component libraries
- Global state or data-fetching frameworks beyond current needs

## Acceptance Criteria

- The selected stack supports all slices in [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md)
- Slice 1 through Slice 5 can be implemented without backend dependency
- The testing stack supports unit, component, integration, and end-to-end validation
- Accessibility and responsive behavior can be verified within the chosen tooling
- The project structure preserves a future path to server-backed CQRS without requiring it in MVP

## Success Metrics

- Developers can run the app and tests locally with a small, predictable setup
- Command and query behavior can be tested independently
- End-to-end slice verification can be automated for MVP flows
- Browser and mobile-width confidence can be demonstrated before release

## Open Questions

- Should percent semantics be finalized before Slice 5 implementation begins?
- Should trigonometric behavior assume degrees only for MVP?
- Does the team want a future SSR or backend integration path documented now, or only after the client MVP lands?

## Summary

The recommended stack is a lightweight TypeScript frontend architecture centered on React and Vite, with explicit client-side CQRS boundaries, focused validation, and strong automated testing. This is the lowest-risk way to implement the planned web calculator while preserving future extensibility.
