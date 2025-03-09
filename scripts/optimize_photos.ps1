# Optimize photos for web display
param (
    [string]$PhotosDir = "..\static\data\photos"
)

# Check if ImageMagick is installed
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick is required. Please install it first:"
    Write-Host "winget install ImageMagick.ImageMagick"
    exit 1
}

# Get all image files
$imageFiles = Get-ChildItem -Path $PhotosDir -Include *.jpg,*.jpeg,*.png -Recurse

foreach ($file in $imageFiles) {
    $outputFile = $file.FullName
    
    # Optimize while maintaining quality
    magick $file.FullName `
        -strip `
        -quality 85 `
        -resize "1600x1600>" `
        -sampling-factor 4:2:0 `
        -interlace Plane `
        -colorspace sRGB `
        $outputFile

    Write-Host "Optimized: $($file.Name)"
}

Write-Host "Done! All photos have been optimized."
