/*
ai_generated: true
model: openai/gpt-5.3-codex@unknown
operator: johnmillerATcodemag-com
chat_id: retrofit-ai-provenance-20260323
prompt: retrofit the AI provenance in this project
started: 2026-03-23T00:00:00Z
ended: 2026-03-23T00:30:00Z
total_duration: 00:30:00
ai_log: ai-logs/2026/03/23/retrofit-ai-provenance-20260323/conversation.md
source: github-copilot-chat
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace Calculator
{
    public partial class MainWindow : Window
    {
        private readonly CalculatorEngine _engine = new();
        private readonly CalculatorParser _parser = new();
        private readonly CalculatorFormatter _formatter = new();
        private readonly CalculatorMemory _memory = new();
        private readonly LocalFeatureFlags _featureFlags;

        private double _firstOperand;
        private string? _pendingOperator;
        private bool _isNewEntry = true;

        public MainWindow() : this(new LocalFeatureFlags())
        {
        }

        public MainWindow(LocalFeatureFlags featureFlags)
        {
            _featureFlags = featureFlags ?? throw new ArgumentNullException(nameof(featureFlags));
            InitializeComponent();
            ApplyFeatureFlags();
        }

        private void NumberButton_Click(object sender, RoutedEventArgs e)
        {
            string digit = ((Button)sender).Tag.ToString()!;

            if (_isNewEntry || DisplayText.Text == "0")
            {
                DisplayText.Text = digit;
                _isNewEntry = false;
            }
            else
            {
                DisplayText.Text += digit;
            }

            StatusText.Text = "Ready";
        }

        private void DecimalButton_Click(object sender, RoutedEventArgs e)
        {
            if (_isNewEntry)
            {
                DisplayText.Text = "0.";
                _isNewEntry = false;
            }
            else if (!DisplayText.Text.Contains("."))
            {
                DisplayText.Text += ".";
            }

            StatusText.Text = "Ready";
        }

        private void OperatorButton_Click(object sender, RoutedEventArgs e)
        {
            string selectedOperator = ((Button)sender).Tag.ToString()!;

            if (selectedOperator == "%" && !_featureFlags.EnablePercent)
            {
                ShowFeatureDisabled("Percent operations");
                return;
            }

            try
            {
                _firstOperand = _parser.ParseDisplay(DisplayText.Text);
                _pendingOperator = selectedOperator;
                _isNewEntry = true;
                StatusText.Text = $"{_firstOperand} {_pendingOperator}";
            }
            catch (InvalidOperationException ex)
            {
                ShowError(ex.Message);
            }
        }

        private void EqualsButton_Click(object sender, RoutedEventArgs e)
        {
            if (_pendingOperator == null)
            {
                return;
            }

            try
            {
                double secondOperand = _parser.ParseDisplay(DisplayText.Text);
                double result = _engine.CalculateBinary(_firstOperand, secondOperand, _pendingOperator);
                DisplayText.Text = _formatter.FormatDisplay(result);
                StatusText.Text = $"{_firstOperand} {_pendingOperator} {secondOperand} = {DisplayText.Text}";
                _pendingOperator = null;
                _isNewEntry = true;
            }
            catch (InvalidOperationException ex)
            {
                ShowError(ex.Message);
            }
        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            string action = ((Button)sender).Tag.ToString()!;

            if (action == "CE")
            {
                DisplayText.Text = "0";
                _isNewEntry = true;
                StatusText.Text = "Clear entry";
                return;
            }

            DisplayText.Text = "0";
            _firstOperand = 0;
            _pendingOperator = null;
            _isNewEntry = true;
            StatusText.Text = "Cleared all";
        }

        private void TrigButton_Click(object sender, RoutedEventArgs e)
        {
            if (!_featureFlags.EnableTrigonometry)
            {
                ShowFeatureDisabled("Trigonometry");
                return;
            }

            string trig = ((Button)sender).Tag.ToString()!;

            try
            {
                double value = _parser.ParseDisplay(DisplayText.Text);
                double result = _engine.ApplyTrig(trig, value);
                DisplayText.Text = _formatter.FormatDisplay(result);
                StatusText.Text = $"{trig}({value}) = {DisplayText.Text}";
                _isNewEntry = true;
            }
            catch (InvalidOperationException ex)
            {
                ShowError(ex.Message);
            }
        }

        private void MemoryButton_Click(object sender, RoutedEventArgs e)
        {
            if (!_featureFlags.EnableMemory)
            {
                ShowFeatureDisabled("Memory functions");
                return;
            }

            string action = ((Button)sender).Tag.ToString()!;

            try
            {
                double current = _parser.ParseDisplay(DisplayText.Text);

                switch (action)
                {
                    case "MC":
                        _memory.Clear();
                        StatusText.Text = "Memory cleared";
                        break;
                    case "MR":
                        DisplayText.Text = _formatter.FormatDisplay(_memory.Recall());
                        _isNewEntry = true;
                        StatusText.Text = $"Memory recalled: {_memory.Recall()}";
                        break;
                    case "M+":
                        _memory.Add(current);
                        StatusText.Text = $"Memory: {_memory.Recall()}";
                        _isNewEntry = true;
                        break;
                    case "M-":
                        _memory.Subtract(current);
                        StatusText.Text = $"Memory: {_memory.Recall()}";
                        _isNewEntry = true;
                        break;
                }
            }
            catch (InvalidOperationException ex)
            {
                ShowError(ex.Message);
            }
        }

        private void ShowError(string message)
        {
            StatusText.Text = $"Error: {message}";
            MessageBox.Show(message, "Calculation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
        }

        private void ApplyFeatureFlags()
        {
            SetButtonsEnabled(new[] { "MC", "MR", "M+", "M-" }, _featureFlags.EnableMemory);
            SetButtonsEnabled(new[] { "sin", "cos", "tan" }, _featureFlags.EnableTrigonometry);
            SetButtonsEnabled(new[] { "%" }, _featureFlags.EnablePercent);
        }

        private void SetButtonsEnabled(IEnumerable<string> tags, bool isEnabled)
        {
            HashSet<string> tagSet = new(tags, StringComparer.Ordinal);

            foreach (Button button in FindButtons(this).Where(candidate => candidate.Tag is string tag && tagSet.Contains(tag)))
            {
                button.IsEnabled = isEnabled;
            }
        }

        private static IEnumerable<Button> FindButtons(DependencyObject root)
        {
            foreach (object child in LogicalTreeHelper.GetChildren(root))
            {
                if (child is Button button)
                {
                    yield return button;
                }

                if (child is DependencyObject childDependencyObject)
                {
                    foreach (Button descendant in FindButtons(childDependencyObject))
                    {
                        yield return descendant;
                    }
                }
            }
        }

        private void ShowFeatureDisabled(string featureName)
        {
            StatusText.Text = $"{featureName} disabled by configuration.";
        }
    }
}
