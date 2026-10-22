import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // یک بار کش را خالی کنید تا Layout1 بدون withStyles لود شود
    force: true,
  },
  resolve: {
    alias: [
      // react-material-ui-form-validator و سایر پکیج‌ها هنوز @material-ui/core می‌خوانند
      { find: /^@material-ui\/core\/(.+)$/, replacement: '@mui/material/$1' },
      { find: '@material-ui/core', replacement: '@mui/material' },
    ],
  },
});
