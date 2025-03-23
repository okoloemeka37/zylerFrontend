import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: '#F1F5F9',
          300: '#94A3B8',
          600: '#1E3A8A',
          700: '#1E2A78',
          800: '#172554',
        },
      },
    },
  },
  plugins: [require('daisyui'),],
};
export default config;
