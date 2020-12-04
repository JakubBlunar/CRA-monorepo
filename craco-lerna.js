const path = require('path')

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    const packages = pluginOptions.packages || []
    webpackConfig.module.rules.forEach(r => {
      if (r.oneOf) {
        r.oneOf.forEach(o => {
          if (
            typeof o.include === 'string' &&
            typeof o.loader === 'string' &&
            o.loader.endsWith(path.join('node_modules', 'babel-loader', 'lib', 'index.js'))
          ) {
            console.log('Adding packages to webpack:')
            o.include = packages.reduce(
              (acc, p) => {
                console.log(`  * Added ${p}`)
                acc.push(p)
                return acc
              },
              [o.include]
            )
          }
        })
      }
    })

    return webpackConfig
  }
}
