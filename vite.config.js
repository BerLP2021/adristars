import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'IE >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
        ViteMinifyPlugin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                postcssPresetEnv({
                    stage: 1,
                }),
            ],
        },
    },
    // base: './',
    base: '/adristars/',
    build: {
        minify: 'terser',
    },

    server: {
        open: true,
        port: 5173,
        hmr: true,
    },
});
