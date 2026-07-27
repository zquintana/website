# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro static site for zachquintana.com.

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

## Deployment

AWS Amplify runs `npm ci` followed by `npm run build` and deploys the generated `dist/` directory.
