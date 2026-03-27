import styles from "./App.module.css";
import { CalculatorScreen } from "../features/calculator/ui/CalculatorScreen";

export function App() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.panel}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Slice 1</p>
          <h1 className={styles.title}>Calculator State Entry Foundation</h1>
        </header>
        <CalculatorScreen />
      </section>
    </main>
  );
}
