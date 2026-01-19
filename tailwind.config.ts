import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom aspect ratio fix in case native support is spotty in your specific browser env
      aspectRatio: {
        'video': '16 / 9',
      }
    },
  },
  // REMOVED: plugins: [aspectRatio] 
  // WHY: Native Tailwind v3+ handles 'aspect-video' better without the plugin.
  plugins: [],
};

export default config;