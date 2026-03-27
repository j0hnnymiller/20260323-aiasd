---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-web-calculator-specification-20260327"
prompt: |
  create a specification document for a web based calculator
started: "2026-03-27T00:00:00Z"
ended: "2026-03-27T00:20:00Z"
task_durations:
  - task: "repository review"
    duration: "00:05:00"
  - task: "specification drafting"
    duration: "00:12:00"
  - task: "traceability updates"
    duration: "00:03:00"
total_duration: "00:20:00"
ai_log: "ai-logs/2026/03/27/create-web-calculator-specification-20260327/conversation.md"
source: "github-copilot-chat"
---

# 20260323-aiasd

Repository workspace for calculator-related artifacts and supporting guidance.

## AI-Assisted Artifacts

- [docs/web-calculator-specification.md](docs/web-calculator-specification.md): Product specification for a responsive web-based calculator MVP. Log: [ai-logs/2026/03/27/create-web-calculator-specification-20260327/conversation.md](ai-logs/2026/03/27/create-web-calculator-specification-20260327/conversation.md)---
  ai_generated: true
  model: "openai/gpt-5.4@unknown"
  operator: "johnmillerATcodemag-com"
  chat_id: "create-c4-diagrams-20260324"
  prompt: |
  create c4 diagrams for this project using mermaid
  started: "2026-03-24T13:05:00-07:00"
  ended: "2026-03-24T13:22:00-07:00"
  task_durations:
  - task: "repository inspection"
    duration: "00:05:00"
  - task: "diagram authoring"
    duration: "00:10:00"
  - task: "traceability updates"
    duration: "00:02:00"
    total_duration: "00:17:00"
    ai_log: "ai-logs/2026/03/24/create-c4-diagrams-20260324/conversation.md"
    source: "github-copilot-chat"

---

# 20260323-aiasd

A .NET 8 WPF calculator application plus repository-specific AI workflow artifacts used to document, review, and compare the workspace against its instruction set.

## Current Repository State

- Application: desktop calculator built with WPF on `net8.0-windows`
- Solution layout: both `20260323-aiasd.sln` and `Calculator.csproj` live at the repo root
- Source files: `App.xaml`, `App.xaml.cs`, `MainWindow.xaml`, `MainWindow.xaml.cs`
- Governance files: `.github/instructions/` contains technology and repository workflow instructions
- Prompt files: `.github/prompts/` contains reusable review and instruction-comparison prompts
- Architecture docs: `docs/` contains Mermaid C4 diagrams for the current calculator design
- MCP example: `mcp/` contains a simple PowerShell stdio MCP server and usage notes
- Provenance logs: `ai-logs/` contains conversation and summary records for AI-assisted repository changes
- Supporting materials: `slides/` contains presentation files and a text draft used during prompt authoring

## Application Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Percentage calculation as a percent-of operation
- Trigonometric functions: `sin`, `cos`, and `tan` using degree input
- Memory controls: `MC`, `MR`, `M+`, `M-`
- Clear entry (`CE`) and clear all (`CA`)
- Read-only display with status text for current operation and error feedback
- Validation for invalid input, division by zero, and undefined tangent angles

## Technology Stack

- .NET SDK-style project
- Target framework: `net8.0-windows`
- UI framework: WPF
- Language: C# with nullable reference types enabled

## Repository Layout

- `20260323-aiasd.sln`: solution entry point
- `Calculator.csproj`: WPF project configuration
- `App.xaml` and `App.xaml.cs`: application bootstrap
- `MainWindow.xaml` and `MainWindow.xaml.cs`: calculator UI and event-driven behavior
- `.github/instructions/`: repository, platform, and authoring instructions
- `.github/prompts/`: reusable prompt files for repository review tasks
- `docs/`: architecture documentation, including Mermaid C4 diagrams
- `mcp/`: simple PowerShell Model Context Protocol server example
- `ai-logs/`: AI provenance conversation logs and summaries
- `slides/`: supporting slide decks and draft prompt content

## Prerequisites

- .NET 8 SDK or later
- Windows with WPF support

## Build And Run

Use an explicit target when building from the repository root because the root contains both a solution file and a project file.

Build the solution:

```bash
dotnet build .\20260323-aiasd.sln
```

Build the project directly:

```bash
dotnet build .\Calculator.csproj
```

Run the application:

```bash
dotnet run --project .\Calculator.csproj
```

## Development Notes

- A build can fail if `Calculator.exe` is already running because the output executable is locked by the running process.
- A plain `dotnet build` from the repo root is ambiguous because both the solution and project files are present.
- The repository includes prompt and instruction artifacts in addition to the application code, so README coverage extends beyond the calculator UI itself.

