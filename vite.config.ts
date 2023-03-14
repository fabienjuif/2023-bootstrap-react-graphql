import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_COMMIT_HASH = execSync("git rev-parse --short HEAD")
    .toString()
    .slice(0, -1);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/query": "http://localhost:8080",
      },
    },
  };
});
