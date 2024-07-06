/**
 * 动态加载命令模块
 */
const path = require("node:path");
const npminstall = require("npminstall");
const { getType } = require("@imoocli/util");
const { homedir } = require("node:os");
const fse = require("fs-extra");

module.exports = async function ({ config, program }, callback) {
  const { commands } = config;
  const type = getType(commands);
  let commandObjects = {};

  if (type === "array") {
    commands.forEach((item) => {
      const key = Object.keys(item)[0];
      commandObjects[key] = require(item[key]);
    });
  } else if (type === "string") {
    commandObjects = require(commands);
  } else throw new Error("commands must be array or string");

  callback(commandObjects);
};
