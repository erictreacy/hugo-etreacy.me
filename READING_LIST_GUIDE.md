# Reading List Guide

## Adding Books from Goodreads

1. **Export Your Goodreads Library**
   - Go to Goodreads > My Books
   - Click "Import and export" at bottom
   - Select "Export Library"

2. **Convert Book Data**
   - Open the Goodreads CSV export
   - Open `data/library_template.yaml`
   - For each book:
     ```yaml
     - title: "[Title]"
       author: "[Author]"
       image: "/reading/[lowercase_title].jpg"
       link: "[Goodreads URL]"
       alt: "[Title] by [Author] Book Cover"
       status: "read"  # or "reading" or "to-read"
       date_read: "YYYY-MM-DD"
     ```

3. **Save Cover Images**
   - Save book covers to `static/reading/`
   - Use lowercase filenames with underscores
   - Example: `the_code_breaker.jpg`

## Tips

- Status options: `read`, `reading`, `to-read`
- Dates must be `YYYY-MM-DD` format
- Image paths should be lowercase with underscores
- Keep cover images around 500px wide for best quality
- The reading page only shows books marked as "read"
