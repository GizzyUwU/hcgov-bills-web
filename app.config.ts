import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    vite: {
        optimizeDeps: {
            exclude: ["solid-icons"],
        },
    },
    server: {
        preset: "vercel",
        vercel: {
            functions: {
                runtime: "bun1.x"
            }
        }
    }
});