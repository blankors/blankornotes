module.exports = {
    base: '/blankornotes/',
    title: '数据仓库工具箱第三版笔记',
    description: 'The Data Warehouse Toolkit 3rd Edition',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '数据仓库', link: '/datawarehouse/' },
            { text: 'Python', link: '/python/' },
            {
                text: 'blankor的博客',
                items: [
                    { text: 'CSDN', link: 'https://blog.csdn.net/u012928365' },
                ]
            }
        ],
        sidebar: {
            '/': '/',
            // 对应 /datawarehouse 路径的侧边栏
            '/datawarehouse/': [
                {
                    title: '阅读方式',
                    path: '/datawarehouse/',
                    collapsable: false // 不折叠
                },
                {
                    title: "第一章",
                    path: '/datawarehouse/ch1',
                    collapsable: false, // 不折叠
                    children: [
                        // { title: "条件类型", path: "/handbook/ConditionalTypes" },
                    ],
                },
                {
                    title: "第二章",
                    path: '/datawarehouse/ch2',
                    collapsable: false,
                },
                {
                    title: "第三章",
                    path: '/datawarehouse/ch3',
                    collapsable: false,
                },
                {
                    title: "第六章",
                    path: '/datawarehouse/ch6',
                    collapsable: false,
                }
            ],
            '/python/': [
                {
                    title: 'with语句',
                    path: '/python/with',
                    collapsable: false // 不折叠
                },
            ]
        }
        // sidebar: [
        //     {
        //         title: '阅读方式',
        //         path: '/',
        //         collapsable: false // 不折叠
        //     },
        //     {
        //       title: "第一章",
        //       path: '/ch1',
        //       collapsable: false, // 不折叠
        //       children: [
        //         // { title: "条件类型", path: "/handbook/ConditionalTypes" },
        //       ],
        //     },
        //     {
        //       title: "第二章",
        //       path: '/ch2',
        //       collapsable: false,
        //     },
        //     {
        //       title: "第三章",
        //       path: '/ch3',
        //       collapsable: false,
        //     },
        //     {
        //       title: "第六章",
        //       path: '/ch6',
        //       collapsable: false,
        //     }
        //   ]
    }
}
