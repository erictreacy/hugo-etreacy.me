$contentPath = ".\content\writing\"
$files = Get-ChildItem -Path $contentPath -Filter "*.md"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '(?ms)^---\s*\n(.*?)\n---') {
        $frontMatter = $matches[1]
        if ($frontMatter -match 'date:\s*(\d{4}-\d{2}-\d{2})(?:\s+(\d{2}:\d{2}:\d{2}))?\s*(?:Z)?') {
            $dateStr = $matches[1]
            if ($matches[2]) {
                $timeStr = $matches[2]
            } else {
                $timeStr = "00:00:00"
            }
            $newDate = "${dateStr}T${timeStr}-05:00"
            $newContent = $content -replace 'date:.*?\n', "date: $newDate`n"
            $newContent | Set-Content $file.FullName -NoNewline
            Write-Host "Fixed date format in $($file.Name)"
        }
    }
}
