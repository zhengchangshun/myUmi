export default [
    {
        menuItemName: '首页',
        url: '/',
        menuId: '1',
    },
    {
        menuItemName: 'Example',
        url: '',
        menuId: '2',
        children: [
            {
                menuItemName: 'Example-1',
                url: '/example',
                menuId: '2-1',
            }
        ]
    },
    {
        menuItemName: '测试',
        url: '',
        icon: '',
        menuId: '3',
        children: [
            {
                menuItemName: '列表',
                url: '/test/list',
                menuId: '3-1',
            }
        ]
    }
]
