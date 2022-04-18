import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remoteType:'commonjs',
      exposes: {
      },
      remotes:{
        remote: "http://localhost:4173/assets/remoteEntry.js",
      },
      shared: ['vue']
    }),
    createHtmlPlugin({
      inject: {
          // Inject data into ejs template
          data: {
              title:'remote',
          },
      },
  }),
  ],
  
  build: {
    target: "es2020", //  For non inline styles , The specification to be built is  es2020, Otherwise, the style will fail , The console gives a prompt
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
