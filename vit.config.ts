// vite.config.ts
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	build: {
		outDir: "dist",
		rollupOptions: {
			input: path.resolve(__dirname, "src/index.html"),
			output: {
				entryFileNames: "[name].js", // removes hash
				chunkFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
			},
		},
	},
});
