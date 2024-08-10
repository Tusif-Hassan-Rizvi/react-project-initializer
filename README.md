How to create React Project Initializer

### Step 1

```bash
mkdir create-test-optus-react-app
cd create-test-optus-react-app
npm init -y
mkdir template
```

### Step 2

```bash
npm install commander fs-extra
```

### Step 3

```bash
touch index.js
```

### Step 4

```bash
#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const packageJson = require("./package.json");

const createReactApp = (projectName) => {
  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  fs.copySync(templateDir, targetDir);

  if (fs.existsSync(path.join(targetDir, '.npmignore'))) {
    fs.renameSync(
      path.join(targetDir, '.npmignore'),
      path.join(targetDir, '.gitignore')
    );
  }

  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);

  const validPackageName = projectName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/^[^a-z]/, 'n');

  packageJson.name = validPackageName;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  console.log("Installing packages. This might take a couple of minutes.");
  execSync("npm install", { cwd: targetDir, stdio: "inherit" });

  console.log(`React project "${projectName}" created successfully!`);
  console.log("To start your project, run:");
  console.log(`  cd ${projectName}`);
  console.log("  npm start");
};

const program = new Command();

program
  .version(packageJson.version)
  .argument("<project-name>", "Name of the project")
  .action(createReactApp);

program.parse(process.argv);
```

### Step 5

```bash
cd template
mkdir -p public src
touch public/index.html src/index.tsx src/App.tsx
touch tsconfig.json
```

### Step 6 Create `template/package.json`

```json
{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    "react-redux": "^8.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/jest": "^27.0.0",
    "@types/node": "^16.0.0",
    "typescript": "^4.9.0",
    "react-router-dom": "^6.10.0",
    "@types/react-router-dom": "^5.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

### Step 7 Add `template/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "custom.d.ts"]
}
```

### Step 8 Update the Root json `package.json`

```json

{
  "name": "create-test-optus-react-app",
  "version": "1.0.0",
  "description": "Custom React TypeScript app generator",
  "main": "index.js",
  "bin": {
    "create-test-optus-react-app": "./index.js"
  },
  "files": [
    "index.js",
    "template"
  ],
  "dependencies": {
    "commander": "^8.3.0",
    "fs-extra": "^10.0.0"
  },
  "keywords": ["react", "typescript", "generator"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 9 Make the `index.js` file executable:

```bash
chmod +x index.js
```

### Step 10 link package 

```bash
npm link
```

```bash
create-test-optus-react-app project-name
```

If you want to unlik local then run
```bash
npm unlink -g create-test-optus-react-app
```



### Step 11 publish package to npm

Login first
```
npm login
```

Publish then

```bash
npm publish
```

### Step 12 Use Package

```
npx create-test-optus-react-app my-new-app
```


# How to update package 

### Step 1 Run

```bash
npm version patch
```

### Step 2 Run

```bash
npm publish
```

*Note please avoid git repo initialization while publishing code it's may give error




