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

The project comes with a preconfigured GitHub Actions workflow that automatically builds the project and deploys it to GitHub Pages. You can find and customize this workflow in the `.github` folder if needed.

Once you push the project to GitHub, the workflow will handle the build process and publish your site to a branch named `gh-pages`. Make sure you've correctly set up the required repository permissions and GitHub Pages settings. If you encounter a build error, it's likely related to missing or misconfigured permissions.


