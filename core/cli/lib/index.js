"use strict";

const path = require("path");
const { homedir } = require("os");
const semver = require("semver");
const minimist = require("minimist");
const dotenv = require("dotenv");
const colors = require("colors/safe");
const { log, npminfo } = require("@imoocli/helper");

const pkg = require("../package.json");
const { LOWEST_NODE_VERSION } = require("./const.js");

module.exports = async (argv) => {
  try {
    checkPkgVersion();
    checkNodeVersion();
    await checkRoot();
    await checkUserHome();
    checkInputArgs(argv);
    checkEnv();
    await checkGlobalUpdate();
  } catch (e) {
    log.error(e.message);
  }
};

// 检查包版本
function checkPkgVersion() {
  log.info("cli", pkg.version);
}
// 检查node版本
function checkNodeVersion() {
  const currentVersion = process.version;
  if (semver.lte(currentVersion, LOWEST_NODE_VERSION))
    throw new Error(
      `Node.js版本要求最低v${LOWEST_NODE_VERSION},当前${currentVersion}`
    );
}
// 检查是否为root账户
// 是的话权限降级（超级管理员创建的文件，别的用户甚至无法读写）
async function checkRoot() {
  // uid为0 超级管理员
  const rootCheck = await import("root-check");
  rootCheck.default();
}
// 检查用户主目录
async function checkUserHome() {
  const dir = homedir();
  const { pathExists } = await import("path-exists");
  // 第二个条件确保文件夹是真实存在的
  if (!dir || !(await pathExists(dir)))
    throw new Error("当前登陆用户的主目录不存在");
}
// 检查入参
function checkInputArgs(argv) {
  const args = minimist(argv);
  process.env.LOG_LEVEL = args.debug ? "verbose" : "info";
  log.level = process.env.LOG_LEVEL; // 动态修改
}
// 检查环境变量
async function checkEnv() {
  const { pathExists } = await import("path-exists");
  const filepath = path.resolve(homedir(), ".env");
  if (pathExists(filepath))
    dotenv.config({
      path: filepath,
    });
}
// 保持最新版本
async function checkGlobalUpdate() {
  // 1.获取当前模块名和当前版本号
  // 2.调用npm平台的api，versions属性中可以拿到所有版本号
  const versions = await npminfo.getNpmVersions(pkg.name);
  const keys = Object.keys(versions).sort((a, b) => (semver.gt(a, b) ? -1 : 1));
  // 3.提示用户更新到最新版
  if (pkg.version >= keys[0]) return;
  const text = colors.bold("建议更新：");
  const currentVersion = pkg.version;
  const latestVersion = keys[0];
  log.warn(`${text}v${currentVersion} --> v${latestVersion}`);
}
