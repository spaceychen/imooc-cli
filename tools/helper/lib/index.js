const path = require("node:path");
const log = require("./log.js");
const npminfo = require("./npm.js");

module.exports = { log, npminfo, getAbsPath };

function getAbsPath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}
// 兼容操作系统的路径分隔符
function getCompatiblePath(p) {
  if (process.platform === "win32") {
    return p.replace(/\\/g, "/");
  }
  return p;
}
