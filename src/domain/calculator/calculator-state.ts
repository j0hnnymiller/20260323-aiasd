export type CalculatorInputMode = "idle" | "editing";

export interface CalculatorState {
  currentInput: string;
  statusText: string;
  inputMode: CalculatorInputMode;
}

export interface CalculatorDisplayViewModel {
  value: string;
}

export interface CalculatorStatusViewModel {
  text: string;
}

export const initialCalculatorState: CalculatorState = {
  currentInput: "0",
  statusText: "Ready for input",
  inputMode: "idle",
};
