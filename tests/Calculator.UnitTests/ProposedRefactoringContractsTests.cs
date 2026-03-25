/*
ai_generated: true
model: openai/gpt-5.4@unknown
operator: GitHub Copilot
chat_id: create-refactoring-spec-tests-20260325
prompt: can you write tests that predict what testable classes are needed and how they should behave?
started: 2026-03-25T00:25:00Z
ended: 2026-03-25T00:45:00Z
task_durations:
  - test design: 00:07:00
  - test project authoring: 00:10:00
  - traceability updates: 00:03:00
total_duration: 00:20:00
ai_log: ai-logs/2026/03/25/create-refactoring-spec-tests-20260325/conversation.md
source: github-copilot-chat
*/
using System.Reflection;
using Xunit;

namespace Calculator.UnitTests;

public class ProposedCalculatorEngineContractTests
{
    [Fact]
    public void CalculatorEngine_type_should_exist()
    {
        RefactoringContract.RequireType("CalculatorEngine");
    }

    [Fact]
    public void CalculateBinary_should_apply_current_binary_operator_rules()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "CalculateBinary", typeof(double), typeof(double), typeof(string));

        Assert.Equal(5d, RefactoringContract.InvokeDouble(method, engine, 2d, 3d, "+"));
        Assert.Equal(5d, RefactoringContract.InvokeDouble(method, engine, 9d, 4d, "-"));
        Assert.Equal(42d, RefactoringContract.InvokeDouble(method, engine, 6d, 7d, "*"));
        Assert.Equal(4d, RefactoringContract.InvokeDouble(method, engine, 8d, 2d, "/"));
        Assert.Equal(20d, RefactoringContract.InvokeDouble(method, engine, 200d, 10d, "%"));
    }

    [Fact]
    public void CalculateBinary_should_reject_divide_by_zero_with_the_current_message()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "CalculateBinary", typeof(double), typeof(double), typeof(string));

        InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() =>
            RefactoringContract.InvokeDouble(method, engine, 8d, 0d, "/"));

        Assert.Equal("Cannot divide by zero.", exception.Message);
    }

    [Fact]
    public void CalculateBinary_should_reject_unknown_operators_with_the_current_message()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "CalculateBinary", typeof(double), typeof(double), typeof(string));

        InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() =>
            RefactoringContract.InvokeDouble(method, engine, 8d, 2d, "^"));

        Assert.Equal("Unknown operator.", exception.Message);
    }

    [Fact]
    public void ApplyTrig_should_use_degree_input_and_match_current_results()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "ApplyTrig", typeof(string), typeof(double));

        Assert.Equal(0.5d, RefactoringContract.InvokeDouble(method, engine, "sin", 30d), 12);
        Assert.Equal(0.5d, RefactoringContract.InvokeDouble(method, engine, "cos", 60d), 12);
        Assert.Equal(1d, RefactoringContract.InvokeDouble(method, engine, "tan", 45d), 12);
    }

    [Fact]
    public void ApplyTrig_should_reject_undefined_tangent_angles_with_the_current_message()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "ApplyTrig", typeof(string), typeof(double));

        InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() =>
            RefactoringContract.InvokeDouble(method, engine, "tan", 90d));

        Assert.Equal("tan is undefined for this angle.", exception.Message);
    }

    [Fact]
    public void ApplyTrig_should_reject_unknown_trig_tokens_with_the_current_message()
    {
        object engine = RefactoringContract.CreateInstance("CalculatorEngine");
        MethodInfo method = RefactoringContract.RequireMethod(engine.GetType(), "ApplyTrig", typeof(string), typeof(double));

        InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() =>
            RefactoringContract.InvokeDouble(method, engine, "cot", 45d));

        Assert.Equal("Unknown trig function.", exception.Message);
    }
}

public class ProposedCalculatorParserContractTests
{
    [Fact]
    public void CalculatorParser_type_should_exist()
    {
        RefactoringContract.RequireType("CalculatorParser");
    }

    [Fact]
    public void ParseDisplay_should_parse_valid_invariant_numbers()
    {
        object parser = RefactoringContract.CreateInstance("CalculatorParser");
        MethodInfo method = RefactoringContract.RequireMethod(parser.GetType(), "ParseDisplay", typeof(string));

        Assert.Equal(123.45d, RefactoringContract.InvokeDouble(method, parser, "123.45"));
    }

    [Fact]
    public void ParseDisplay_should_reject_invalid_numbers_with_the_current_message()
    {
        object parser = RefactoringContract.CreateInstance("CalculatorParser");
        MethodInfo method = RefactoringContract.RequireMethod(parser.GetType(), "ParseDisplay", typeof(string));

        InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() =>
            RefactoringContract.InvokeDouble(method, parser, "abc"));

        Assert.Equal("Invalid number in display.", exception.Message);
    }
}

public class ProposedCalculatorFormatterContractTests
{
    [Fact]
    public void CalculatorFormatter_type_should_exist()
    {
        RefactoringContract.RequireType("CalculatorFormatter");
    }

