import { rspack } from "@rspack/core";
import { defineConfig } from '@rspack/cli';

export default defineConfig({
    entry: {
        'electron-main': './src/main.ts',
    },
    target: 'electron38.2-main',
    output: {
        filename: '[name].js',
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
                            electron: 38,
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
    ],
});
