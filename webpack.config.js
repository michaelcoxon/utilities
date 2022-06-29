const path = require('path');
const bundleAnalyzer = require('webpack-bundle-analyzer');

const bundleOutputDir = './dist';
const libDir = 'lib';
const libraryName = 'utilities';

const lastDirName = path.basename(__dirname);
const bundleAnalyzerDropPath = path.join(__dirname, 'temp', 'stats');


module.exports = () =>
{
    const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
    const isDevBuild = !(env && env === 'production');

    return [{
        mode: isDevBuild ? 'development' : 'production',
        entry: { 'index': `./${libDir}/index.js` },
        resolve: {
            //extensions: ['.js'] ,
            fallback: { "crypto": false }
        },
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: `[name].js`,
            //publicPath: 'dist/',
            library: libraryName,
            //libraryTarget: 'umd',
            //globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js(on)?$/,
                    include: /lib/,
                }
            ]
        },

        plugins: [
            new bundleAnalyzer.BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'static',
                reportFilename: path.join(bundleAnalyzerDropPath, `${lastDirName}.stats.html`),
                generateStatsFile: true,
                statsFilename: path.join(bundleAnalyzerDropPath, `${lastDirName}.stats.json`),
                logLevel: 'error'
              }),

            ...(isDevBuild
                ?
                [
                    // Plugins that apply in development builds only
                ]
                :
                [
                    // Plugins that apply in production builds only
                ])
        ]
    }];
};