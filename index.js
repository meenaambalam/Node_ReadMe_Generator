console.log("Hello! Welcome to ReadME Markdown generator \n");
const welcomeMsg = ` This utility will walk you through creating a README.md (markdown) file.
It only covers the most common items, and will save the information as you provide.
This utility or application requires "inquirer" npm module. 
Use 'npm install <pkg>' to install a package and save it as a dependency in the package.json file.
Press ^c at any time to quit.
`

console.log(welcomeMsg);

let fs = require("fs");
let inquirer = require("inquirer");
let filename = "README.md";
let licenseBadges = "";

let tableOfContent = 
`\n## Table of contents
\n1. [Description](#description)
\n2. [Install Guide](#install)
\n3. [Usage](#usage)
\n4. [Contribute](#contribute)
\n5. [license](#license)
\n6. [Tests](#tests)
\n7. [Questions](#questions)`;

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

        // data: {"title":"readme generator",
        //     "description":"app to generate readme from the command line run time node application",
        //     "installation":["inquirer"],
        //     "usage":""
        //     ,"contribution":"npm inquirer",
        //     "license":["MIT","ISC"]
        // } 
      
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

        let titleLine = `\n# ${data.title}`;

        let license = titleLine + licenseBadges;

        let toc = license + tableOfContent;

        let descLine = 
        `\n${toc}
        \n<div id="description"/>
        \n## Description` +
        "\n```" +
        `\n${data.description}` +
        "\n```";

        let installLine = 
        `\n${descLine}
        \n<div id="install"/>
        \n## Installation Instruction` +
        "\n```" +
        `\n${data.installation}` +
        "\n```";

        let usageLine = 
        `\n${installLine}
        \n<div id="usage"/>
        \n## Usage` +
        "\n```" +
        `\n${data.usage}` +
        "\n```";

        let contributeLine = 
        `\n${usageLine}
        \n<div id="contribute"/>
        \n## How to Contribute` +
        "\n```" +
        `\n${data.contribution}` +
        "\n```";

        let licenseLine = 
        `\n${contributeLine}
        \n<div id="license"/>
        \n## License` +
        "\n```" +
        `\n${data.license}` +
        "\n```";


        let testLine = 
        `\n${licenseLine}
        \n<div id="tests"/>
        \n## Tests` +
        "\n```" +
        `\n${data.tests}` +
        "\n```";

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

        fs.writeFile(filename, outLine, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("README file had been successfully generated!");
        });

        // fileLine = write(outLine);
        // console.log("README file had been successfully generated!");

        // function write(fileLine) {

        //     if (firstWrite) {
        //         fs.writeFile(filename, fileLine, function (err) {
        //             if (err) {
        //                 return console.log(err);
        //             }
        //             // console.log("Success!");
        //         });
        //         firstWrite = false;
        //     } else {
        //         fs.appendFile(filename, fileLine, function (err) {
        //             if (err) {
        //                 return console.log(err);
        //             }
        //             // console.log("Success!");
        //         });
        //     }

        // }


    });



