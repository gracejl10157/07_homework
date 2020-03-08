const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// map user answers from questions to
// object key names specified by "name"
// so they can be referenced later
// follows this format: https://github.com/SBoudrias/Inquirer.js/#questions
const questions = [
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "title",
    message: "What is your project's name?"
  },
  {
    type: "input",
    name: "description",
    message: "Please write a short description of your project"
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license should your project have?",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
  },
  {
    type: "input",
    name: "installation",
    message: "What command should be run to install dependencies?",
    default: "npm i"
  },
  {
    type: "input",
    name: "test",
    message: "What command should be run to run tests?",
    default: "npm test"
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?"
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing to the repo?"
  }
];

function writeToFile(fileName, data) {
  // write data to the path created from current working dir and file name
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  // ask questions
  inquirer
    .prompt(questions)
    // use answers
    .then(inquirerResponses => {
      console.log("Searching...");

      // use User's github handle to fetch their Github data using
      // the underlying Github API
      api.getUser(inquirerResponses.github).then(({ data }) => {
        // write file using Node file system
        writeToFile(
          "README.md",
          generateMarkdown({ ...inquirerResponses, ...data })
        );
      });
    });
}

// start program
init();
