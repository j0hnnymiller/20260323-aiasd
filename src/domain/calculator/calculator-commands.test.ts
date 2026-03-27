import { describe, expect, it } from "vitest";
import {
  runApplyPercentCommand,
  runBackspaceCommand,
  runClearAllCommand,
  runClearEntryCommand,
  runDismissErrorCommand,
  runEnterDecimalPointCommand,
  runEnterDigitCommand,
  runExecuteEqualsCommand,
  runSelectOperatorCommand,
  runToggleSignCommand,
} from "./calculator-commands";
import {
  getCalculatorDisplayQuery,
  getCalculatorErrorQuery,
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

describe("calculator slice 2 commands — arithmetic operations", () => {
  function enterNumber(digits: string) {
    return digits.split("").reduce((state, digit) => {
      if (digit === ".") return runEnterDecimalPointCommand(state);
      return runEnterDigitCommand(state, { digit });
    }, initialCalculatorState);
  }

  it("computes addition correctly", () => {
    const afterFirst = enterNumber("5");
    const afterOp = runSelectOperatorCommand(afterFirst, { operator: "+" });
    const afterSecond = enterNumber("3");
    // second number entry resets on operator-selected, so enter from afterOp state
    const afterSecondDigit = runEnterDigitCommand(afterOp, { digit: "3" });
    const result = runExecuteEqualsCommand(afterSecondDigit);

    expect(result.currentInput).toBe("8");
    expect(result.inputMode).toBe("result");
  });

  it("computes subtraction correctly", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "9" });
    const s2 = runSelectOperatorCommand(s, { operator: "-" });
    const s3 = runEnterDigitCommand(s2, { digit: "4" });
    const result = runExecuteEqualsCommand(s3);

    expect(result.currentInput).toBe("5");
  });

  it("computes multiplication correctly", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "6" });
    const s2 = runSelectOperatorCommand(s, { operator: "*" });
    const s3 = runEnterDigitCommand(s2, { digit: "7" });
    const result = runExecuteEqualsCommand(s3);

    expect(result.currentInput).toBe("42");
  });

  it("computes division correctly", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "8" });
    const s2 = runSelectOperatorCommand(s, { operator: "/" });
    const s3 = runEnterDigitCommand(s2, { digit: "2" });
    const result = runExecuteEqualsCommand(s3);

    expect(result.currentInput).toBe("4");
  });

  it("produces a recoverable error state on divide by zero", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    const s2 = runSelectOperatorCommand(s, { operator: "/" });
    const s3 = runEnterDigitCommand(s2, { digit: "0" });
    const result = runExecuteEqualsCommand(s3);

    expect(result.inputMode).toBe("error");
    expect(result.errorMessage).toBe("Cannot divide by zero");
  });

  it("exposes the error through the error query without mutating state", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "1" });
    const s2 = runSelectOperatorCommand(s, { operator: "/" });
    const s3 = runEnterDigitCommand(s2, { digit: "0" });
    const errorState = runExecuteEqualsCommand(s3);
    const snapshot = structuredClone(errorState);

    const errorQuery = getCalculatorErrorQuery(errorState);

    expect(errorQuery).toEqual({
      hasError: true,
      message: "Cannot divide by zero",
    });
    expect(errorState).toEqual(snapshot);
  });

  it("error query returns no-error for a healthy state", () => {
    const errorQuery = getCalculatorErrorQuery(initialCalculatorState);

    expect(errorQuery).toEqual({ hasError: false, message: null });
  });

  it("ignores commands when in error state", () => {
    const errorState = runExecuteEqualsCommand(
      runEnterDigitCommand(
        runSelectOperatorCommand(
          runEnterDigitCommand(initialCalculatorState, { digit: "1" }),
          { operator: "/" },
        ),
        { digit: "0" },
      ),
    );

    const afterEquals = runExecuteEqualsCommand(errorState);
    const afterOperator = runSelectOperatorCommand(errorState, {
      operator: "+",
    });

    expect(afterEquals).toEqual(errorState);
    expect(afterOperator).toEqual(errorState);
  });

  it("chains a second operator before equals by computing the first pair first", () => {
    // 5 + 3 - 2 =  should give 6
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });
    s = runSelectOperatorCommand(s, { operator: "-" }); // triggers 5+3=8
    s = runEnterDigitCommand(s, { digit: "2" });
    const result = runExecuteEqualsCommand(s);

    expect(result.currentInput).toBe("6");
  });

  it("chained equals repeats the last operation", () => {
    // 5 + 3 = 8, = 11, = 14
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });
    s = runExecuteEqualsCommand(s); // 8
    s = runExecuteEqualsCommand(s); // 11
    s = runExecuteEqualsCommand(s); // 14

    expect(s.currentInput).toBe("14");
  });

  it("entering a digit after a result starts a fresh computation", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "9" });
    s = runSelectOperatorCommand(s, { operator: "*" });
    s = runEnterDigitCommand(s, { digit: "2" });
    s = runExecuteEqualsCommand(s); // 18
    s = runEnterDigitCommand(s, { digit: "5" }); // start fresh

    expect(s.currentInput).toBe("5");
    expect(s.inputMode).toBe("editing");
    expect(s.pendingOperator).toBeNull();
    expect(s.firstOperand).toBeNull();
  });

  it("handles floating-point addition without rounding artifacts", () => {
    let s = runEnterDecimalPointCommand(
      runEnterDigitCommand(initialCalculatorState, { digit: "1" }),
    );
    // state is "1." now, but we need to enter 0.1
    // reset and build 0.1
    s = initialCalculatorState;
    s = runEnterDecimalPointCommand(s); // "0."
    s = runEnterDigitCommand(s, { digit: "1" }); // "0.1"
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDecimalPointCommand(s); // "0." (fresh for second operand)
    s = runEnterDigitCommand(s, { digit: "2" }); // "0.2"
    const result = runExecuteEqualsCommand(s);

    expect(result.currentInput).toBe("0.3");
  });
});

