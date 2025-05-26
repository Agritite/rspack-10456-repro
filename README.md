# What
* https://github.com/web-infra-dev/rspack/issues/10475

# How
1. `pnpm i`
2. `pnpm run build-with-rspack`
3. see `dist/[name].license.txt` [sic]
4. `pnpm run clean`
5. `pnpm run build-with-webpack`
6. see `dist/[chunkid].license.txt`

# Why

license-webpack-plugin can't handle esm modules when it's concatenated with `concatenateModules: true`, see
here: https://github.com/xz64/license-webpack-plugin/issues/116
For example, see `nanoid` and `lodash-es` imported in this project.
(These two modules are not subject of this issue; they're simply included for comparison)

However, `node-fetch`, being an esm module, has its license emitted even when `concatenateModules: true`;
I'm not familiar with this but my guess is that `node-fetch` is too large? Perhaps that's why `node-fetch`
is in it's own chunk. Anyway, in this case, `rspack` cannot correctly replace `[name]` with it's corresponding 
chunk id, while `webpack` can.
