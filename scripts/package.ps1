param([string]$SiteUrl)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
try {
    if ($SiteUrl) {
        & node scripts/build.mjs "--site-url=$SiteUrl"
        $mode = 'production'
    } else {
        & node scripts/build.mjs
        $mode = 'preview'
    }
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    & node scripts/check.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Source checks failed.' }
    $artifactDirectory = Join-Path $projectRoot 'artifacts'
    New-Item -ItemType Directory -Path $artifactDirectory -Force | Out-Null
    $archivePath = Join-Path $artifactDirectory "pusat-vinc-$mode.zip"
    Compress-Archive -Path (Join-Path $projectRoot 'dist/*') -DestinationPath $archivePath -Force
    $archiveHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
    $archiveHash | Set-Content -LiteralPath "$archivePath.sha256" -Encoding ascii
    Write-Output "Package: $archivePath"
    Write-Output "Mode: $mode"
    Write-Output "SHA256: $archiveHash"
} finally {
    Pop-Location
}
