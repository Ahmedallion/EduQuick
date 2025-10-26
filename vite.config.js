import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        assetsInlineLimit: Infinity,
        lib: {
            entry: "src/index.js",
            name: "EduQuick",
            formats: ["iife"],
            fileName: () => "eduquick.min.js",
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});
