/*
ai_generated: true
model: openai/gpt-5.4@unknown
operator: GitHub Copilot
chat_id: implement-local-feature-flags-20260325
prompt: |
  Implement a Local JSON config flags
  Add a small config file such as feature-flags.json and load it once at startup.
started: 2026-03-25T00:00:00Z
ended: 2026-03-25T00:20:00Z
task_durations:
  - task: feature flag design
    duration: 00:05:00
  - task: app wiring
    duration: 00:10:00
  - task: test updates
    duration: 00:05:00
total_duration: 00:20:00
ai_log: ai-logs/2026/03/25/implement-local-feature-flags-20260325/conversation.md
source: github-copilot-chat
*/
using System;
using System.IO;
using System.Text.Json;

namespace Calculator
{
    public class LocalFeatureFlags
    {
        public bool EnableMemory { get; init; } = true;

        public bool EnablePercent { get; init; } = true;

        public bool EnableTrigonometry { get; init; } = true;
    }

    public static class LocalFeatureFlagsLoader
    {
        private const string DefaultFileName = "feature-flags.json";

        private static readonly JsonSerializerOptions SerializerOptions = new()
        {
            AllowTrailingCommas = true,
            PropertyNameCaseInsensitive = true,
            ReadCommentHandling = JsonCommentHandling.Skip
        };

        public static LocalFeatureFlags Load(string? filePath = null)
        {
            string resolvedPath = ResolvePath(filePath);

            if (!File.Exists(resolvedPath))
            {
                return new LocalFeatureFlags();
            }

            try
            {
                string json = File.ReadAllText(resolvedPath);
                LocalFeatureFlags? flags = JsonSerializer.Deserialize<LocalFeatureFlags>(json, SerializerOptions);
                return flags ?? new LocalFeatureFlags();
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException($"Feature flag configuration is invalid: {resolvedPath}", ex);
            }
        }

        public static string ResolvePath(string? filePath = null)
        {
            if (!string.IsNullOrWhiteSpace(filePath))
            {
                return Path.GetFullPath(filePath);
            }

            return Path.Combine(AppContext.BaseDirectory, DefaultFileName);
        }
    }
}
