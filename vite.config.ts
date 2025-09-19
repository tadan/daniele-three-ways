import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    base: '/',
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
                        // All your @radix-ui packages
                        '@radix-ui/react-accordion',
                        '@radix-ui/react-alert-dialog',
                        // ... etc
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

                    // Only include runtime dependencies, not type packages
                    charts: ['recharts'],
                    p5: ['p5'], // Remove @types/p5 from here
                    query: ['@tanstack/react-query'],
                },
            },
        },
    },
}))
