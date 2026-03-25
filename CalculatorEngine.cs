using System;

namespace Calculator
{
    public class CalculatorEngine
    {
        public double CalculateBinary(double num1, double num2, string op)
        {
            return op switch
            {
                "+" => num1 + num2,
                "-" => num1 - num2,
                "*" => num1 * num2,
                "/" => num2 == 0 ? throw new InvalidOperationException("Cannot divide by zero.") : num1 / num2,
                "%" => (num1 * num2) / 100,
                _ => throw new InvalidOperationException("Unknown operator.")
            };
        }

        public double ApplyTrig(string trig, double degrees)
        {
            return trig switch
            {
                "sin" => Math.Sin(ToRadians(degrees)),
                "cos" => Math.Cos(ToRadians(degrees)),
                "tan" => TanWithValidation(degrees),
                _ => throw new InvalidOperationException("Unknown trig function.")
            };
        }

        private static double ToRadians(double degrees) => degrees * (Math.PI / 180.0);

        private static double TanWithValidation(double degrees)
        {
            double radians = ToRadians(degrees);
            double cos = Math.Cos(radians);
            if (Math.Abs(cos) < 1e-12)
            {
                throw new InvalidOperationException("tan is undefined for this angle.");
            }

            return Math.Tan(radians);
        }
    }
}
