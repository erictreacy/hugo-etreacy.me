# PowerShell script to download book covers from Goodreads URLs
# Maintains a consistent image style for the reading list

param(
    [string]$bookUrl = ""
)

# Function to convert filenames to a consistent format
function ConvertTo-SafeFileName {
    param([string]$title)
    # Convert to lowercase and replace spaces/special chars with underscores
    $fileName = $title -replace '[^\w\s-]', '' -replace '\s+', '_'
    return $fileName.ToLower()
}

# Function to get image URL and title from Goodreads page
function Get-BookInfo {
    param([string]$url)
    
    try {
        # Allow redirects and use TLS 1.2
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $response = Invoke-WebRequest -Uri $url -MaximumRedirection 5 -UseBasicParsing
        
        # Extract the book title from og:title metadata
        $titleMatch = $response.Content -match '<meta\s+property="og:title"\s+content="([^"]+)"'
        $title = if ($titleMatch) { $matches[1] } else { "unknown_book" }
        
        # Extract the image URL using multiple patterns
        $patterns = @(
            'class="ResponsiveImage"[^>]+src="([^"]+)"',
            'id="coverImage"[^>]+src="([^"]+)"',
            'class="BookCover__image[^>]+src="([^"]+)"'
        )
        
        $imageUrl = $null
        foreach ($pattern in $patterns) {
            if ($response.Content -match $pattern) {
                $imageUrl = $matches[1]
                break
            }
        }
        
        return @{
            Title = $title
            ImageUrl = $imageUrl
        }
    }
    catch {
        Write-Host "Error fetching book info: $_"
        return $null
    }
}

# Main script
if (-not $bookUrl) {
    Write-Host "Please provide a Goodreads book URL."
    Write-Host "Usage: .\download_covers.ps1 -bookUrl 'https://www.goodreads.com/book/show/...'"
    exit
}

# Create the static/reading directory if it doesn't exist
$outputDir = Join-Path -Path $PSScriptRoot -ChildPath "..\static\reading"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Get book info
$bookInfo = Get-BookInfo $bookUrl
if ($bookInfo -and $bookInfo.ImageUrl) {
    # Format the filename consistently
    $fileName = ConvertTo-SafeFileName $bookInfo.Title
    $outputPath = Join-Path -Path $outputDir -ChildPath "$fileName.jpg"
    
    try {
        # Download the image
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $bookInfo.ImageUrl -OutFile $outputPath -UseBasicParsing
        Write-Host "Downloaded cover to: $outputPath"
        Write-Host "Image path for library.yaml: /reading/$fileName.jpg"
    }
    catch {
        Write-Host "Error downloading image: $_"
    }
}
else {
    Write-Host "Could not find book cover"
}
