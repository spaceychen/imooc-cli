#!/usr/bin/env node

const {
  input,
  select,
  Separator,
  checkbox,
  confirm,
  password,
  expand,
  editor,
  number,
  rawlist,
} = require("@inquirer/prompts");

async function main() {
  const _rawlist = await rawlist({
    message: "Select a package manager",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" },
    ],
  });
  const _password = await password(
    {
      message: "Enter your name",
      mask: true,
    },
    { clearPromptOnDone: true }
  );
  const _number = await number({ message: "Enter your age", min: 10, max: 20 });
  const _editor = await editor({
    message: "Enter a description",
  });
  const _expand = await expand({
    message: "Conflict on file.js",
    default: "y",
    expanded: true,
    choices: [
      {
        key: "y",
        name: "Overwrite",
        value: "overwrite",
      },
      {
        key: "a",
        name: "Overwrite this one and all next",
        value: "overwrite_all",
      },
      {
        key: "d",
        name: "Show diff",
        value: "diff",
      },
      {
        key: "x",
        name: "Abort",
        value: "abort",
      },
    ],
  });
  console.log(_password);
  const _confirm = await confirm({ message: "Continue?" });
  const _checkbox = await checkbox({
    message: "Select a package manager",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      new Separator(),
      { name: "pnpm", value: "pnpm", disabled: true },
      {
        name: "pnpm",
        value: "pnpm",
        disabled: "(pnpm is not available)",
      },
    ],
  });
  const _select = await select({
    message: "Select a package manager",
    choices: [
      {
        name: "npm",
        value: "npm",
        description: "npm is the most popular package manager",
      },
      {
        name: "yarn",
        value: "yarn",
        description: "yarn is an awesome package manager",
      },
      // new Separator(),
      {
        name: "jspm",
        value: "jspm",
        disabled: true,
      },
      {
        name: "pnpm",
        value: "pnpm",
        disabled: "(pnpm is not available)",
      },
    ],
  });
  const _input = await input({ message: "Enter your name" });
}
main();