describe("calculator slice 3 commands — recovery and editing controls", () => {
  // ─── ClearEntryCommand ────────────────────────────────────────────────────

  it("CE clears the active input when editing the first operand", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    const result = runClearEntryCommand(s);

    expect(result.currentInput).toBe("0");
    expect(result.statusText).toBe("Entry cleared");
    expect(result.inputMode).toBe("idle");
  });

  it("CE clears only the active entry and preserves operator context when editing the second operand", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });

    const result = runClearEntryCommand(s);

    expect(result.currentInput).toBe("0");
    expect(result.pendingOperator).toBe("+");
    expect(result.firstOperand).toBe(5);
    expect(result.inputMode).toBe("operator-selected");
  });

  it("CE is a no-op in operator-selected mode (no active entry)", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });

    const result = runClearEntryCommand(s);

    expect(result).toEqual(s);
  });

  it("CE dismisses error state and resets to initial state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "1" });
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);
    expect(s.inputMode).toBe("error");

    const result = runClearEntryCommand(s);

    expect(result).toEqual(initialCalculatorState);
  });

  // ─── ClearAllCommand ──────────────────────────────────────────────────────

  it("CA resets to initial state from any editing mode", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "9" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });

    const result = runClearAllCommand(s);

    expect(result).toEqual(initialCalculatorState);
  });

  it("CA is idempotent when already in initial state", () => {
    const result = runClearAllCommand(initialCalculatorState);

    expect(result).toEqual(initialCalculatorState);
  });

  it("CA resets from error state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "1" });
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);

    const result = runClearAllCommand(s);

    expect(result).toEqual(initialCalculatorState);
  });

  it("CA resets from result state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });
    s = runExecuteEqualsCommand(s);
    expect(s.inputMode).toBe("result");

    const result = runClearAllCommand(s);

    expect(result).toEqual(initialCalculatorState);
  });

  // ─── BackspaceCommand ─────────────────────────────────────────────────────

  it("backspace removes the last character from a multi-character input", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "1" });
    s = runEnterDigitCommand(s, { digit: "2" });
    s = runEnterDigitCommand(s, { digit: "3" });

    const result = runBackspaceCommand(s);

    expect(result.currentInput).toBe("12");
    expect(result.statusText).toBe("Entry deleted");
  });

  it("backspace resets a single-character input to 0", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "7" });

    const result = runBackspaceCommand(s);

    expect(result.currentInput).toBe("0");
    expect(result.statusText).toBe("Entry deleted");
  });

  it("backspace removes the decimal point from '0.'", () => {
    const s = runEnterDecimalPointCommand(initialCalculatorState);

    const result = runBackspaceCommand(s);

    expect(result.currentInput).toBe("0");
  });

  it("backspace resets a negative single-digit input to 0", () => {
    let s = runToggleSignCommand(initialCalculatorState);
    s = runEnterDigitCommand(s, { digit: "5" });
    expect(s.currentInput).toBe("-5");

    const result = runBackspaceCommand(s);

    expect(result.currentInput).toBe("0");
  });

  it("backspace trims a negative multi-digit number correctly", () => {
    let s = runToggleSignCommand(initialCalculatorState);
    s = runEnterDigitCommand(s, { digit: "1" });
    s = runEnterDigitCommand(s, { digit: "2" });
    expect(s.currentInput).toBe("-12");

    const result = runBackspaceCommand(s);

    expect(result.currentInput).toBe("-1");
  });

  it("backspace does not affect result state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });
    s = runExecuteEqualsCommand(s);
    expect(s.inputMode).toBe("result");

    const result = runBackspaceCommand(s);

    expect(result).toEqual(s);
  });

  it("backspace does not affect idle state", () => {
    const result = runBackspaceCommand(initialCalculatorState);

    expect(result).toEqual(initialCalculatorState);
  });

  it("backspace does not affect error state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "1" });
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);

    const result = runBackspaceCommand(s);

    expect(result).toEqual(s);
  });

  // ─── DismissErrorCommand ──────────────────────────────────────────────────

  it("dismissError resets from error state to initial state", () => {
    let s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);

    const result = runDismissErrorCommand(s);

    expect(result).toEqual(initialCalculatorState);
  });

  it("dismissError is a no-op when not in error state", () => {
    const s = runEnterDigitCommand(initialCalculatorState, { digit: "5" });

    const result = runDismissErrorCommand(s);

    expect(result).toEqual(s);
  });

  it("dismissError is a no-op in initial state", () => {
    const result = runDismissErrorCommand(initialCalculatorState);

    expect(result).toEqual(initialCalculatorState);
  });
});

