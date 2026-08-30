### Template Use Guide

1. **Create & Clone Repository**

   Create a new repository on GitHub using the **"template"** button, then clone locally:
   ```bash
   git clone <repo url>
   cd <directory>
   
3. **Local Setup**

	Set your new project name in package.json and install the local dependencies:
	```bash
	npm pkg set name="<your-project-name>"
	npm install
	
5. **Development - Localhost**

	Start the local dev server with hot reloading:

	```bash
	npm run dev

7. **Commit & push src code updates to main branch:**

	```bash
	git add .
	git commit -m "[commit msg]"
	git push origin main

8. **Deploy to GH-Pages**

	Compile the optimised production bundle & deploy the dist folder to gh-pages branch:

	```bash
	npm run build
	npm run deploy
