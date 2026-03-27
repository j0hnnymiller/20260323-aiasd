---
name: implement-web-calculator-slice-3-recovery-and-editing-controls
description: Implement Slice 3 for the web calculator, covering clear entry, clear all, backspace, and error dismissal flows.
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
  id: implement-web-calculator-slice-3-recovery-and-editing-controls
  title: Implement Web Calculator Slice 3
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-3-recovery-and-editing-controls.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 3: Recovery And Editing Controls

## Context

Implement Slice 3 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) after Slice 2 arithmetic behavior is stable. Keep the work aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the current implementation before editing. Preserve the current arithmetic behavior. Add only the recovery and edit paths defined for this slice.

## Objective

Make the calculator safe to use repeatedly by letting users clear the current entry, reset the full state, backspace active input, and dismiss recoverable error state.

## Required Technology Use

- Keep recovery behavior in typed TypeScript command handlers and Zustand store actions rather than component-local state.
- Reuse existing React components where possible, but keep UI-trigger wiring explicit for `CE`, `CA`, backspace, and error dismissal.
- Use Zod only if new runtime command-input validation is required.
- Use CSS Modules to maintain clear visible differentiation for error and recovery states.
- Cover recovery behavior with Vitest and React Testing Library, and use Playwright only when browser-level regression confidence is needed.

## Slice Scope

- Goal: Make the calculator safe to use repeatedly by supporting correction and reset flows.
- Use Cases:
  - `UC-3.1 Clear Current Entry`
  - `UC-3.2 Clear Full Calculator State`
  - `UC-3.3 Backspace Current Input`
- Commands:
  - `ClearEntryCommand`
  - `ClearAllCommand`
  - `BackspaceCommand`
  - `DismissErrorCommand`
- Queries:
  - `GetCalculatorDisplayQuery`
  - `GetCalculatorStatusQuery`
  - `GetCalculatorErrorQuery`
- Dependencies:
  - Slice 2
- Exit Criteria:
  - Users can recover from mistakes without refreshing.
  - Reset and edit behaviors are deterministic.

## Implementation Workflow

1. Inspect the current input, arithmetic, and error-state model to identify the minimum safe mutation points for recovery commands.
2. Implement `ClearEntryCommand` so it resets only the active operand or active input buffer.
3. Implement `ClearAllCommand` so it resets the full calculator state and remains idempotent.
4. Implement `BackspaceCommand` so it removes only the last editable character from the active input path.
5. Implement `DismissErrorCommand` if error state requires an explicit recovery action separate from clear-all.
6. Update the display, status, and error query behavior so recovery actions are reflected immediately and predictably.
7. Wire the UI controls for `CE`, `CA`, backspace, and error recovery paths.
8. Add automated tests covering valid recovery flows, invalid recovery attempts, and interaction with active arithmetic state.

## Constraints

- Do not change the already accepted arithmetic semantics unless a defect is discovered and fixed explicitly.
- Keep `ClearAllCommand` idempotent.
- Keep error recovery predictable and visible through the existing read model.
- Do not introduce memory or accessibility-specific behavior in this slice.

## Independent Verification

1. Run unit tests for clear, backspace, and error-dismiss commands.
2. Verify recovery flows after both valid and invalid calculations.
3. Run integration tests covering entry correction during active calculations.
4. Verify `ClearAllCommand` is idempotent.
5. Re-run Slice 1 and Slice 2 tests to confirm no regression.
6. Confirm that backspace affects only active input and does not silently mutate prior committed result state.

## Stakeholder Showcase

1. Start with an entered value and demonstrate backspace removing one character at a time.
2. Show `CE` clearing only the current entry while preserving the broader calculation context.
3. Show `CA` resetting the full calculator state to the default display and status.
4. Trigger an error such as divide-by-zero, then demonstrate the supported recovery path.
5. Explain that this slice improves repeatability and user confidence without changing the established arithmetic rules.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- recovery commands added or updated
- query behavior affected by recovery flows
- tests added or updated
- verification steps executed and outcomes
- any defect fixes or edge cases discovered
