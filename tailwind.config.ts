import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d4ff',
          300: '#a3b8ff',
          400: '#7a8fff',
          500: '#667eea',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          500: '#764ba2',
        },
        success: {
          500: '#00d26a',
          600: '#28a745',
        },
        danger: {
          500: '#ff6b6b',
          600: '#dc3545',
        },
        warning: {
          500: '#ffc107',
          600: '#856404',
        }
      },
    },
  },
  plugins: [],
};
export default config;
