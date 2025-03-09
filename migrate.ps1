$sourceDir = "C:\Users\Eric\CascadeProjects\hugo-etreacy\jekyll_site\_posts"
$targetDir = "C:\Users\Eric\CascadeProjects\hugo-etreacy\content\posts"

# Create target directory if it doesn't exist
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}

# Get all markdown files from source directory
Get-ChildItem $sourceDir -Filter "*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Update the frontmatter
    $content = $content -replace "permalink: .*\n", ""
    $content = $content -replace "layout: .*\n", ""
    
    # Create the new file path maintaining the date structure
    $newFileName = $_.Name
    $targetPath = Join-Path $targetDir $newFileName
    
    # Write the content to the new file
    $content | Set-Content $targetPath -Encoding UTF8
}

# Copy images and other assets
$sourceDataDir = "C:\Users\Eric\CascadeProjects\hugo-etreacy\jekyll_site\data"
$targetStaticDir = "C:\Users\Eric\CascadeProjects\hugo-etreacy\static"

if (Test-Path $sourceDataDir) {
    Copy-Item -Path "$sourceDataDir\*" -Destination $targetStaticDir -Recurse -Force
}

Write-Host "Migration completed!"
