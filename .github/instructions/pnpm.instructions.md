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
name: pnpm
description: Standards and practices for pnpm package management in the web calculator project
applyTo: "{package.json,pnpm-lock.yaml,pnpm-workspace.yaml}"
version: "1.0.0"
author: "johnmillerATcodemag-com"
tags: ["pnpm", "package-management", "frontend", "web-calculator"]
owner: "Development Team"
reviewedDate: "2026-03-27"
nextReview: "2026-06-27"
---

# pnpm Standards

## Overview

Use pnpm for deterministic dependency management, fast installs, and clear lockfile behavior.

## Core Rules

- Commit the lockfile.
- Add dependencies deliberately.
- Prefer exact understanding of why a package is needed before adding it.
- Remove unused dependencies promptly.

## Dependency Management

- Prefer well-maintained, widely adopted libraries.
- Keep runtime dependencies separate from dev dependencies.
- Review transitive impact before adding large packages.
- Avoid duplicate libraries that solve the same problem.

## Workflow

- Use consistent package-manager commands across the project.
- Keep scripts in `package.json` explicit and readable.
- Prefer repeatable setup commands for local development and CI.

## Anti-Patterns

- Do not mix package managers.
- Do not edit lockfiles manually.
- Do not add libraries for speculative future needs.

## Checklist

- [ ] Lockfile is committed
- [ ] Dependency purpose is clear
- [ ] Scripts remain readable and minimal
- [ ] No mixed package-manager artifacts are introduced

## Summary

Use pnpm to keep dependency management fast, reproducible, and disciplined.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-03-27
**Maintainer**: Development Team
**Related Instructions**: [.github/instructions/vite.instructions.md](.github/instructions/vite.instructions.md), [.github/instructions/evergreen-software-development.instructions.md](.github/instructions/evergreen-software-development.instructions.md)
