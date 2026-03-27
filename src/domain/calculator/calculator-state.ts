export type ArithmeticOperator = "+" | "-" | "*" | "/";

export type CalculatorInputMode =
  | "idle"
  | "editing"
  | "operator-selected"
  | "result"
  | "error";

export interface CalculatorState {
  currentInput: string;
  statusText: string;
  inputMode: CalculatorInputMode;
  pendingOperator: ArithmeticOperator | null;
  firstOperand: number | null;
  lastOperator: ArithmeticOperator | null;
  lastOperand: number | null;
  errorMessage: string | null;
}

export interface CalculatorDisplayViewModel {
  value: string;
}

export interface CalculatorStatusViewModel {
  text: string;
}

export interface CalculatorErrorViewModel {
  hasError: boolean;
  message: string | null;
}

export const initialCalculatorState: CalculatorState = {
  currentInput: "0",
  statusText: "Ready for input",
  inputMode: "idle",
  pendingOperator: null,
  firstOperand: null,
  lastOperator: null,
  lastOperand: null,
  errorMessage: null,
};
