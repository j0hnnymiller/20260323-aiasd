---
ai_generated: true
model: "anthropic/claude-sonnet-4.6@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-daily-prompt-report-template-20260327"
prompt: |
  Set up a daily report template so future days get their own report files as sessions are logged
started: "2026-03-27T00:00:00Z"
ended: "2026-03-27T00:05:00Z"
task_durations:
  - task: "template design"
    duration: "00:05:00"
total_duration: "00:05:00"
ai_log: "ai-logs/2026/03/27/create-daily-prompt-report-template-20260327/conversation.md"
source: "johnmillerATcodemag-com"
name: daily-prompt-report
description: Standards for generating daily AI chat session prompt reports
applyTo: "docs/chat-session-prompt-report-*.md"
version: "1.0.0"
---

# Daily Prompt Report Format

Standards for generating daily reports of interesting prompts from AI chat sessions.

## File Naming

- Pattern: `docs/chat-session-prompt-report-YYYYMMDD.md`
- Example: `docs/chat-session-prompt-report-20260327.md`

## Required Sections

### 1. YAML Front Matter

Include standard AI provenance metadata per `.github/instructions/ai-assisted-output.instructions.md`.

### 2. Session Overview Table

| Column     | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| Time (UTC) | Start time from conversation.md                                              |
| Chat ID    | Folder name / chat identifier                                                |
| Prompt     | The user's prompt text (truncated if long, with reference to detail section) |

### 3. Particularly Interesting Prompts

For each notable prompt, include:

- **Session reference**: Chat ID and link
- **Prompt text**: Full verbatim prompt in blockquote
- **Why it's interesting**: Brief analysis of what makes it notable
- **Result**: What the prompt produced (artifacts, patterns, outcomes)

### 4. Key Patterns (Optional)

If multiple prompts share techniques or the day shows a workflow progression,
document the pattern or sequence.

## Interesting Prompt Criteria

Flag prompts that match any of these patterns:

| Pattern                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| Seed                   | Short prompt (< 15 words) that produced substantial output   |
| Multi-artifact         | Single prompt that created 3+ files                          |
| Meta-prompt            | Prompt that generates other prompts or instruction files     |
| Architecture injection | Prompt that layers architectural patterns onto existing docs |
| Constraint cascade     | Prompt with 3+ explicit requirements or constraints          |
| Delegation             | Prompt that invokes a `.prompt.md` file                      |
| Inline domain rule     | Prompt that adds business rules alongside file references    |
| Model-specific         | Prompts tailored to a specific model's capabilities          |

## Model Grouping

When reporting, group sessions by model family:

- **Planning sessions**: GPT-based models (openai/gpt-\*)
- **GitHub Copilot sessions**: Claude-based models (anthropic/claude-\*)
- **Other**: Any other model families

## Cross-References

- Link to the source `conversation.md` for each session
- Link to artifacts produced when relevant
- Reference the prompt file used if delegation pattern applies

## Generation

Use `.github/prompts/generate-daily-prompt-report.prompt.md` to generate reports
for any date with logged sessions.
