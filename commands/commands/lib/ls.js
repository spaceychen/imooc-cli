const { Command } = require("commander");

const program = new Command();

// 此命令作为链接命令，指向全局命令
// 可以作为工具链的外部连接
program
  .name("ls")
  .description("ls description")
  .argument("[name]", "descriptions")
  .command("*", "ls description", {
    isDefault: true,
    hidden: true,
    noHelp: true,
    executableFile: "ls",
  });

module.exports = program;
