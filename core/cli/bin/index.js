#!/usr/bin/env node

const importLocal = require("import-local");
const { log } = require("@imoocli/helper");

const isLocalPkg = importLocal(__filename);
if (isLocalPkg) {
  // 同时存在global和local依赖包时，global的逻辑
  log.info("Using local version of this package!");
} else {
  // 1.仅存在global依赖包时,global的逻辑
  // 2.同时存在global和local依赖包时，local的逻辑
  // 3.其他剩余情况
  require("../lib")(process.argv.slice(2));
}
