$cssFile = 'c:\Users\Rubens E. A. Gomes\Downloads\excel\advocacia-site\index.css'
$content = Get-Content $cssFile -Raw

# Remove the orphaned CSS properties
$content = $content -replace "(?m)^font-weight: 600;\r\nmargin-bottom: var\(--spacing-sm\);\r\n}", ""

# Add .info-text p if missing
if ($content -notmatch "\.info-text p") {
    $content = $content -replace "(\.info-text h4 \{[^}]+\})", "`$1`r`n`r`n.info-text p {`r`n  color: var(--color-text);`r`n}"
}

$content | Set-Content $cssFile -NoNewline
Write-Host "CSS errors fixed successfully!"
