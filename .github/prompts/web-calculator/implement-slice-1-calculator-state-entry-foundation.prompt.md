---
name: implement-web-calculator-slice-1-entry-foundation
description: Implement Slice 1 for the web calculator, covering numeric input, display state, and baseline responsive behavior.
temperature: 0.2
tags: ["implementation", "promptfile", "calculator", "vertical-slice", "cqrs"]
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "update-web-calculator-implementation-prompts-tech-stack-20260327"
prompt: |
  update the implementation prompts with any tech stack information as needed
started: "2026-03-27T04:30:00Z"
ended: "2026-03-27T04:55:00Z"
task_durations:
  - task: "current state review"
    duration: "00:08:00"
  - task: "prompt update authoring"
    duration: "00:12:00"
  - task: "traceability updates"
    duration: "00:05:00"
total_duration: "00:25:00"
ai_log: "ai-logs/2026/03/27/update-web-calculator-implementation-prompts-tech-stack-20260327/conversation.md"
source: "github-copilot-chat"
owner: "Development Team"
version: "1.0.0"
prompt_metadata:
  id: implement-web-calculator-slice-1-entry-foundation
  title: Implement Web Calculator Slice 1
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-1-calculator-state-entry-foundation.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 1: Calculator State Entry Foundation

## Context

Implement Slice 1 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) and keep it aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the real workspace before changing files. Preserve unrelated user edits. Follow the repository instructions that apply to the files you touch. Keep command and query responsibilities separate.

If the repository still lacks the web foundation required for this slice, create only the minimum web-ready structure needed to support Slice 1. Do not pull later-slice behavior into the implementation.

Use the recommended stack unless the workspace already contains an approved alternative: React, TypeScript, Vite, Zustand, Zod, CSS Modules, Vitest, React Testing Library, Playwright, and pnpm.

## Objective

Deliver the base calculator input flow so a user can enter digits, add a decimal point, toggle sign, and see deterministic display and status output.

## Required Technology Use

- Implement the UI with React function components and TypeScript.
- Model Slice 1 command/query behavior in a Zustand-backed application layer, while keeping calculator rules in framework-light TypeScript modules.
- Use Zod only where runtime validation protects command boundaries or configuration input.
- Style the display and keypad with CSS Modules and keep the layout usable at 360 px width.
- Cover logic with Vitest and user-facing component behavior with React Testing Library.
- Use Playwright only for browser-level responsive verification needed by this slice.
- Follow `.github/instructions/react.instructions.md`, `.github/instructions/typescript.instructions.md`, `.github/instructions/vite.instructions.md`, `.github/instructions/zustand.instructions.md`, `.github/instructions/zod.instructions.md`, `.github/instructions/css-modules.instructions.md`, `.github/instructions/vitest.instructions.md`, `.github/instructions/react-testing-library.instructions.md`, `.github/instructions/playwright.instructions.md`, and `.github/instructions/pnpm.instructions.md`.

## Slice Scope

- Goal: Establish base input handling and display/query behavior.
- Use Cases:
  - `UC-1.1 Enter Number Input`
  - `UC-1.2 View Current Calculator Status`
- Commands:
  - `EnterDigitCommand`
  - `EnterDecimalPointCommand`
  - `ToggleSignCommand`
- Queries:
  - `GetCalculatorDisplayQuery`
  - `GetCalculatorStatusQuery`
- Dependencies:
  - None
- Exit Criteria:
  - Base numeric entry works predictably.
  - Display and status queries return deterministic results.

## Implementation Workflow

1. Inspect the current repository structure and identify the minimum set of files needed for a web-based calculator entry slice.
2. Define or refine the calculator state model so it can represent current input, sign state, and status text without embedding future arithmetic behavior.
3. Implement the write-side handlers for digit entry, decimal entry, and sign toggle with explicit validation rules.
4. Implement read-side query models that return the current display value and status text without mutating state.
5. Wire the UI so on-screen numeric controls invoke the Slice 1 commands and render only the Slice 1 query results.
6. Ensure the layout is usable at a 360 px mobile width and that display text remains readable during normal entry.
7. Add automated tests for command validation, state transitions, and query determinism.
8. Review the slice boundary and remove any accidental dependency on operator execution, memory, or scientific behavior.

## Constraints

- Do not implement arithmetic execution, clear flows, or memory behavior in this slice.
- Keep the command handlers deterministic and small.
- Keep queries read-only and side-effect free.
- If a technology-stack decision blocks implementation, ask one focused question instead of guessing.

## Independent Verification

The AI agent must validate the implementation without relying on manual assurances.

1. Run unit tests for input validation and state-transition behavior.
2. Verify the display query updates after every accepted input command.
3. Verify invalid decimal input does not corrupt state.
4. Run a mobile-width smoke test at 360 px.
5. Confirm that query calls do not change calculator state.
6. Confirm no Slice 2 or later controls are functional unless they were already present and intentionally left disabled.

## Stakeholder Showcase

Guide a human presenter to demonstrate the slice clearly.

1. Start with a clean calculator state and show the initial display and status.
2. Enter a multi-digit value, then add a decimal point, and explain that input validation prevents malformed numeric state.
3. Toggle the sign and explain that the state change happens through a command while the UI reflects it through read-side queries.
4. Resize the viewport to mobile width and show that entry and display remain usable.
5. Close by stating what is intentionally not included yet: arithmetic execution, edit/recovery actions, and advanced functions.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- command and query surfaces added or updated
- tests added or updated
- verification steps executed and their outcomes
- any blocker, assumption, or deferred decision
