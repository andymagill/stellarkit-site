#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreLocalPath = path.join(__dirname, '..', 'stellarkit-core');
const packageJsonPath = path.join(__dirname, 'package.json');

function updatePackageJson(useLocalCore) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  
  if (useLocalCore) {
    packageJson.dependencies['@stellarkit/core'] = 'file:../stellarkit-core';
    console.log('✓ Using LOCAL @stellarkit/core (found at ../stellarkit-core)');
  } else {
    packageJson.dependencies['@stellarkit/core'] = 'latest';
    console.log('✓ Using NPM @stellarkit/core (latest)');
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

function main() {
  // Check if local Core directory exists
  const localCoreExists = fs.existsSync(coreLocalPath) && fs.statSync(coreLocalPath).isDirectory();
  updatePackageJson(localCoreExists);
}

main();
