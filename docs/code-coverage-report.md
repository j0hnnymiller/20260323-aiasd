---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "GitHub Copilot"
chat_id: "create-code-coverage-report-20260325"
prompt: |
  create a code coverage report
started: "2026-03-25T16:18:00Z"
ended: "2026-03-25T16:32:43Z"
task_durations:
  - task: "instruction and test context review"
    duration: "00:02:00"
  - task: "initial coverage generation"
    duration: "00:02:00"
  - task: "negative-test and filtered coverage updates"
    duration: "00:08:00"
  - task: "html report generation and traceability updates"
    duration: "00:02:43"
total_duration: "00:14:43"
ai_log: "ai-logs/2026/03/25/create-code-coverage-report-20260325/conversation.md"
source: "github-copilot-chat"
---

# Code Coverage Report

## Run Summary

- Test project: `tests/Calculator.UnitTests/Calculator.UnitTests.csproj`
- Tests executed: 18
- Tests passed: 18
- Coverage command:

```powershell
dotnet test .\tests\Calculator.UnitTests\Calculator.UnitTests.csproj --collect:"XPlat Code Coverage" --results-directory .\TestResults\coverage-report\logic-only -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=cobertura "DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Exclude=[Calculator]Calculator.MainWindow,[Calculator]Calculator.App"
```

- Stable filtered Cobertura report: `TestResults/coverage-report/coverage.cobertura.xml`
- HTML report index: `TestResults/coverage-report/html/index.html`
- HTML summary: `TestResults/coverage-report/html/summary.html`

## Coverage Results

### Logic-Only Headline Coverage

The stable Cobertura report now excludes the WPF application entry points and UI wiring types `Calculator.App` and `Calculator.MainWindow`, so the headline number reflects only the extracted logic classes under test.

| Metric   | Covered | Total | Percent |
| -------- | ------: | ----: | ------: |
| Lines    |      42 |    42 | 100.00% |
| Branches |      22 |    22 | 100.00% |

### Logic-Class Coverage

Focused coverage for the extracted testable classes is now complete in both statement and branch terms.

| File                     |      Statement Coverage | Branch Coverage | Notes         |
| ------------------------ | ----------------------: | --------------: | ------------- |
| `CalculatorEngine.cs`    | 100% (29/29 statements) |            100% | Fully covered |
| `CalculatorFormatter.cs` |   100% (3/3 statements) |            100% | Fully covered |
| `CalculatorMemory.cs`    |   100% (4/4 statements) |            100% | Fully covered |
| `CalculatorParser.cs`    |   100% (6/6 statements) |            100% | Fully covered |

## What Changed

- Added a negative test for an unknown binary operator so `CalculateBinary` covers its default switch arm.
- Added a negative test for an unknown trig token so `ApplyTrig` covers its default switch arm.
- Re-ran coverage with an explicit collector exclusion for `Calculator.App` and `Calculator.MainWindow`.
- Generated browser-friendly HTML output under `TestResults/coverage-report/html/` using ReportGenerator.

## Interpretation

- The logic-only Cobertura headline is now accurate for the extracted calculator classes because UI-only types are filtered out of the stable report.
- `CalculatorEngine.cs` reached 100% branch coverage after covering the unknown operator and unknown trig paths.
- The HTML site gives a navigable view of the same filtered Cobertura data without changing the source-level test scope.

## Notes

1. The recurring `NU1900` warning during test runs is from vulnerability metadata lookup against the configured Azure DevOps NuGet feed, not from the tests or coverage tooling themselves.
2. The stable file `TestResults/coverage-report/coverage.cobertura.xml` now points to the filtered logic-only report rather than the earlier unfiltered assembly-wide run.
3. The HTML bundle is published under `TestResults/coverage-report/html/` and can be opened locally in a browser via `index.html` or `summary.html`.
