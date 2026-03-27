---
name: implement-web-calculator-slice-7-scientific-calculation-workflows
description: Implement Slice 7 for the web calculator, covering basic scientific operations and recoverable invalid-operation handling.
temperature: 0.2
tags:
  [
    "implementation",
    "promptfile",
    "calculator",
    "vertical-slice",
    "cqrs",
    "scientific",
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
  id: implement-web-calculator-slice-7-scientific-calculation-workflows
  title: Implement Web Calculator Slice 7
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-7-scientific-calculation-workflows.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 7: Scientific Calculation Workflows

## Context

Implement Slice 7 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) and keep it aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the current state of arithmetic, error handling, layout, and accessibility first. Preserve all accepted earlier-slice behavior while adding scientific operations.

## Objective

Add basic scientific functions without destabilizing the calculator's core arithmetic, error handling, or mobile usability.

## Required Technology Use

- Keep scientific operation rules in typed TypeScript domain logic and invoke them through explicit Zustand commands.
- Use Zod only if runtime boundary validation is needed for scientific-command input normalization.
- Use React and CSS Modules to add controls without making the layout brittle at narrow widths.
- Use Vitest for scientific rule coverage, React Testing Library for control behavior, and Playwright for responsive or browser-level regression checks.

## Slice Scope

- Goal: Add scientific calculation support without breaking core calculator behavior.
- Use Cases:
  - `UC-7.1 Apply Scientific Operation`
- Commands:
  - `ApplySineCommand`
  - `ApplyCosineCommand`
  - `ApplyTangentCommand`
  - `ApplySquareRootCommand`
- Queries:
  - `GetCalculatorDisplayQuery`
  - `GetCalculatorErrorQuery`
- Dependencies:
  - Slice 2
  - Validation support from Slice 4 recommended
- Exit Criteria:
  - Scientific operations are correct for supported rules.
  - Error handling remains consistent with the rest of the product.

## Implementation Workflow

1. Confirm the current product rules for scientific operations, including any angle-mode assumption already documented in the workspace.
2. Identify the minimum extension to the state model needed to support scientific operations without complicating normal arithmetic flows.
3. Implement the scientific commands with explicit validation and recoverable error behavior for invalid inputs.
4. Ensure the existing error query model can surface invalid scientific operations clearly.
5. Add the scientific controls to the UI while preserving readable layout and usable control density.
6. Add tests for valid scientific calculations, invalid domain inputs, and regression coverage for prior arithmetic flows.
7. Re-run responsiveness and accessibility checks because this slice increases UI density.

## Constraints

- Do not invent unsupported scientific functions beyond the slice scope.
- Keep error behavior consistent with the rest of the calculator.
- Preserve mobile usability.
- If angle mode is genuinely unresolved, stop and ask one focused product question rather than guessing.

## Independent Verification

1. Run unit tests for scientific functions using valid and invalid inputs.
2. Verify undefined or invalid operations produce recoverable error states.
3. Run integration tests combining scientific operations with existing display and error flows.
4. Verify mobile layout remains usable with scientific controls visible.
5. Re-run prior-slice regression tests.
6. Confirm scientific actions do not mutate state through queries or break keyboard-access patterns if already implemented.

## Stakeholder Showcase

1. Demonstrate one valid example for square root and one valid example for a trigonometric function.
2. Show an invalid input case and explain the recoverable error behavior.
3. Resize the UI or switch to a narrow viewport to show the controls remain usable.
4. Explain that advanced functions were added without changing the existing arithmetic interaction model.
5. Call out any explicit product rule used, such as the chosen angle mode.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- scientific rules implemented
- error behaviors added or reused
- tests added or updated
- verification steps executed and outcomes
- any unresolved product-rule dependency
