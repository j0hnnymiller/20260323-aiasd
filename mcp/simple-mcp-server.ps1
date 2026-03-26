<#
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
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ProtocolVersion = '2024-11-05'
$ServerName = 'simple-powershell-mcp'
$ServerVersion = '0.1.0'
$Utf8 = [System.Text.UTF8Encoding]::new($false)
$Ascii = [System.Text.Encoding]::ASCII
$InputStream = [System.Console]::OpenStandardInput()
$OutputStream = [System.Console]::OpenStandardOutput()
$Script:TransportMode = 'unknown'

function Read-ExactBytes {
    param(
        [Parameter(Mandatory = $true)]
        [System.IO.Stream] $Stream,

        [Parameter(Mandatory = $true)]
        [int] $Count
    )

    $buffer = [byte[]]::new($Count)
    $offset = 0

    while ($offset -lt $Count) {
        $read = $Stream.Read($buffer, $offset, $Count - $offset)

        if ($read -le 0) {
            throw 'Unexpected end of input while reading MCP message body.'
        }

        $offset += $read
    }

    return $buffer
}

function Read-JsonLineMessage {
    param(
        [Parameter(Mandatory = $true)]
        [byte] $FirstByte
    )

    $messageBytes = [System.Collections.Generic.List[byte]]::new()
    $messageBytes.Add($FirstByte)

    while ($true) {
        $nextByte = $InputStream.ReadByte()

        if ($nextByte -lt 0) {
            break
        }

        if ($nextByte -eq 10) {
            break
        }

        if ($nextByte -ne 13) {
            $messageBytes.Add([byte] $nextByte)
        }
    }

    $json = $Utf8.GetString($messageBytes.ToArray()).Trim()

    if ([string]::IsNullOrWhiteSpace($json)) {
        return $null
    }

    $Script:TransportMode = 'jsonl'
    return $json | ConvertFrom-Json -AsHashtable -Depth 32
}

function Read-HeaderMessage {
    param(
        [Parameter(Mandatory = $true)]
        [byte] $FirstByte
    )

    $headerBytes = [System.Collections.Generic.List[byte]]::new()
    $headerBytes.Add($FirstByte)

    while ($true) {
        $nextByte = $InputStream.ReadByte()

        if ($nextByte -lt 0) {
            throw 'Unexpected end of input while reading MCP message headers.'
        }

        $headerBytes.Add([byte] $nextByte)
        $headerText = $Ascii.GetString($headerBytes.ToArray())

        if ($headerText.EndsWith("`r`n`r`n") -or $headerText.EndsWith("`n`n")) {
            break
        }
    }

    $headerText = $Ascii.GetString($headerBytes.ToArray())
    $contentLength = 0

    foreach ($line in ($headerText -split "`r?`n")) {
        if ($line -match '^Content-Length:\s*(\d+)\s*$') {
            $contentLength = [int] $matches[1]
            break
        }
    }

    if ($contentLength -le 0) {
        throw 'Missing or invalid Content-Length header.'
    }

    $bodyBytes = Read-ExactBytes -Stream $InputStream -Count $contentLength
    $json = $Utf8.GetString($bodyBytes)

    $Script:TransportMode = 'content-length'
    return $json | ConvertFrom-Json -AsHashtable -Depth 32
}

function Read-McpMessage {
    while ($true) {
        $nextByte = $InputStream.ReadByte()

        if ($nextByte -lt 0) {
            return $null
        }

        if ($nextByte -eq 13 -or $nextByte -eq 10) {
            continue
        }

        if ($nextByte -eq [byte] [char] '{' -or $nextByte -eq [byte] [char] '[') {
            return Read-JsonLineMessage -FirstByte ([byte] $nextByte)
        }

        return Read-HeaderMessage -FirstByte ([byte] $nextByte)
    }
}

function Send-McpMessage {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable] $Message
    )

    $json = $Message | ConvertTo-Json -Depth 32 -Compress
    $bodyBytes = $Utf8.GetBytes($json)

    if ($Script:TransportMode -eq 'content-length') {
        $headerBytes = $Ascii.GetBytes("Content-Length: $($bodyBytes.Length)`r`n`r`n")
        $OutputStream.Write($headerBytes, 0, $headerBytes.Length)
        $OutputStream.Write($bodyBytes, 0, $bodyBytes.Length)
    }
    else {
        $lineBytes = $Utf8.GetBytes("$json`n")
        $OutputStream.Write($lineBytes, 0, $lineBytes.Length)
    }

    $OutputStream.Flush()
}

function Send-JsonRpcResult {
    param(
        [Parameter(Mandatory = $true)]
        $Id,

        [Parameter(Mandatory = $true)]
        [hashtable] $Result
    )

    Send-McpMessage -Message @{
        jsonrpc = '2.0'
        id      = $Id
        result  = $Result
    }
}

