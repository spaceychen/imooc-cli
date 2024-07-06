// api: registry.npmjs.org/<pkgName>

async function getNpmInfo(pkgName, registry = "registry.npmjs.org") {
  if (!pkgName) return null;

  try {
    const response = await fetch(`https://${registry}/${pkgName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching package info:", error);
    return null;
  }
}

async function getNpmVersions(pkgName, registry) {
  const data = await getNpmInfo(pkgName, registry);
  return data.versions;
}
module.exports = { getNpmInfo, getNpmVersions };
