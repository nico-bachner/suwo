# Utils

This folder contains project-agnostic utility functions and helpers that can be
reused across the application. These utilities are designed to be:

- **Pure functions** when possible (no side effects)
- **Framework-independent** (not tied to Next.js, React, or other specific
  libraries)
- **Reusable** across different parts of the application
- **Well-typed** with comprehensive TypeScript support

## 📁 Organization

```
utils/
├── http/                     # HTTP-related utilities
│   ├── create_response.ts    # Standard API response creation
│   ├── parse_response.ts     # Response parsing and validation
│   ├── status_code.ts        # HTTP status code constants
│   └── types.ts              # HTTP utility types
├── notion/                   # Notion API helpers
│   ├── fetch_notion_database.ts
│   ├── fetch_page_content.ts
│   └── get_page_title.ts
├── cn.ts                     # Class name utility (clsx + tailwind-merge)
├── get_base_url.ts          # Environment-aware URL generation
├── prisma.ts                # Database client configuration
├── query_provider.tsx       # TanStack Query provider setup
└── types.ts                 # Shared utility types
```

## 🔧 Core Utilities

### Class Names (`cn.ts`)

Combines `clsx` and `tailwind-merge` for optimal Tailwind CSS class handling:

```typescript
import { cn } from '@/utils/cn'

// Merges classes intelligently, resolving conflicts
const className = cn(
  'px-4 py-2',
  'bg-blue-500 hover:bg-blue-600',
  isActive && 'bg-green-500', // Overrides blue when active
  'px-6', // Overrides px-4
)
```

### Base URL (`get_base_url.ts`)

Environment-aware URL generation for consistent linking:

```typescript
import { getBaseURL } from '@/utils/get_base_url'

// Automatically detects environment
const baseUrl = getBaseURL()
// Development: http://localhost:3000
// Production: https://suwo.org.au
```

### HTTP Utilities (`http/`)

Standardized API response handling:

```typescript
import { createResponse } from '@/utils/http/create_response'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

// Creating responses
export const GET = async () => {
  return createResponse({
    status: StatusCode.OK,
    data: { message: 'Success' },
  })
}

// Parsing responses
const response = await parseResponse(await fetch('/api/endpoint'))
if (response.status === StatusCode.OK) {
  console.log(response.data)
}
```

### Notion Utilities (`notion/`)

Helpers for integrating with Notion CMS:

```typescript
import { fetchNotionDatabase } from '@/utils/notion/fetch_notion_database'
import { getPageTitle } from '@/utils/notion/get_page_title'

// Fetch database metadata
const { title, description } = await fetchNotionDatabase(databaseId)

// Extract page title safely
const title = getPageTitle(notionPage)
```

## 📋 Guidelines

When adding new utilities:

### 1. **Single Responsibility**

Each utility should have one clear purpose:

```typescript
// ✅ Good - focused utility
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount)
}

// ❌ Avoid - too many responsibilities
export const formatData = (data: any) => {
  // formats dates, currency, text, etc.
}
```

### 2. **TypeScript First**

Include comprehensive type definitions:

```typescript
// ✅ Good - fully typed
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

### 3. **JSDoc Documentation**

Document complex functions with examples:

````typescript
/**
 * Safely parses JSON with error handling and type validation
 *
 * @example
 *   ;```typescript
 *   const data = safeJsonParse('{"name": "John"}', {})
 *   // Returns: { name: "John" }
 *
 *   const invalid = safeJsonParse('invalid json', null)
 *   // Returns: null
 *   ```
 *
 * @param jsonString - The JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @returns Parsed object or fallback value
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString)
  } catch {
    return fallback
  }
}
````

### 4. **Framework Independence**

Avoid dependencies on React, Next.js, or other framework-specific APIs:

```typescript
// ✅ Good - pure function
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ❌ Avoid - React dependency
export const useSlug = (text: string) => {
  return useMemo(() => generateSlug(text), [text])
}
```

### 5. **Proper Categorization**

Place utilities in appropriate subdirectories:

- **`http/`** - Request/response handling, status codes
- **`notion/`** - Notion API integration helpers
- **`validation/`** - Data validation utilities (if created)
- **Root level** - General-purpose utilities

## 📦 Usage Examples

### Importing Utilities

Prefer absolute imports for consistency:

```typescript
// ✅ Absolute imports
import { cn } from '@/utils/cn'
import { StatusCode } from '@/utils/http/status_code'
import { getPageTitle } from '@/utils/notion/get_page_title'

// ❌ Avoid relative imports in most cases
import { cn } from '../../../utils/cn'
```

### Error Handling

Utilities should handle errors gracefully:

```typescript
export const safeLocalStorage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    } catch {
      return fallback
    }
  },

  set: (key: string, value: unknown): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
}
```

## 🔍 Testing Utilities

When creating utilities, consider:

1. **Edge cases** - null/undefined inputs, empty arrays, etc.
2. **Type safety** - Ensure TypeScript catches potential issues
3. **Performance** - Avoid unnecessary computations
4. **Browser compatibility** - Test across different environments

## 🤝 Contributing Utilities

Before adding a new utility:

1. Check if similar functionality already exists
2. Consider if it belongs in a feature-specific folder instead
3. Ensure it follows the established patterns
4. Add appropriate documentation and examples

Remember: The goal is to create a collection of reliable, well-documented
utilities that make development faster and more consistent across the entire
application.
