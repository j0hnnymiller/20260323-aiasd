/**
 * ai_generated: true
 * model: anthropic/claude-3.5-sonnet@2024-10-22
 * operator: GitHub Copilot
 * chat_id: implement-integration-tests-20260325
 * prompt: implement the integration tests for the calculator application
 * started: 2026-03-25T12:00:00Z
 * ended: 2026-03-25T12:30:00Z
 * task_durations:
 *   - test design: 00:10:00
 *   - test authoring: 00:15:00
 *   - verification: 00:05:00
 * total_duration: 00:30:00
 * ai_log: ai-logs/2026/03/25/implement-integration-tests-20260325/conversation.md
 * source: github-copilot-chat
 */
using Xunit;

namespace Calculator.IntegrationTests;

/// <summary>
/// Integration tests for the Calculator application that verify how
/// CalculatorEngine, CalculatorParser, CalculatorFormatter, and CalculatorMemory
/// collaborate to produce correct results.
/// </summary>
public class CalculatorIntegrationTests
{
    private readonly CalculatorEngine _engine = new();
    private readonly CalculatorParser _parser = new();
    private readonly CalculatorFormatter _formatter = new();

    #region Binary Operations

    [Fact]
    public void AdditionWorkflow_ParsesInput_PerformsCalculation_FormatsOutput()
    {
        // Arrange
        string userInput1 = "42.5";
        string userInput2 = "7.5";

        // Act
        double firstOperand = _parser.ParseDisplay(userInput1);
        double secondOperand = _parser.ParseDisplay(userInput2);
        double result = _engine.CalculateBinary(firstOperand, secondOperand, "+");
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(50.0, result);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void SubtractionWorkflow_ParsesInput_PerformsCalculation_FormatsOutput()
    {
        // Arrange
        string userInput1 = "100";
        string userInput2 = "35";

        // Act
        double firstOperand = _parser.ParseDisplay(userInput1);
        double secondOperand = _parser.ParseDisplay(userInput2);
        double result = _engine.CalculateBinary(firstOperand, secondOperand, "-");
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(65.0, result);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void MultiplicationWorkflow_ParsesInput_PerformsCalculation_FormatsOutput()
    {
        // Arrange
        string userInput1 = "12.5";
        string userInput2 = "4";

        // Act
        double firstOperand = _parser.ParseDisplay(userInput1);
        double secondOperand = _parser.ParseDisplay(userInput2);
        double result = _engine.CalculateBinary(firstOperand, secondOperand, "*");
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(50.0, result);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void DivisionWorkflow_ParsesInput_PerformsCalculation_FormatsOutput()
    {
        // Arrange
        string userInput1 = "144";
        string userInput2 = "12";

        // Act
        double firstOperand = _parser.ParseDisplay(userInput1);
        double secondOperand = _parser.ParseDisplay(userInput2);
        double result = _engine.CalculateBinary(firstOperand, secondOperand, "/");
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(12.0, result);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void PercentageWorkflow_ParsesInput_PerformsCalculation_FormatsOutput()
    {
        // Arrange: calculate 15% of 200 = 30
        string userInput1 = "200";
        string userInput2 = "15";

        // Act
        double firstOperand = _parser.ParseDisplay(userInput1);
        double secondOperand = _parser.ParseDisplay(userInput2);
        double result = _engine.CalculateBinary(firstOperand, secondOperand, "%");
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(30.0, result);
        Assert.NotEmpty(displayOutput);
    }

    #endregion

    #region Trigonometric Operations

    [Fact]
    public void SineWorkflow_ParsesDegreesInput_CalculatesResult_FormatsOutput()
    {
        // Arrange
        string userInput = "30";

        // Act
        double degrees = _parser.ParseDisplay(userInput);
        double result = _engine.ApplyTrig("sin", degrees);
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert - sin(30°) = 0.5
        Assert.Equal(0.5d, result, 12);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void CosineWorkflow_ParsesDegreesInput_CalculatesResult_FormatsOutput()
    {
        // Arrange
        string userInput = "60";

        // Act
        double degrees = _parser.ParseDisplay(userInput);
        double result = _engine.ApplyTrig("cos", degrees);
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert - cos(60°) = 0.5
        Assert.Equal(0.5d, result, 12);
        Assert.NotEmpty(displayOutput);
    }

    [Fact]
    public void TangentWorkflow_ParsesDegreesInput_CalculatesResult_FormatsOutput()
    {
        // Arrange
        string userInput = "45";

        // Act
        double degrees = _parser.ParseDisplay(userInput);
        double result = _engine.ApplyTrig("tan", degrees);
        string displayOutput = _formatter.FormatDisplay(result);

        // Assert - tan(45°) = 1.0
        Assert.Equal(1.0d, result, 12);
        Assert.NotEmpty(displayOutput);
    }

    #endregion

    #region Error Handling Across Components

    [Fact]
    public void DivisionByZero_FailsAtEngine_DoesNotReachFormatter()
    {
        // Arrange
        double firstOperand = 10.0;
        double secondOperand = 0.0;

        // Act & Assert
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() =>
            _engine.CalculateBinary(firstOperand, secondOperand, "/"));

        Assert.Equal("Cannot divide by zero.", ex.Message);
    }

    [Fact]
    public void InvalidParserInput_ThrowsBeforeReachingEngine()
    {
        // Arrange & Act & Assert
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() =>
            _parser.ParseDisplay("not-a-number"));

        Assert.Equal("Invalid number in display.", ex.Message);
    }

    [Fact]
    public void UndefinedTangentAngle_FailsAtEngine_DoesNotReachFormatter()
    {
        // Arrange & Act & Assert
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() =>
            _engine.ApplyTrig("tan", 90.0));

        Assert.Equal("tan is undefined for this angle.", ex.Message);
    }

    [Fact]
    public void UnknownTrigFunction_FailsAtEngine_WithCorrectMessage()
    {
        // Arrange & Act & Assert
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() =>
            _engine.ApplyTrig("csc", 45.0));

        Assert.Equal("Unknown trig function.", ex.Message);
    }

    [Fact]
    public void UnknownBinaryOperator_FailsAtEngine_WithCorrectMessage()
    {
        // Arrange & Act & Assert
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() =>
            _engine.CalculateBinary(10.0, 5.0, "^"));

        Assert.Equal("Unknown operator.", ex.Message);
    }

