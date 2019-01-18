export default [
    {
        menuItemName: '首页',
        url: '/',
        menuId: '1',
    },
    {
        menuItemName: '系统管理',
        url: '',
        icon: '',
        menuId: '2',
        children: [
            {
                menuItemName: '用户管理',
                url: '/systemManage/user',
                menuId: '2-1',
            },
            {
                menuItemName: '角色管理',
                url: '/systemManage/role',
                menuId: '2-2',
            }
        ]
    }
]
