---
mode: agent
description: Generate a daily report of interesting prompts from AI chat sessions
tools:
  - read_file
  - list_dir
  - file_search
  - create_file
variables:
  - name: date
    description: Date to generate the report for (YYYY-MM-DD format, defaults to today)
    default: ""
---

# Generate Daily Prompt Report

Generate a report of particularly interesting prompts from the AI chat sessions logged
on the specified date (or today if not specified).

## Instructions

1. **Determine Target Date**
   - If `{{date}}` is provided, use that date
   - Otherwise use today's date
   - Parse the date into year/month/day components for the ai-logs path

2. **Discover Sessions**
   - List all session folders under `ai-logs/<yyyy>/<mm>/<dd>/`
   - If the folder doesn't exist or is empty, report "No sessions logged for this date"

3. **Extract Prompts**
   - For each session folder, read `conversation.md`
   - Extract the chat ID, model, operator, start time, and the user prompt(s)
   - Note which sessions used GitHub Copilot (Claude models)

4. **Identify Interesting Prompts**
   Rank prompts by these criteria (flag any that match):
   - **Seed prompts**: Short prompts that initiated substantial work
   - **Multi-artifact prompts**: Prompts that produced multiple output files
   - **Meta-prompts**: Prompts that generate other prompts or instruction files
   - **Architecture injections**: Prompts that layer architectural patterns onto existing docs
   - **Constraint-rich prompts**: Prompts with 3+ explicit requirements
   - **Delegation prompts**: Prompts that invoke `.prompt.md` files
   - **Inline domain rules**: Prompts that add business rules alongside file references

5. **Generate Report**
   - Create `docs/chat-session-prompt-report-<YYYYMMDD>.md`
   - Include YAML front matter with AI provenance metadata
   - Structure sections:
     - Session Overview (table of all sessions)
     - Particularly Interesting Prompts (detailed analysis)
     - Key Patterns (if any recurring techniques observed)
   - Use the existing report format from `docs/chat-session-prompt-report-20260327.md` as a template

6. **Output**
   - Confirm the report was created
   - List the number of sessions analyzed and interesting prompts identified

## Example Invocation

```
/generate-daily-prompt-report date:2026-03-28
```

Or for today:

```
/generate-daily-prompt-report
```
