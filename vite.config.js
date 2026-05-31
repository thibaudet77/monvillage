import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    open: true,
    host: true // Permet l'accès réseau local pour tests (ex. : mobile)
  },
  build: {
    outDir: 'dist',
    sourcemap: true // Facilite le débogage en prod
  },
  base: '/' // Ajustez si déploiement dans un sous-dossier
})