## Usage

1. Launch the app with `dotnet run --project .\Calculator.csproj`.
2. Enter numbers with the on-screen keypad.
3. Choose an operator, then enter the second operand and press `=`.
4. Use `sin`, `cos`, or `tan` to evaluate the displayed value in degrees.
5. Use `MC`, `MR`, `M+`, and `M-` for memory operations.
6. Use `CE` to reset the current entry or `CA` to reset the whole calculation state.

## AI-Assisted Artifacts

- [README.md](README.md): Repository overview, current-state documentation, and architecture artifact index. Log: [conversation.md](ai-logs/2026/03/24/create-c4-diagrams-20260324/conversation.md)
- [docs/c4-diagrams.md](docs/c4-diagrams.md): Mermaid C4 system context, container, component, and dynamic diagrams for the calculator application. Log: [conversation.md](ai-logs/2026/03/24/create-c4-diagrams-20260324/conversation.md)
- [docs/test-automation-plan.md](docs/test-automation-plan.md): Test automation implementation plan covering unit, integration, and end-to-end testing for the WPF calculator application. Log: [conversation.md](ai-logs/2026/03/25/create-test-automation-plan-20260325/conversation.md)
- [docs/code-coverage-report.md](docs/code-coverage-report.md): Current unit-test coverage summary including Cobertura assembly metrics and focused logic-class coverage results. Log: [conversation.md](ai-logs/2026/03/25/create-code-coverage-report-20260325/conversation.md)
- [tests/Calculator.UnitTests/Calculator.UnitTests.csproj](tests/Calculator.UnitTests/Calculator.UnitTests.csproj): Predictive unit test project that defines the target contracts for extracted calculator classes before the refactor is implemented. Log: [conversation.md](ai-logs/2026/03/25/create-refactoring-spec-tests-20260325/conversation.md)
- [tests/Calculator.UnitTests/CalculatorIntegrationTests.cs](tests/Calculator.UnitTests/CalculatorIntegrationTests.cs): 23 integration tests verifying that CalculatorEngine, CalculatorParser, CalculatorFormatter, and CalculatorMemory work correctly together through realistic user workflows. Organized into 6 test categories: binary operations, trigonometry, error handling, memory operations, chained operations, and number formatting. Log: [conversation.md](ai-logs/2026/03/25/implement-integration-tests-20260325/conversation.md)
- [CalculatorEngine.cs](CalculatorEngine.cs): Extracted class containing binary arithmetic and trigonometric operations. Log: [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md)
- [CalculatorParser.cs](CalculatorParser.cs): Extracted class for parsing the display string using invariant culture. Log: [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md)
- [CalculatorFormatter.cs](CalculatorFormatter.cs): Extracted class for formatting numeric results for display (G15 invariant culture). Log: [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md)
- [CalculatorMemory.cs](CalculatorMemory.cs): Extracted class managing memory state with add, subtract, recall, and clear operations. Log: [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md)
- [ICalculatorErrorPresenter.cs](ICalculatorErrorPresenter.cs): Interface that decouples error presentation from `MessageBox.Show`, enabling testable error handling. Log: [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md)
- [LocalFeatureFlags.cs](LocalFeatureFlags.cs): Local JSON-backed feature flag model and loader used to resolve runtime feature toggles once during application startup. Log: [conversation.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md)
- [feature-flags.json](feature-flags.json): Default local runtime configuration for enabling or disabling memory, percent, and trigonometry features. Log: [conversation.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md)
- [feature-flags.json.meta.md](feature-flags.json.meta.md): Provenance sidecar for the JSON feature flag configuration artifact. Log: [conversation.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md)
- [tests/Calculator.UnitTests/LocalFeatureFlagsLoaderTests.cs](tests/Calculator.UnitTests/LocalFeatureFlagsLoaderTests.cs): Unit tests for missing-file defaults, JSON parsing, and invalid feature flag configuration handling. Log: [conversation.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md)
- [mcp/simple-mcp-server.ps1](mcp/simple-mcp-server.ps1): Minimal PowerShell MCP stdio server exposing `echo` and `add` tools for local experimentation. Log: [conversation.md](ai-logs/2026/03/26/create-simple-powershell-mcp-server-20260326/conversation.md)
- [mcp/README.md](mcp/README.md): Usage notes, generic MCP client configuration, and a manual smoke test for the PowerShell MCP server. Log: [conversation.md](ai-logs/2026/03/26/create-simple-powershell-mcp-server-20260326/conversation.md)
- [.vscode/mcp.json](.vscode/mcp.json): VS Code workspace MCP configuration for launching the local PowerShell stdio server. Log: [conversation.md](ai-logs/2026/03/26/create-vscode-mcp-config-20260326/conversation.md)
- [.vscode/mcp.json.meta.md](.vscode/mcp.json.meta.md): Provenance sidecar for the VS Code workspace MCP configuration artifact. Log: [conversation.md](ai-logs/2026/03/26/create-vscode-mcp-config-20260326/conversation.md)
- [conversation.md](ai-logs/2026/03/26/fix-powershell-mcp-initialization-20260326/conversation.md): AI chat transcript for fixing the PowerShell MCP initialization hang.
- [summary.md](ai-logs/2026/03/26/fix-powershell-mcp-initialization-20260326/summary.md): AI session resumability summary for the PowerShell MCP initialization fix.
- [.github/instructions/ai-assisted-output.instructions.md](.github/instructions/ai-assisted-output.instructions.md): Provenance and AI logging policy for repository artifacts. Log: [conversation.md](ai-logs/2026/01/20/generate-ai-output-policy-20260120/conversation.md)
- [.github/instructions/evergreen-software-development.instructions.md](.github/instructions/evergreen-software-development.instructions.md): Core principles for evergreen software development. Log: [conversation.md](ai-logs/2026/03/23/create-evergreen-instructions-20260323/conversation.md)
- [.github/instructions/dotnet.instructions.md](.github/instructions/dotnet.instructions.md): .NET 8 project and build guidance for this WPF app. Log: [conversation.md](ai-logs/2026/03/23/create-technology-instructions-20260323/conversation.md)
- [.github/instructions/csharp.instructions.md](.github/instructions/csharp.instructions.md): C# guidance for calculator logic and event handlers. Log: [conversation.md](ai-logs/2026/03/23/create-technology-instructions-20260323/conversation.md)
- [.github/instructions/wpf.instructions.md](.github/instructions/wpf.instructions.md): WPF guidance for code-behind and window behavior. Log: [conversation.md](ai-logs/2026/03/23/create-technology-instructions-20260323/conversation.md)
- [.github/instructions/xaml.instructions.md](.github/instructions/xaml.instructions.md): XAML guidance for calculator layout and control wiring. Log: [conversation.md](ai-logs/2026/03/23/create-technology-instructions-20260323/conversation.md)
- [.github/prompts/meta/create-technology-instructions.instructions.prompt.md](.github/prompts/meta/create-technology-instructions.instructions.prompt.md): Promptfile that inspects the repo and creates or updates technology-specific instruction files. Log: [conversation.md](ai-logs/2026/03/23/create-technology-instructions-prompt-20260323/conversation.md)
- [.github/prompts/compare-workspace-to-instructions.prompt.md](.github/prompts/compare-workspace-to-instructions.prompt.md): Promptfile that compares the workspace against the repository instruction files and can be scoped to a folder. Log: [conversation.md](ai-logs/2026/03/24/add-folder-parameter-to-compare-workspace-prompt-20260324/conversation.md)
- [.github/prompts/review-evergreen-code.prompt.md](.github/prompts/review-evergreen-code.prompt.md): Promptfile that reviews the repository against evergreen software principles. Log: [conversation.md](ai-logs/2026/03/24/create-evergreen-review-prompt-20260324/conversation.md)
- [conversation.md](ai-logs/2026/03/24/create-c4-diagrams-20260324/conversation.md): AI chat transcript for the Mermaid C4 diagram creation task.
- [summary.md](ai-logs/2026/03/24/create-c4-diagrams-20260324/summary.md): AI session resumability summary for the Mermaid C4 diagram creation task.
- [conversation.md](ai-logs/2026/03/25/create-test-automation-plan-20260325/conversation.md): AI chat transcript for the test automation plan task.
- [summary.md](ai-logs/2026/03/25/create-test-automation-plan-20260325/summary.md): AI session resumability summary for the test automation plan task.
- [conversation.md](ai-logs/2026/03/25/create-code-coverage-report-20260325/conversation.md): AI chat transcript for the code coverage reporting task.
- [summary.md](ai-logs/2026/03/25/create-code-coverage-report-20260325/summary.md): AI session resumability summary for the code coverage reporting task.
- [conversation.md](ai-logs/2026/03/25/create-refactoring-spec-tests-20260325/conversation.md): AI chat transcript for the predictive refactoring tests task.
- [summary.md](ai-logs/2026/03/25/create-refactoring-spec-tests-20260325/summary.md): AI session resumability summary for the predictive refactoring tests task.
- [conversation.md](ai-logs/2026/03/25/implement-testable-classes-20260325/conversation.md): AI chat transcript for implementing the five extracted testable classes.
- [summary.md](ai-logs/2026/03/25/implement-testable-classes-20260325/summary.md): AI session resumability summary for implementing the five extracted testable classes.
- [conversation.md](ai-logs/2026/03/25/implement-integration-tests-20260325/conversation.md): AI chat transcript for implementing integration tests.
- [summary.md](ai-logs/2026/03/25/implement-integration-tests-20260325/summary.md): AI session resumability summary for implementing integration tests.
- [conversation.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md): AI chat transcript for implementing local JSON-backed feature flags.
- [summary.md](ai-logs/2026/03/25/implement-local-feature-flags-20260325/summary.md): AI session resumability summary for implementing local JSON-backed feature flags.
- [conversation.md](ai-logs/2026/03/26/create-simple-powershell-mcp-server-20260326/conversation.md): AI chat transcript for creating the simple PowerShell MCP server.
- [summary.md](ai-logs/2026/03/26/create-simple-powershell-mcp-server-20260326/summary.md): AI session resumability summary for the simple PowerShell MCP server task.
- [conversation.md](ai-logs/2026/03/26/create-vscode-mcp-config-20260326/conversation.md): AI chat transcript for creating the VS Code MCP configuration.
- [summary.md](ai-logs/2026/03/26/create-vscode-mcp-config-20260326/summary.md): AI session resumability summary for the VS Code MCP configuration task.
- [conversation.md](ai-logs/2026/03/24/update-readme-current-state-20260324/conversation.md): AI chat transcript for the README current-state update.
- [summary.md](ai-logs/2026/03/24/update-readme-current-state-20260324/summary.md): AI session resumability summary for the README current-state update.

