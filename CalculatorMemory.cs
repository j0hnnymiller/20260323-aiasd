namespace Calculator
{
    public class CalculatorMemory
    {
        private double _memory;

        public void Add(double value) => _memory += value;

        public void Subtract(double value) => _memory -= value;

        public double Recall() => _memory;

        public void Clear() => _memory = 0;
    }
}
