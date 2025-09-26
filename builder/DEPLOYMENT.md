## Deployment Guide

This guide outlines the steps to deploy the Thor AI App Builder application.

### 1. Cloudflare Pages Deployment

The application can be deployed to Cloudflare Pages using the `deploy` script defined in `package.json`.

**Prerequisites:**
- Node.js (>=18.18.0)
- npm or pnpm
- Cloudflare Wrangler CLI installed and authenticated.

**Steps:**
1. **Build the application:**
   ```bash
   npm run build
   ```
   This command will compile the application and generate the necessary client-side assets in the `build/client` directory.

2. **Deploy to Cloudflare Pages:**
   ```bash
   npm run deploy
   ```
   This command will use Wrangler to deploy the contents of the `build/client` directory to Cloudflare Pages. You will be prompted to select your Cloudflare account and project if not already configured.

### 2. Docker Deployment

The application can also be deployed using Docker containers.

**Prerequisites:**
- Docker installed and running.

**Steps:**
1. **Build the Docker image (development):**
   ```bash
   npm run dockerbuild
   ```
   This command builds a Docker image tagged `thor-ai:development` and `thor-ai:latest`.

2. **Build the Docker image (production):**
   ```bash
   npm run dockerbuild:prod
   ```
   This command builds a Docker image tagged `thor-ai:production`.

3. **Run the Docker container (development/local):**
   ```bash
   npm run dockerstart
   ```
   This command runs the `thor-ai:latest` Docker image, mapping port 5173 and loading environment variables from `.env.local`.

4. **Run the Docker container (detached):**
   ```bash
   npm run dockerrun
   ```
   This command runs the `thor-ai:latest` Docker image in detached mode, mapping port 5173 and loading environment variables from `.env.local`.

**Environment Variables:**
Ensure that your `.env.local` file contains all necessary environment variables for the application to function correctly in the deployed environment. For Cloudflare Pages, these variables are typically configured directly within the Cloudflare dashboard.