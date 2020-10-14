console.log("Hello! Welcome to ReadME Markdown generator \n");
const welcomeMsg = ` This utility will walk you through creating a README.md (markdown) file.
It only covers the most common items, and will save the information as you provide.

This utility or application requires "inquirer" npm module. 

Use 'npm install <pkg>' to install a package and save it as a dependency in the package.json file.

Press ^C at any time to quit.
`

console.log(welcomeMsg);

let fs = require("fs");
let inquirer = require("inquirer");

let fileLine;
let filename = "README.md";
let firstWrite = true;

inquirer.prompt(
    [
        {
            type: "input",
            name: "title",
            message: "Please enter the title of the Project:"
        },
        {
            type: "input",
            name: "description",
            message: "Description: "
        },
        {
            type: "checkbox",
            name: "installation",
            message: "Please enter any Installation dependencies: ",
            choices: [
                "inquirer",
                "moment"
            ]
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
            message: "Choose a license from the below options:",
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
            name: "Questions",
            message: "Questions:"
        },
    ]).then(data => {

        // data: {"title":"readme generator",
        //     "description":"app to generate readme from the command line run time node application",
        //     "installation":["inquirer"],
        //     "usage":""
        //     ,"contribution":"npm inquirer",
        //     "license":["MIT","ISC"]
        // } 

        console.log("license length:" + data.license.length + " licenses: " + data.license[0]);

        let licenseBadges = getbadges(data.license);

        function getbadges(licenses) {
            console.log ("get badge function called");
            let final_license_markdown;
            for (let i = 0; i < licenses.length; i++) {
                switch (licenses[i]) {
                    case "MIT":
                        markdown_txt = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
                        break;
                    case "GNU":
                        markdown_txt = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
                        break;
                    case "ISU":
                        markdown_txt = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
                        break;
                    case "IBM":
                        markdown_txt = `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`;
                        break;
                    case "ODbL":
                        markdown_txt = `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)`;
                        break;
                    case "ODbL":
                        markdown_txt = `[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)`;
                        break;
                    default:
                        break;
                }
                console.log("mardown text:" + markdown_txt);
                final_license_markdown = `${final_license_markdown} \n ${markdown_txt} \n`;
                return final_license_markdown;
            }
        }

        console.log("badges: " + licenseBadges);

        let tableOfContent = `## Table of contents \n
        1. ![Description](#description)\n
        2. ![Install Guide](#install)\n        
        3. [Usage](#usage)\n
        4. [Contribute](#contribute)\n
        5. [license](#license)\n
        6. [Tests](#tests)\n`;



        let titleLine = `# ${data.title} \n \n`;

        let toc = titleLine + licenseBadges + tableOfContent;

        let descLine = toc +
            `## Description <a name="description"></a>\n` +
            "```\n" +
            `${data.description} \n` +
            "```\n";

        let installLine = descLine +
            `## Installation Instruction <a name="install"></a>\n` +
            "```\n" +
            `${data.installation} \n` +
            "```\n";

        let usageLine = installLine +
            `## Usage <a name="usage"></a> \n` +
            "```\n" +
            `${data.usage} \n` +
            "```\n";

        let contributeLine = usageLine +
            `## How to Contribute <a name="contribute"></a> \n` +
            "```\n" +
            `${data.contribution} \n` +
            "```\n";

        let licenseLine = contributeLine +
            `## License <a name="license"></a> \n` +
            "```\n" +
            `${data.license} \n` +
            "```\n";


        let testLine = licenseLine +
            `## Tests <a name="tests"></a>\n` +
            "```\n" +
            `${data.tests} \n` +
            "```\n";

        let outLine = testLine;

        fileLine = write(outLine);

        getbadges(data.license);

        function getbadges(licenses) {
            for (let i = 0; i < licenses.length; i++) {
                switch (licenses[i]) {
                    case "MIT":
                        markdown_txt = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
                        break;

                    default:
                        break;
                }

            }
        }

        // fileLine = write(`# ${data.title}\n`);

        // fileLine = write(`## Description \n`);
        // fileLine = write("```\n");
        // fileLine = write(`${data.description} \n`);
        // fileLine = write("```\n");

        console.log("README file had been successfully generated!");

        // fs.writeFile(filename,JSON.stringify(data, null, '\n'), function(err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("Success!");
        // });

        function write(fileLine) {

            if (firstWrite) {
                fs.writeFile(filename, fileLine, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log("Success!");
                });
                firstWrite = false;
            } else {
                fs.appendFile(filename, fileLine, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log("Success!");
                });
            }

        }


    });



//title, description,  installation, usage, contribution


