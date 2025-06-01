// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",       // thư mục app (nếu dùng app router)
        "./pages/**/*.{js,ts,jsx,tsx}",     // thư mục pages (nếu dùng pages router)
        "./components/**/*.{js,ts,jsx,tsx}" // thư mục components
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
