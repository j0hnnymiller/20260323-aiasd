package com.calculator;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorEngineTest {

    private CalculatorEngine engine;
    private CalculatorParser parser;
    private CalculatorFormatter formatter;
    private CalculatorMemory memory;

    @BeforeEach
    void setUp() {
        engine = new CalculatorEngine();
        parser = new CalculatorParser();
        formatter = new CalculatorFormatter();
        memory = new CalculatorMemory();
    }

    // --- Binary Operations ---

    @Test
    void addition_returnsCorrectSum() {
        assertEquals(50.0, engine.calculateBinary(42.5, 7.5, "+"));
    }

    @Test
    void subtraction_returnsCorrectDifference() {
        assertEquals(65.0, engine.calculateBinary(100, 35, "-"));
    }

    @Test
    void multiplication_returnsCorrectProduct() {
        assertEquals(50.0, engine.calculateBinary(12.5, 4, "*"));
    }

    @Test
    void division_returnsCorrectQuotient() {
        assertEquals(12.0, engine.calculateBinary(144, 12, "/"));
    }

    @Test
    void percentage_returnsCorrectResult() {
        // 15% of 200 = 30
        assertEquals(30.0, engine.calculateBinary(200, 15, "%"));
    }

    @Test
    void divisionByZero_throwsArithmeticException() {
        ArithmeticException ex = assertThrows(ArithmeticException.class,
                () -> engine.calculateBinary(10, 0, "/"));
        assertEquals("Cannot divide by zero.", ex.getMessage());
    }

    @Test
    void unknownOperator_throwsIllegalArgumentException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> engine.calculateBinary(10, 5, "^"));
        assertEquals("Unknown operator.", ex.getMessage());
    }

    // --- Trigonometric Operations ---

    @Test
    void sin30_returnsHalf() {
        assertEquals(0.5, engine.applyTrig("sin", 30), 1e-12);
    }

    @Test
    void cos60_returnsHalf() {
        assertEquals(0.5, engine.applyTrig("cos", 60), 1e-12);
    }

    @Test
    void tan45_returnsOne() {
        assertEquals(1.0, engine.applyTrig("tan", 45), 1e-12);
    }

    @Test
    void tan90_throwsArithmeticException() {
        ArithmeticException ex = assertThrows(ArithmeticException.class,
                () -> engine.applyTrig("tan", 90));
        assertEquals("tan is undefined for this angle.", ex.getMessage());
    }

    @Test
    void unknownTrigFunction_throwsIllegalArgumentException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> engine.applyTrig("csc", 45));
        assertEquals("Unknown trig function.", ex.getMessage());
    }

    // --- Parser ---

    @Test
    void parseDisplay_validNumber_returnsParsedValue() {
        assertEquals(42.5, parser.parseDisplay("42.5"));
    }

    @Test
    void parseDisplay_scientificNotation_returnsParsedValue() {
        assertEquals(123000.0, parser.parseDisplay("1.23E+05"));
    }

    @Test
    void parseDisplay_invalidInput_throwsIllegalArgumentException() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> parser.parseDisplay("not-a-number"));
        assertEquals("Invalid number in display.", ex.getMessage());
    }

    @Test
    void parseDisplay_negativeNumber_returnsParsedValue() {
        assertEquals(-42.5, parser.parseDisplay("-42.5"));
    }

    // --- Formatter ---

    @Test
    void formatDisplay_integerValue_returnsIntegerString() {
        assertEquals("50", formatter.formatDisplay(50.0));
    }

    @Test
    void formatDisplay_decimalValue_returnsDecimalString() {
        String result = formatter.formatDisplay(0.5);
        assertFalse(result.isEmpty());
    }

    // --- Memory ---

    @Test
    void memoryAdd_updatesMemoryCorrectly() {
        memory.add(25.5);
        memory.add(14.5);
        assertEquals(40.0, memory.recall());
    }

    @Test
    void memorySubtract_updatesMemoryCorrectly() {
        memory.add(100);
        memory.subtract(30);
        assertEquals(70.0, memory.recall());
    }

    @Test
    void memoryClear_resetsToZero() {
        memory.add(999);
        memory.clear();
        assertEquals(0.0, memory.recall());
    }

    // --- Integration ---

    @Test
    void chainedCalculations_integrateCorrectly() {
        // ((10 + 5) * 2) - 8 = 22
        double r1 = engine.calculateBinary(10, 5, "+");
        double r2 = engine.calculateBinary(r1, 2, "*");
        double r3 = engine.calculateBinary(r2, 8, "-");
        assertEquals(22.0, r3);
    }

    @Test
    void mixedOperationsWithMemory_integratesAllComponents() {
        double calc1 = engine.calculateBinary(100, 50, "+");
        memory.add(calc1);
        double calc2 = engine.calculateBinary(100, 25, "-");
        memory.add(calc2);
        assertEquals(225.0, memory.recall());
    }

    @Test
    void fullWorkflow_parseCalculateFormat() {
        double first = parser.parseDisplay("42.5");
        double second = parser.parseDisplay("7.5");
        double result = engine.calculateBinary(first, second, "+");
        String output = formatter.formatDisplay(result);
        assertEquals(50.0, result);
        assertFalse(output.isEmpty());
    }
}
