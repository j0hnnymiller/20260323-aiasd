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
using System.Windows;

namespace Calculator
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            LocalFeatureFlags featureFlags;

            try
            {
                featureFlags = LocalFeatureFlagsLoader.Load();
            }
            catch (InvalidOperationException ex)
            {
                MessageBox.Show(
                    $"{ex.Message}\n\nUsing default feature flags instead.",
                    "Feature Flag Configuration",
                    MessageBoxButton.OK,
                    MessageBoxImage.Warning);

                featureFlags = new LocalFeatureFlags();
            }

            MainWindow window = new(featureFlags);
            MainWindow = window;
            window.Show();
        }
    }
}
