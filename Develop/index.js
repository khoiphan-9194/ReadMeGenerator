//  Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateReadme =require('./utils/generateMarkdown.js');
const { writeFile } = require('fs').promises;
// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'

    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a short description of your project here:'

    },
    {
        type: "input",
        name: "repo",
        message: "Enter the name of your application Github repository."
    },

    {
        type: 'input',
        name: 'installation',
        message: 'How is your software installed?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is your software used?'
    },
    {
        type: 'checkbox',
        name: 'languageBuilt',
        message: 'Please select the technologies that your application was built with.',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js', 'Express.js'],
        default: 0,
    }, 
    {
        type: 'list',
        name: 'license',
        message: "What kind of license does your project have?",
        choices: ['MIT', 'GPLv3', 'Apache', 'ISC'],
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'Where can people contribute to this project?'
    },
   
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub user name?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },
    {
        type: 'confirm',
        name: 'AddScreenshot',
        message: 'Would you like to add a screenshot?',
        default: false
    },


];

//this will be triggered if user want to add screenshots from the previous inquirer prompt
const screenshotQues = 
[
    {
        type: 'input',
        name: 'screenshotLink',
        message: 'Please provide a link for your screenshot. (Required)',

    },

    {
        type: 'confirm',
        name: 'extraScreenShot',
        message: 'Would you like to add another screenshot?',
        default: false
        

    },

];

// function to prompt user input answers
const  promptUser = (dataInquiry) => {
    return  inquirer.prompt(dataInquiry);
  };
  



// this is the main function that init the node
const init = () => {
    promptUser(questions) // function call to ask user input the value from the readme generator
      .then(function(answers) { // this will return a promise
        let answerWithScreen;
       if (answers.AddScreenshot) //if last question is true, the user will be prompted to questions ask to add screenshots
       {
        
        addScreenshots(screenshotQues).then(() => {
            answerWithScreen ={...answers,...screenshotQues}; //spread operators used to merge 2 object togetther
            console.log(answerWithScreen)
                    writeFile('README.md',generateReadme.generateMarkdown(answerWithScreen))
            .then(() => console.log('Successfully wrote README.md with screenshot'))
            .catch((err) => console.error(err));
      
          });
          
       }
       else // if not write gile without screenshots
       writeFile('README.md',generateReadme.generateMarkdown(answers)) 
       .then(() => console.log('Successfully wrote README.md'))
       .catch((err) => console.error(err));
       
      })


        
  };





// recursive function for adding screenshots
async function addScreenshots (readmeData)  {
    
    // initiates screenshot array
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
 
    return  await inquirer.prompt(readmeData)
    .then(screenshotData => {
        // adds the screenshot to the array
        readmeData.screenshots.push(screenshotData.screenshotLink);
        // will call addScreenshots again based on user input
        if (screenshotData.extraScreenShot) {
            return addScreenshots(readmeData);
        } else {
          //  console.log(readmeData.screenshots);
        };
    });
};

  
  init();


 

