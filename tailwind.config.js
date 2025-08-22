const { hairlineWidth } = require('nativewind/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BaiJamjuree-Regular', 'System'],
        bold: ['BaiJamjuree-Bold', 'System'],
        semibold: ['BaiJamjuree-SemiBold', 'System'],
        italic: ['BaiJamjuree-Italic', 'System'],
        // adicione outros estilos se quiser
      },
      screens: {
        xs: "320px",   // celulares pequenos
        sm: "400px",   // celulares regulares
        md: "414px",   // celulares grandes (iPhone Plus)
        lg: "768px",   // tablets
        xl: "1024px",  // tablets grandes
      },
      colors: {
        gray: {
          100: "#F7FAF6", // background de input
          200 : "#F6F5F5", // background
          300: "#D9D9D9", // hover de Tab
          800: "#ABA8A8",
          900: "#1C1C1C", // texto
        },
        green: {
          100: "#B4C8A8", // borda
          400: "#6CC36F",
          500: "#496A37", //bg-card
          600: "#1B5E20",
          800: "#496A37"
        },

        red: {
          500: "#CE4949"
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
