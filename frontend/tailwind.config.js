/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#0A192F',
                    800: '#112240',
                    700: '#233554',
                },
                teal: {
                    500: '#64FFDA',
                    400: '#52e8c4',
                },
                amber: {
                    500: '#FFC107',
                },
                crimson: {
                    500: '#FF3366',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                }
            },
            animation: {
                blob: "blob 7s infinite",
            }
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.animation-delay-2000': {
                    'animation-delay': '2s',
                },
                '.animation-delay-4000': {
                    'animation-delay': '4s',
                },
            };
            addUtilities(newUtilities);
        })
    ],
}
