import { describe, expect, it } from "vitest";
import {
  runEnterDecimalPointCommand,
  runEnterDigitCommand,
  runToggleSignCommand,
} from "./calculator-commands";
import {
  getCalculatorDisplayQuery,
  getCalculatorStatusQuery,
} from "./calculator-queries";
import { initialCalculatorState } from "./calculator-state";

describe("calculator slice 1 commands", () => {
  it("replaces the default zero when the first digit is entered", () => {
    const nextState = runEnterDigitCommand(initialCalculatorState, {
      digit: "8",
    });

    expect(nextState.currentInput).toBe("8");
    expect(nextState.statusText).toBe("Entering number 8");
  });

  it("appends digits to the current input", () => {
    const oneDigitState = runEnterDigitCommand(initialCalculatorState, {
      digit: "1",
    });
    const nextState = runEnterDigitCommand(oneDigitState, { digit: "2" });

    expect(nextState.currentInput).toBe("12");
  });

  it("adds a decimal point only once", () => {
    const withDecimal = runEnterDecimalPointCommand(initialCalculatorState);
    const rejectedState = runEnterDecimalPointCommand(withDecimal);

    expect(withDecimal.currentInput).toBe("0.");
    expect(rejectedState.currentInput).toBe("0.");
    expect(rejectedState.statusText).toBe("Decimal point already present");
  });

  it("toggles negative input before digits are entered", () => {
    const negativeState = runToggleSignCommand(initialCalculatorState);
    const nextState = runEnterDigitCommand(negativeState, { digit: "5" });

    expect(negativeState.currentInput).toBe("-0");
    expect(nextState.currentInput).toBe("-5");
  });

  it("keeps query functions read-only and deterministic", () => {
    const inputState = runEnterDigitCommand(initialCalculatorState, {
      digit: "3",
    });
    const snapshot = structuredClone(inputState);

    expect(getCalculatorDisplayQuery(inputState)).toEqual({ value: "3" });
    expect(getCalculatorStatusQuery(inputState)).toEqual({
      text: "Entering number 3",
    });
    expect(inputState).toEqual(snapshot);
  });
});
