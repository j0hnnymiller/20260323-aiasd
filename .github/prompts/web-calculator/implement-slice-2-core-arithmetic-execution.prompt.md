---
name: implement-web-calculator-slice-2-core-arithmetic-execution
description: Implement Slice 2 for the web calculator, covering operator selection, equals execution, and recoverable arithmetic error reporting.
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
  id: implement-web-calculator-slice-2-core-arithmetic-execution
  title: Implement Web Calculator Slice 2
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-2-core-arithmetic-execution.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 2: Core Arithmetic Execution

## Context

Implement Slice 2 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) after confirming Slice 1 behavior is stable. Keep the implementation aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the current code before editing. Preserve the working Slice 1 contract. Use explicit command and query boundaries. Do not pull recovery, accessibility, or advanced-function behavior forward unless required for correctness.

## Objective

Deliver the first end-to-end arithmetic flow so users can choose an operator, execute equals, receive correct results, and see recoverable error state for invalid calculations.

## Required Technology Use

- Keep arithmetic command handling and query derivation in TypeScript modules with explicit types.
- Use Zustand actions for write-side transitions and selectors for read-side display, status, and error models.
- Use React components only to invoke commands and render query results.
- Validate runtime command inputs with Zod where boundary parsing is required, but keep calculation rules in domain logic.
- Use CSS Modules for any new operator and status styling.
- Use Vitest for arithmetic rule coverage and React Testing Library for component-level interaction coverage.
- Keep Playwright available for browser-level arithmetic smoke tests if needed by the slice or current workspace.

## Slice Scope

- Goal: Deliver the first end-to-end calculation flow.
- Use Cases:
  - `UC-2.1 Select Arithmetic Operator`
  - `UC-2.2 Execute Arithmetic Result`
- Commands:
  - `SelectOperatorCommand`
  - `ExecuteEqualsCommand`
- Queries:
  - `GetCalculatorDisplayQuery`
  - `GetCalculatorStatusQuery`
  - `GetCalculatorErrorQuery`
- Dependencies:
  - Slice 1
- Exit Criteria:
  - Arithmetic flows are working end to end.
  - Error state reporting is reliable and recoverable.

## Implementation Workflow

1. Verify the current Slice 1 entry and display behaviors before adding arithmetic logic.
2. Define the minimum calculator state additions required for pending operator, first operand, second operand, and last computed result.
3. Implement operator-selection logic as an explicit write-side command with clear state-transition rules.
4. Implement equals execution for addition, subtraction, multiplication, and division, including a documented chained-operation rule.
5. Add a read model for recoverable arithmetic error state without making queries responsible for validation or mutation.
6. Wire the UI so operator buttons and equals use the new commands and existing queries.
7. Add automated coverage for valid arithmetic, divide-by-zero, and chained-operation behavior.
8. Confirm Slice 1 entry behavior remains unchanged except where arithmetic flows intentionally extend it.

## Constraints

- Do not implement clear-entry, clear-all, or backspace behavior in this slice.
- Keep divide-by-zero recoverable.
- Keep result rendering deterministic and side-effect free on the query side.
- If chained-operation behavior is not yet defined in code, choose the documented rule from the specification and apply it consistently.

## Independent Verification

1. Run unit tests for arithmetic command handlers covering add, subtract, multiply, and divide.
2. Verify divide-by-zero produces a recoverable error query result.
3. Run integration tests for number-entry to equals-result workflows.
4. Verify chained-operation behavior matches the documented rule.
5. Re-run Slice 1 tests to confirm no regression in numeric entry and display behavior.
6. Confirm the error query remains read-only and that errors can be surfaced without refreshing the page.

## Stakeholder Showcase

1. Start with a clean calculator state and show that numeric entry from Slice 1 still behaves correctly.
2. Demonstrate one example each for addition, subtraction, multiplication, and division.
3. Trigger divide-by-zero and explain that the invalid operation is handled as a recoverable state, not as a crash.
4. Show one chained calculation and explain the chosen product rule.
5. Close by stating what is still deferred: edit/recovery controls, accessibility validation, memory, and scientific functions.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- arithmetic rules implemented
- error-handling behavior added
- tests added or updated
- verification steps executed and outcomes
- any remaining ambiguity or deferred follow-up
