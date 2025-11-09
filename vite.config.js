import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  root: 'src',
  plugins: [react(), tsconfigPaths()],
  // Ensure public assets are served from the project-level public/ folder
  publicDir: path.resolve(__dirname, 'public'),
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
