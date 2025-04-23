import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Pages({
      // sitemap will generate when the project is built
      onRoutesGenerated: async (routes) => {
        // also can get the data from api here using fetch
        const users = [{ name: "john" }, { name: "jane" }, { name: "doe" }];

        const dynamicRoutes = users.map((user) => `/users/${user.name}`);

        // define sitemap en here
        generateSitemap({
          filename: "sitemap-en.xml",
          routes: [...routes, ...dynamicRoutes],
        });

        // define sitemap id here
        generateSitemap({
          filename: "sitemap-id.xml",
          routes: [...routes, ...dynamicRoutes],
          options: { lang: "id" },
        });
      },
    }),
  ],
});
