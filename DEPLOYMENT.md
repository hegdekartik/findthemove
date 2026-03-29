# Deployment Guide

This document outlines the steps to deploy **FindTheMove** to production, specifically focusing on Vercel, which is the recommended hosting platform for Vite + React applications.

## 🚀 Deploying to Vercel

Vercel provides zero-configuration deployments for Vite projects.

### Prerequisites
1. A GitHub, GitLab, or Bitbucket account.
2. A Vercel account linked to your Git provider.
3. Your project pushed to a repository.

### Step-by-Step Deployment

1. **Log in to Vercel**: Go to your Vercel dashboard.
2. **Add New Project**: Click "Add New..." and select "Project".
3. **Import Repository**: Find your `FindTheMove` repository and click "Import".
4. **Configure Project**:
   * **Framework Preset**: Vercel should automatically detect **Vite**.
   * **Build Command**: `npm run build` (Default)
   * **Output Directory**: `dist` (Default)
   * **Install Command**: `npm install` (Default)
5. **Environment Variables**: 
   * If you add any API keys in the future, add them here. Remember that variables accessed in the browser must be prefixed with `VITE_` (e.g., `VITE_API_KEY`).
6. **Deploy**: Click the "Deploy" button.

### 🔧 Vercel Configuration (`vercel.json`)

Single Page Applications (SPAs) like this one handle routing on the client side. If a user refreshes a page on a specific route, Vercel's servers will look for a physical file and return a 404 error.

To prevent this, the project includes a `vercel.json` file in the root directory:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This tells Vercel to redirect all requests to `index.html`, allowing React Router (or your app's internal state) to handle the view.

## 🧪 Pre-Deployment Checklist (Local Testing)

Before pushing to your `main` branch, run these commands locally to ensure your build will succeed on Vercel:

1. **Type Checking & Linting**:
   ```bash
   npm run lint
   ```
   *Ensures there are no TypeScript or ESLint errors that would fail the Vercel build.*

2. **Production Build**:
   ```bash
   npm run build
   ```
   *Compiles the application into the `dist` folder.*

3. **Local Preview**:
   ```bash
   npm run preview
   ```
   *Starts a local server serving the `dist` folder. If the app works here, it is guaranteed to work on Vercel.*
