import { defineConfig } from 'vitepress'

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
                        { text: "关于vueuse", link: "/guide/vueuseguide" }
                    ],
                },
            ],
            "/components": [
                {
                    text: "常用组件",
                    items: [
                        { text: "介绍", link: "/components/overview" },
                        { text: "按钮 Button", link: "/components/button" },
                        { text: "表单 Form", link: "/components/form" },
                        { text: "表格 Table", link: "/components/table" },
                        { text: "组合式函数", link: "/components/mixcomponent" },
                        { text: "vueuse实践", link: "/components/vueusetest" }
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