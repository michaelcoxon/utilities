/// <binding />
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './dist';
const libDir = 'lib';
const srcDir = 'src';
const libraryName = 'utilities';
//const tsNameof = require("ts-nameof");
/*
function StringExtractorPlugin() { }
StringExtractorPlugin.prototype.apply = function (compiler)
{
    console.log('StringExtractorPlugin');
    compiler.hooks.normalModuleFactory.tap('StringExtractorPlugin', factory =>
    {
        factory.hooks.parser.for('javascript/auto').tap('StringExtractorPlugin', (parser, options) =>
        {
            parser.hooks.varDeclaration.tap("StringExtractorPlugin", statement =>
            {
                if (statement.type === 'VariableDeclaration')
                {
                    console.log(statement);
                }
            });
        });
    });
};
*/
function DtsBundlePlugin() { }
DtsBundlePlugin.prototype.apply = function (compiler)
{
    compiler.plugin('done', function ()
    {
        var dts = require('dts-bundle');

        dts.bundle({
            name: libraryName,
            main: `${libDir}/index.d.ts`,
            out: `.${bundleOutputDir}/index.d.ts`,
            outputAsModuleFolder: true // to use npm in-package typings
        });
    });
};

module.exports = () =>
{
    const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
    const isDevBuild = !(env && env === 'production');

    return [{
        mode: isDevBuild ? 'development' : 'production',
        entry: { 'index': `./${srcDir}/index.ts` },
        resolve: { extensions: ['.ts'] },
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: `[name].js`,
            publicPath: 'dist/',
            library: libraryName,
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        externals: [
            /^tslib.*$/
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                                //plugins: ['@babel/plugin-transform-runtime']
                            }
                        },
                        'awesome-typescript-loader?configFileName=./src/config/esnext/tsconfig.json'
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        ecma: 5,
                        output: {
                            beautify: false,
                            comments: /^!/
                        }
                        /*mangle: {
                            properties: {
                                regex: /^_/
                            }
                        }*/
                    }
                })
            ]
        },
        plugins: [
            new CheckerPlugin(),
            //new StringExtractorPlugin(),
            ...(isDevBuild
                ?
                [
                    // Plugins that apply in development builds only
                ]
                :
                [
                    // Plugins that apply in production builds only
                    new DtsBundlePlugin()
                ])
        ]
    }];
};