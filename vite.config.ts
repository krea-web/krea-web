
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carica le variabili d'ambiente
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Iniezione statica della chiave API fornita per sbloccare la generazione immagini
      'process.env.API_KEY': JSON.stringify("AIzaSyBUvZC8NuYwzyHLZABxdUzbk3kTqCL41Mg")
    }
  };
});
