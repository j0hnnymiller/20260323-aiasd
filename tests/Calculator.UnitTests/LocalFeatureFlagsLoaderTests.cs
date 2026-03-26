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
using Xunit;

namespace Calculator.UnitTests;

public class LocalFeatureFlagsLoaderTests
{
    [Fact]
    public void Load_ShouldReturnDefaults_WhenFileDoesNotExist()
    {
        string missingPath = Path.Combine(Path.GetTempPath(), $"missing-feature-flags-{Guid.NewGuid():N}.json");

        LocalFeatureFlags flags = LocalFeatureFlagsLoader.Load(missingPath);

        Assert.True(flags.EnableMemory);
        Assert.True(flags.EnablePercent);
        Assert.True(flags.EnableTrigonometry);
    }

    [Fact]
    public void Load_ShouldReadConfiguredValues_WhenFileExists()
    {
        string filePath = CreateTempConfigFile("""
            {
              "EnableMemory": false,
              "EnablePercent": true,
              "EnableTrigonometry": false
            }
            """);

        try
        {
            LocalFeatureFlags flags = LocalFeatureFlagsLoader.Load(filePath);

            Assert.False(flags.EnableMemory);
            Assert.True(flags.EnablePercent);
            Assert.False(flags.EnableTrigonometry);
        }
        finally
        {
            File.Delete(filePath);
        }
    }

    [Fact]
    public void Load_ShouldThrowInvalidOperationException_WhenJsonIsInvalid()
    {
        string filePath = CreateTempConfigFile("{ invalid json }");

        try
        {
            InvalidOperationException exception = Assert.Throws<InvalidOperationException>(() => LocalFeatureFlagsLoader.Load(filePath));

            Assert.StartsWith("Feature flag configuration is invalid:", exception.Message, StringComparison.Ordinal);
        }
        finally
        {
            File.Delete(filePath);
        }
    }

    private static string CreateTempConfigFile(string content)
    {
        string filePath = Path.Combine(Path.GetTempPath(), $"feature-flags-{Guid.NewGuid():N}.json");
        File.WriteAllText(filePath, content);
        return filePath;
    }
}
