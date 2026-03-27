import type {
  CalculatorDisplayViewModel,
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
