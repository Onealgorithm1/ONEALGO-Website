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
        // 2026 refresh palette. Additive - the onealgo.* ramp above is
        // untouched so every existing page keeps rendering exactly as before.
        //
        // The two brand hexes are fixed (#005eaa, #ffa634). Everything here is
        // derived from them. Neutrals are tinted toward the brand hue (~210)
        // rather than pure grey, which is what stops a fixed brand pair from
        // looking like colour dropped onto a template.
        //
        // Contrast is enforced by scripts/contrast-check.mjs - run it after any
        // edit here. Two rules that script exists to protect:
        //   - #ffa634 is 1.95:1 on white. It can never be text, an icon or a
        //     border on a light surface. Use `oa.orangeText` (#9a4f00, 6.01:1).
        //   - An orange fill takes an INK label (8.91:1), never white (1.95:1).
        oa: {
          paper: "#f7f8fa", // page ground - tinted off-white, not pure #fff
          surface: "#ffffff", // cards raised off the paper
          sunk: "#eef1f5", // recessed wells, inputs
          hairline: "#e3e8ef", // 1px borders - depth comes from these, not shadows
          hairlineStrong: "#d3dae4",
          ink: "#0d1b2a", // headings
          ink2: "#35485c", // body
          ink3: "#5a6b7d", // captions - do not go lighter for any text
          blue: "#005eaa", // BRAND
          blue600: "#004a86",
          blue700: "#003a6b",
          blueTint: "#eaf2f9",
          orange: "#ffa634", // BRAND - fills and dark-section accents only
          orangeText: "#9a4f00", // the only orange permitted as text on light
          orangeTint: "#fff4e3",
          night: "#04182b", // dark sections - navy-black, carries the brand hue
          night2: "#072338",
          night3: "#0d2b42",
          nightInk: "#ffffff",
          nightInk2: "#dbe4ee",
          nightInk3: "#9fb3c8",
          nightBlue: "#7fb4e6", // brand blue is too dark to link on night
        },
      },
      fontFamily: {
        // The site shipped with no fontFamily at all, so everything rendered in
        // Segoe UI / SF. Instrument Sans is a variable grotesque: serious enough
        // for a government reader, current enough not to read as a template.
        sans: [
          "Instrument Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid scale. Negative tracking scales with size - it is a display
        // effect, and applying it to body text is a legibility bug.
        eyebrow: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.06em" }],
        display: [
          "clamp(2.5rem, 1.2rem + 5.4vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        h1: [
          "clamp(2.125rem, 1.2rem + 3.9vw, 3.5rem)",
          { lineHeight: "1.06", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)",
          { lineHeight: "1.12", letterSpacing: "-0.022em" },
        ],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
        lede: ["1.1875rem", { lineHeight: "1.6", letterSpacing: "-0.003em" }],
        metric: [
          "clamp(2.5rem, 1.5rem + 3vw, 4rem)",
          { lineHeight: "1", letterSpacing: "-0.03em" },
        ],
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
