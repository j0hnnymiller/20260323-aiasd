package com.calculator;

/**
 * Performs binary arithmetic operations and trigonometric calculations.
 */
public class CalculatorEngine {

    private static final double TRIG_EPSILON = 1e-12;

    public double calculateBinary(double num1, double num2, String op) {
        return switch (op) {
            case "+" -> num1 + num2;
            case "-" -> num1 - num2;
            case "*" -> num1 * num2;
            case "/" -> {
                if (num2 == 0) throw new ArithmeticException("Cannot divide by zero.");
                yield num1 / num2;
            }
            case "%" -> (num1 * num2) / 100;
            default -> throw new IllegalArgumentException("Unknown operator.");
        };
    }

    public double applyTrig(String trig, double degrees) {
        return switch (trig) {
            case "sin" -> Math.sin(toRadians(degrees));
            case "cos" -> Math.cos(toRadians(degrees));
            case "tan" -> tanWithValidation(degrees);
            default -> throw new IllegalArgumentException("Unknown trig function.");
        };
    }

    private static double toRadians(double degrees) {
        return degrees * (Math.PI / 180.0);
    }

    private static double tanWithValidation(double degrees) {
        double radians = toRadians(degrees);
        double cos = Math.cos(radians);
        if (Math.abs(cos) < TRIG_EPSILON) {
            throw new ArithmeticException("tan is undefined for this angle.");
        }
        return Math.tan(radians);
    }
}
