import { rspack } from "@rspack/core";
import { defineConfig } from '@rspack/cli';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';

export default defineConfig({
    entry: {
        'electron-main': './src/main.ts',
    },
    target: 'electron36.3-main',
    output: {
        filename: '[name].js',
        path: 'dist',
    },
    optimization: {
        concatenateModules: false, // see readme
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "builtin:swc-loader",
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
        new rspack.ProgressPlugin(),
        new LicenseWebpackPlugin()
    ],
});
