import { z } from "zod";
import type { ArithmeticOperator, CalculatorState } from "./calculator-state";
import { initialCalculatorState } from "./calculator-state";

// ─── Slice 1 schemas ──────────────────────────────────────────────────────────

const enterDigitCommandSchema = z.object({
  digit: z.string().regex(/^[0-9]$/),
});

const enterDecimalPointCommandSchema = z.object({
  symbol: z.literal(".").default("."),
});

const toggleSignCommandSchema = z.object({
  kind: z.literal("toggle-sign").default("toggle-sign"),
});

// ─── Slice 5 schemas ──────────────────────────────────────────────────────────

const applyPercentCommandSchema = z.object({
  kind: z.literal("apply-percent").default("apply-percent"),
});

// ─── Slice 2 schemas ──────────────────────────────────────────────────────────

const selectOperatorCommandSchema = z.object({
  operator: z.enum(["+", "-", "*", "/"]),
});

const executeEqualsCommandSchema = z.object({
  kind: z.literal("execute-equals").default("execute-equals"),
});

// ─── Exported types ───────────────────────────────────────────────────────────

export type EnterDigitCommand = z.infer<typeof enterDigitCommandSchema>;
export type EnterDecimalPointCommand = z.infer<
  typeof enterDecimalPointCommandSchema
>;
export type ToggleSignCommand = z.infer<typeof toggleSignCommandSchema>;
export type ApplyPercentCommand = z.infer<typeof applyPercentCommandSchema>;
export type SelectOperatorCommand = z.infer<typeof selectOperatorCommandSchema>;
export type ExecuteEqualsCommand = z.infer<typeof executeEqualsCommandSchema>;

// ─── Slice 3 types ────────────────────────────────────────────────────────────

export type ClearEntryCommand = { kind: "clear-entry" };
export type ClearAllCommand = { kind: "clear-all" };
export type BackspaceCommand = { kind: "backspace" };
export type DismissErrorCommand = { kind: "dismiss-error" };

// ─── Internal helpers ─────────────────────────────────────────────────────────

function toEditingState(
  state: CalculatorState,
  currentInput: string,
  statusText: string,
): CalculatorState {
  return {
    ...state,
    currentInput,
    statusText,
    inputMode: "editing",
  };
}

type ComputeResult =
  | { value: number; error: null }
  | { value: null; error: string };

function compute(a: number, op: ArithmeticOperator, b: number): ComputeResult {
  switch (op) {
    case "+":
      return { value: a + b, error: null };
    case "-":
      return { value: a - b, error: null };
    case "*":
      return { value: a * b, error: null };
    case "/":
      if (b === 0) return { value: null, error: "Cannot divide by zero" };
      return { value: a / b, error: null };
  }
}

function formatNumber(value: number): string {
  return parseFloat(value.toPrecision(10)).toString();
}

function operatorSymbol(op: ArithmeticOperator): string {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "−";
    case "*":
      return "×";
    case "/":
      return "÷";
  }
}

// ─── Slice 1 command handlers ─────────────────────────────────────────────────

export function runEnterDigitCommand(
  state: CalculatorState,
  command: EnterDigitCommand,
): CalculatorState {
  const { digit } = enterDigitCommandSchema.parse(command);

  // After a result: start completely fresh
  if (state.inputMode === "result") {
    return {
      ...initialCalculatorState,
      currentInput: digit,
      statusText: `Entering number ${digit}`,
      inputMode: "editing",
    };
  }

  // After operator selected: start second operand fresh, preserve operator context
  if (state.inputMode === "operator-selected") {
    return {
      ...state,
      currentInput: digit,
      statusText: `Entering number ${digit}`,
      inputMode: "editing",
    };
  }

  // Normal entry
  if (state.currentInput === "0") {
    return toEditingState(state, digit, `Entering number ${digit}`);
  }

  if (state.currentInput === "-0") {
    return toEditingState(
      state,
      `-${digit}`,
      `Entering negative number ${digit}`,
    );
  }

  return toEditingState(
    state,
    `${state.currentInput}${digit}`,
    `Entering number ${digit}`,
  );
}