function Send-JsonRpcError {
    param(
        $Id,

        [Parameter(Mandatory = $true)]
        [int] $Code,

        [Parameter(Mandatory = $true)]
        [string] $Message,

        $Data
    )

    $errorPayload = @{
        code    = $Code
        message = $Message
    }

    if ($null -ne $Data) {
        $errorPayload.data = $Data
    }

    Send-McpMessage -Message @{
        jsonrpc = '2.0'
        id      = $Id
        error   = $errorPayload
    }
}

function Get-ToolDefinitions {
    return @(
        @{
            name        = 'echo'
            description = 'Return the exact text that was provided.'
            inputSchema = @{
                type                 = 'object'
                properties           = @{
                    text = @{
                        type        = 'string'
                        description = 'The text to echo back to the client.'
                    }
                }
                required             = @('text')
                additionalProperties = $false
            }
        },
        @{
            name        = 'add'
            description = 'Add two numeric values and return the sum.'
            inputSchema = @{
                type                 = 'object'
                properties           = @{
                    a = @{
                        type        = 'number'
                        description = 'The first number.'
                    }
                    b = @{
                        type        = 'number'
                        description = 'The second number.'
                    }
                }
                required             = @('a', 'b')
                additionalProperties = $false
            }
        }
    )
}

function New-ToolTextResult {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Text,

        [bool] $IsError = $false,

        [hashtable] $StructuredContent
    )

    $result = @{
        content = @(
            @{
                type = 'text'
                text = $Text
            }
        )
    }

    if ($IsError) {
        $result.isError = $true
    }

    if ($null -ne $StructuredContent) {
        $result.structuredContent = $StructuredContent
    }

    return $result
}

function Invoke-Tool {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Name,

        [hashtable] $Arguments
    )

    if ($null -eq $Arguments) {
        $Arguments = @{}
    }

    switch ($Name) {
        'echo' {
            if (-not $Arguments.ContainsKey('text')) {
                return New-ToolTextResult -Text 'Missing required argument: text.' -IsError $true
            }

            return New-ToolTextResult -Text ([string] $Arguments.text)
        }

        'add' {
            if ((-not $Arguments.ContainsKey('a')) -or (-not $Arguments.ContainsKey('b'))) {
                return New-ToolTextResult -Text 'Missing required arguments: a and b.' -IsError $true
            }

            try {
                $sum = [double] $Arguments.a + [double] $Arguments.b
            }
            catch {
                return New-ToolTextResult -Text 'Arguments a and b must both be numeric.' -IsError $true
            }

            return New-ToolTextResult -Text ($sum.ToString([System.Globalization.CultureInfo]::InvariantCulture)) -StructuredContent @{
                sum = $sum
            }
        }

        default {
            return New-ToolTextResult -Text "Unknown tool: $Name" -IsError $true
        }
    }
}

try {
    while ($true) {
        $request = Read-McpMessage

        if ($null -eq $request) {
            break
        }

        if (-not $request.ContainsKey('method')) {
            if ($request.ContainsKey('id')) {
                Send-JsonRpcError -Id $request.id -Code -32600 -Message 'Invalid JSON-RPC request: missing method.'
            }

            continue
        }

        $hasId = $request.ContainsKey('id')
        $method = [string] $request.method
        $params = if ($request.ContainsKey('params') -and $null -ne $request.params) { $request.params } else { @{} }

        switch ($method) {
            'initialize' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{
                        protocolVersion = $ProtocolVersion
                        capabilities    = @{
                            tools     = @{}
                            resources = @{}
                            prompts   = @{}
                        }
                        serverInfo      = @{
                            name    = $ServerName
                            version = $ServerVersion
                        }
                    }
                }
            }

            'notifications/initialized' {
            }

            'logging/setLevel' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{}
                }
            }

            'roots/list' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{
                        roots = @()
                    }
                }
            }

            'ping' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{}
                }
            }

            'tools/list' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{
                        tools = Get-ToolDefinitions
                    }
                }
            }

            'tools/call' {
                if (-not $hasId) {
                    continue
                }

                if ((-not $params.ContainsKey('name')) -or [string]::IsNullOrWhiteSpace([string] $params.name)) {
                    Send-JsonRpcError -Id $request.id -Code -32602 -Message 'tools/call requires a tool name.'
                    continue
                }

                $arguments = if ($params.ContainsKey('arguments')) { $params.arguments } else { @{} }
                $toolResult = Invoke-Tool -Name ([string] $params.name) -Arguments $arguments
                Send-JsonRpcResult -Id $request.id -Result $toolResult
            }

            'resources/list' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{
                        resources = @()
                    }
                }
            }

            'prompts/list' {
                if ($hasId) {
                    Send-JsonRpcResult -Id $request.id -Result @{
                        prompts = @()
                    }
                }
            }

            default {
                if ($hasId) {
                    Send-JsonRpcError -Id $request.id -Code -32601 -Message "Method not found: $method"
                }
            }
        }
    }
}
catch {
    [System.Console]::Error.WriteLine($_.Exception.Message)
    exit 1
}
