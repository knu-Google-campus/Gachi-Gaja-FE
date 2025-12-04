import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // envs 로드 from src/.env.* since root is set to 'src'
  const env = loadEnv(mode, path.resolve(__dirname, 'src'), '')
  const useProxy = env.VITE_USE_PROXY === 'true'
  const proxyPrefix = env.VITE_PROXY_PREFIX || '/backend'
  const proxyTarget = env.VITE_PROXY_TARGET

  // optional proxy config 빌드
  const proxy = useProxy
    ? {
        [proxyPrefix]: {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(new RegExp('^' + proxyPrefix), '/api'),
          // Strip Origin header, 프록싱 때 스프링의 cors 막기위해
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              try { proxyReq.removeHeader('origin') } catch {}
            })
          },
        },
      }
    : undefined

  return {
    root: 'src',
    plugins: [react(), tsconfigPaths()],
    // Ensure public assets are served from the project-level public/ folder
    publicDir: path.resolve(__dirname, 'public'),
    server: {
      port: 5173,
      open: true,
      proxy,
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
  }
})
