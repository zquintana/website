# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro static site for zachquintana.com.

The repository includes a modular Technology Health Assessment demonstration. Before changing assessment behavior, read `AGENTS.md`, `docs/methodology/methodology-overview.md`, `docs/architecture/system-overview.md`, and `docs/development/assessment-change-checklist.md`. The active methodology is `0.1.0` with status `demonstration`; do not imply certification, compliance attestation, or finalized methodology.

## Development Commands

### Building and Serving
- `npm run dev` - Start the Astro development server
- `npm run build` - Build the site to the `dist/` directory
- `npm run preview` - Preview the production build locally

## Project Structure

- `src/pages/` - Astro pages and routes
- `static/` - Static assets served from the site root
- `dist/` - Generated production build output, excluded from git
- `astro.config.mjs` - Astro configuration
- `amplify.yml` - AWS Amplify build and deployment configuration
- `docs/` - Product, methodology, architecture, development, and reference governance
- `AGENTS.md` - Concise implementation-agent rules

## Deployment

AWS Amplify runs `npm ci` followed by `npm run build` and deploys the generated `dist/` directory.
