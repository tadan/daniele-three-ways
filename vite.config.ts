import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '/daniele-three-ways/',
    server: {
        host: '::',
        port: 8080,
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    ui: [
                        '@radix-ui/react-accordion',
                        '@radix-ui/react-alert-dialog',
                        'lucide-react',
                        'cmdk',
                        'sonner',
                        'vaul',
                    ],
                    forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
                    utils: [
                        'class-variance-authority',
                        'clsx',
                        'tailwind-merge',
                        'date-fns',
                    ],
                    heavy: ['recharts', 'p5', '@tanstack/react-query'],
                },
            },
        },
    },
}))
