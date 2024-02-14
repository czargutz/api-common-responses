import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve("src", "request.jsx"),
      name: "api-common-responses",
      fileName: (format) => `request.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 3000,
      protocol: "wss",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    dangerouslyIgnoreUnhandledErrors: true,
    sonarReporterOptions: { silent: true },
    setupFiles: "./setup.tests.jsx",
    coverage: {
      all: true,
      provider: "v8", // "istanbul"
      reporter: ["text", "json", "html", "lcov"],
      lines: 40,
      functions: 40,
      branches: 40,
      statements: 40,
      exclude: [".eslintrc.cjs", "src/main.jsx"],
    },
  },
});
