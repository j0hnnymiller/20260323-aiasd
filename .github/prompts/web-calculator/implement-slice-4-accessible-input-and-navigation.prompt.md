---
name: implement-web-calculator-slice-4-accessible-input-and-navigation
description: Implement Slice 4 for the web calculator, covering keyboard parity, focus behavior, and assistive-technology support.
temperature: 0.2
tags:
  [
    "implementation",
    "promptfile",
    "calculator",
    "vertical-slice",
    "cqrs",
    "accessibility",
  ]
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
  id: implement-web-calculator-slice-4-accessible-input-and-navigation
  title: Implement Web Calculator Slice 4
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-4-accessible-input-and-navigation.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 4: Accessible Input And Navigation

## Context

Implement Slice 4 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md). Validate the existing Slice 1 through Slice 3 behaviors through accessible interaction paths rather than introducing a parallel business-logic path.

Read [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md) first. Inspect the current UI and event wiring before editing. Keep the same command handlers and query models as the source of truth.

## Objective

Ensure that keyboard and assistive-technology users can perform the shipped calculator workflows with the same business behavior as pointer users.

## Required Technology Use

- Implement accessibility improvements in React components without creating a second business-logic path.
- Keep command routing in Zustand-backed actions and keep query output typed through TypeScript selectors or view models.
- Use CSS Modules in a way that preserves visible focus, contrast, and readable status cues.
- Use React Testing Library with accessible queries as the default component-testing tool for this slice.
- Use Playwright for keyboard-only flows, viewport checks, and browser-level accessibility smoke tests.
- Apply `.github/instructions/react.instructions.md`, `.github/instructions/react-testing-library.instructions.md`, `.github/instructions/playwright.instructions.md`, and `.github/instructions/css-modules.instructions.md` directly.

## Slice Scope

- Goal: Ensure the same business behavior is reachable through keyboard and assistive-technology workflows.
- Use Cases:
  - `UC-4.1 Operate By Keyboard`
  - `UC-4.2 Use Screen Reader And Focus Cues`
- CQRS Scope:
  - Reuse existing commands and queries through accessible interaction paths.
- Dependencies:
  - Slice 1 for initial input path
  - Validation against Slices 2 and 3
- Exit Criteria:
  - Keyboard workflows are complete for the shipped feature set.
  - Focus order and accessible labels are acceptable for MVP.

## Implementation Workflow

1. Audit the current controls, focus order, and interaction bindings for the shipped Slice 1 through Slice 3 feature set.
2. Map supported keyboard input to the same command invocations already used by the on-screen controls.
3. Add or refine accessible names, roles, status announcements, and focus cues so the current state is understandable to assistive technology.
4. Ensure that error presentation, display state, and pending-operation status remain perceivable without relying only on visual treatment.
5. Fix any focus traps, hidden interactive elements, or inaccessible control labels found during review.
6. Add automated accessibility checks where practical and add targeted manual smoke-test guidance where automation is insufficient.
7. Re-test the previously implemented slices through both pointer and keyboard paths.

## Constraints

- Do not create a separate logic path for keyboard actions.
- Do not rewrite the visual design unnecessarily; fix behavior and semantics first.
- Keep accessibility improvements proportional to the shipped slice set.
- If the current stack lacks accessible primitives, use the smallest viable adjustments needed for compliance progress.

## Independent Verification

1. Run keyboard-only smoke tests for input, arithmetic, and clear operations.
2. Verify key bindings invoke the same commands as on-screen controls.
3. Run screen-reader and focus-order smoke tests.
4. Verify error states remain understandable through accessible UI cues.
5. Re-run existing functional tests to confirm accessibility changes did not break earlier behavior.
6. Confirm tab order, visible focus state, and accessible control names across the shipped UI.

## Stakeholder Showcase

1. Demonstrate a complete calculation using only the keyboard.
2. Show visible focus movement and explain that the interaction path uses the same commands as mouse or touch input.
3. Demonstrate how the display, pending operator, and error state are exposed clearly for assistive technology.
4. If practical, use a screen reader or accessibility inspector to show labels and status cues.
5. Close by explaining that this slice hardens the product for broader usability without changing the core business rules.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- accessibility and keyboard behaviors added or fixed
- automated and manual verification performed
- regressions checked against earlier slices
- any remaining accessibility gaps or follow-up work
