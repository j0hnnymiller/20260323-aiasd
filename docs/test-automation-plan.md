---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "GitHub Copilot"
chat_id: "create-test-automation-plan-20260325"
prompt: |
  review the @workspace and update the test plan for implementing test automation for this project. include in the plan unit, integration, and end-to-end test. Also propose test frameworks for implementing the test suite.
started: "2026-03-25T00:00:00Z"
ended: "2026-03-25T00:20:00Z"
task_durations:
  - task: "workspace review"
    duration: "00:07:00"
  - task: "test plan authoring"
    duration: "00:10:00"
  - task: "traceability updates"
    duration: "00:03:00"
total_duration: "00:20:00"
ai_log: "ai-logs/2026/03/25/create-test-automation-plan-20260325/conversation.md"
source: "github-copilot-chat"
---

# Test Automation Plan (Updated)

## Objective

Define an implementation plan for complete automated testing in this .NET 8 WPF calculator repository, covering unit, integration, and end-to-end testing with realistic sequencing based on the current codebase.

## Current Baseline Review

This plan is based on the current workspace state.

- The solution currently contains two projects: `Calculator` and `Calculator.UnitTests`.
- Core logic classes already exist and are testable: `CalculatorEngine`, `CalculatorParser`, `CalculatorFormatter`, and `CalculatorMemory`.
- A test abstraction exists for error presentation: `ICalculatorErrorPresenter`, but `MainWindow` still calls `MessageBox.Show(...)` directly.
- `MainWindow.xaml.cs` still holds UI state and event orchestration, which is expected for this project style.
- `MainWindow.xaml` does not yet define stable `AutomationProperties.AutomationId` values for controls.
- The existing `Calculator.UnitTests` project includes both contract-style and workflow-style tests; no separate integration or E2E test projects exist yet.

## Target Test Strategy

Adopt a three-layer test pyramid tailored to this WPF app.

1. Unit tests: verify pure logic behavior in extracted classes.
2. Integration tests: verify WPF window behavior and control/event orchestration on STA.
3. End-to-end tests: verify user-critical desktop workflows against the built executable.

## Framework Recommendations

### Recommended Default Stack

- `xUnit`: primary test framework across all test layers.
- `Microsoft.NET.Test.Sdk`: test execution infrastructure.
- `xunit.runner.visualstudio`: VS/dotnet test discovery.
- `FluentAssertions`: readable assertions for numeric and UI state checks.
- `coverlet.collector`: coverage collection for unit/integration tests.
- `Xunit.StaFact`: STA-safe execution for WPF integration tests.
- `FlaUI.Core` + `FlaUI.UIA3`: desktop UI automation for end-to-end tests.

### Why This Stack Fits

- It aligns with packages already in use (`xUnit`, `coverlet`, `Microsoft.NET.Test.Sdk`).
- `Xunit.StaFact` is the simplest path for deterministic WPF integration tests.
- `FlaUI` is actively used for Windows desktop testing and fits WPF better than browser-first tools.

### Acceptable Alternatives

- `NUnit` plus apartment attributes for integration tests.
- `MSTest` if organizational standards require it.
- `WinAppDriver` only if there is an existing enterprise dependency on it.

## Proposed Test Project Structure

Retain existing tests and split by test intent.

```text
tests/
  Calculator.UnitTests/
  Calculator.IntegrationTests/
  Calculator.E2ETests/
```

Target frameworks:

- `Calculator.UnitTests`: `net8.0`
- `Calculator.IntegrationTests`: `net8.0-windows`
- `Calculator.E2ETests`: `net8.0-windows`

## Unit Test Plan

### Scope

Unit tests validate pure logic classes without loading WPF UI.

- `CalculatorEngine`: binary math, percent-of behavior, trig operations, invalid operator handling, divide-by-zero, undefined tangent.
- `CalculatorParser`: invariant parsing and invalid input errors.
- `CalculatorFormatter`: invariant display formatting (`G15`) behavior.
- `CalculatorMemory`: `Add`, `Subtract`, `Recall`, and `Clear` semantics.

### Recommended Additions

