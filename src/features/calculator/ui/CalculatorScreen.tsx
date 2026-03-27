import styles from "./CalculatorScreen.module.css";
import {
  type CalculatorStoreState,
  useCalculatorStore,
} from "../application/calculator-store";

const digitRows = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
];

export function CalculatorScreen() {
  const displayValue = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.currentInput,
  );
  const statusText = useCalculatorStore(
    (state: CalculatorStoreState) => state.calculator.statusText,
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

  return (
    <section
      className={styles.calculator}
      role="region"
      aria-label="Slice 1 calculator"
    >
      <div className={styles.displayShell}>
        <p className={styles.status} aria-live="polite">
          {statusText}
        </p>
        <output className={styles.display} aria-label="Calculator display">
          {displayValue}
        </output>
      </div>

      <div className={styles.keypad} role="group" aria-label="Numeric keypad">
        {digitRows.flatMap((row) =>
          row.map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.key}
              onClick={() => enterDigit({ digit })}
            >
              {digit}
            </button>
          )),
        )}

        <button type="button" className={styles.key} onClick={toggleSign}>
          +/-
        </button>
        <button
          type="button"
          className={`${styles.key} ${styles.zeroKey}`}
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
      </div>
    </section>
  );
}
