import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/lib/index.tsx"),
            name: "index",
            fileName: "index",
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
        commonjsOptions: {
            esmExternals: ["react"],
        },
        cssCodeSplit: true,
    },
    plugins: [dts(), cssInjectedByJsPlugin()],
});
