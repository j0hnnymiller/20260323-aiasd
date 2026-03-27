import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CalculatorScreen } from "./CalculatorScreen";
import { useCalculatorStore } from "../application/calculator-store";
import { initialCalculatorState } from "../../../domain/calculator/calculator-state";

describe("CalculatorScreen", () => {
  beforeEach(() => {
    useCalculatorStore.setState({
      calculator: initialCalculatorState,
    });
  });

  it("renders the current display and status from slice 1 queries", () => {
    render(<CalculatorScreen />);

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
    expect(screen.getByText("Ready for input")).toBeVisible();
  });

  it("updates the display for digit, decimal, and sign commands", async () => {
    const user = userEvent.setup();

    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "+/-" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent(
      "-12.3",
    );
    expect(screen.getByText("Sign set to negative")).toBeVisible();
  });

  it("shows a deterministic status when a second decimal point is rejected", async () => {
    const user = userEvent.setup();

    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "." }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0.");
    expect(screen.getByText("Decimal point already present")).toBeVisible();
  });
});

describe("CalculatorScreen — slice 2 arithmetic", () => {
  beforeEach(() => {
    useCalculatorStore.setState({
      calculator: initialCalculatorState,
    });
  });

  it("renders operator and equals buttons", () => {
    render(<CalculatorScreen />);

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "−" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "×" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "÷" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "=" })).toBeInTheDocument();
  });

  it("computes addition end to end", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("8");
  });

  it("computes subtraction end to end", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "9" }));
    await user.click(screen.getByRole("button", { name: "−" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("5");
  });

  it("computes multiplication end to end", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "6" }));
    await user.click(screen.getByRole("button", { name: "×" }));
    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("42");
  });

  it("computes division end to end", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "8" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("4");
  });

  it("shows a recoverable error message on divide by zero", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Cannot divide by zero",
    );
  });

  it("does not show the error element when the state is healthy", () => {
    render(<CalculatorScreen />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("displays a chained result when equals is pressed multiple times", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" })); // 8
    await user.click(screen.getByRole("button", { name: "=" })); // 11

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("11");
  });
});

describe("CalculatorScreen — slice 3 recovery and editing controls", () => {
  beforeEach(() => {
    useCalculatorStore.setState({ calculator: initialCalculatorState });
  });

  it("renders CE, CA, and backspace buttons", () => {
    render(<CalculatorScreen />);

    expect(screen.getByRole("button", { name: "CE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "⌫" })).toBeInTheDocument();
  });

  it("CE clears the active entry during editing", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "CE" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
    expect(screen.getByText("Entry cleared")).toBeVisible();
  });

  it("CE preserves pending operator context when clearing the second operand", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "CE" }));
    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    // CE cleared the 3; re-entering 7 gives 5 + 7 = 12
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("12");
  });

  it("CA resets the full calculator state", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "CA" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
    expect(screen.getByText("Ready for input")).toBeVisible();
  });

  it("CA is idempotent when already at initial state", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "CA" }));
    await user.click(screen.getByRole("button", { name: "CA" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
    expect(screen.getByText("Ready for input")).toBeVisible();
  });

  it("backspace removes the last character from the active input", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "⌫" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("12");
    expect(screen.getByText("Entry deleted")).toBeVisible();
  });

  it("backspace resets to 0 when removing the only digit", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "⌫" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
  });

  it("backspace is a no-op in result state", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "⌫" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("8");
  });

  it("dismiss error button clears error state and resets the calculator", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss error" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
  });

  it("CE clears the error state and resets the calculator", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "CE" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
  });

  it("CA clears the error state and resets the calculator", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "÷" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    await user.click(screen.getByRole("button", { name: "CA" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("0");
  });
});

describe("CalculatorScreen — slice 5 sign toggle and percent", () => {
  beforeEach(() => {
    useCalculatorStore.setState({ calculator: initialCalculatorState });
  });

  it("renders the % button", () => {
    render(<CalculatorScreen />);

    expect(screen.getByRole("button", { name: "%" })).toBeInTheDocument();
  });

  it("+/- negates an entered number", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "+/-" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent(
      "-42",
    );
  });

  it("+/- is a no-op when an operator has been selected but no second operand entered", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+/-" }));

    // display still shows 5 (the first operand), operator-selected mode unchanged
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("5");
  });

  it("% on a standalone number divides it by 100", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "%" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent(
      "0.5",
    );
  });

  it("% in addition context applies X% of first operand (200 + 10% = 220)", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "%" }));
    // second operand is now 20 (10% of 200)
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent("20");

    await user.click(screen.getByRole("button", { name: "=" }));
    expect(screen.getByLabelText("Calculator display")).toHaveTextContent(
      "220",
    );
  });

  it("% does not corrupt subsequent arithmetic", async () => {
    const user = userEvent.setup();
    render(<CalculatorScreen />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "%" })); // 0.1
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "9" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByLabelText("Calculator display")).toHaveTextContent(
      "9.1",
    );
  });
});
