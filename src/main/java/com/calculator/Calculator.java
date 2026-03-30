package com.calculator;

import java.util.Scanner;

/**
 * Entry point for the console-based Java calculator application.
 */
public class Calculator {

    private final CalculatorEngine engine = new CalculatorEngine();
    private final CalculatorParser parser = new CalculatorParser();
    private final CalculatorFormatter formatter = new CalculatorFormatter();
    private final CalculatorMemory memory = new CalculatorMemory();

    private double firstOperand = 0;
    private String pendingOperator = null;
    private boolean isNewEntry = true;
    private String display = "0";

    public String getDisplay() {
        return display;
    }

    public void inputDigit(String digit) {
        if (isNewEntry) {
            display = digit;
            isNewEntry = false;
        } else {
            display = display.equals("0") ? digit : display + digit;
        }
    }

    public void inputDecimal() {
        if (isNewEntry) {
            display = "0.";
            isNewEntry = false;
        } else if (!display.contains(".")) {
            display = display + ".";
        }
    }

    public void setOperator(String op) {
        try {
            if (pendingOperator != null && !isNewEntry) {
                double second = parser.parseDisplay(display);
                double result = engine.calculateBinary(firstOperand, second, pendingOperator);
                display = formatter.formatDisplay(result);
                firstOperand = result;
            } else {
                firstOperand = parser.parseDisplay(display);
            }
            pendingOperator = op;
            isNewEntry = true;
        } catch (Exception e) {
            display = "Error: " + e.getMessage();
            reset();
        }
    }

    public void calculate() {
        if (pendingOperator == null) return;
        try {
            double second = parser.parseDisplay(display);
            double result = engine.calculateBinary(firstOperand, second, pendingOperator);
            display = formatter.formatDisplay(result);
            pendingOperator = null;
            isNewEntry = true;
        } catch (Exception e) {
            display = "Error: " + e.getMessage();
            reset();
        }
    }

    public void applyTrig(String func) {
        try {
            double degrees = parser.parseDisplay(display);
            double result = engine.applyTrig(func, degrees);
            display = formatter.formatDisplay(result);
            isNewEntry = true;
        } catch (Exception e) {
            display = "Error: " + e.getMessage();
        }
    }

    public void memoryClear() {
        memory.clear();
    }

    public void memoryRecall() {
        display = formatter.formatDisplay(memory.recall());
        isNewEntry = true;
    }

    public void memoryAdd() {
        try {
            memory.add(parser.parseDisplay(display));
        } catch (Exception e) {
            display = "Error: " + e.getMessage();
        }
    }

    public void memorySubtract() {
        try {
            memory.subtract(parser.parseDisplay(display));
        } catch (Exception e) {
            display = "Error: " + e.getMessage();
        }
    }

    public void clearEntry() {
        display = "0";
        isNewEntry = true;
    }

    public void clearAll() {
        reset();
    }

    private void reset() {
        display = "0";
        firstOperand = 0;
        pendingOperator = null;
        isNewEntry = true;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Java Calculator");
        System.out.println("Commands: 0-9, ., +, -, *, /, %, =, sin, cos, tan, MC, MR, M+, M-, CE, CA, quit");
        while (scanner.hasNextLine()) {
            String input = scanner.nextLine().trim();
            switch (input) {
                case "quit" -> { return; }
                case "=" -> calc.calculate();
                case "+", "-", "*", "/", "%" -> calc.setOperator(input);
                case "sin", "cos", "tan" -> calc.applyTrig(input);
                case "MC" -> calc.memoryClear();
                case "MR" -> calc.memoryRecall();
                case "M+" -> calc.memoryAdd();
                case "M-" -> calc.memorySubtract();
                case "CE" -> calc.clearEntry();
                case "CA" -> calc.clearAll();
                case "." -> calc.inputDecimal();
                default -> {
                    if (input.matches("[0-9]")) {
                        calc.inputDigit(input);
                    }
                }
            }
            System.out.println(calc.getDisplay());
        }
    }
}
