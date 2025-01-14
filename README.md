# Matanuska-Susitna Borough Web This is my conflicting change

This is a monorepo containing all of the MSB's public facing web services. You can find internal documentation for this project at [MSB Web Presence](https://git.ad.matsugov.us/ops/obsidian/msb_obsidian/-/blob/main/freedom/Docs/Projects/MSB%20web/MSB%20Web%20Presence.md?ref_type=heads). If you do not have access to this, talk to your manager or the MSB web team to get access.

## 🚀 Getting Started This is my test change

## THIS IS MY NON_CONCFLICTING CHANGE I waant to keep

### Prerequisites This is my other change

- Node.js 16+
- pnpm (`npm install -g pnpm`)
- Git

### Setup

1. Clone the repository:

```bash
git clone https://git.ad.matsugov.us/web/msb.git
cd msb
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

### Development

Start all services in development mode:

```bash
pnpm dev
```

For UI component development:

```bash
pnpm run storybook
```

## 🏢 Sites

These are websites that are stored in this monorepo. Each site has its own documentation and setup instructions.

### [MSB CMS](./sites/msb/)

A Strapi CMS application that serves as our content management system.

- **Tech Stack**: Strapi, PostgreSQL
- **Purpose**: Central content management for MSB websites
- **Development**: `pnpm dev --filter cms`
- **Documentation**: See [CMS Documentation](./sites/msb/README.md)

### [Main Website](./sites/msb/)

The primary website of the Matanuska-Susitna Borough built with Next.js.

- **Tech Stack**: Next.js, React, TypeScript
- **Content Source**: MSB CMS
- **Development**: `pnpm dev --filter web`
- **Documentation**: See [Website Documentation](./sites/msb/README.md)

## 📦 Packages

Internal packages used across the monorepo. Each package is independently versioned and published.

### [MSB UI Library](./packages/ui/)

A comprehensive React component library used throughout MSB websites.

- **Tech Stack**: React, TypeScript, Tailwind CSS
- **Development**: `pnpm run storybook --filter ui`
- **Documentation**: See [UI Documentation](./packages/ui/README.md)

## 🛠 Available Scripts

- `pnpm dev` - Start all services in development mode
- `pnpm build` - Build all packages and applications
- `pnpm test` - Run tests across all packages
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm storybook` - Start Storybook for UI development

## 📝 Contributing

1. Ensure you have access to the MSB development environment
2. Create a feature branch from `main`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Submit a merge request

### Branch Naming Convention

- Feature: `feature/description`
- Bugfix: `fix/description`
- Hotfix: `hotfix/description`

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## 🔒 Security

For security concerns, please contact the MSB IT Security team directly. Do not create public issues for security vulnerabilities.

## 📞 Support

- For development questions: Contact the MSB web team
- For content management: Contact the Communications team
- For technical issues: Create an issue in our internal issue tracker

## 📚 Additional Resources

- [Internal Documentation](https://git.ad.matsugov.us/ops/obsidian/msb_obsidian)
- [Coding Standards](./docs/CODING_STANDARDS.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
