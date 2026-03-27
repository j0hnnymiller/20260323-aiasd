---
name: implement-web-calculator-slice-8-release-hardening-and-cross-device-validation
description: Implement Slice 8 for the web calculator, covering release hardening, regression validation, accessibility retesting, and cross-device confidence.
temperature: 0.2
tags:
  [
    "implementation",
    "promptfile",
    "calculator",
    "vertical-slice",
    "cqrs",
    "release",
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
  id: implement-web-calculator-slice-8-release-hardening-and-cross-device-validation
  title: Implement Web Calculator Slice 8
  owner: johnmillerATcodemag-com
  version: 1.0.0
  output_path: .github/prompts/web-calculator/implement-slice-8-release-hardening-and-cross-device-validation.prompt.md
  category: implementation
  output_format: markdown
---

# Implement Slice 8: Release Hardening And Cross-Device Validation

## Context

Implement Slice 8 from [docs/web-calculator-implementation-plan.md](docs/web-calculator-implementation-plan.md). This slice prepares the selected release scope for production readiness. It should consolidate quality, reliability, and presentation confidence rather than introduce unrelated new product features.

Inspect the implemented slices in the current workspace first. Align the hardening pass with [docs/web-calculator-specification.md](docs/web-calculator-specification.md), [docs/web-calculator-project-definition.md](docs/web-calculator-project-definition.md), and the active release target.

## Objective

Prepare the implemented slice set for release by tightening regression coverage, responsive behavior, browser confidence, accessibility validation, and query determinism.

## Required Technology Use

- Validate the release candidate against the recommended stack: React, TypeScript, Vite, Zustand, Zod, CSS Modules, Vitest, React Testing Library, Playwright, and pnpm.
- Treat Playwright as the primary tool for browser, responsive, and end-to-end release checks.
- Use Vitest and React Testing Library to close lower-level gaps discovered during hardening.
- Keep hardening fixes aligned with the React, TypeScript, Zustand, and CSS Modules standards rather than introducing one-off patterns.
- Use pnpm scripts consistently for install, test, build, and validation commands.

## Slice Scope

- Goal: Prepare the implemented slices for production readiness.
- Use Cases:
  - `UC-8.1 Render Stable Cross-Device Experience`
- CQRS Scope:
  - Read-model optimization and UI consistency verification across the already-implemented command and query flows.
- Dependencies:
  - All slices included in the target release
- Exit Criteria:
  - The planned release slice set is stable across browsers and screen sizes.
  - Regression, accessibility, and responsiveness checks pass.

## Implementation Workflow

1. Identify the active release scope in the current workspace and list the slices that must be hardened for release.
2. Review test coverage gaps, flaky behavior, responsiveness issues, accessibility issues, and cross-browser concerns.
3. Add or refine automated coverage for end-to-end workflows across the release slice set.
4. Fix defects that materially affect correctness, responsiveness, accessibility, or deterministic query behavior.
5. Optimize or simplify read-side rendering behavior where UI consistency problems appear under full feature load.
6. Run the supported-browser and responsive validation matrix defined by the implementation plan.
7. Prepare a concise release-readiness summary with remaining known risks if any checks cannot be completed.

## Constraints

- Do not expand product scope under the label of hardening.
- Prioritize correctness, stability, accessibility, and responsiveness over cosmetic refactoring.
- Keep changes targeted to release confidence.
- If the workspace lacks automation for part of the matrix, execute the best available validation and state the remaining gap explicitly.

## Independent Verification

1. Run supported-browser smoke tests across Chrome, Edge, Firefox, and Safari.
2. Run responsive layout checks at mobile and desktop widths.
3. Run end-to-end regression tests across all MVP use cases.
4. Verify query results remain deterministic and side-effect free under full feature load.
5. Run accessibility smoke tests across the final shipped experience.
6. Confirm that any release-blocking defect discovered during hardening is either fixed or explicitly documented.

## Stakeholder Showcase

1. Demonstrate the release candidate across at least one desktop viewport and one mobile-width viewport.
2. Walk through the MVP use cases end to end without interruption.
3. Call out the regression, accessibility, and cross-device checks completed for release confidence.
4. Show one example of stable error handling and one example of responsive usability.
5. End with a clear release recommendation: ready, ready with known low-risk gaps, or not ready.

## Deliverable

Return a concise implementation summary that includes:

- files changed
- defects fixed or hardening work completed
- verification matrix executed and outcomes
- residual risks or unexecuted checks
- release recommendation with rationale
