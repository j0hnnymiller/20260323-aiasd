---
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

# C4 Diagrams

This document captures the calculator application's architecture using Mermaid C4 diagrams.

## Scope

- System: single-user desktop calculator
- Platform: WPF on .NET 8 for Windows
- Storage: in-memory only
- External integrations: none

## System Context

```mermaid
C4Context
title System Context - Calculator Desktop Application
Person(user, "Calculator User", "Performs arithmetic, percentage, and trigonometric calculations")
System(calc, "Calculator Desktop Application", "Single-user WPF desktop application for local calculations")
System_Ext(runtime, "Windows Desktop Environment", "Provides the local OS, windowing system, and .NET runtime")

Rel(user, calc, "Uses", "Mouse and keyboard")
Rel(calc, runtime, "Runs on", "WPF on .NET 8")
```

## Container Diagram

```mermaid
C4Container
title Container Diagram - Calculator Desktop Application
Person(user, "Calculator User", "Uses the calculator window")
System_Ext(runtime, "Windows Desktop Environment", "Hosts the executable and WPF runtime")

System_Boundary(calc_boundary, "Calculator Desktop Application") {
  Container(app, "WPF Desktop Application", "WPF, .NET 8", "Single executable that renders the UI, handles input, stores transient state, and performs calculations")
}

Rel(user, app, "Uses", "Button clicks and visual feedback")
Rel(app, runtime, "Runs on", "WPF / CLR")
```

## Component Diagram

```mermaid
C4Component
title Component Diagram - WPF Desktop Application
Person(user, "Calculator User", "Interacts with the controls and reads results")

Container_Boundary(app_boundary, "WPF Desktop Application") {
  Component(view, "MainWindow.xaml", "XAML view", "Defines the display, status text, keypad, operator buttons, and memory controls")
  Component(controller, "MainWindow.xaml.cs", "Code-behind controller", "Receives click events and coordinates calculator behavior")
  Component(calc_logic, "Calculation methods", "Private methods", "Implements arithmetic, percentage, trigonometric, and angle-validation logic")
  Component(state, "In-memory session state", "Private fields", "Tracks memory value, first operand, pending operator, and whether a new entry should start")
  Component(formatting, "Parsing, formatting, and error handling", "Private methods", "Parses display values, formats results, updates status text, and shows warnings")
}

Rel(user, view, "Uses")
Rel(view, controller, "Raises click events to")
Rel(controller, calc_logic, "Invokes")
Rel(controller, state, "Reads and updates")
Rel(controller, formatting, "Uses")
Rel(formatting, view, "Updates display and status in")
```

## Dynamic Diagram

```mermaid
C4Dynamic
title Dynamic Diagram - Two-Operand Calculation Flow
Person(user, "Calculator User", "Enters values and requests a result")
Container(app, "WPF Desktop Application", "WPF, .NET 8", "Processes UI events and calculations")
Component(controller, "MainWindow event handlers", "Code-behind")
Component(state, "Session state", "Private fields")
Component(calc_logic, "Calculate", "Private method")
Component(formatting, "ParseDisplay and FormatNumber", "Private methods")

RelIndex(1, user, controller, "Clicks digits and an operator")
RelIndex(2, controller, formatting, "Parses the displayed input")
RelIndex(3, controller, state, "Stores the first operand and pending operator")
RelIndex(4, user, controller, "Clicks digits for the second operand and then =")
RelIndex(5, controller, formatting, "Parses the second operand")
RelIndex(6, controller, calc_logic, "Calls Calculate(firstOperand, secondOperand, operator)")
RelIndex(7, calc_logic, controller, "Returns the numeric result")
RelIndex(8, controller, formatting, "Formats the result and updates status text")
RelIndex(9, controller, user, "Displays the result")
```

## Class Dependencies — Current State

The five extracted classes now exist in the `Calculator` namespace alongside `MainWindow`. `MainWindow` has not yet been wired to delegate to them — it still owns its original inline implementations. The test project exercises the extracted classes independently via reflection.

```mermaid
classDiagram
    class MainWindow {
        -double _memory
        -double _firstOperand
        -string? _pendingOperator
        -bool _isNewEntry
        +MainWindow()
        -ParseDisplay() double
        -FormatNumber(value) string
        -Calculate(num1, num2, op) double
        -TanWithValidation(degrees) double
        -ShowError(message) void
    }

    class CalculatorEngine {
        +CalculateBinary(num1, num2, op) double
        +ApplyTrig(trig, degrees) double
    }

    class CalculatorParser {
        +ParseDisplay(text) double
    }

    class CalculatorFormatter {
        +FormatDisplay(value) string
    }

    class CalculatorMemory {
        -double _memory
        +Add(value) void
        +Subtract(value) void
        +Recall() double
        +Clear() void
    }

    class ICalculatorErrorPresenter {
        <<interface>>
        +ShowError(message) void
    }

    class ProposedRefactoringContractsTests {
        <<xUnit test assembly>>
    }

    ProposedRefactoringContractsTests ..> CalculatorEngine : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorParser : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorFormatter : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorMemory : tests via reflection
    ProposedRefactoringContractsTests ..> ICalculatorErrorPresenter : tests via reflection

    note for MainWindow "Logic still inline.\nExtracted classes are not yet wired.\nNext step: delegate to extracted classes."
```

## Class Dependencies — Target State

After wiring, `MainWindow` becomes a thin coordinator that delegates all computation and presentation to the extracted classes. The inline duplicate methods are removed.

```mermaid
classDiagram
    class MainWindow {
        -CalculatorEngine _engine
        -CalculatorParser _parser
        -CalculatorFormatter _formatter
        -CalculatorMemory _memory
        -ICalculatorErrorPresenter _errorPresenter
        -double _firstOperand
        -string? _pendingOperator
        -bool _isNewEntry
        +MainWindow()
    }

    class CalculatorEngine {
        +CalculateBinary(num1, num2, op) double
        +ApplyTrig(trig, degrees) double
    }

    class CalculatorParser {
        +ParseDisplay(text) double
    }

    class CalculatorFormatter {
        +FormatDisplay(value) string
    }

    class CalculatorMemory {
        -double _memory
        +Add(value) void
        +Subtract(value) void
        +Recall() double
        +Clear() void
    }

    class ICalculatorErrorPresenter {
        <<interface>>
        +ShowError(message) void
    }

    class MessageBoxErrorPresenter {
        +ShowError(message) void
    }

    class ProposedRefactoringContractsTests {
        <<xUnit test assembly>>
    }

    MainWindow --> CalculatorEngine : delegates arithmetic and trig
    MainWindow --> CalculatorParser : delegates input parsing
    MainWindow --> CalculatorFormatter : delegates result formatting
    MainWindow --> CalculatorMemory : delegates memory state
    MainWindow --> ICalculatorErrorPresenter : delegates error display

    MessageBoxErrorPresenter ..|> ICalculatorErrorPresenter : implements

    ProposedRefactoringContractsTests ..> CalculatorEngine : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorParser : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorFormatter : tests via reflection
    ProposedRefactoringContractsTests ..> CalculatorMemory : tests via reflection
    ProposedRefactoringContractsTests ..> ICalculatorErrorPresenter : tests via reflection
```

## Notes

- The application is a single container because the entire calculator ships as one local desktop executable.
- The component diagram uses logical components inside the executable, even though several responsibilities are implemented within one code-behind file.
- There is no persistent database, network API, or background service in the current design.
- The class dependency diagrams reflect the two stages of the planned refactor: the current parallel state (extracted classes exist but are not wired) and the target thin-coordinator pattern.
