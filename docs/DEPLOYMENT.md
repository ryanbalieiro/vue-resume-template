## Deployment

### 1. Vite configuration
Open `vite.config.js` and set the base directory for your application. This setting defines the main path that your website will be hosted under.

```js
export default defineConfig({
  base: '/vue-resume-template/',
  plugins: [vue()],
})
```

In simple terms, if you consider GitHub hosting the GitHub Pages site for this repo at the URL `https://ryanbalieiro.github.io/vue-resume-template/`, the correct base directory to set is `/vue-resume-template/`.

If you're deploying to Netlify or your own custom domain where your website is located at the root, you can leave the `base` setting as `'/'`.

### 2. Building for production
To compile your project for production, execute:

```
npm run build
``` 

This command triggers a series of processes that package your code, assets, and other necessary files, ultimately creating a production-ready version of your project. After running the command, you'll find the compiled files within the `dist` folder.

### 3. Deploying to GitHub pages

This project comes with a preconfigured GitHub Actions workflow that automatically builds and deploys the portfolio to GitHub Pages. If needed, you can find and customize this workflow in the `.github/workflows` folder.

Follow these steps to deploy your portfolio to GitHub Pages:

- **Make sure the base directory in `vite.config.js` matches your repo name.**
- **Make sure your repository is public.**
- **Enable GitHub Actions** in your repository settings:
    - Go to `Your Repo > Settings > Actions > General`.
    - Under **Actions permissions**, select **"Allow all actions and reusable workflows"**.
    - Scroll down to **Workflow permissions** and enable **"Read and write permissions"**.  
      ⚠️ *If this step is skipped, the deployment script will fail after the build stage.*
- Once everything is configured, **push a commit** to your repository to trigger the deployment script automatically.
- If the deployment doesn't start automatically:
    - Go to the **Actions** tab in your GitHub repo.
    - If a confirmation message appears, click **"I understand my workflows, go ahead and enable them"**.
    - Select the **"Deploy portfolio to GitHub Pages"** workflow on the left sidebar.
    - Run it manually by clicking **"Run workflow"**.
    - If it already ran and failed, you can click the **"Re-run jobs"** button to run it again.
- After a successful run, the script will:
    - Build the project
    - Create a new branch called `gh-pages` in your repository with your production-ready files.
- Now go to `Your Repo > Settings > Pages`, and:
    - Set the **source branch** to `gh-pages`
    - Save the changes
- Wait a few seconds for GitHub to process the deployment.  
  You should then see the deployment status and a link to your live portfolio in the **"Deployments"** section on the right side of your repository homepage.
