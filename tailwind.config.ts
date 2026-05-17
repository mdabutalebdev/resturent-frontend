import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        subNav: "#474747",
        NavListActive: "#DBDFD0",
        headding: "#101A24",
        prh: "#5C6574",
        prh2: "#2C2F24",
        btn: "#C31C1E",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        play: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      backgroundImage: {
        bgImage: "url('/assets/banner.png')",
        group: "url('/assets/group.png')",
        group_bg: "url('/assets/Group_bg_2.png')",
        contactBgImg: "url('/assets/contactbg.png')",
        videoBg: "url('/assets/Food/BG.jpg')",
        bookTableImg: "url('/assets/table.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
