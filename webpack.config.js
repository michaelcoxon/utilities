
const path = require('path');
const bundleOutputDir = './dist';
const libDir = 'lib';
const libraryName = 'utilities';

module.exports = () =>
{
    const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
    const isDevBuild = !(env && env === 'production');

    return [{
        mode: isDevBuild ? 'development' : 'production',
        entry: { 'index': `./${libDir}/index.js` },
        resolve: { extensions: ['.js'] },
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: `[name].js`,
            publicPath: 'dist/',
            library: libraryName,
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /lib/,
                }
            ]
        },

        plugins: [
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