# Utils

This folder contains project-agnostic utility functions and helpers that can be
reused across the application. These utilities are designed to be:

- **Pure functions** when possible (no side effects)
- **Framework-independent** (not tied to Next.js, React, or other specific
  libraries)
- **Reusable** across different parts of the application

## Guidelines

When adding new utilities:

1. Keep functions small and focused on a single responsibility
2. Use TypeScript for type safety
3. Add JSDoc comments for complex functions
4. Consider if the utility truly belongs here vs. in a feature-specific folder
5. Ensure the utility doesn't have dependencies on application-specific logic

## Usage

Import utilities using absolute imports from `@/utils/`:

```typescript
import { cn } from '@/utils/cn'
import { getCurrentYear } from '@/utils/date_manupulation'
import { StatusCode } from '@/utils/http/status_code'
```
