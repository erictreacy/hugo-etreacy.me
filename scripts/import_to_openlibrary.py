import yaml
import requests
import json
from datetime import datetime
import time

def load_library():
    with open('data/library.yaml', 'r') as file:
        return yaml.safe_load(file)

def search_book(title, author):
    # Clean author name (remove extra authors after comma)
    author = author.split(',')[0].strip()
    
    query = f'title:"{title}" author:"{author}"'
    url = f'https://openlibrary.org/search.json?q={query}'
    response = requests.get(url)
    data = response.json()
    
    if data['num_found'] > 0:
        book = data['docs'][0]
        print(f"\nFound: {book['title']} by {', '.join(book['author_name'])}")
        print(f"Open Library ID: {book['key']}")
        print(f"First published: {book.get('first_publish_year', 'N/A')}")
        return book
    return None

def main():
    library = load_library()
    
    # Process only read books
    read_books = [book for book in library if book['status'] == 'read']
    
    print(f"\nFound {len(read_books)} read books to process\n")
    
    for book in read_books:
        print(f"\nProcessing: {book['title']} by {book['author']}")
        print(f"Date read: {book['date_read']}")
        
        # Search for book on Open Library
        result = search_book(book['title'], book['author'])
        
        if result:
            print(f"Link: https://openlibrary.org{result['key']}")
            print("---")
        else:
            print(f"Could not find: {book['title']}")
            print("---")
        
        # Be nice to the API
        time.sleep(1)

if __name__ == "__main__":
    print("Open Library Book Import Script")
    print("==============================")
    print("\nThis script will search Open Library for your books")
    print("and provide direct links to add them to your shelf.")
    print("\nYour Open Library profile:")
    print("https://openlibrary.org/people/eric_treacy/books\n")
    
    input("Press Enter to start...")
    main()
