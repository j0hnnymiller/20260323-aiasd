import type {
  CalculatorDisplayViewModel,
  CalculatorErrorViewModel,
  CalculatorState,
  CalculatorStatusViewModel,
} from "./calculator-state";

export function getCalculatorDisplayQuery(
  state: CalculatorState,
): CalculatorDisplayViewModel {
  return {
    value: state.currentInput,
  };
}

export function getCalculatorStatusQuery(
  state: CalculatorState,
): CalculatorStatusViewModel {
  return {
    text: state.statusText,
  };
}

export function getCalculatorErrorQuery(
  state: CalculatorState,
): CalculatorErrorViewModel {
  return {
    hasError: state.inputMode === "error",
    message: state.errorMessage,
  };
}
