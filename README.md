# Learn Site — GitHub Pages Package

This package deploys the **Learn** site as an independent GitHub Pages project. It is configured to load Learn at the root URL and link to the matching Tech site through two repository variables.

Before the first deployment, create `LEARN_SITE_URL` and `TECH_SITE_URL` under **Settings → Secrets and variables → Actions → Variables**. Then set the Pages publishing source to **GitHub Actions**, configure the `learn.yourdomain.com` custom domain in Pages settings, and push to `main`.

The companion setup guide is in the original project’s `DEPLOY_GITHUB_PAGES.md` file.
