import path from "node:path";

import { rspack, type SwcLoaderOptions } from "@rspack/core";
import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: {
    main: "./src/main.ts",
  },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?(j|t)s$/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            externalHelpers: true,
          },
        } satisfies SwcLoaderOptions,
        type: "javascript/auto",
      },
    ],
  },
  mode: "production",
  devtool: false,
  plugins: [new rspack.ProgressPlugin()],
});
