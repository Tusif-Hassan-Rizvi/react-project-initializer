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