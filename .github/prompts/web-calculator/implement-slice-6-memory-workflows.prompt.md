---
name: implement-web-calculator-slice-6-memory-workflows
description: Implement Slice 6 for the web calculator, covering memory store, recall, add, subtract, clear, and memory indicator behavior.
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
  id: implement-web-calculator-slice-6-memory-workflows
  title: Implement Web Calculator Slice 6
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-6-memory-workflows.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 6: Memory Workflows

## Context

Implement Slice 6 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md) and keep it aligned with [docs/web-calculator-specification.md](docs/web-calculator-specification.md) and [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md).

Inspect the current calculator state model before editing. Preserve the existing arithmetic and recovery behavior. Add memory state in a way that does not corrupt active calculations.

## Objective

Support value reuse across multi-step calculations by adding explicit memory commands and a visible memory-state indicator.

## Required Technology Use

- Model memory state explicitly in TypeScript and keep it separate from general display concerns.
- Implement memory actions as Zustand commands and expose memory presence through typed query selectors.
- Use React components to render memory controls and indicator state without embedding memory rules in UI handlers.
- Use CSS Modules for any new indicator or memory-control styling.
- Use Vitest and React Testing Library for automation, and keep Playwright available for cross-slice browser regression if needed.

## Slice Scope

- Goal: Support value reuse across multi-step calculations.
- Use Cases:
  - `UC-6.1 Store And Recall Memory Value`
- Commands:
  - `ClearMemoryCommand`
  - `RecallMemoryCommand`
  - `AddToMemoryCommand`
  - `SubtractFromMemoryCommand`
- Queries:
  - `GetMemoryIndicatorQuery`
  - `GetCalculatorDisplayQuery`
- Dependencies:
  - Slice 3
- Exit Criteria:
  - Memory workflows behave predictably.
  - Memory state does not corrupt active calculations.

## Implementation Workflow

1. Inspect the current state model and identify how memory state can be added without entangling it with normal display or pending-operation state.
2. Define the memory lifecycle explicitly: empty, set, recalled, incremented, decremented, and cleared.
3. Implement `AddToMemoryCommand`, `SubtractFromMemoryCommand`, `RecallMemoryCommand`, and `ClearMemoryCommand` with deterministic rules.
4. Implement or refine `GetMemoryIndicatorQuery` so the UI can clearly show whether memory is present.
5. Wire the memory controls in the UI and make sure memory recall interacts predictably with the active entry or result state.
6. Add automated tests for empty-memory recall, arithmetic-plus-memory combinations, and recovery interactions.
7. Re-run existing regression coverage to ensure memory does not change prior arithmetic or recovery behavior.

## Constraints

- Do not add persistence across refresh unless the workspace explicitly requires it.
- Keep memory state separate from general calculator status where practical.
- Do not introduce scientific behavior in this slice.
- If the expected empty-memory recall behavior is ambiguous, use the documented rule or raise a focused question.

## Independent Verification

1. Run unit tests for all memory commands and edge cases.
2. Verify recall behavior when memory is empty.
3. Run integration tests combining memory operations with arithmetic and clear flows.
4. Verify memory indicator state stays accurate after each command.
5. Re-run regression tests for prior slices.
6. Confirm memory actions do not silently overwrite active calculations beyond the documented rule.

## Stakeholder Showcase

1. Perform a calculation, store the result in memory, and show the memory indicator becoming visible.
2. Start a new calculation, recall memory, and continue the flow.
3. Demonstrate memory increment or decrement with a second value.
4. Clear memory and show the UI indicator returning to its empty state.
5. Explain that the feature is isolated from the core arithmetic model and does not compromise earlier slice behavior.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- memory rules implemented
- UI indicator behavior added
- tests added or updated
- verification steps executed and outcomes
- any unresolved memory-state edge case
