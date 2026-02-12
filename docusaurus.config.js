// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '我是土堆',
  tagline: 'Templates Docusaurus with Tailwind CSS and Shadcn/ui',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://xiaotudui.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xiaotudui', // Usually your GitHub org/user name.
  projectName: 'xiaotudui', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },

  // Enable Docusaurs Faster: https://github.com/facebook/docusaurus/issues/10556
  future: {
    experimental_faster: true,
    v4: true
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tree/main'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '我是土堆',
        logo: {
          alt: 'Docusaurus Tailwind Shadcn/ui Logo',
          src: 'img/logo.svg'
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial'
          // },
          {
            to: '/tutorials',
            label: '土堆教程',
            position: 'left'
          },
          {
            to: '/labs',
            label: '土堆实验室',
            position: 'left'
          },
          {
            'href': 'https://space.bilibili.com/203989554',
            'position': 'right',
            'className': 'header-bilibili-link',
            'aria-label': 'Bilibili'
          },
          {
            'href': 'https://github.com/xiaotudui',
            'position': 'right',
            'className': 'header-wechat-link',
            'aria-label': 'Wechat'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '我是土堆',
            items: [
              {
                label: '土堆教程',
                to: '/tutorials'
              },
              {
                label: '土堆实验室',
                to: '/labs'
              }
            ]
          },
          {
            title: '关注我',
            items: [
              {
                label: 'Bilibili',
                href: 'https://space.bilibili.com/203989554'
              },
              {
                label: '微信公众号',
                href: 'https://mp.weixin.qq.com/'
              }
            ]
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 我是土堆. 沪ICP备2024055345号`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    }),

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexPages: true,
        docsRouteBasePath: '/docs',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: false,
        searchResultContextMaxLength: 50,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true
      }
    ]
  ],
  plugins: [
    ['./src/plugins/webpack-alias.js', {}],
    ['./src/plugins/tailwind-config.js', {}],
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true
      })
    ],
    [
      './src/plugins/blog-plugin',
      {
        path: 'blog',
        editLocalizedFiles: false,
        blogTitle: 'Blog',
        blogDescription: 'Blog description is here ...',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'List blog',
        routeBasePath: 'blog',
        include: ['**/*.md', '**/*.mdx'],
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**'
        ],
        postsPerPage: 6,
        truncateMarker: /<!--\s*(truncate)\s*-->/,
        showReadingTime: true,
        onUntruncatedBlogPosts: 'ignore',
        // Remove this to remove the "edit this page" links.
        editUrl:
          'https://github.com/tree/main/',
        remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
      }
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'object-detection',           // 插件 ID，用于区分默认的 docs
    //     path: 'docs/object-detection',         // 文件夹路径：根目录下的 knowledge 文件夹
    //     routeBasePath: 'tutorials/object-detection',// 访问 URL：yoursite.com/knowledge
    //     sidebarPath: require.resolve('./sidebars.js'), // 侧边栏配置
    //     // 如果想让首页不显示侧边栏，可以在这里配置，但通常我们需要侧边栏
    //   },
    // ],
  ]
}

export default config
