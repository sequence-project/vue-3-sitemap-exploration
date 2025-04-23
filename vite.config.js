import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Sitemap from "vite-plugin-sitemap";
import axios from "axios";

// https://vite.dev/config/
export default defineConfig(async () => {
  const { data: posts } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  ); // adjust to your endpoint

  return {
    plugins: [
      vue(),

      Sitemap({
        filename: "sitemap-en.xml",
        dynamicRoutes: [
          ...posts.map((post) => `/en/blog/${post.id}`),
          "/en/about",
          "/en/contact",
        ],
        exclude: ["/id/**"],
        hostname: "https://yourdomain.com",
      }),

      // Indonesian sitemap
      Sitemap({
        filename: "sitemap-id.xml",
        dynamicRoutes: [
          ...posts.map((post) => `/id/blog/${post.id}`),
          "/id/tentang",
          "/id/kontak",
        ],
        exclude: ["/en/**"],
        hostname: "https://yourdomain.com",
      }),
    ],
  };
});
