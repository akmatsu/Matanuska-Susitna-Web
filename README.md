# Matanuska-Susitna Borough Web

This is a monorepo containing all of the MSB's public facing web services. You can find internal documentation for this project at [MSB Web Presence](https://git.ad.matsugov.us/ops/obsidian/msb_obsidian/-/blob/main/freedom/Docs/Projects/MSB%20web/MSB%20Web%20Presence.md?ref_type=heads). If you do not have access to this, talk to your manager or the MSB web team to get access.

## Sites

These are websites that are stored in this monorepo. To find documentation for a specific website follow one of the links below.

### [MSB CMS](./sites/msb/)

This is a Strapi CMS application. We use this to serve content to our other websites

### [Main Website](./sites/msb/)

This is a NextJS web application. It's the primary website of the Matanuska-Susitna Borough. Most of its content is contained within the [MSB CMS](#msb-cms)

## Packages

These are all of the different internal packages that are stored in this monorepo. Each of these packages is used by either another package or website within this monorepo. To find documentation for a specific package follow one of the links below.

### [MSB UI Library](./packages/ui/)

This is a React component library and is used throughout all of the [MSB Website](#sites).
