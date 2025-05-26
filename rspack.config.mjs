import { rspack } from "@rspack/core";
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import { merge } from "webpack-merge";

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

const baseConfig = {
    output: {
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
            perChunkOutput: true,
            outputFilename: '[name].licence.txt', // this is already LicenseWebpackPlugin's default, included for explicitness
            licenseTextOverrides: {
                'is-thirteen': isThirteenLicense
            },
        })],
};

const mainConfig = {
    entry: {
        'electron-main': './src/main.ts',
    },
    target: 'electron36.3-main',
    output: {
        filename: 'electron-main.js',
    },
}

const preloadConfig = {
    entry: {
        'electron-preload': './src/preload.ts',
    },
    target: 'electron36.3-preload',
    output: {
        filename: 'electron-preload.js',
    },
}

export default [
    merge(baseConfig, mainConfig),
    merge(baseConfig, preloadConfig),
];
