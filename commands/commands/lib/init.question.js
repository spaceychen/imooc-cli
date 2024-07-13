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
const defaultArguments = {
  transformer: (value) => value,
  validate: (value) => true,
};
module.exports = {
  getProjectType,
  getProjectName,
  getProjectDescription,
};
// 获取项目类型信息
async function getProjectType(opts) {
  const options = {
    message: "选择项目类型",
    choices: [
      { name: "project", value: "project", description: "业务项目" },
      { name: "component", value: "component", description: "组件项目" },
    ],
    default: "project",
  };

  return await select(options);
}
// 获取项目基本信息
async function getProjectName() {
  const { transformer, validate } = defaultArguments;
  const options = {
    message: "输入项目名称",
    default: "",
    transformer,
    validate,
  };

  return await input(options);
}
// 获取项目基本信息
async function getProjectDescription() {
  const { transformer, validate } = defaultArguments;
  const options = {
    message: "输入项目简介",
    default: "",
    transformer,
    validate,
  };

  return await input(options);
}
