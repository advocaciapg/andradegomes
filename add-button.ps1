$htmlFile = 'c:\Users\Rubens E. A. Gomes\Downloads\excel\advocacia-site\index.html'
$content = Get-Content $htmlFile -Raw

# Add the back-to-top button before the script tag
$buttonHtml = @"

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Voltar ao topo">
        ↑
    </button>

"@

$content = $content -replace '(\s+<!-- JavaScript -->)', "$buttonHtml`$1"
$content | Set-Content $htmlFile -NoNewline
Write-Host "Button added successfully!"
