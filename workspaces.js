const fse = require('fs-extra')
const path = require('path')
const findUp = require('find-up')
const glob = require('glob')

const loadPackageJson = packagePath => {
  try {
    const packageObj = fse.readJsonSync(packagePath)
    return packageObj
  } catch (err) {
    throw err
  }
}

const getWorkspacesRootConfig = dir => {
  const packageJsonUp = findUp.sync('package.json', { cwd: dir })

  if (packageJsonUp === null) {
    return false
  }

  const packageObj = loadPackageJson(packageJsonUp)

  if (
    packageObj.workspaces &&
    (Array.isArray(packageObj.workspaces) || Reflect.has(packageObj.workspaces, 'packages'))
  ) {
    const workspacesRootConfig = {
      root: path.dirname(packageJsonUp),
      workspaces: packageObj.workspaces
    }
    return workspacesRootConfig
  }

  const dirUp = path.dirname(dir)
  return getWorkspacesRootConfig(dirUp)
}

const getPackagePaths = (root, workspacesList) => {
  const packageList = []

  workspacesList.forEach(workspace => {
    const workspaceDir = path.dirname(workspace)
    const workspaceAbsDir = path.join(root, workspaceDir)
    const packageJsonGlob = path.join('**!(node_modules)', 'package.json')

    const packageJsonAbsPaths = glob
      .sync(packageJsonGlob, { cwd: workspaceAbsDir })
      .map(pkgPath => path.join(workspaceAbsDir, pkgPath))

    packageJsonAbsPaths.forEach(path => {
      if (!packageList.includes(path)) {
        packageList.push(path)
      }
    })
  })

  return packageList
}

const init = cwd => {
  const workspacesRootConfig = getWorkspacesRootConfig(cwd)
  const packagePaths = getPackagePaths(workspacesRootConfig.root, workspacesRootConfig.workspaces.packages)

  const packages = []

  packagePaths.forEach(packagePath => {
    const packageJson = loadPackageJson(packagePath)

    const workspaceDir = path.dirname(packagePath)
    const src = packageJson['main:src']

    if (src && workspaceDir !== cwd) {
      packages.push(path.join(workspaceDir, src))
    }
  })

  console.log(`Found ${packages.length} package${packages.length > 1 ? 's' : ''}`)
  return packages
}

module.exports = {
  init
}
