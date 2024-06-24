// api: registry.npmjs.org/<pkgName>
const path = require("path");

async function getNpmInfo(pkgName, registry = "registry.npmjs.org") {
  if (!pkgName) return null;

  const response = await fetch(`http://${path.join(registry, pkgName)}`);
  return response.json();
}

async function getNpmVersions(pkgName, registry) {
  const data = await getNpmInfo(pkgName, registry);
  return data.versions;
}
module.exports = { getNpmInfo, getNpmVersions };
