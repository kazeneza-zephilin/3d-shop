import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            // Enable Fast Refresh
            fastRefresh: true,
        }),
        tailwindcss(),
    ],
    build: {
        // Enable source maps for debugging in production
        sourcemap: false,
        // Reduce chunk size for better loading
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate vendor chunks
                    vendor: ["react", "react-dom"],
                    three: ["three", "@react-three/fiber", "@react-three/drei"],
                    motion: ["framer-motion"],
                    ui: ["react-color", "valtio"],
                },
            },
        },
        // Enable minification
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs in production
                drop_debugger: true,
            },
            mangle: {
                safari10: true,
            },
        },
    },
    server: {
        // Enable HMR
        hmr: true,
        port: 5173,
        // Proxy API requests to backend in development
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    optimizeDeps: {
        // Pre-bundle dependencies for faster dev startup
        include: [
            "react",
            "react-dom",
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "framer-motion",
            "react-color",
            "valtio",
        ],
    },
    esbuild: {
        // Remove console.logs in development as well if desired
        // drop: ['console', 'debugger'],
    },
});
