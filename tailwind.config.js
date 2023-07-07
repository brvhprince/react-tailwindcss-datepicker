/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "media",
    theme: {
        extend: {
            keyframes: {
                popInOut: {
                    "from": {
                        transform: "scale(1)"
                    },
                    "30%": {
                        transform: "scale(0.88)"
                    },
                    "60%":{
                      transform: "scale(1.05)"
                    },
                    "to": {
                        transform: "scale(1)"
                    }
                },
                fadeIn: {
                    "0%": {
                        opacity: "0"
                    },
                    "100%": {
                        opacity: "1"
                    }
                }
            },
            animation: {
                'fadeIn': 'fadeIn 0.2s ease-out both',
                'popInOut': 'popInOut 0.6s ease-out'
            }
        }
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")]
};
