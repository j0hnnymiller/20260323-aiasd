import { z } from "zod";
import type { CalculatorState } from "./calculator-state";

const enterDigitCommandSchema = z.object({
  digit: z.string().regex(/^[0-9]$/),
});

const enterDecimalPointCommandSchema = z.object({
  symbol: z.literal(".").default("."),
});

const toggleSignCommandSchema = z.object({
  kind: z.literal("toggle-sign").default("toggle-sign"),
});

export type EnterDigitCommand = z.infer<typeof enterDigitCommandSchema>;
export type EnterDecimalPointCommand = z.infer<
  typeof enterDecimalPointCommandSchema
>;
export type ToggleSignCommand = z.infer<typeof toggleSignCommandSchema>;

function toEditingState(
  currentInput: string,
  statusText: string,
): CalculatorState {
  return {
    currentInput,
    statusText,
    inputMode: "editing",
  };
}

export function runEnterDigitCommand(
  state: CalculatorState,
  command: EnterDigitCommand,
): CalculatorState {
  const { digit } = enterDigitCommandSchema.parse(command);

  if (state.currentInput === "0") {
    return toEditingState(digit, `Entering number ${digit}`);
  }

  if (state.currentInput === "-0") {
    return toEditingState(`-${digit}`, `Entering negative number ${digit}`);
  }

  return toEditingState(
    `${state.currentInput}${digit}`,
    `Entering number ${digit}`,
  );
}

export function runEnterDecimalPointCommand(
  state: CalculatorState,
  command: EnterDecimalPointCommand = { symbol: "." },
): CalculatorState {
  enterDecimalPointCommandSchema.parse(command);

  if (state.currentInput.includes(".")) {
    return {
      ...state,
      statusText: "Decimal point already present",
    };
  }

  if (state.currentInput === "-0") {
    return toEditingState("-0.", "Decimal point added");
  }

  if (state.currentInput === "0") {
    return toEditingState("0.", "Decimal point added");
  }

  return toEditingState(`${state.currentInput}.`, "Decimal point added");
}

export function runToggleSignCommand(
  state: CalculatorState,
  command: ToggleSignCommand = { kind: "toggle-sign" },
): CalculatorState {
  toggleSignCommandSchema.parse(command);

  if (state.currentInput.startsWith("-")) {
    return toEditingState(state.currentInput.slice(1), "Sign set to positive");
  }

  return toEditingState(`-${state.currentInput}`, "Sign set to negative");
}
