import { defineConfig } from "@solidjs/start/config";
import Icons from "unplugin-icons/vite"

export default defineConfig({
    vite: {
        optimizeDeps: {
            exclude: ["solid-icons"],
        },
        plugins: [
            Icons({
                compiler: 'jsx',
                jsx: 'preact',
            })
        ]
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