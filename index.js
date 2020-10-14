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
        {   type: "input",
            name: "description",
            message: "Description: "
        },
        {
            type: "checkbox",
            name: "installation",
            message: "Please enter any Installation dependencies: ",
            choices: [
                "inquirer",
                "badmath",
                "moment",
                "npm"
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
            message: "Contribution"
        },
        {
            type: "checkbox",
            name: "license",
            message: "Choose a license from the below options:",
            choices: [
                "MIT",
                "Mozilla",
                "ISC",
                "IBM",
                "Open Database License",
                "PDDL"
            ]
        }
    ]).then(data=>{

        // data: {"title":"readme generator",
    //     "description":"app to generate readme from the command line run time node application",
    //     "installation":["inquirer"],
    //     "usage":""
    //     ,"contribution":"npm inquirer",
    //     "license":["MIT","ISC"]
    // } 
        outLine = `# ${data.title} \n \n` +

        `## Description \n` +
        "```\n" +  
        `${data.description} \n` +
        "```\n" +

        `## Installation \n` +
        "```\n"+
        `${data.installation} \n` +
        "```\n" +

        `## Usage \n` +
        "```\n" +
        `${data.usage} \n` +
        "```\n" +

        `## Contribution \n` + 
        "```\n" +
        `${data.contribution} \n` +
        "```\n" +

        `## License \n` + 
        "```\n" +
        `${data.license} \n` +
        "```\n" ;

        fileLine = write(outLine);
        
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

        function write(fileLine){

            if (firstWrite) {
                fs.writeFile(filename, fileLine, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log("Success!");
                });
                firstWrite = false;
            } else {
                fs.appendFile(filename, fileLine, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                    // console.log("Success!");
                });
            }
        
        }


    });

    
    
//title, description,  installation, usage, contribution


