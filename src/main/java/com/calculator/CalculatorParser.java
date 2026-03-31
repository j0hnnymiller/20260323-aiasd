package com.calculator;

/**
 * Parses a display string into a numeric value.
 */
public class CalculatorParser {

    public double parseDisplay(String text) {
        try {
            return Double.parseDouble(text);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number in display.");
        }
    }
}
