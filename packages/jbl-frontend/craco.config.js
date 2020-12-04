/* eslint-disable @typescript-eslint/no-var-requires */

const { loaderByName, addBeforeLoader, getLoaders } = require('@craco/craco')
const cracoLerna = require('../../craco-lerna')
const { init } = require('../../workspaces')

const packages = init(process.cwd())

module.exports = {
  plugins: [
    {
      plugin: cracoLerna,
      options: {
        packages: packages
      }
    },
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
          if (typeof cracoConfig.eslint.enable !== 'undefined') {
            cracoConfig.disableEslint = !cracoConfig.eslint.enable
          }
          delete cracoConfig.eslint
          return cracoConfig
        },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
          if (typeof cracoConfig.disableEslint !== 'undefined' && cracoConfig.disableEslint === true) {
            webpackConfig.plugins = webpackConfig.plugins.filter(
              instance => instance.constructor.name !== 'ESLintWebpackPlugin'
            )
          }
          return webpackConfig
        }
      }
    }
  ],
  webpack: {
    configure: webpackConfig => {
      const jsonConfigLoader = {
        type: 'javascript/auto',
        loader: require.resolve('file-loader'),
        test: /config\.json$/,
        options: {
          name: '[name].[ext]'
        }
      }

      addBeforeLoader(webpackConfig, loaderByName('url-loader'), jsonConfigLoader)

      const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName('file-loader'))

      if (hasFoundAny) {
        matches.forEach(x => {
          x.loader.options.esModule = false
        })
      }

      return webpackConfig
    }
  }
}