- Boundary tests for trig near undefined tangent thresholds.
- Additional parser formatting edge cases (`-0`, large exponents, decimals).
- Consistent exception-message assertions for user-visible error contracts.

### Unit Exit Criteria

- All non-UI branches in logic classes are covered.
- Coverage target for logic classes: at least 90% line and branch coverage.
- No WPF dependency in unit test execution.

## Integration Test Plan

### Scope

Integration tests validate `MainWindow` behavior on STA and ensure that UI state transitions and event handlers produce correct display/status outcomes.

- Startup state (`DisplayText`, `StatusText`).
- Numeric entry and decimal behavior.
- Operator/equals workflow and status text updates.
- `CE` versus `CA` behavior.
- Memory button flows (`MC`, `MR`, `M+`, `M-`).
- Trig button flows.
- Error path behavior without hanging modal dialogs.

### Preconditions

- Introduce a concrete implementation of `ICalculatorErrorPresenter` and inject it into `MainWindow`.
- In tests, use a fake presenter to capture errors instead of opening dialogs.
- Move integration-like tests currently in `Calculator.UnitTests` into `Calculator.IntegrationTests` for clearer ownership.

### Integration Exit Criteria

- Core user flows pass against `MainWindow` on STA.
- Tests run reliably in Windows CI.
- No modal dialog blocks automated runs.

## End-to-End Test Plan

### Scope

E2E tests automate real user interaction with the built executable.

- App launch and main window validation.
- Arithmetic happy paths.
- Memory workflow across multiple operations.
- Trig workflows.
- Error handling workflows where app remains responsive after error.

### Required Testability Updates

- Add `AutomationProperties.AutomationId` to key controls in `MainWindow.xaml`.
- Ensure executable path is deterministic for test runner and CI.
- Add helper layer for startup/teardown and control lookup to reduce selector duplication.

### E2E Exit Criteria

- Critical paths pass consistently on `windows-latest`.
- Flake rate is negligible across repeated runs.
- Failure diagnostics include screenshot and UI tree context.

## CI Rollout Plan

Run all automation on Windows.

1. Build solution.
2. Run unit tests with coverage.
3. Run integration tests.
4. Run E2E tests in isolated job.
5. Publish TRX and coverage artifacts.

Suggested commands:

```powershell
dotnet build .\20260323-aiasd.sln
dotnet test .\tests\Calculator.UnitTests\Calculator.UnitTests.csproj --collect:"XPlat Code Coverage"
dotnet test .\tests\Calculator.IntegrationTests\Calculator.IntegrationTests.csproj
dotnet test .\tests\Calculator.E2ETests\Calculator.E2ETests.csproj
```

## Incremental Implementation Roadmap

### Phase 1: Stabilize Unit Layer

- Keep and refine existing unit tests in `Calculator.UnitTests`.
- Add missing boundary/edge cases.
- Set coverage gate for logic classes.

### Phase 2: Build Integration Layer

- Create `Calculator.IntegrationTests` project.
- Add `Xunit.StaFact` and fake error presenter.
- Port window-workflow tests into this project.

### Phase 3: Build E2E Layer

- Add automation IDs in XAML.
- Create `Calculator.E2ETests` using FlaUI.
- Implement smoke flows first, then full workflow coverage.

### Phase 4: Harden CI

- Separate jobs by test type.
- Publish artifacts and test reports.
- Add retry/quarantine policy for any flaky E2E test.

## Risks And Mitigations

- Risk: modal `MessageBox` calls block unattended tests.
  Mitigation: complete dependency injection for error presentation in `MainWindow`.

- Risk: unstable selector strategy in E2E tests.
  Mitigation: enforce `AutomationId` usage and centralize selectors.

- Risk: integration and unit scopes overlap.
  Mitigation: keep unit tests pure, keep `MainWindow` tests in integration project only.

## Definition Of Done

The automation rollout is complete when all conditions below are met.

- Unit, integration, and E2E projects exist and are in the solution.
- Unit tests validate calculator logic classes with branch-aware coverage.
- Integration tests validate `MainWindow` behavior on STA without modal dialog blocking.
- E2E tests validate critical user journeys through the running app.
- CI executes all test layers on Windows and publishes actionable artifacts.
