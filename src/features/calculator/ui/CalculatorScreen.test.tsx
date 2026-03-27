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
