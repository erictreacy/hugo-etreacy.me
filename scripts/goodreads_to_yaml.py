import csv
import yaml
from datetime import datetime
import os
import re

def clean_filename(title):
    """Convert title to a clean filename."""
    # Remove special characters and replace spaces with underscores
    clean = re.sub(r'[^\w\s-]', '', title.lower())
    return re.sub(r'[-\s]+', '_', clean)

def parse_date(date_str):
    """Parse date from Goodreads format to YYYY-MM-DD."""
    if not date_str:
        return ""
    try:
        # Try different date formats
        for fmt in ['%Y/%m/%d', '%Y-%m-%d', '%B %d, %Y']:
            try:
                return datetime.strptime(date_str, fmt).strftime('%Y-%m-%d')
            except ValueError:
                continue
        return ""
    except:
        return ""

def convert_goodreads_to_yaml(csv_path, output_path):
    """Convert Goodreads CSV export to library.yaml format."""
    books = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Skip empty rows
            if not row['Title']:
                continue

            # Determine status and date
            status = row['Exclusive Shelf'].lower()
            date_read = parse_date(row['Date Read'])
            
            # Create book entry
            book = {
                'title': row['Title'],
                'author': row['Author'],
                'image': f"/reading/{clean_filename(row['Title'])}.jpg",
                'link': row['URL'],
                'alt': f"{row['Title']} by {row['Author']} Book Cover",
                'status': status,
                'date_read': date_read
            }
            books.append(book)
    
    # Sort books by date_read (most recent first)
    books.sort(key=lambda x: x['date_read'] if x['date_read'] else '0000-00-00', reverse=True)
    
    # Write to YAML file
    with open(output_path, 'w', encoding='utf-8') as f:
        yaml.dump(books, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

    print(f"\nConverted {len(books)} books to {output_path}")
    print("\nNext steps:")
    print("1. Add cover images to the 'static/reading' directory")
    print("2. Name each cover image according to the 'image' field in library.yaml")
    print("3. Update any missing dates or incorrect information in library.yaml")

if __name__ == "__main__":
    # Get current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(os.path.dirname(current_dir), 'data')
    
    # Check if goodreads_export.csv exists in current directory
    csv_path = os.path.join(current_dir, 'goodreads_export.csv')
    if not os.path.exists(csv_path):
        print(f"Please place your Goodreads export CSV file at: {csv_path}")
        exit(1)
    
    # Convert to YAML
    yaml_path = os.path.join(data_dir, 'library.yaml')
    convert_goodreads_to_yaml(csv_path, yaml_path)
