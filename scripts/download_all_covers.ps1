# PowerShell script to download all book covers from library.yaml
# This helps maintain a consistent image style for your reading list

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$libraryPath = Join-Path -Path (Split-Path -Parent $scriptPath) -ChildPath "data\library.yaml"

# Function to extract book info from YAML
function Get-BookInfo {
    param([string]$line)
    if ($line -match '^\s*-\s*title:\s*"([^"]*)"') { 
        return @{ Type = "title"; Value = $matches[1] }
    }
    elseif ($line -match '^\s*link:\s*"([^"]*)"') {
        return @{ Type = "link"; Value = $matches[1] }
    }
    elseif ($line -match '^\s*image:\s*"([^"]*)"') {
        return @{ Type = "image"; Value = $matches[1] }
    }
    return $null
}

# Read library.yaml and extract book info
$content = Get-Content -Path $libraryPath
$books = @()
$currentBook = $null

foreach ($line in $content) {
    $info = Get-BookInfo $line
    if ($info) {
        if ($info.Type -eq "title") {
            if ($currentBook) { $books += $currentBook }
            $currentBook = @{ Title = $info.Value }
        }
        elseif ($info.Type -eq "link" -and $currentBook) {
            $currentBook.Link = $info.Value
        }
        elseif ($info.Type -eq "image" -and $currentBook) {
            $currentBook.Image = $info.Value
        }
    }
}
if ($currentBook) { $books += $currentBook }

# Download each book cover
Write-Host "Found $($books.Count) books in library.yaml"
$downloadCount = 0
$skipCount = 0
foreach ($book in $books) {
    if ($book.Link -and $book.Link -like "*goodreads.com/book/show/*") {
        $imagePath = Join-Path -Path (Split-Path -Parent $scriptPath) -ChildPath "static$($book.Image)"
        if (-not (Test-Path $imagePath) -or (Get-Item $imagePath).Length -eq 1) {
            Write-Host "`nDownloading cover for: $($book.Title)"
            Write-Host "URL: $($book.Link)"
            & "$scriptPath\download_covers.ps1" -bookUrl $book.Link
            $downloadCount++
            # Add a small delay to avoid overwhelming the server
            Start-Sleep -Seconds 2
        }
        else {
            Write-Host "`nSkipping $($book.Title) - cover already exists"
            $skipCount++
        }
    }
}
Write-Host "`nDownloaded $($downloadCount) covers, skipped $($skipCount) existing covers."
