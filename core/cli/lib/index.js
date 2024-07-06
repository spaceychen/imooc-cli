"use strict";

const path = require("node:path");
const { homedir } = require("node:os");
const { program } = require("commander");
const semver = require("semver");
const dotenv = require("dotenv");
const colors = require("colors/safe");
const yaml = require("yaml");
const fse = require("fs-extra");

const { log, npminfo } = require("@imoocli/helper");
const { getType } = require("@imoocli/util");

const { name, description, version } = require("../package.json");
const { NAME, LOWEST_NODE_VERSION } = require("./const.js");
let config = require("./defaultConfig.js");
const exec = require("./exec.js");

module.exports = async (argv) => {
  try {
    checkPkgVersion({ name, version }); // 检查包版本
    checkNodeVersion(); // 检查nodejs版本
    await checkRoot(); // 检查root权限
    await checkUserHome(); // 检查用户目录
    checkEnv(); // 加载环境变量
    await loadConfig(process.cwd(), "config.yaml"); // 加载配置文件
    registerCommand(); // 注册脚手架命令
  } catch (e) {
    log.error(e);
  }
};

// 加载配置文件(用户配置文件需要在包根目录下)
// 如果是monorepo项目，则最多向上查找到root包
async function loadConfig(directory, filename) {
  const { findUp, findUpStop, pathExists } = await import("find-up");

  await findUp(
    async (directory) => {
      const hasPackageFile = await pathExists(
        path.join(directory, "package.json")
      );
      const hasConfigFile = await pathExists(path.join(directory, filename));

      if (hasPackageFile && hasConfigFile) {
        const filepath = path.join(directory, filename);
        let cfg = yaml.parse(fse.readFileSync(filepath, "utf-8"));
        Object.assign(config, cfg);
        console.log("配置文件已加载成功", filepath);
        return directory;
      }

      return null;
    },
    { cwd: directory, type: "directory" }
  );
}
// 检查包版本
function checkPkgVersion() {
  log.info(name, version);
}
// 检查node版本
function checkNodeVersion() {
  const currentVersion = process.version;
  if (semver.lte(currentVersion, LOWEST_NODE_VERSION))
    throw new Error(
      `Node.js版本太低，要求高于v${LOWEST_NODE_VERSION},当前v${currentVersion}`
    );
}
// 检查是否为root账户
async function checkRoot() {
  // uid为0 超级管理员
  // 权限降级（超级管理员创建的文件，别的用户甚至无法读写）
  const rootCheck = await import("root-check");
  rootCheck.default();
}
// 检查用户主目录
async function checkUserHome() {
  const dir = homedir();
  const { pathExists } = await import("path-exists");
  // 确保文件夹真实存在
  if (!dir || !(await pathExists(dir)))
    throw new Error("当前登陆用户的主目录不存在");
}
// 检查环境变量
async function checkEnv() {
  const { pathExists } = await import("path-exists");
  const filepath = path.resolve(homedir(), ".env");
  if (pathExists(filepath)) dotenv.config({ path: filepath });
}

// 注册脚手架命令
function registerCommand() {
  // 程序注册
  program
    .name(name)
    .description(description)
    .version(version)
    .option("-d,--debug", "调试模式", false)
    .option("--outdated");
  program.on("option:debug", function () {
    const { debug } = program.opts();
    process.env.LOG_LEVEL = debug ? "verbose" : "info";
    log.level = process.env.LOG_LEVEL;
  });

  // 命令注册（根据配置文件动态加载）
  exec({ config, program }, (commands) => {
    for (let key in commands) {
      program.addCommand(commands[key]);
    }
    program.parse();
  });
}
