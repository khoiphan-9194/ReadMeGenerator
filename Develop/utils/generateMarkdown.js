// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const fs = require("fs");

// this function will generate a badge for lincense
function renderLicenseBadge(licenseType) {
  if(!licenseType)
  return '';

let licenseBadge;
let color;
//we used switch to select user options
switch (licenseType) {
  case 'MIT':
    color="blue";
    licenseBadge = `[![License: MIT](https://img.shields.io/badge/license-${licenseType}-${color})](https://opensource.org/licenses/MIT)`;
    break;

  case 'GPLv3':
    color="grey"
    licenseBadge = `[![License: GPLv3](https://img.shields.io/badge/license-${licenseType}-${color})](https://www.gnu.org/licenses/gpl-3.0)`;
    break;

  case 'Apache':
    color="yellow";
    licenseBadge = `[![License: Apache](https://img.shields.io/badge/license-${licenseType}-${color})](https://opensource.org/licenses/Apache-2.0)`;
    break;

  case 'ISC':
    color="red";
    licenseBadge = `[![License: ISC](https://img.shields.io/badge/license-${licenseType}-${color})](https://opensource.org/licenses/ISC)`;
    break;

  default:
    licenseBadge = '';
}

return licenseBadge;

}



// this function will write a script of README.md file that based on answers from users
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  return `# ${data.title}
  ![badge](https://img.shields.io/badge/languages-${data.languageBuilt}-yellow)
  <br> 
  ![badge](https://img.shields.io/github/issues/${data.github}/${data.repo})
  <br>
  ![badge](https://img.shields.io/github/issues-closed/${data.github}/${data.repo})
  <br>
  ![badge](https://img.shields.io/github/last-commit/${data.github}/${data.repo})
  <br>

  [![Issues](https://img.shields.io/github/contributors/${data.github}/${data.repo})](https://github.com/${data.github}/${data.repo}/graphs/contributors)
## Table of Contents
  
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributions)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)
  
## Description 
  
${data.description}
  
## Installation 
  
${data.installation}
  
## Usage 
  
${data.usage}
<img src="utils/readme-demo.gif"><br>

## Language Built
${createBuiltWith(data.languageBuilt)}
  
## Contributing 
  
${data.contributions}

## Screenshots 

${createScreenshots(data.screenshots)}
  
## License
${licenseBadge}

${data.title} © is licensed under the ${data.license} license.  

For more information regarding the ${data.title}'s license, please visit: 
https://opensource.org/licenses/${data.license}

  
## Questions?
  
### Github:[${data.github}](https://github.com/${data.github})
  
### Reach Me Via Email: ${data.email}
`
}


// creates builtWith section,

const createBuiltWith = builtWith =>{
  let allTechnologies = '';

  if (builtWith) {
      builtWith.forEach(item => {
          allTechnologies += `
* ${item}`
      });
      return `${allTechnologies}`;
  } else {
      return '';
  };
};




// creates screenshot section
const createScreenshots = screenshotItem => { 
  let allScreenshots = '';

  if (screenshotItem) {
    screenshotItem.forEach(item => {
      allScreenshots +=  `![A user clicks on slots on the color-coded calendar and edits the events](./assets/${item})\n\n`;
      });
      return `${allScreenshots}`;
  } else {
      return '';
  };
};
  


// module.exports is an object we use to store variables or methods
module.exports = {
  generateMarkdown
};


