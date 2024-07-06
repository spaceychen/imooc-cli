module.exports = { getType };

function getType(val) {
  const typeString = Object.prototype.toString.call(val);
  return typeString.slice(8, -1).toLowerCase();
}
// 兼容操作系统的路径分隔符
function getCompatiblePath(p) {
  if (typeof p !== "string") return null;
  if (p && p.indexOf("\\") !== -1) {
    return p.replace(/\\/g, "/");
  }
  return p;
}
