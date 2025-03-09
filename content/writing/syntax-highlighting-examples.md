---
title: "Syntax Highlighting Examples"
date: 2025-03-09
draft: false
---

This post demonstrates syntax highlighting for various programming languages using our custom theme.

## Python
```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n numbers."""
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

# Example usage with type hints and docstring
class DataProcessor:
    def __init__(self, data: list[str]):
        self.data = data
        self._processed = False
    
    def process(self) -> dict[str, int]:
        result = {}
        for item in self.data:
            result[item] = result.get(item, 0) + 1
        self._processed = True
        return result
```

## JavaScript
```javascript
// Modern JavaScript with async/await and ES6+ features
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    
    return {
      ...data,
      lastFetched: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw new Error('Failed to fetch user data');
  }
};

// React component example
function UserProfile({ userId, theme = 'light' }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData(userId)
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className={`profile-container ${theme}`}>
      {loading ? <LoadingSpinner /> : <UserDetails user={user} />}
    </div>
  );
}
```

## SQL
```sql
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS month,
    product_category,
    SUM(amount) as total_sales,
    COUNT(DISTINCT customer_id) as unique_customers
  FROM orders
  JOIN products ON orders.product_id = products.id
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY 1, 2
)
SELECT 
  month,
  product_category,
  total_sales,
  unique_customers,
  LAG(total_sales) OVER (
    PARTITION BY product_category 
    ORDER BY month
  ) as previous_month_sales,
  ROUND(
    (total_sales - LAG(total_sales) OVER (
      PARTITION BY product_category 
      ORDER BY month
    )) / LAG(total_sales) OVER (
      PARTITION BY product_category 
      ORDER BY month
    ) * 100,
    2
  ) as growth_percentage
FROM monthly_sales
ORDER BY month DESC, total_sales DESC;
```

## HTML & CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Layout Example</title>
    <style>
        :root {
            --primary-color: #2563eb;
            --text-color: #1f2937;
            --background: #f8fafc;
        }

        .container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            transition: transform 0.2s ease;
        }

        .card:hover {
            transform: translateY(-4px);
        }

        @media (max-width: 600px) {
            .container {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Responsive Card</h2>
            <p>This card adapts to different screen sizes.</p>
        </div>
    </div>
</body>
</html>
```

## Go
```go
package main

import (
    "context"
    "log"
    "time"
)

type CacheItem struct {
    Value      interface{}
    Expiration time.Time
}

type Cache struct {
    items map[string]CacheItem
}

func NewCache() *Cache {
    return &Cache{
        items: make(map[string]CacheItem),
    }
}

func (c *Cache) Set(key string, value interface{}, ttl time.Duration) {
    c.items[key] = CacheItem{
        Value:      value,
        Expiration: time.Now().Add(ttl),
    }
}

func (c *Cache) Get(key string) (interface{}, bool) {
    item, exists := c.items[key]
    if !exists {
        return nil, false
    }
    
    if time.Now().After(item.Expiration) {
        delete(c.items, key)
        return nil, false
    }
    
    return item.Value, true
}

func (c *Cache) StartCleanup(ctx context.Context, interval time.Duration) {
    ticker := time.NewTicker(interval)
    go func() {
        for {
            select {
            case <-ctx.Done():
                ticker.Stop()
                return
            case <-ticker.C:
                now := time.Now()
                for key, item := range c.items {
                    if now.After(item.Expiration) {
                        delete(c.items, key)
                    }
                }
            }
        }
    }()
}
```

Each code block demonstrates different aspects of syntax highlighting:

1. Comments and docstrings
2. Keywords and control structures
3. String literals and numbers
4. Function and class definitions
5. Special syntax (async/await, decorators, etc.)
6. Long lines that demonstrate horizontal scrolling
7. Nested code blocks and indentation

The highlighting adapts to your screen size while maintaining readability and proper overflow handling.
