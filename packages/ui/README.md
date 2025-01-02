# UI Component Library

A modern, accessible React component library built with TypeScript and Tailwind CSS.

## Features

- 🎨 Modern design system
- ♿ Accessible components
- 🌗 Multiple color variants
- 📱 Responsive design
- 🔧 Highly customizable

## Installation

```bash
pnpm add @msb/ui@workspace:*
```

## Components

### Button

A versatile button component with various color variants and states.

```tsx
import { Button } from '@msb/ui';

function MyComponent() {
  return (
    <Button color="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

#### Props

| Prop        | Type                                                                                                        | Default     | Description                     |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `color`     | `'primary' \| 'secondary' \| 'accent-cool' \| 'accent-warm' \| 'base' \| 'error' \| 'warning' \| 'success'` | `'base'`    | The color variant of the button |
| `type`      | `'button' \| 'submit' \| 'reset'`                                                                           | `'button'`  | The HTML button type            |
| `disabled`  | `boolean`                                                                                                   | `false`     | Whether the button is disabled  |
| `className` | `string`                                                                                                    | `undefined` | Additional CSS classes          |
| `children`  | `React.ReactNode`                                                                                           | -           | The button content              |
| `onClick`   | `(event: React.MouseEvent<HTMLButtonElement>) => void`                                                      | `undefined` | Click event handler             |

#### Color Variants

- `primary`: Main call-to-action
- `secondary`: Alternative actions
- `accent-cool`: Cool-toned accent
- `accent-warm`: Warm-toned accent
- `base`: Default styling
- `error`: Destructive actions
- `warning`: Cautionary actions
- `success`: Positive actions

#### Examples

```tsx
// Primary button
<Button color="primary">Primary Action</Button>

// Disabled button
<Button color="primary" disabled>Disabled</Button>

// Success button with custom class
<Button color="success" className="my-4">
  Complete
</Button>
```

## Development

### Prerequisites

- Node.js 16+
- pnpm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm i
   ```
3. Start the development environment:
   ```bash
   pnpm run storybook
   ```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT © Matanuska-Susitna Borough
