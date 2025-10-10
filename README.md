# Matanuska-Susitna Borough Web

This is a monorepo containing all of the MSB's public facing web services. You can find internal documentation for this project at [MSB Web Presence](https://git.ad.matsugov.us/ops/obsidian/msb_obsidian/-/blob/main/freedom/Docs/Projects/MSB%20web/MSB%20Web%20Presence.md?ref_type=heads). If you do not have access to this, talk to your manager or the MSB web team to get access.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) - Follow instructions based on your OS.
- [TypeSense server](https://typesense.org/docs/guide/install-typesense.html#option-2-local-machine-self-hosting) - self-hosted, look for your OS instructions If you're a borough employee using WSL, follow [DEB package instructions](https://typesense.org/docs/guide/install-typesense.html#deb-package-on-ubuntu-debian).
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)
- [MSB CMS](https://github.com/akmatsu/matanuska-susitna-cms) - Follow dev environment setup instruction in the README

### Local Dev Setup for Main Website

1. Make sure you've installed all the [prerequisites](#prerequisites).
1. Install dependencies:

```bash
pnpm install
```

3. Setup your environment variables. Copy the example env files and fill in the required values:

```bash
cp sites/msb/.env.example sites/msb/.env
```

4. Start the development server:

```bash
pnpm msb:dev
```

### Local Dev Setup for Widget Website

1. Make sure you've installed all the [prerequisites](#prerequisites).
1. Install dependencies:

```bash
pnpm install
```

3. Setup your environment variables. Copy the example env files and fill in the required values:

```bash
cp sites/msb/.env.example sites/msb/.env
```

4. Start the development server:

```bash
pnpm wid:dev
```

The app will be running at [`http://localhost:3001`](http://localhost:3001).

## 🛠 Available Scripts

Review [package.json](./package.json) for a full list of available scripts.

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