    [Fact]
    public void FormatDisplay_should_format_numbers_using_the_current_display_contract()
    {
        object formatter = RefactoringContract.CreateInstance("CalculatorFormatter");
        MethodInfo method = RefactoringContract.RequireMethod(formatter.GetType(), "FormatDisplay", typeof(double));

        Assert.Equal("0.5", RefactoringContract.InvokeString(method, formatter, 0.5d));
        Assert.Equal("42", RefactoringContract.InvokeString(method, formatter, 42d));
    }
}

public class ProposedCalculatorMemoryContractTests
{
    [Fact]
    public void CalculatorMemory_type_should_exist()
    {
        RefactoringContract.RequireType("CalculatorMemory");
    }

    [Fact]
    public void Recall_should_start_at_zero()
    {
        object memory = RefactoringContract.CreateInstance("CalculatorMemory");
        MethodInfo method = RefactoringContract.RequireMethod(memory.GetType(), "Recall");

        Assert.Equal(0d, RefactoringContract.InvokeDouble(method, memory));
    }

    [Fact]
    public void Add_and_subtract_should_match_current_memory_semantics()
    {
        object memory = RefactoringContract.CreateInstance("CalculatorMemory");
        MethodInfo add = RefactoringContract.RequireMethod(memory.GetType(), "Add", typeof(double));
        MethodInfo subtract = RefactoringContract.RequireMethod(memory.GetType(), "Subtract", typeof(double));
        MethodInfo recall = RefactoringContract.RequireMethod(memory.GetType(), "Recall");

        RefactoringContract.InvokeVoid(add, memory, 10d);
        RefactoringContract.InvokeVoid(subtract, memory, 3d);

        Assert.Equal(7d, RefactoringContract.InvokeDouble(recall, memory));
    }

    [Fact]
    public void Clear_should_reset_memory_to_zero()
    {
        object memory = RefactoringContract.CreateInstance("CalculatorMemory");
        MethodInfo add = RefactoringContract.RequireMethod(memory.GetType(), "Add", typeof(double));
        MethodInfo clear = RefactoringContract.RequireMethod(memory.GetType(), "Clear");
        MethodInfo recall = RefactoringContract.RequireMethod(memory.GetType(), "Recall");

        RefactoringContract.InvokeVoid(add, memory, 5d);
        RefactoringContract.InvokeVoid(clear, memory);

        Assert.Equal(0d, RefactoringContract.InvokeDouble(recall, memory));
    }
}

public class ProposedCalculatorErrorPresenterContractTests
{
    [Fact]
    public void ICalculatorErrorPresenter_should_exist_as_an_interface()
    {
        Type interfaceType = RefactoringContract.RequireType("ICalculatorErrorPresenter");

        Assert.True(interfaceType.IsInterface, "ICalculatorErrorPresenter should be an interface.");
    }

    [Fact]
    public void ICalculatorErrorPresenter_should_define_ShowError_for_user_visible_failures()
    {
        Type interfaceType = RefactoringContract.RequireType("ICalculatorErrorPresenter");
        MethodInfo method = RefactoringContract.RequireMethod(interfaceType, "ShowError", typeof(string));

        Assert.Equal(typeof(void), method.ReturnType);
    }
}

internal static class RefactoringContract
{
    public static Type RequireType(string typeName)
    {
        Assembly assembly = GetCalculatorAssembly();
        Type? type = assembly.GetType($"Calculator.{typeName}")
            ?? assembly.GetTypes().FirstOrDefault(candidate => candidate.Name == typeName);

        Assert.True(type is not null, $"Expected a type named '{typeName}' in the Calculator assembly.");
        return type!;
    }

    public static object CreateInstance(string typeName)
    {
        Type type = RequireType(typeName);
        ConstructorInfo? constructor = type.GetConstructor(Type.EmptyTypes);

        Assert.True(constructor is not null, $"Expected '{typeName}' to have a public parameterless constructor.");
        return constructor!.Invoke(null);
    }

    public static MethodInfo RequireMethod(Type type, string methodName, params Type[] parameterTypes)
    {
        MethodInfo? method = type.GetMethod(methodName, parameterTypes);

        Assert.True(method is not null,
            $"Expected '{type.FullName}' to define method '{methodName}({string.Join(", ", parameterTypes.Select(parameter => parameter.Name))})'.");

        return method!;
    }

    public static double InvokeDouble(MethodInfo method, object? instance, params object[] args)
    {
        object? result = Invoke(method, instance, args);
        Assert.True(result is double, $"Expected '{method.Name}' to return a double.");
        return (double)result!;
    }

    public static string InvokeString(MethodInfo method, object? instance, params object[] args)
    {
        object? result = Invoke(method, instance, args);
        Assert.True(result is string, $"Expected '{method.Name}' to return a string.");
        return (string)result!;
    }

    public static void InvokeVoid(MethodInfo method, object? instance, params object[] args)
    {
        object? result = Invoke(method, instance, args);
        Assert.True(result is null, $"Expected '{method.Name}' to return void.");
    }

    private static object? Invoke(MethodInfo method, object? instance, params object[] args)
    {
        try
        {
            return method.Invoke(instance, args);
        }
        catch (TargetInvocationException exception) when (exception.InnerException is not null)
        {
            throw exception.InnerException;
        }
    }

    private static Assembly GetCalculatorAssembly()
    {
        return AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(assembly => assembly.GetName().Name == "Calculator")
            ?? Assembly.Load("Calculator");
    }
}
