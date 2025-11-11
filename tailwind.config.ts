import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mono: {
          100: "hsl(var(--mono-100))",
          200: "hsl(var(--mono-200))",
          300: "hsl(var(--mono-300))",
          400: "hsl(var(--mono-400))",
          500: "hsl(var(--mono-500))",
          600: "hsl(var(--mono-600))",
          700: "hsl(var(--mono-700))",
          800: "hsl(var(--mono-800))",
          900: "hsl(var(--mono-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "apple-hello": {
          "0%": {
            opacity: "0",
            transform: "scaleX(0) scaleY(0.8)",
            filter: "blur(4px)"
          },
          "50%": {
            opacity: "0.5",
            transform: "scaleX(0.5) scaleY(0.9)",
            filter: "blur(2px)"
          },
          "100%": {
            opacity: "1",
            transform: "scaleX(1) scaleY(1)",
            filter: "blur(0px)"
          }
        },
        "paw-stretch": {
          "0%": {
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: "0",
          },
          "30%": {
            opacity: "1",
          },
          "100%": {
            strokeDashoffset: "0",
            opacity: "1",
          }
        },
        "paw-tap": {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.3)",
            opacity: "1",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0.8",
          }
        },
        "toe-wiggle": {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
          },
          "50%": {
            transform: "translateY(-2px) scale(1.1)",
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "apple-hello": "apple-hello 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "paw-stretch": "paw-stretch 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "paw-tap": "paw-tap 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "toe-wiggle": "toe-wiggle 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