export function runEnterDecimalPointCommand(
  state: CalculatorState,
  command: EnterDecimalPointCommand = { symbol: "." },
): CalculatorState {
  enterDecimalPointCommandSchema.parse(command);

  // After operator selected: start second operand fresh with "0."
  if (state.inputMode === "operator-selected") {
    return {
      ...state,
      currentInput: "0.",
      statusText: "Decimal point added",
      inputMode: "editing",
    };
  }

  // After a result: start completely fresh
  if (state.inputMode === "result") {
    return {
      ...initialCalculatorState,
      currentInput: "0.",
      statusText: "Decimal point added",
      inputMode: "editing",
    };
  }

  if (state.currentInput.includes(".")) {
    return {
      ...state,
      statusText: "Decimal point already present",
    };
  }

  if (state.currentInput === "-0") {
    return toEditingState(state, "-0.", "Decimal point added");
  }

  if (state.currentInput === "0") {
    return toEditingState(state, "0.", "Decimal point added");
  }

  return toEditingState(state, `${state.currentInput}.`, "Decimal point added");
}

export function runToggleSignCommand(
  state: CalculatorState,
  command: ToggleSignCommand = { kind: "toggle-sign" },
): CalculatorState {
  toggleSignCommandSchema.parse(command);

  // No active value to toggle in these modes
  if (state.inputMode === "error" || state.inputMode === "operator-selected") {
    return state;
  }

  if (state.currentInput.startsWith("-")) {
    return toEditingState(
      state,
      state.currentInput.slice(1),
      "Sign set to positive",
    );
  }

  return toEditingState(
    state,
    `-${state.currentInput}`,
    "Sign set to negative",
  );
}

// ─── Slice 5 command handlers ─────────────────────────────────────────────────

// Standard handheld calculator percent rules:
//   addition / subtraction context  →  firstOperand × (currentValue / 100)
//   multiplication / division or no pending operator  →  currentValue / 100
export function runApplyPercentCommand(
  state: CalculatorState,
  command: ApplyPercentCommand = { kind: "apply-percent" },
): CalculatorState {
  applyPercentCommandSchema.parse(command);

  if (state.inputMode === "error") {
    return state;
  }

  // operator-selected: no second operand yet — apply percent to the first operand
  if (state.inputMode === "operator-selected") {
    if (state.firstOperand === null) return state;
    const percentValue = state.firstOperand / 100;
    const formatted = formatNumber(percentValue);
    return toEditingState(state, formatted, `Percent: ${formatted}`);
  }

  const currentValue = parseFloat(state.currentInput);

  // Addition/subtraction context: percent means "X% of the first operand"
  if (
    state.inputMode === "editing" &&
    (state.pendingOperator === "+" || state.pendingOperator === "-") &&
    state.firstOperand !== null
  ) {
    const percentValue = state.firstOperand * (currentValue / 100);
    const formatted = formatNumber(percentValue);
    return toEditingState(state, formatted, `Percent: ${formatted}`);
  }

  // Multiplication / division context, standalone result, or idle: straight ÷ 100
  const percentValue = currentValue / 100;
  const formatted = formatNumber(percentValue);

  if (state.inputMode === "result") {
    return {
      ...state,
      currentInput: formatted,
      statusText: `Percent: ${formatted}`,
    };
  }

  return toEditingState(state, formatted, `Percent: ${formatted}`);
}

// ─── Slice 2 command handlers ─────────────────────────────────────────────────

