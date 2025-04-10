import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react({ jsxRuntime: 'classic' })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
};