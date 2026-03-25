using System;
using System.Globalization;

namespace Calculator
{
    public class CalculatorParser
    {
        public double ParseDisplay(string text)
        {
            if (!double.TryParse(text, NumberStyles.Float, CultureInfo.InvariantCulture, out double value))
            {
                throw new InvalidOperationException("Invalid number in display.");
            }

            return value;
        }
    }
}
