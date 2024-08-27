import inquirer from "inquirer";

import chalk from "chalk";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000 );

let myBalance: number = 0

let answer = await inquirer.prompt(
    [
        {
            name: "student",
            type: "input",
            message: "Enter student name",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return chalk.red("Please enter your name!");
            }
        },
        {
            name: "cources",
            type: "list",
            message: "Select the course to enrolled",
            choices: ["MS.Office","HTML","CSS","Typescript","Javascript","Python"]
        }
    ]
)

const tutionFee: {[key: string]: number} = {
    "MS.Office": 2500,
    "HTML": 3000,
    "CSS": 4000,
    "Typescript": 6000,
    "Javascript": 7000,
    "Python": 10000
}

console.log(chalk.blue("\nTution Fees: ")+ tutionFee[answer.cources]);

console.log(chalk.blue("\nBalance: ")+ myBalance);

let paymentType = await inquirer.prompt(
    [
        {
            name: "payment",
            type: "list",
            message: "Select payment method",
            choices: ["Easypaisa","Jazzcash","Bank transfer"]
        }])

console.log(chalk.green(`\nYou select paymet method ${paymentType.payment}\n `));

let paymentTypes = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: "Transfer money",
            validate: function (value) {
                if (value.trim() !== ""){
                    return true
                }
                return chalk.red("Please enter a non-empty value.")
            }
        }
    ]
);

// console.log(`\nYou select paymet method ${paymentType.payment} `);

const tutionFees = tutionFee[answer.cources];
const paymentAmount = parseFloat(paymentTypes.amount);

if (tutionFees === paymentAmount) {
    console.log(chalk.green(`\nCongratulations, You've Successfully enrolled in ${answer.cources}.\n`));

let ans = await inquirer.prompt(
    [
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["Check Status","Exit"]
        }
    ]
)    
let paymentbalance = myBalance += paymentAmount
if (ans.select === "Check Status"){
    console.log(chalk.yellow("\n\t CHECK STATUS \t\n"));
    console.log(chalk.blue("Student Name: ")+ answer.student);
    console.log(chalk.blue("Student ID: ")+ randomNumber);
    console.log(chalk.blue("Course: ")+ answer.cources);
    console.log(chalk.blue("Tution Fees Paid: ")+ paymentAmount);
    console.log(chalk.blue("Balance: ")+ paymentbalance);

} else {
    console.log(chalk.yellow("\n\t Exiting Student Management System \t\n"));
}
} else {
    console.log(chalk.red("Invalid amount due to course!\n"));
}