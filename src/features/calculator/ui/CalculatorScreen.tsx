import styles from "./CalculatorScreen.module.css";
import {
  type CalculatorStoreState,
  useCalculatorStore,
} from "../application/calculator-store";
import type { ArithmeticOperator } from "../../../domain/calculator/calculator-state";

type KeypadRow = {
  digits: [string, string, string];
  operator: { symbol: string; value: ArithmeticOperator };
};

const keypadRows: KeypadRow[] = [
  { digits: ["7", "8", "9"], operator: { symbol: "÷", value: "/" } },
  { digits: ["4", "5", "6"], operator: { symbol: "×", value: "*" } },
  { digits: ["1", "2", "3"], operator: { symbol: "−", value: "-" } },
];

export function CalculatorScreen() {
  const displayValue = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.currentInput,
  );
  const statusText = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.statusText,
  );
  const pendingOperator = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.pendingOperator,
  );
  const enterDigit = useCalculatorStore(
    (state: CalculatorStoreState) => state.enterDigit,
  );
  const enterDecimalPoint = useCalculatorStore(
    (state: CalculatorStoreState) => state.enterDecimalPoint,
  );
  const toggleSign = useCalculatorStore(
    (state: CalculatorStoreState) => state.toggleSign,
  );
  const applyPercent = useCalculatorStore(
    (state: CalculatorStoreState) => state.applyPercent,
  );
  const selectOperator = useCalculatorStore(
    (state: CalculatorStoreState) => state.selectOperator,
  );
  const executeEquals = useCalculatorStore(
    (state: CalculatorStoreState) => state.executeEquals,
  );
  const clearEntry = useCalculatorStore(
    (state: CalculatorStoreState) => state.clearEntry,
  );
  const clearAll = useCalculatorStore(
    (state: CalculatorStoreState) => state.clearAll,
  );
  const backspace = useCalculatorStore(
    (state: CalculatorStoreState) => state.backspace,
  );
  const dismissError = useCalculatorStore(
    (state: CalculatorStoreState) => state.dismissError,
  );
  const hasError = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.inputMode === "error",
  );
  const errorMessage = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.errorMessage,
  );

  return (
    <section
      className={styles.calculator}
      role="region"
      aria-label="Web calculator"
    >
      <div className={styles.displayShell}>
        <p className={styles.status} aria-live="polite">
          {statusText}
        </p>
        <output className={styles.display} aria-label="Calculator display">
          {displayValue}
        </output>
        {hasError && (
          <div className={styles.errorBanner} role="alert">
            <span className={styles.errorText}>{errorMessage}</span>
            <button
              type="button"
              className={styles.errorDismiss}
              aria-label="Dismiss error"
              onClick={dismissError}
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div
        className={styles.keypad}
        role="group"
        aria-label="Calculator keypad"
      >
        {/* Slice 3: recovery and editing row */}
        <button
          type="button"
          className={`${styles.key} ${styles.clearEntryKey}`}
          onClick={clearEntry}
        >
          CE
        </button>
        <button
          type="button"
          className={`${styles.key} ${styles.clearAllKey}`}
          onClick={clearAll}
        >
          CA
        </button>
        <button
          type="button"
          className={`${styles.key} ${styles.backspaceKey}`}
          onClick={backspace}
        >
          ⌫
        </button>
        {/* Slice 5: percent — fills col 4 of the utility row */}
        <button
          type="button"
          className={`${styles.key} ${styles.percentKey}`}
          onClick={applyPercent}
        >
          %
        </button>

        {keypadRows.flatMap(({ digits, operator }) => [
          ...digits.map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.key}
              onClick={() => enterDigit({ digit })}
            >
              {digit}
            </button>
          )),
          <button
            key={operator.value}
            type="button"
            className={`${styles.key} ${styles.operatorKey}${
              pendingOperator === operator.value
                ? ` ${styles.operatorKeyActive}`
                : ""
            }`}
            onClick={() => selectOperator({ operator: operator.value })}
          >
            {operator.symbol}
          </button>,
        ])}

        <button type="button" className={styles.key} onClick={toggleSign}>
          +/-
        </button>
        <button
          type="button"
          className={styles.key}
          onClick={() => enterDigit({ digit: "0" })}
        >
          0
        </button>
        <button
          type="button"
          className={styles.key}
          onClick={enterDecimalPoint}
        >
          .
        </button>
        <button
          type="button"
          className={`${styles.key} ${styles.operatorKey}${
            pendingOperator === "+" ? ` ${styles.operatorKeyActive}` : ""
          }`}
          onClick={() => selectOperator({ operator: "+" })}
        >
          +
        </button>

        <button
          type="button"
          className={`${styles.key} ${styles.equalsKey}`}
          onClick={executeEquals}
        >
          =
        </button>
      </div>
    </section>
  );
}
