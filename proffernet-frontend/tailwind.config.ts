import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
import svgToDataUri from "mini-svg-data-uri";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/input.js",
  ],
  
  theme: {
  
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        dotRect: 'dotRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
        pathCircle: 'pathCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
        pathRect: 'pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
        pathTriangle: 'pathTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
        dotTriangle: 'dotTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite',
      },

      backgroundImage: {
        "section-image":
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      boxShadow: {
        input:
          "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
      },
      colors: {
        background: "hsl(240, 3%, 6%)",
        foreground: "var(--foreground)",
        "custom-gray": "rgb(102, 102, 102)",
        dot: '#0d59e7',
        path: '#ffffff',
      },
      keyframes: {
        pathCircle: {
          '25%': { strokeDashoffset: '125' },
          '50%': { strokeDashoffset: '175' },
          '75%': { strokeDashoffset: '225' },
          '100%': { strokeDashoffset: '275' },
        },
        dotRect: {
          '25%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(18px, -18px)' },
          '75%': { transform: 'translate(0, -36px)' },
          '100%': { transform: 'translate(-18px, -18px)' },
        },
        pathRect: {
          '25%': { strokeDashoffset: '64' },
          '50%': { strokeDashoffset: '128' },
          '75%': { strokeDashoffset: '192' },
          '100%': { strokeDashoffset: '256' },
        },
        pathTriangle: {
          '33%': { strokeDashoffset: '74' },
          '66%': { strokeDashoffset: '147' },
          '100%': { strokeDashoffset: '221' },
        },
        dotTriangle: {
          '33%': { transform: 'translate(0, 0)' },
          '66%': { transform: 'translate(10px, -18px)' },
          '100%': { transform: 'translate(-10px, -18px)' },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [
    
    addVariablesForColors,
    function ({
      matchUtilities,
      theme,
    }: {
      matchUtilities: (utilities: Record<string, (value: string) => { backgroundImage: string }>) => void;
      theme: (path: string) => string | number | undefined;
    }) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    nextui(),
  ],
};
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config;
