// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// const withTM = require('next-transpile-modules')(['react-icons']); // pass the modules you would like to see transpiled
//
// module.exports = withTM();

require('dotenv').config();

module.exports = {
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
    },
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     if (process.env.ANALYZE) {
    //         config.plugins.push(
    //             new BundleAnalyzerPlugin({
    //                 analyzerMode: 'server',
    //                 analyzerPort: isServer ? 8888 : 8889,
    //                 openAnalyzer: true,
    //             })
    //         )
    //     }
    //     return config
    // },
}
