/*枚举*/
/*枚举*/

// 是否是线上环境
export let isOnline = window.location.href.indexOf('test.tf56.com') < 0;
//分页配置
export const Global_Pagination = {
    pageSizeOptions: ['10', '30', '50'],
    showSizeChanger: true,
    showQuickJumper: true
}

//角色、用户状态
export const User_Role_Status = [
    {value: '', label: '全部'},
    {value: '启用', label: '启用'},
    {value: '禁用', label: '禁用'},
]

//角色权限设置
export const Role_Auth_Type = [
    {value: '', label: '全部'},
    {value: '已设置', label: '已设置'},
    {value: '未设置', label: '未设置'},
]
