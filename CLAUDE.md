# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site generator project for zachquintana.com. The site is in its initial setup phase with basic Hugo scaffolding.

## Development Commands

### Building and Serving
- `hugo serve` - Start development server with live reload
- `hugo serve -D` - Start development server including draft content
- `hugo` - Build the site to the `public/` directory
- `hugo --minify` - Build with minified output

### Content Management
- `hugo new posts/post-name.md` - Create a new blog post
- `hugo new section/page-name.md` - Create a new page in a section

## Project Structure

This is a standard Hugo site with the following key directories:

- `content/` - Markdown content files (currently empty)
- `layouts/` - HTML templates (currently empty - using theme defaults)
- `static/` - Static assets like images, CSS, JS
- `themes/` - Hugo themes (currently empty)
- `archetypes/` - Content templates for new posts
- `public/` - Generated site output (excluded from git)
- `hugo.toml` - Main configuration file

## Configuration

The site configuration is in `hugo.toml`. Key settings to update:
- `baseURL` - Currently set to example.org, needs site-specific URL
- `title` - Currently "My New Hugo Site", needs proper site title
- `languageCode` - Currently 'en-us'

## Development Notes

- Hugo extended version is required (currently v0.148.1 available)
- No theme is currently installed - will need to add a theme or create custom layouts
- Content directory is empty - site needs content creation
- No build scripts or CI/CD configuration present