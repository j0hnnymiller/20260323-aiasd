---
name: implement-web-calculator-slice-5-secondary-arithmetic-behaviors
description: Implement Slice 5 for the web calculator, covering sign toggle and percent behavior without regressing core arithmetic.
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
  id: implement-web-calculator-slice-5-secondary-arithmetic-behaviors
  title: Implement Web Calculator Slice 5
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-5-secondary-arithmetic-behaviors.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 5: Secondary Arithmetic Behaviors

## Context

Implement Slice 5 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) and keep it aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the current arithmetic behavior first. Preserve all accepted Slice 1 through Slice 4 behavior. Add only the sign-toggle and percent rules approved by the product documentation or existing workspace decisions.

## Objective

Extend the calculator with high-value secondary arithmetic actions while preserving correctness and predictability in the core arithmetic flow.

## Required Technology Use

- Implement sign-toggle and percent rules as typed TypeScript logic invoked through explicit Zustand actions.
- Keep React components thin and presentation-focused.
- Use Zod only for runtime boundary validation, not as a substitute for arithmetic rules.
- Use CSS Modules for any new control or status treatments introduced by this slice.
- Cover the logic with Vitest and user-facing control behavior with React Testing Library.
- Use Playwright if browser-level percent or responsive behavior needs end-to-end confirmation.

## Slice Scope

- Goal: Extend the calculator with high-value secondary arithmetic functions.
- Use Cases:
  - `UC-5.1 Toggle Active Value Sign`
  - `UC-5.2 Apply Percent Behavior`
- Commands:
  - `ToggleSignCommand`
  - `ApplyPercentCommand`
- Queries:
  - `GetCalculatorDisplayQuery`
  - `GetCalculatorStatusQuery`
- Dependencies:
  - Slice 2
  - Product decision on percent semantics
- Exit Criteria:
  - Sign toggle and percent work consistently.
  - No regression in core arithmetic behavior.

## Implementation Workflow

1. Inspect the current state model to confirm how sign toggle and percent should interact with active input, pending operations, and last result.
2. Confirm the approved percent rule from the specification or current workspace context before implementing it.
3. Implement or refine `ToggleSignCommand` so it behaves consistently on active input and result state.
4. Implement `ApplyPercentCommand` with explicit rules for how it behaves within arithmetic context.
5. Update display and status queries only as needed to expose the resulting state clearly.
6. Wire the UI controls for sign toggle and percent.
7. Add targeted tests for sign toggle, percent behavior, and regression coverage for the core arithmetic workflows.
8. Confirm the implementation does not accidentally change existing equals, operator, or recovery semantics.

## Constraints

- Do not guess percent semantics if they are not available in the workspace; ask one focused question if the rule is truly blocking.
- Keep command-side rules explicit.
- Keep query behavior side-effect free.
- Do not bundle memory or scientific features into this slice.

## Independent Verification

1. Run unit tests for sign toggle and percent transformation rules.
2. Verify percent behavior against approved product scenarios.
3. Run regression tests on core arithmetic flows after these commands are added.
4. Verify display and status queries remain synchronized.
5. Confirm sign toggle works predictably on both entered values and displayed results where supported.
6. Re-run accessibility and keyboard smoke checks for the new controls if those paths already exist.

## Stakeholder Showcase

1. Show sign toggle applied to an entered number and explain the expected state change.
2. Demonstrate percent using one concrete scenario that matches the approved product rule.
3. Immediately follow with a standard arithmetic flow to show there was no regression.
4. Explain that this slice improves everyday calculator usefulness without expanding into full scientific mode.
5. Call out any product rule that was clarified to keep percent behavior consistent.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- final percent rule used
- tests added or updated
- verification steps executed and outcomes
- any unresolved ambiguity or deferred edge case
