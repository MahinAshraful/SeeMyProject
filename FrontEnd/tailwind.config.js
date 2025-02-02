/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      animation: {
        'chomp-right': 'chomp-right 0.4s linear infinite',
        'task-eaten': 'task-eaten 0.3s ease-out forwards',
        'ghost-float': 'ghost-float 2s ease-in-out infinite',
      },
      keyframes: {
        'chomp-right': {
          '0%, 100%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%)' 
          },
          '50%': { 
            clipPath: 'polygon(0 0, 100% 50%, 100% 50%, 0 100%, 0 50%)' 
          },
        },
        'task-eaten': {
          '0%': { 
            transform: 'scale(1)',
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(0)',
            opacity: '0' 
          },
        },
        'ghost-float': {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-10px)' 
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};