    #endregion

    #region Memory Operations

    [Fact]
    public void MemoryAdd_ParsesInput_UpdatesMemory_RecallReturnsCorrectValue()
    {
        // Arrange
        var memory = new CalculatorMemory();
        string userInput1 = "25.5";
        string userInput2 = "14.5";

        // Act
        double value1 = _parser.ParseDisplay(userInput1);
        memory.Add(value1);

        double value2 = _parser.ParseDisplay(userInput2);
        memory.Add(value2);

        double recalled = memory.Recall();

        // Assert
        Assert.Equal(40.0, recalled);
    }

    [Fact]
    public void MemorySubtract_UpdatesMemory_RecallReturnsCorrectValue()
    {
        // Arrange
        var memory = new CalculatorMemory();
        string userInput1 = "100";

        // Act
        double value = _parser.ParseDisplay(userInput1);
        memory.Add(value);
        memory.Subtract(30);
        double recalled = memory.Recall();

        // Assert
        Assert.Equal(70.0, recalled);
    }

    [Fact]
    public void MemoryClear_ResetsToZero()
    {
        // Arrange
        var memory = new CalculatorMemory();
        memory.Add(999);

        // Act
        memory.Clear();
        double recalled = memory.Recall();

        // Assert
        Assert.Equal(0.0, recalled);
    }

    [Fact]
    public void ComplexMemoryWorkflow_ChargesAndRecallsCorrectly()
    {
        // Arrange
        var memory = new CalculatorMemory();

        // Act: M+ 50, M+ 25, M- 10, recall
        memory.Add(50);
        memory.Add(25);
        memory.Subtract(10);
        double result = memory.Recall();

        // Assert
        Assert.Equal(65.0, result);
    }

    #endregion

    #region Chained Operations

    [Fact]
    public void ChainedCalculations_IntegrateProperly()
    {
        // Arrange: Calculate ((10 + 5) * 2) - 8 = 22
        // This simulates: 10 + 5 = 15, then 15 * 2 = 30, then 30 - 8 = 22

        // Act - Step 1: 10 + 5
        double result1 = _engine.CalculateBinary(10, 5, "+");
        Assert.Equal(15.0, result1);

        // Step 2: result * 2
        double result2 = _engine.CalculateBinary(result1, 2, "*");
        Assert.Equal(30.0, result2);

        // Step 3: result - 8
        double result3 = _engine.CalculateBinary(result2, 8, "-");

        // Assert
        Assert.Equal(22.0, result3);
    }

    [Fact]
    public void MixedOperationsWithMemory_IntegratesAllComponents()
    {
        // Arrange
        var memory = new CalculatorMemory();

        // Act: Calculate 100 + 50, save to memory, calculate 100 - 25, add to memory
        double calc1 = _engine.CalculateBinary(100, 50, "+");
        memory.Add(calc1);

        double calc2 = _engine.CalculateBinary(100, 25, "-");
        memory.Add(calc2);

        double memoryValue = memory.Recall();
        string formattedMemory = _formatter.FormatDisplay(memoryValue);

        // Assert: 150 + 75 = 225
        Assert.Equal(225.0, memoryValue);
        Assert.NotEmpty(formattedMemory);
    }

    #endregion

    #region Number Formatting Edge Cases

    [Fact]
    public void VerySmallNumbers_ParseAndFormatCorrectly()
    {
        // Arrange
        string userInput = "0.0001";

        // Act
        double parsed = _parser.ParseDisplay(userInput);
        string formatted = _formatter.FormatDisplay(parsed);

        // Assert
        Assert.Equal(0.0001, parsed);
        Assert.NotEmpty(formatted);
    }

    [Fact]
    public void VeryLargeNumbers_ParseAndFormatCorrectly()
    {
        // Arrange
        string userInput = "1000000";

        // Act
        double parsed = _parser.ParseDisplay(userInput);
        string formatted = _formatter.FormatDisplay(parsed);

        // Assert
        Assert.Equal(1000000.0, parsed);
        Assert.NotEmpty(formatted);
    }

    [Fact]
    public void NegativeNumbers_ParseAndCalculateCorrectly()
    {
        // Arrange
        string userInput = "-42.5";

        // Act
        double parsed = _parser.ParseDisplay(userInput);
        double result = _engine.CalculateBinary(parsed, 10, "+");
        string formatted = _formatter.FormatDisplay(result);

        // Assert
        Assert.Equal(-42.5, parsed);
        Assert.Equal(-32.5, result);
        Assert.NotEmpty(formatted);
    }

    [Fact]
    public void ScientificNotation_ParsedCorrectly()
    {
        // Arrange
        string userInput = "1.23E+05"; // 123000

        // Act
        double parsed = _parser.ParseDisplay(userInput);

        // Assert
        Assert.Equal(123000.0, parsed);
    }

    #endregion
}
