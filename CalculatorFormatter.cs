using System.Globalization;

namespace Calculator
{
    public class CalculatorFormatter
    {
        public string FormatDisplay(double value)
        {
            return value.ToString("G15", CultureInfo.InvariantCulture);
        }
    }
}
