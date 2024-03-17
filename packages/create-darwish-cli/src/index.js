#! /usr/bin/env node
import inquirer from "inquirer";
import { Command } from "commander";
import Pack from "../package.json" assert { type: "json" };
const program = new Command();
program
    .name(Pack.name)
    .version(Pack.version)
    .helpOption("-h, --help", "Display help for command")
    .usage(`<command> [option]`)
    .command("choice")
    .action(function () {
    inquirer
        .prompt([
        {
            type: "checkbox",
            message: "Select toppings",
            name: "toppings",
            choices: [
                new inquirer.Separator(" = The Meats = "),
                {
                    name: "Pepperoni",
                },
                {
                    name: "Ham",
                },
                {
                    name: "Ground Meat",
                },
                {
                    name: "Bacon",
                },
                new inquirer.Separator(" = The Cheeses = "),
                {
                    name: "Mozzarella",
                    checked: true,
                },
                {
                    name: "Cheddar",
                },
                {
                    name: "Parmesan",
                },
                new inquirer.Separator(" = The usual ="),
                {
                    name: "Mushroom",
                },
                {
                    name: "Tomato",
                },
                new inquirer.Separator(" = The extras = "),
                {
                    name: "Pineapple",
                },
                {
                    name: "Olives",
                    disabled: "out of stock",
                },
                {
                    name: "Extra cheese",
                },
            ],
            validate(answer) {
                if (answer.length < 1) {
                    return "You must choose at least one topping.";
                }
                return true;
            },
        },
    ])
        .then((answers) => {
        console.log(JSON.stringify(answers, null, "  "));
    });
});
program.parse();