export function runSelectOperatorCommand(
  state: CalculatorState,
  command: SelectOperatorCommand,
): CalculatorState {
  const { operator } = selectOperatorCommandSchema.parse(command);

  if (state.inputMode === "error") {
    return state;
  }

  // Chained operator: already have a pending operation and second operand was entered
  if (
    state.pendingOperator !== null &&
    state.firstOperand !== null &&
    state.inputMode === "editing"
  ) {
    const secondOperand = parseFloat(state.currentInput);
    const result = compute(
      state.firstOperand,
      state.pendingOperator,
      secondOperand,
    );
    if (result.error !== null) {
      return {
        ...state,
        inputMode: "error",
        errorMessage: result.error,
        statusText: `Error: ${result.error}`,
      };
    }
    const formatted = formatNumber(result.value);
    return {
      ...state,
      currentInput: formatted,
      statusText: `${formatted} ${operatorSymbol(operator)}`,
      inputMode: "operator-selected",
      firstOperand: result.value,
      pendingOperator: operator,
      lastOperator: null,
      lastOperand: null,
      errorMessage: null,
    };
  }

  // First operator press or operator change (result/idle/operator-selected modes)
  const currentValue = parseFloat(state.currentInput);
  return {
    ...state,
    statusText: `${state.currentInput} ${operatorSymbol(operator)}`,
    inputMode: "operator-selected",
    firstOperand: currentValue,
    pendingOperator: operator,
    lastOperator: null,
    lastOperand: null,
    errorMessage: null,
  };
}

export function runExecuteEqualsCommand(
  state: CalculatorState,
  command: ExecuteEqualsCommand = { kind: "execute-equals" },
): CalculatorState {
  executeEqualsCommandSchema.parse(command);

  if (state.inputMode === "error") {
    return state;
  }

  const currentValue = parseFloat(state.currentInput);

  // Chained equals: no pending operator — repeat the last operation
  if (state.pendingOperator === null) {
    if (state.lastOperator === null || state.lastOperand === null) {
      return state;
    }
    const result = compute(currentValue, state.lastOperator, state.lastOperand);
    if (result.error !== null) {
      return {
        ...state,
        inputMode: "error",
        errorMessage: result.error,
        statusText: `Error: ${result.error}`,
      };
    }
    const formatted = formatNumber(result.value);
    return {
      ...state,
      currentInput: formatted,
      statusText: `Result: ${formatted}`,
      inputMode: "result",
      firstOperand: null,
      errorMessage: null,
    };
  }

  // First equals: compute the pending operation
  if (state.firstOperand === null) {
    return state;
  }

  const result = compute(
    state.firstOperand,
    state.pendingOperator,
    currentValue,
  );
  if (result.error !== null) {
    return {
      ...state,
      inputMode: "error",
      errorMessage: result.error,
      statusText: `Error: ${result.error}`,
    };
  }
  const formatted = formatNumber(result.value);
  return {
    ...state,
    currentInput: formatted,
    statusText: `Result: ${formatted}`,
    inputMode: "result",
    firstOperand: null,
    pendingOperator: null,
    lastOperator: state.pendingOperator,
    lastOperand: currentValue,
    errorMessage: null,
  };
}

// ─── Slice 3 command handlers ─────────────────────────────────────────────────

export function runClearEntryCommand(state: CalculatorState): CalculatorState {
  if (state.inputMode === "error") {
    return initialCalculatorState;
  }
  if (state.inputMode !== "editing") {
    return state;
  }
  // Editing second operand: clear active input, restore operator-selected context
  if (state.pendingOperator !== null) {
    return {
      ...state,
      currentInput: "0",
      statusText: "Entry cleared",
      inputMode: "operator-selected",
    };
  }
  // Editing first operand: clear to initial state
  return { ...initialCalculatorState, statusText: "Entry cleared" };
}

export function runClearAllCommand(state: CalculatorState): CalculatorState {
  void state;
  return initialCalculatorState;
}

export function runBackspaceCommand(state: CalculatorState): CalculatorState {
  if (state.inputMode !== "editing") {
    return state;
  }
  const input = state.currentInput;
  if (input.length <= 1 || (input.startsWith("-") && input.length === 2)) {
    return { ...state, currentInput: "0", statusText: "Entry deleted" };
  }
  const truncated = input.slice(0, -1);
  if (truncated === "-") {
    return { ...state, currentInput: "0", statusText: "Entry deleted" };
  }
  return { ...state, currentInput: truncated, statusText: "Entry deleted" };
}

export function runDismissErrorCommand(
  state: CalculatorState,
): CalculatorState {
  if (state.inputMode !== "error") {
    return state;
  }
  return initialCalculatorState;
}
