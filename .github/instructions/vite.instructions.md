---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-web-calculator-project-definition-and-tech-instructions-20260327"
prompt: |
  create a project definition document that specifies the recommended tech stack. For each recommended technology create an instruction file that contains the standards and practices for using that technology.
started: "2026-03-27T03:40:00Z"
ended: "2026-03-27T04:20:00Z"
task_durations:
  - task: "current state review"
    duration: "00:08:00"
  - task: "project definition authoring"
    duration: "00:12:00"
  - task: "technology instruction authoring"
    duration: "00:15:00"
  - task: "traceability updates"
    duration: "00:05:00"
total_duration: "00:40:00"
ai_log: "ai-logs/2026/03/27/create-web-calculator-project-definition-and-tech-instructions-20260327/conversation.md"
source: "github-copilot-chat"
name: vite
description: Standards and practices for using Vite in the web calculator project
applyTo: "{vite.config.*,package.json,src/**/*.{ts,tsx,css}}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["vite", "build", "frontend", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# Vite Standards

## Overview

Use Vite as the frontend build tool and local development server for fast feedback and minimal configuration overhead.

## Core Rules

- Keep Vite configuration small and intentional.
- Add plugins only when they solve a real project need.
- Prefer defaults when they are sufficient.
- Keep environment handling explicit and minimal.

## Configuration Practices

- Keep aliases readable and stable.
- Avoid custom build behavior unless it improves developer experience or release reliability.
- Keep development and test configuration aligned where practical.
- Document any non-obvious plugin or alias choice.

## Environment Management

- Use environment variables only for values that genuinely vary by environment.
- Do not expose secrets to the client build.
- Keep MVP environment needs minimal.

## Performance

- Prefer code-splitting only when justified by actual size or performance issues.
- Keep asset handling straightforward.
- Review bundle growth before adding new libraries.

## Anti-Patterns

- Do not over-customize the build early.
- Do not add frontend plugins for speculative future needs.
- Do not use environment variables as a substitute for application configuration design.

## Checklist

- [ ] Vite config stays small and readable
- [ ] Plugins are justified
- [ ] No secrets are exposed to the client
- [ ] Build choices support fast local iteration

## Summary

Use Vite to keep the project fast and simple. Configuration should stay close to defaults unless a clear need justifies change.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/pnpm.instructions.md](.github/instructions/pnpm.instructions.md), [.github/instructions/vitest.instructions.md](.github/instructions/vitest.instructions.md)