## Existing AI Logs

- [conversation.md](ai-logs/2026/03/23/retrofit-ai-provenance-20260323/conversation.md): AI chat transcript for the provenance retrofit.
- [summary.md](ai-logs/2026/03/23/retrofit-ai-provenance-20260323/summary.md): AI session resumability summary for the provenance retrofit.
- [conversation.md](ai-logs/2026/03/23/create-evergreen-instructions-20260323/conversation.md): AI chat transcript for evergreen instruction creation.
- [summary.md](ai-logs/2026/03/23/create-evergreen-instructions-20260323/summary.md): AI session resumability summary for evergreen instruction creation.
- [conversation.md](ai-logs/2026/03/23/create-technology-instructions-20260323/conversation.md): AI chat transcript for technology instruction creation.
- [summary.md](ai-logs/2026/03/23/create-technology-instructions-20260323/summary.md): AI session resumability summary for technology instruction creation.
- [conversation.md](ai-logs/2026/03/23/create-technology-instructions-prompt-20260323/conversation.md): AI chat transcript for technology instruction prompt creation.
- [summary.md](ai-logs/2026/03/23/create-technology-instructions-prompt-20260323/summary.md): AI session resumability summary for technology instruction prompt creation.
- [conversation.md](ai-logs/2026/03/24/create-compare-workspace-to-instructions-prompt-20260324/conversation.md): AI chat transcript for instruction comparison prompt creation.
- [summary.md](ai-logs/2026/03/24/create-compare-workspace-to-instructions-prompt-20260324/summary.md): AI session resumability summary for instruction comparison prompt creation.
- [conversation.md](ai-logs/2026/03/24/add-folder-parameter-to-compare-workspace-prompt-20260324/conversation.md): AI chat transcript for adding folder scoping to the instruction comparison prompt.
- [summary.md](ai-logs/2026/03/24/add-folder-parameter-to-compare-workspace-prompt-20260324/summary.md): AI session resumability summary for the folder-scoped prompt update.
- [conversation.md](ai-logs/2026/03/24/create-evergreen-review-prompt-20260324/conversation.md): AI chat transcript for evergreen review prompt creation.
- [summary.md](ai-logs/2026/03/24/create-evergreen-review-prompt-20260324/summary.md): AI session resumability summary for evergreen review prompt creation.

## Contributing

1. Keep documentation aligned with the actual repository structure and commands.
2. Use explicit solution or project paths for build and run commands from the repo root.
3. Update provenance metadata and `ai-logs/` when creating or modifying AI-assisted artifacts.
4. Open a pull request with the relevant code, documentation, and traceability updates.