describe("calculator slice 5 commands — sign toggle and percent", () => {
  function enterNumber(digits: string) {
    return digits.split("").reduce((state, digit) => {
      if (digit === ".") return runEnterDecimalPointCommand(state);
      return runEnterDigitCommand(state, { digit });
    }, initialCalculatorState);
  }

  // ─── UC-5.1 Toggle Active Value Sign ──────────────────────────────────────

  it("toggleSign negates a positive number in editing mode", () => {
    const s = enterNumber("42");
    const result = runToggleSignCommand(s);

    expect(result.currentInput).toBe("-42");
    expect(result.statusText).toBe("Sign set to negative");
  });

  it("toggleSign removes the negative sign from a negative number", () => {
    const s = runToggleSignCommand(enterNumber("7"));
    const result = runToggleSignCommand(s);

    expect(result.currentInput).toBe("7");
    expect(result.statusText).toBe("Sign set to positive");
  });

  it("toggleSign on a result value negates it and transitions to editing", () => {
    let s = enterNumber("8");
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "2" });
    s = runExecuteEqualsCommand(s);
    expect(s.currentInput).toBe("10");
    expect(s.inputMode).toBe("result");

    const result = runToggleSignCommand(s);

    expect(result.currentInput).toBe("-10");
    expect(result.inputMode).toBe("editing");
  });

  it("toggleSign is a no-op in operator-selected mode", () => {
    let s = enterNumber("5");
    s = runSelectOperatorCommand(s, { operator: "+" });
    expect(s.inputMode).toBe("operator-selected");

    const result = runToggleSignCommand(s);

    expect(result).toEqual(s);
  });

  it("toggleSign is a no-op in error mode", () => {
    let s = enterNumber("1");
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);
    expect(s.inputMode).toBe("error");

    const result = runToggleSignCommand(s);

    expect(result).toEqual(s);
  });

  // ─── UC-5.2 Apply Percent Behavior ────────────────────────────────────────
  // Standard handheld rule:
  //   addition / subtraction context  →  firstOperand × (currentValue / 100)
  //   all other contexts              →  currentValue / 100

  it("percent on a standalone number divides it by 100", () => {
    const s = enterNumber("50");
    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("0.5");
    expect(result.inputMode).toBe("editing");
  });

  it("percent in addition context applies X% of first operand rule", () => {
    // 200 + 10% means 10% of 200 = 20, so the second operand becomes 20
    let s = enterNumber("200");
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "1" });
    s = runEnterDigitCommand(s, { digit: "0" });
    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("20");
    expect(result.inputMode).toBe("editing");
  });

  it("percent after addition with % then equals gives correct total", () => {
    // 200 + 10% = 200 + 20 = 220
    let s = enterNumber("200");
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "1" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runApplyPercentCommand(s); // becomes 20
    const result = runExecuteEqualsCommand(s);

    expect(result.currentInput).toBe("220");
    expect(result.inputMode).toBe("result");
  });

  it("percent in subtraction context applies X% of first operand rule", () => {
    // 400 - 25% means 25% of 400 = 100, so the second operand becomes 100
    let s = enterNumber("400");
    s = runSelectOperatorCommand(s, { operator: "-" });
    s = runEnterDigitCommand(s, { digit: "2" });
    s = runEnterDigitCommand(s, { digit: "5" });
    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("100");
  });

  it("percent in multiplication context divides by 100 (straight conversion)", () => {
    // 50 * 20% means 50 * 0.20 = 10
    let s = enterNumber("50");
    s = runSelectOperatorCommand(s, { operator: "*" });
    s = runEnterDigitCommand(s, { digit: "2" });
    s = runEnterDigitCommand(s, { digit: "0" });
    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("0.2");
  });

  it("percent in division context divides by 100 (straight conversion)", () => {
    // 50 / 50% means 50 / 0.5 = 100
    let s = enterNumber("50");
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "5" });
    s = runEnterDigitCommand(s, { digit: "0" });
    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("0.5");
  });

  it("percent on a result value divides it by 100 and stays in result mode", () => {
    let s = enterNumber("5");
    s = runSelectOperatorCommand(s, { operator: "*" });
    s = runEnterDigitCommand(s, { digit: "4" });
    s = runExecuteEqualsCommand(s);
    expect(s.currentInput).toBe("20");
    expect(s.inputMode).toBe("result");

    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("0.2");
    expect(result.inputMode).toBe("result");
  });

  it("percent in operator-selected mode applies to the first operand", () => {
    let s = enterNumber("80");
    s = runSelectOperatorCommand(s, { operator: "+" });
    expect(s.inputMode).toBe("operator-selected");

    const result = runApplyPercentCommand(s);

    expect(result.currentInput).toBe("0.8");
    expect(result.inputMode).toBe("editing");
  });

  it("percent is a no-op in error mode", () => {
    let s = enterNumber("1");
    s = runSelectOperatorCommand(s, { operator: "/" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runExecuteEqualsCommand(s);
    expect(s.inputMode).toBe("error");

    const result = runApplyPercentCommand(s);

    expect(result).toEqual(s);
  });

  // ─── Regression: core arithmetic unaffected ──────────────────────────────────

  it("core arithmetic still works correctly after sign toggle is applied", () => {
    let s = runToggleSignCommand(enterNumber("5")); // -5
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "3" });
    const result = runExecuteEqualsCommand(s);

    expect(result.currentInput).toBe("-2");
    expect(result.inputMode).toBe("result");
  });

  it("core arithmetic still works correctly after percent is applied", () => {
    // 300 + 10% = 330 then + 5 = 335
    let s = enterNumber("300");
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "1" });
    s = runEnterDigitCommand(s, { digit: "0" });
    s = runApplyPercentCommand(s); // 30
    s = runExecuteEqualsCommand(s); // 330
    s = runSelectOperatorCommand(s, { operator: "+" });
    s = runEnterDigitCommand(s, { digit: "5" });
    const result = runExecuteEqualsCommand(s);

    expect(result.currentInput).toBe("335");
  });
});
