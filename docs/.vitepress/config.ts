import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "Vue 3+ TypeScript 学习文档",
  description: "详细学习Vue3和TypeScript的指南",
  themeConfig: {
    siteTitle: "前端学习",
    logo: "/assets/loge.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/components/" },
      { text: "API 参考", link: "/api/" },
      { text: "常见问题", link: "/faq/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/wuhao150313/vue3-ts-docs" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          collapsible: true,
          items: [
            { text: "介绍", link: "/guide/" },
            { text: "安装", link: "/guide/installation" },
            { text: "基本概念", link: "/guide/concepts" },
            { text: "关于vueuse", link: "/guide/vueuseguide" },
          ],
        },
      ],
      "/components": [
        {
          text: "学习笔记",
          items: [
            { text: "Vue快速切入", link: "/components/overview" },
            { text: "组件按钮 Button", link: "/components/button" },
            { text: "组件表单 Form", link: "/components/form" },
            { text: "组件表格 Table", link: "/components/table" },
            { text: "组合式函数", link: "/components/mixcomponent" },
            {
              text: "Axios 库的使用和网络请求的处理",
              link: "/components/axiosNetworkRequests",
            },
            {
              text: "Axios 的集成应用",
              link: "/components/mockDataAxiosIntegration",
            },
            {
              text: " Pinia 状态管理库的实践",
              link: "/components/piniaStateManagement",
            },
            {
              text: "Vue Router 的高级特性和应用",
              link: "/components/vueRouterAdvancedGuide",
            },
            {
              text: "前端工程化和规范化",
              link: "/components/frontendEngineeringStandards",
            },
            {
              text: "Element Plus 组件库的使用和优势",
              link: "/components/elementPlusComponentLibrary",
            },
            {
              text: "微信小程序的开发基础和核心组件",
              link: "/components/wechatMiniProgramBasics",
            },
            {
              text: "使用 VitePress 构建静态站点的技巧",
              link: "/components/vitePressStaticSiteBuildingt",
            },
            {
              text: "实践 Vue 3 的组合式 API",
              link: "/components/vue3CompositionAPIPractice",
            },
          ],
        },
      ],
    },
    footer: {
      message: "用心学习Vue3和TypeScript!",
      copyright: "Copyright 2024 wh",
    },
  },
});
