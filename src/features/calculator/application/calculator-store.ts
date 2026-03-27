import { create } from "zustand";
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
  type EnterDigitCommand,
  type SelectOperatorCommand,
} from "../../../domain/calculator/calculator-commands";
import {
  getCalculatorDisplayQuery,
  getCalculatorErrorQuery,
  getCalculatorStatusQuery,
} from "../../../domain/calculator/calculator-queries";
import {
  initialCalculatorState,
  type CalculatorDisplayViewModel,
  type CalculatorErrorViewModel,
  type CalculatorState,
  type CalculatorStatusViewModel,
} from "../../../domain/calculator/calculator-state";

export interface CalculatorStoreState {
  calculator: CalculatorState;
  enterDigit: (command: EnterDigitCommand) => void;
  enterDecimalPoint: () => void;
  toggleSign: () => void;
  applyPercent: () => void;
  selectOperator: (command: SelectOperatorCommand) => void;
  executeEquals: () => void;
  clearEntry: () => void;
  clearAll: () => void;
  backspace: () => void;
  dismissError: () => void;
}

export const useCalculatorStore = create<CalculatorStoreState>((set) => ({
  calculator: initialCalculatorState,
  enterDigit: (command) =>
    set((state) => ({
      calculator: runEnterDigitCommand(state.calculator, command),
    })),
  enterDecimalPoint: () =>
    set((state) => ({
      calculator: runEnterDecimalPointCommand(state.calculator),
    })),
  toggleSign: () =>
    set((state) => ({
      calculator: runToggleSignCommand(state.calculator),
    })),
  applyPercent: () =>
    set((state) => ({
      calculator: runApplyPercentCommand(state.calculator),
    })),
  selectOperator: (command) =>
    set((state) => ({
      calculator: runSelectOperatorCommand(state.calculator, command),
    })),
  executeEquals: () =>
    set((state) => ({
      calculator: runExecuteEqualsCommand(state.calculator),
    })),
  clearEntry: () =>
    set((state) => ({
      calculator: runClearEntryCommand(state.calculator),
    })),
  clearAll: () =>
    set((state) => ({
      calculator: runClearAllCommand(state.calculator),
    })),
  backspace: () =>
    set((state) => ({
      calculator: runBackspaceCommand(state.calculator),
    })),
  dismissError: () =>
    set((state) => ({
      calculator: runDismissErrorCommand(state.calculator),
    })),
}));

export function selectCalculatorDisplay(
  state: CalculatorStoreState,
): CalculatorDisplayViewModel {
  return getCalculatorDisplayQuery(state.calculator);
}

export function selectCalculatorStatus(
  state: CalculatorStoreState,
): CalculatorStatusViewModel {
  return getCalculatorStatusQuery(state.calculator);
}

export function selectCalculatorError(
  state: CalculatorStoreState,
): CalculatorErrorViewModel {
  return getCalculatorErrorQuery(state.calculator);
}
