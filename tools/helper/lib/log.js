const log = require("npmlog");

// TODO
log.level = process.env.LOG_LEVEL || log.level;
log.heading = "imoocli";
log.headingStyle = { fg: "red", bg: "black" };

log.addLevel("success", 2000, { fg: "green", bold: true });

module.exports = log;
