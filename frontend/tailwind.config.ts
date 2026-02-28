// frontend/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Background colors
                bg: {
                    primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
                    accent: 'rgb(var(--color-bg-accent) / <alpha-value>)',
                },
                // Text colors
                text: {
                    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                    accent: 'rgb(var(--color-text-accent) / <alpha-value>)',
                    inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
                },
                // Border colors
                border: {
                    primary: 'rgb(var(--color-border-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-border-secondary) / <alpha-value>)',
                },
                // Core colors
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                // Interactive states
                hover: 'rgb(var(--color-hover) / <alpha-value>)',
                active: 'rgb(var(--color-active) / <alpha-value>)',
                focus: 'rgb(var(--color-focus) / <alpha-value>)',
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};

export default config;

