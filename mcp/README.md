---
ai_generated: true
model: "openai/gpt-5.4@unknown"
operator: "GitHub Copilot"
chat_id: "create-simple-powershell-mcp-server-20260326"
prompt: |
  help me create a simple MCP server in powershell
started: "2026-03-26T08:58:39.8153777-07:00"
ended: "2026-03-26T09:12:00-07:00"
task_durations:
  - task: "repository inspection"
    duration: "00:04:00"
  - task: "server implementation"
    duration: "00:07:00"
  - task: "documentation and validation"
    duration: "00:03:00"
total_duration: "00:14:00"
ai_log: "ai-logs/2026/03/26/create-simple-powershell-mcp-server-20260326/conversation.md"
source: "github-copilot-chat"
---

# Simple PowerShell MCP Server

This folder contains a minimal Model Context Protocol server implemented in PowerShell and served over standard input/output.

The server accepts both newline-delimited JSON-RPC messages and `Content-Length` framed messages. It replies using the same framing the client used, which makes it work with current VS Code MCP stdio behavior and with simple manual protocol tests.

## Files

- `simple-mcp-server.ps1`: MCP stdio server with two tools, `echo` and `add`

## What It Supports

- `initialize`
- `logging/setLevel`
- `ping`
- `roots/list`
- `tools/list`
- `tools/call`
- `resources/list` returning an empty list
- `prompts/list` returning an empty list

## Tools

- `echo`: returns the input text unchanged
- `add`: returns the sum of numeric arguments `a` and `b`

## Run It

Use PowerShell 7 (`pwsh`):

```powershell
pwsh -NoLogo -NoProfile -File .\mcp\simple-mcp-server.ps1
```

## VS Code Workspace Config

This repository now includes a VS Code workspace MCP configuration in `.vscode/mcp.json`.

```json
{
  "servers": {
    "simple-powershell": {
      "type": "stdio",
      "command": "pwsh",
      "args": [
        "-NoLogo",
        "-NoProfile",
        "-File",
        "${workspaceFolder}/mcp/simple-mcp-server.ps1"
      ]
    }
  }
}
```

In VS Code:

1. Open the Chat view.
2. Run `MCP: List Servers` from the Command Palette.
3. Start `simple-powershell`.
4. Confirm trust when VS Code prompts for the local server.

## Generic MCP Client Config

Adjust the format to match your MCP client. A typical stdio configuration looks like this:

```json
{
  "servers": {
    "simple-powershell": {
      "type": "stdio",
      "command": "pwsh",
      "args": [
        "-NoLogo",
        "-NoProfile",
        "-File",
        "${workspaceFolder}/mcp/simple-mcp-server.ps1"
      ]
    }
  }
}
```

## Manual Smoke Test

VS Code uses newline-delimited JSON messages on stdio. This small PowerShell snippet sends `initialize`, `tools/list`, and `tools/call` requests in that format:

```powershell
$messages = @(
  @{ jsonrpc = '2.0'; id = 1; method = 'initialize'; params = @{ protocolVersion = '2024-11-05'; capabilities = @{}; clientInfo = @{ name = 'manual-test'; version = '1.0' } } },
  @{ jsonrpc = '2.0'; method = 'notifications/initialized'; params = @{} },
  @{ jsonrpc = '2.0'; id = 2; method = 'tools/list'; params = @{} },
  @{ jsonrpc = '2.0'; id = 3; method = 'tools/call'; params = @{ name = 'add'; arguments = @{ a = 2; b = 3 } } }
)

$payload = foreach ($message in $messages) {
  $message | ConvertTo-Json -Depth 10 -Compress
}

$payload -join "`n" | pwsh -NoLogo -NoProfile -File .\mcp\simple-mcp-server.ps1
```

The response should include the tool list and an `add` result with `5`.

For compatibility with older manual tests, the server also accepts `Content-Length` framed messages:

```powershell
$messages = @(
    @{ jsonrpc = '2.0'; id = 1; method = 'initialize'; params = @{ protocolVersion = '2024-11-05'; capabilities = @{}; clientInfo = @{ name = 'manual-test'; version = '1.0' } } },
    @{ jsonrpc = '2.0'; id = 2; method = 'tools/list'; params = @{} },
    @{ jsonrpc = '2.0'; id = 3; method = 'tools/call'; params = @{ name = 'add'; arguments = @{ a = 2; b = 3 } } }
)

$utf8 = [System.Text.UTF8Encoding]::new($false)
$payload = foreach ($message in $messages) {
    $json = $message | ConvertTo-Json -Depth 10 -Compress
    "Content-Length: $($utf8.GetByteCount($json))`r`n`r`n$json"
}

$payload -join '' | pwsh -NoLogo -NoProfile -File .\mcp\simple-mcp-server.ps1
```

The response should include the tool list and an `add` result with `5`.
