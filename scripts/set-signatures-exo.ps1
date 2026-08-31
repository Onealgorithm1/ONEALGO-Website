<#
    Set the One Algorithm signature as the roaming default for the whole team.

    Set-MailboxMessageConfiguration writes the signature into the MAILBOX, which is what
    makes it roam — desktop Outlook, Outlook on the web and the phone all read it from
    there. It is also the only way to set the mobile default; there is no toggle for that
    in the web UI.

    ⛔ Run this after connecting AS YOURSELF:

        Connect-ExchangeOnline -UserPrincipalName lrubino@onealgorithm.com

    Deliberately NOT app-only. Exchange PowerShell app-only needs a certificate plus the
    Exchange Administrator directory role on the service principal, and granting that to
    OA-Platform-Integration would give an app permanent management rights over every
    mailbox in the tenant. Not a trade worth making to set four signatures.

    Signature HTML comes from build-artifacts/signatures/<slug>.htm, so it is the exact
    markup already verified in the browser.
#>
param(
    [string]$SignatureName = "OneAlgorithm",
    [string]$Only,          # one slug, e.g. sahith-valluru
    [switch]$Connect,       # connect first; each PowerShell process needs its own session
    [switch]$WhatIfOnly
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root "build-artifacts\signatures"

if ($Connect) {
    Import-Module ExchangeOnlineManagement
    Connect-ExchangeOnline -UserPrincipalName lrubino@onealgorithm.com -ShowBanner:$false
}
if (-not (Get-Command Set-MailboxMessageConfiguration -ErrorAction SilentlyContinue)) {
    throw "Not connected. Re-run with -Connect, or: Connect-ExchangeOnline -UserPrincipalName lrubino@onealgorithm.com"
}

# slug -> mailbox. Must match the roster in scripts/build-signatures.mjs.
$people = [ordered]@{
    "louis-rubino"         = "lrubino@onealgorithm.com"
    "swapna-amirisetti"    = "swapna@onealgorithm.com"
    "sreenivas-amirisetti" = "samirisetti@onealgorithm.com"
    "sahith-valluru"       = "SValluru@onealgorithm.com"
}

foreach ($slug in $people.Keys) {
    if ($Only -and $slug -ne $Only) { continue }
    $mailbox = $people[$slug]
    $file = Join-Path $dir "$slug.htm"
    if (-not (Test-Path $file)) { Write-Warning "no signature built for $slug - run: node scripts/build-signatures.mjs"; continue }

    # The .htm is a whole document; the mailbox wants just the body.
    $html = Get-Content $file -Raw -Encoding UTF8
    if ($html -match '(?s)<body[^>]*>(.*)</body>') { $html = $Matches[1].Trim() }

    if ($WhatIfOnly) {
        "{0,-30} {1,6} chars, {2} images" -f $mailbox, $html.Length, ([regex]::Matches($html, '<img')).Count
        continue
    }

    Set-MailboxMessageConfiguration -Identity $mailbox `
        -SignatureHtml $html `
        -SignatureName $SignatureName `
        -AutoAddSignature $true `
        -AutoAddSignatureOnReply $true `
        -AutoAddSignatureOnMobile $true

    $c = Get-MailboxMessageConfiguration -Identity $mailbox
    "{0,-30} set | new:{1} reply:{2} mobile:{3} | {4} chars" -f `
        $mailbox, $c.AutoAddSignature, $c.AutoAddSignatureOnReply, $c.AutoAddSignatureOnMobile, $c.SignatureHtml.Length
}
