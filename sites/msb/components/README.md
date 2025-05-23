# MSB Components

This directory contains all the React components used throughout the MSB website. The components are organized into the following categories:

## Directory Structure

### `client/`

Client-side components that rely on browser APIs or interactivity:

- [`CoreSideNav`](client/CoreSideNav.tsx) - Navigation sidebar with dynamic header tree
- [`FeedbackButton`](client/FeedbackButton.tsx) - Floating feedback button component
- [`MapWrapper`](client/MapWrapper.tsx) - Map integration component

### `server/`

Server-side and static components:

- [`MarkdownRenderer`](server/MarkdownRenderer/MarkdownRenderer.tsx) - Renders markdown content with custom components
- [`Alerts`](server/Alerts.tsx) - Displays system-wide alerts

### `static/`

Reusable presentational components:

- [`ContactCard`](static/ContactCard.tsx) - Contact information display
- [`ThreeColumnLayout`](static/ThreeColumnLayout.tsx) - Three-column page layout
- [`TwoColumnLayout`](static/TwoColumnLayout.tsx) - Two-column page layout
- [`LinkCardGrid`](static/LinkCardGrid.tsx) - Grid layout for link cards

## Usage

Import components from the appropriate category:

```tsx
// If using a client component in a static/server component it's recommended to do a direct import
import { FeedbackButton } from '@/components/client/FeedbackButton';

// If you want to ensure no additional server components are accidentally imported do a direct import
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';

// If you want to ensure no additional static components are accidentally imported do a direct import
import { ContactCard } from '@/components/static/ContactCard';
```

## Adding New Components

1. Create your component in the appropriate directory (`client/`, `server/`, or `static/`)
2. Export it from the directory's `index.ts`
3. Add it to the root `index.ts` if it should be available at the top level

## Best Practices

- Use 'use client' directive for client-side components
- Keep components focused and single-responsibility
- Follow the established pattern of the category
- Include proper TypeScript types
- Add JSDoc comments for complex props

## Related Resources

- [UI Component Library](@msb/ui) - Our shared UI component library
