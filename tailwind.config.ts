import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // OneAlgorithm Brand Colors
        onealgo: {
          blue: {
            50: "hsl(var(--onealgo-blue-50))",
            100: "hsl(var(--onealgo-blue-100))",
            200: "hsl(var(--onealgo-blue-200))",
            300: "hsl(var(--onealgo-blue-300))",
            400: "hsl(var(--onealgo-blue-400))",
            500: "hsl(var(--onealgo-blue-500))",
            600: "hsl(var(--onealgo-blue-600))",
            700: "hsl(var(--onealgo-blue-700))",
            800: "hsl(var(--onealgo-blue-800))",
            900: "hsl(var(--onealgo-blue-900))",
            950: "hsl(var(--onealgo-blue-950))",
          },
          orange: {
            50: "hsl(var(--onealgo-orange-50))",
            100: "hsl(var(--onealgo-orange-100))",
            200: "hsl(var(--onealgo-orange-200))",
            300: "hsl(var(--onealgo-orange-300))",
            400: "hsl(var(--onealgo-orange-400))",
            500: "hsl(var(--onealgo-orange-500))",
            600: "hsl(var(--onealgo-orange-600))",
            700: "hsl(var(--onealgo-orange-700))",
            800: "hsl(var(--onealgo-orange-800))",
            900: "hsl(var(--onealgo-orange-900))",
            950: "hsl(var(--onealgo-orange-950))",
          },
          light: "hsl(var(--onealgo-light))",
          lighter: "hsl(var(--onealgo-lighter))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
