const fs = require('fs');
const path = require('path');

// Create icons folder
const iconFolder = 'images/icons';

if (!fs.existsSync(iconFolder)) {
  fs.mkdirSync(iconFolder, { recursive: true });
}

// Create a README file explaining the folder structure
const readmeContent = `# Icons Directory

This directory contains icons for the Innovative Chemicals website.

## Usage

Place icon files (.svg, .png) in this directory. Icons should be optimized for web use.

Note: For actual icons, please use appropriate image files.
`;

fs.writeFileSync('images/README.md', readmeContent);

console.log('Icon folder structure created successfully!');