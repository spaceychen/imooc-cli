// npm包的操作类对象
const npminstall = require("npminstall");
class Package {
  constructor(options = {}) {
    const { name, version, targetPath, storePath, registry } = options;
    this.name = name;
    this.version = version || "latest";
    this.targetPath = targetPath;
    this.storeDir = storePath;
    this.registry = registry || "https://registry.npmjs.org";
  }
  // 安装package
  install() {
    npminstall({
      root: this.targetPath,
      storeDir: this.storePath,
      registry: this.registry,
      pkgs: [
        {
          name: this.name,
          version: this.version,
        },
      ],
    });
  }
  // 更新package
  update() {}
  // 获取入口文件的路径
  getEntry() {
    // 1，获取package.json所在目录
    // 2，读取package.json
    // 3，获取main字段的值
    // 4，路径的在各个系统下的兼容性（mac/windows)
    return "";
  }
}

module.exports = Package;
