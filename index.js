//just some greetings when the App starts to communicate some information
console.log("Hello! Welcome to ReadME Markdown generator \n");
const welcomeMsg = ` This utility will walk you through creating a README.md (markdown) file.
It only covers the most common items, and will save the information as you provide.
This utility or application requires "inquirer" npm module. 
Use 'npm install <pkg>' to install a package and save it as a dependency in the package.json file.
Press ^c at any time to quit.
`
//displaying the Welcome Message
console.log(welcomeMsg);

//Initialize Variables
let fs = require("fs");
let inquirer = require("inquirer");
let filename = "README.md";
let licenseBadges = "";
//Initializing the structure of table of contents for the README
let tableOfContent = 
`\n## Table of contents
\n1. [Description](#description)
\n2. [Install Guide](#install)
\n3. [Usage](#usage)
\n4. [Contribute](#contribute)
\n5. [license](#license)
\n6. [Tests](#tests)
\n7. [Questions](#questions)`;
//Promt that will present various input questions to users and will save their response for further processing
inquirer.prompt(
    [
        {
            type: "input",
            name: "title",
            message: "Title of the Project:"
        },
        {
            type: "input",
            name: "description",
            message: "Description: "
        },
        {
            type: "input",
            name: "installation",
            message: "Any Installation dependencies:",
        },
        {
            type: "input",
            name: "usage",
            message: "Usage:"
        },
        {
            type: "input",
            name: "contribution",
            message: "How to Contribute?"
        },
        {
            type: "input",
            name: "tests",
            message: "Tests:"
        },
        {
            type: "checkbox",
            name: "license",
            message: "Any license you want included from the below options:",
            choices: [
                "MIT",
                "GNU",
                "ISC",
                "IBM",
                "ODbL",
                "PDDL"
            ]
        },
        {
            type: "input",
            name: "username",
            message: "What's your Github username:"
        },
        {
            type: "input",
            name: "email",
            message: "Please provide your email address:"
        }
    ]).then(data => {


        //Information to build badges from licenses based on user input
        for (let i = 0; i < data.license.length; i++) {
            switch (data.license[i]) {
                case "MIT":
                    markdown_txt = `\n[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) \n`;
                    break;
                case "GNU":
                    markdown_txt = `\n[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) \n`;
                    break;
                case "ISC":
                    markdown_txt = `\n[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) \n`;
                    break;
                case "IBM":
                    markdown_txt = `\n[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0) \n`;
                    break;
                case "ODbL":
                    markdown_txt = `\n[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/) \n`;
                    break;
                case "PDDL":
                    markdown_txt = `\n[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/) \n`;
                    break;
                default:
                    break;
            }

            licenseBadges = licenseBadges + markdown_txt;
        }
        // Adding various sections of README in a particular order
        // Concatenate each section of README before writing to the ReADME file
        //Add Title
        let titleLine = `\n# ${data.title}`;
        //Add License Badge
        let license = titleLine + licenseBadges;
        //Add Table of Content
        let toc = license + tableOfContent;
        
        //Add Description and create link from TOC item to its respective section
        let descLine = 
        `\n${toc}
        \n<div id="description"/>
        \n## Description` +
        "\n```" +
        `\n${data.description}` +
        "\n```";
        
        //Add Install section
        let installLine = 
        `\n${descLine}
        \n<div id="install"/>
        \n## Installation Instruction` +
        "\n```" +
        `\n${data.installation}` +
        "\n```";
        
        //Add Usage section
        let usageLine = 
        `\n${installLine}
        \n<div id="usage"/>
        \n## Usage` +
        "\n```" +
        `\n${data.usage}` +
        "\n```";

        //Add Contribute section
        let contributeLine = 
        `\n${usageLine}
        \n<div id="contribute"/>
        \n## How to Contribute` +
        "\n```" +
        `\n${data.contribution}` +
        "\n```";

        //Add License
        let licenseLine = 
        `\n${contributeLine}
        \n<div id="license"/>
        \n## License` +
        "\n```" +
        `\n${data.license}` +
        "\n```";

        //Add test section
        let testLine = 
        `\n${licenseLine}
        \n<div id="tests"/>
        \n## Tests` +
        "\n```" +
        `\n${data.tests}` +
        "\n```";

        //Add question section with github URL and contact email address
        let questionLine = 
        `\n${testLine}
        \n<div id="questions"/>
        \n## Questions` +
        // "\n```" +
        `\nGitHub Repository: [[https://github.com/${data.username}/${data.username}.github.io]](https://github.com/${data.username}/${data.username}.github.io)` +
        `\n` +
        `\nPlease contact ${data.username} at [${data.email}](mailto:${data.email}?subject=Github) in case of any questions with the application or instruction.`;
        // "\n```";

        let outLine = questionLine;

        //Writing to README file
        fs.writeFile(filename, outLine, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("README file had been successfully generated!");
        });

    });



