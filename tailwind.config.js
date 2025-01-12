/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#6B7280",
        "input-color": "#1F2937",
        "card-color": "#1E1B4B",
        "button-color": "#1E3A8A",
        "form-color": "#111827",
      },
    },
  },
  plugins: [],
};
