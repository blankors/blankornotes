module.exports = {
    base: '/blankornotes/',
    title: '数据仓库工具箱第三版笔记',
    description: 'The Data Warehouse Toolkit 3rd Edition',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: 'blankor的博客', 
                items: [
                    { text: 'CSDN', link: 'https://blog.csdn.net/u012928365' },
                ]
            }
        ],
        sidebar: [
            {
                title: '阅读方式',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
              title: "第六章",
              path: '/ch6',
              collapsable: false, // 不折叠
              children: [
                // { title: "条件类型", path: "/handbook/ConditionalTypes" },
              ],
            }
          ]
    }
}
