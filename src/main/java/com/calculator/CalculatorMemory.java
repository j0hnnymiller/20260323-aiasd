package com.calculator;

/**
 * Manages the calculator memory register.
 */
public class CalculatorMemory {

    private double memory;

    public void add(double value) {
        memory += value;
    }

    public void subtract(double value) {
        memory -= value;
    }

    public double recall() {
        return memory;
    }

    public void clear() {
        memory = 0;
    }
}
