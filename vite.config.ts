
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), mode === 'development' && componentTagger()].filter(Boolean),
    server: {
      port: 8080
    }
  };
});
