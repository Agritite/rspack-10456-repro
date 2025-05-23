import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { LicenseWebpackPlugin } from 'license-webpack-plugin';

const isThirteenLicense =
    '            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE\r\n' +
    '                    Version 2, December 2004\r\n' +
    '\r\n' +
    ' Copyright (C) 2004 Jezen Thomas <jezen@jezenthomas.com>\r\n' +
    '\r\n' +
    ' Everyone is permitted to copy and distribute verbatim or modified\r\n' +
    ' copies of this license document, and changing it is allowed as long\r\n' +
    ' as the name is changed.\r\n' +
    '\r\n' +
    '            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE\r\n' +
    '   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION\r\n' +
    '\r\n' +
    '  0. You just DO WHAT THE FUCK YOU WANT TO.\r\n';

export default defineConfig({
    entry: [
        './src/main.ts'
    ],
    target: 'electron36.3-main',
    output: {
        filename: 'electron-main.js',
        path: 'dist',
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
        new LicenseWebpackPlugin({
            perChunkOutput: false,
            outputFilename: '[name].licence.txt',
            licenseTextOverrides: {
                'is-thirteen': isThirteenLicense
            },
        })],
});
