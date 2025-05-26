import path from 'node:path';

import { LicenseWebpackPlugin } from 'license-webpack-plugin';

export default {
    entry: {
        'electron-main': './src/main.ts',
    },
    target: 'electron36.3-main',
    output: {
        filename: '[name].js',
        path: path.resolve(import.meta.dirname, 'dist'),
    },
    optimization: {
        concatenateModules: false, // see readme
        minimizer: [false], // disable terser extractComments because we only care about license-webpack-plugin
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "swc-loader",
                /** @type import('@rspack/core').SwcLoaderOptions */
                options: {
                    jsc: {
                        parser: {
                            syntax: "typescript"
                        },
                        externalHelpers: true,
                    },
                    env: {
                        targets: {
                            electron: 36,
                        },
                    },
                }
            },
        ],
    },
    mode: 'production',
    devtool: false,
    plugins: [
        new LicenseWebpackPlugin(),
    ],
};
