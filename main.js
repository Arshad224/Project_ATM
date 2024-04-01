#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 10000;
let pinCode = 4321; // Changed PIN code for security
let transactions = [];
async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your PIN code",
            type: "number" // Removed password type
        }
    ]);
    if (pinAnswer.pin === pinCode) {
        console.log("Correct PIN code");
        while (true) {
            let operationAns = await inquirer.prompt([
                {
                    name: "operation",
                    message: "Please select an option",
                    type: "list",
                    choices: ["Withdraw", "Deposit", "Check Balance", "Transaction History", "Exit"]
                }
            ]);
            if (operationAns.operation === "Withdraw") {
                let amount = await inquirer.prompt([
                    {
                        name: "withdrawAmount",
                        message: "Enter amount to withdraw",
                        type: "number",
                        validate: function (value) {
                            if (value <= myBalance) {
                                return true;
                            }
                            return "Auqaat se zada pese ni likhtay beta";
                        }
                    }
                ]);
                myBalance -= amount.withdrawAmount;
                transactions.push({ type: "Withdrawal", amount: amount.withdrawAmount });
                console.log("Withdrawal successful. Remaining balance: " + myBalance);
            }
            else if (operationAns.operation === "Deposit") {
                let amount = await inquirer.prompt([
                    {
                        name: "depositAmount",
                        message: "Enter amount to deposit",
                        type: "number",
                        validate: function (value) {
                            if (value > 0) {
                                return true;
                            }
                            return "Amount must be positive";
                        }
                    }
                ]);
                myBalance += amount.depositAmount;
                transactions.push({ type: "Deposit", amount: amount.depositAmount });
                console.log("Deposit successful. Updated balance: " + myBalance);
            }
            else if (operationAns.operation === "Check Balance") {
                console.log("Your balance: " + myBalance);
            }
            else if (operationAns.operation === "Transaction History") {
                console.log("Transaction History:");
                transactions.forEach(transaction => {
                    console.log(transaction.type + ": " + transaction.amount);
                });
            }
            else if (operationAns.operation === "Exit") {
                console.log("Exiting...");
                break;
            }
        }
    }
    else {
        console.log("nasheri ankhein khol k code likh");
    }
}
main();
