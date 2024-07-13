const { Command } = require("commander");

const program = new Command();
const {
  getProjectType,
  getProjectName,
  getProjectDescription,
} = require("./init.question.js");

program
  .name("init")
  .description("初始化项目")
  .argument("[projectName]", "项目名称")
  .option("-f,--force", "强制初始化项目", false)
  .option("-g,--group", "强制初始化项目", false)
  .alias("t")
  .action(async (programName = "Unnamed-project", force, commandObject) => {
    // prepare stage
    const projectType = await getProjectType();
    const projectName = await getProjectName(programName);
    const projectDescription = await getProjectDescription();
    // use template
    // TODO: use template to init
    console.log({ projectType, projectName, projectDescription });
  });
program.on("option:force", function () {
  console.log("force", program.opts().force);
});
program.on("option:group", function () {
  console.log("group", program.opts().force);
});
module.exports = program;
// 观察到回调的处理顺序：先处理命令选项，然后处理命令参数
// 命令选项的处理顺序：命令行从左到右的顺序
