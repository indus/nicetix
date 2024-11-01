import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "nicetix",
  description: "generate nice ticks for scalebars and graphs",
  outDir: "../../docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //nav: [
    //  { text: 'Home', link: '/' },
    //  { text: 'Examples', link: '/markdown-examples' }
    //],

    //sidebar: [
    //  {
    //    text: 'Examples',
    //    items: [
    //      { text: 'Markdown Examples', link: '/markdown-examples' },
    //      { text: 'Runtime API Examples', link: '/api-examples' }
    //    ]
    //  }
    //],

    socialLinks: [
      { icon: "github", link: "https://github.com/indus/nicetix" },
      { icon: "npm", link: "https://www.npmjs.com/package/nicetix" }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/indus/nicetix/blob/main/LICENSE">BSD 3-Clause License</a>.',
      copyright:
        'Copyright © 2024-present <a href="https://github.com/indus">Stefan Keim</a>',
    },
  }
})
