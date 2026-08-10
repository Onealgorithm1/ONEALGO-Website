import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // index.html lives at the repo root, so the root entry point has to be
      // readable too - without it `npm run dev` answers 403 Restricted before
      // it ever gets to the app. Only the file is allowed, not the directory.
      allow: ["./client", "./shared", "./index.html"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries for better caching
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-slot",
          ],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
          icons: ["lucide-react"],
          animation: ["framer-motion"],
        },
        // Optimize file names for better caching
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: (chunkInfo) => {
          const ext = chunkInfo.name?.split(".").pop();
          if (ext === "css") return "assets/[name].[ext]";
          return "assets/[name].[hash].[ext]";
        },
      },
    },
    // Increase chunk size warning limit after optimization
    chunkSizeWarningLimit: 600,
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize CSS
    cssCodeSplit: true,
  },
  plugins: [
    react(),
    // Written outside dist/spa. Everything in that directory is uploaded to
    // Cloudflare and served publicly, so this was downloadable at
    // /bundle-analysis.html - 1.9MB of JSON naming every source file, every
    // dependency and its size. A free map of the codebase for anyone who asked.
    visualizer({
      filename: "build-artifacts/bundle-analysis.json",
      open: false,
      gzipSize: true,
      brotliSize: true,
      json: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      // Force all React imports to the single copy in node_modules
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
    // Ensure only a single React instance is bundled at runtime
    dedupe: ["react", "react-dom"],
  },
  ssr: {
    // Prevent SSR build from externalizing react, ensuring same instance
    noExternal: ["react", "react-dom"],
  },
  // Improve dependency optimization to pre-bundle React packages
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: [],
  },
}));


