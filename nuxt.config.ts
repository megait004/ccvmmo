import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: false },
    alias: {
        '~': fileURLToPath(new URL('.', import.meta.url))
    },
    app: {
        head: {
            titleTemplate: '%s - Flash Deals',
            viewport: 'width=device-width, initial-scale=1',
            charset: 'utf-8'
        }
    },
    css: ['~/assets/css/main.css'],
    ssr: true,
    routeRules: {
        '/': { ssr: false },
        '/products': { ssr: false },
        '/product/**': { ssr: true },
        '/admin/**': { ssr: false }
    },
    typescript: {
        strict: true,
        typeCheck: false
    },
    imports: {
        autoImport: true
    },
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: true
        }
    }
});
