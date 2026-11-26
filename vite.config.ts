import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleEssenceDiagnosisRequest } from './src/services/essenceMiddleware';

function liidEssenceAiApiPlugin(): Plugin {
  return {
    name: 'liid-essence-ai-api',
    configureServer(server) {
      server.middlewares.use('/api/essence-diagnosis', (req, res) => {
        handleEssenceDiagnosisRequest(req, res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), liidEssenceAiApiPlugin()],
});
