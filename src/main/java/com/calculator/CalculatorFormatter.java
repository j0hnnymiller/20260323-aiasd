package com.calculator;

/**
 * Formats a numeric value for display.
 */
public class CalculatorFormatter {

    // Values at or above 1e15 cannot be safely represented as long without overflow
    private static final double MAX_INTEGER_DISPLAY_VALUE = 1e15;

    public String formatDisplay(double value) {
        if (value == Math.floor(value) && !Double.isInfinite(value) && Math.abs(value) < MAX_INTEGER_DISPLAY_VALUE) {
            long longValue = (long) value;
            return Long.toString(longValue);
        }
        return Double.toString(value);
    }
}
