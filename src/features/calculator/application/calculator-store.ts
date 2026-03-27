import { create } from "zustand";
import {
  runEnterDecimalPointCommand,
  runEnterDigitCommand,
  runToggleSignCommand,
  type EnterDigitCommand,
} from "../../../domain/calculator/calculator-commands";
import {
  getCalculatorDisplayQuery,
  getCalculatorStatusQuery,
} from "../../../domain/calculator/calculator-queries";
import {
  initialCalculatorState,
  type CalculatorDisplayViewModel,
  type CalculatorState,
  type CalculatorStatusViewModel,
} from "../../../domain/calculator/calculator-state";

export interface CalculatorStoreState {
  calculator: CalculatorState;
  enterDigit: (command: EnterDigitCommand) => void;
  enterDecimalPoint: () => void;
  toggleSign: () => void;
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
