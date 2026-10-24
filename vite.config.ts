import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Blogger test: /api/blog -> the blog's public feed (functions/api/blog.js does this in production).
    proxy: {
      "/api/blog": {
        target: process.env.BLOGGER_URL || "https://onealgorithm-blog-test.blogspot.com",
        changeOrigin: true,
        rewrite: () => "/feeds/posts/default?alt=json&max-results=50",
      },
    },
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
        /* Same groups as before, matched by package path (fix round PERF-2). The
           object form listed modules by name, and the CommonJS proxy for
           react/jsx-runtime ("\0…?commonjs-es-import") is not that name, so it
           landed in the Radix `ui` chunk; with Radix Slot also in `ui` (site.tsx's
           Button uses it), every page loaded the 70 KB Radix chunk at High
           priority for the JSX runtime and one tiny component. Matching by path
           puts the proxy with React, and Slot (+ compose-refs) in `vendor`, so
           `ui` loads only on pages that use the other Radix primitives. */
        manualChunks(id: string) {
          const m = id.match(/node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)[\\/](?!.*node_modules)/);
          if (!m) return;
          const pkg = m[1].replace(/\\/g, "/");
          if (/^(react|react-dom|react-router|react-router-dom|scheduler|@remix-run\/router|@radix-ui\/react-slot|@radix-ui\/react-compose-refs)$/.test(pkg)) return "vendor";
          if (pkg.startsWith("@radix-ui/")) return "ui";
          if (/^(clsx|tailwind-merge|class-variance-authority)$/.test(pkg)) return "utils";
          if (pkg === "lucide-react") return "icons";
          if (/^(framer-motion|motion-dom|motion-utils)$/.test(pkg)) return "animation";
        },
        // Optimize file names for better caching
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        // ⛔ The CSS is fingerprinted like everything else. It used to be a
        // stable /assets/index.css so index.html could hand-write a preload
        // for it; that preload is gone (Vite injects the link itself), and the
        // stable name broke production on 2026-08-25: Cloudflare's zone-wide
        // Browser Cache TTL (4h) overrides any lower max-age from _headers, so
        // a returning visitor kept the OLD stylesheet for up to four hours
        // against the NEW HTML and saw an unstyled site. A hash in the name is
        // the only cache-busting that survives someone else's cache settings.
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    // Increase chunk size warning limit after optimization
    chunkSizeWarningLimit: 600,
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize CSS
    cssCodeSplit: true,
  },
  // Preview-only hero proposals (?hero=a|b, Codex review finding 5): compiled in only when the build runs with
  // OA_HERO_PROPOSALS=1, the same flag scripts/prerender.mjs uses; a production build drops the branch.
  define: { __OA_HERO_PROPOSALS__: JSON.stringify(!!process.env.OA_HERO_PROPOSALS) },
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


