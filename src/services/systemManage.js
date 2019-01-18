import {requestGet, requestPostJson} from '../lib/request';

/*获取用户角色列表*/
export function queryRoleList(params) {
    return requestGet('', params);
}

/*获取分公司列表*/
export function queryBranchCompanyList(params) {
    return requestGet('', params);
}

/*获取用户列表*/
export function queryUserList(params) {
    return requestGet('', params);
}

/*删除用户*/
export function deleteUser(params) {
    return requestPostJson('', params);
}

/*重置密码*/
export function resetPwd(params) {
    return requestPostJson('', params);
}

/*新增用户*/
export function addUser(params) {
    return requestPostJson('', params);
}

/*编辑用户*/
export function editUser(params) {
    return requestPostJson('', params);
}


/*删除角色*/
export function deleteRole(params) {
    return requestPostJson('', params);
}

/*新增角色*/
export function addRole(params) {
    return requestPostJson('', params);
}

/*编辑角色*/
export function editRole(params) {
    return requestPostJson('', params);
}

/*获取权限*/
export function queryAuth(params) {
    return requestPostJson('', params);
}

/*设置权限*/
export function setAuth(params) {
    return requestPostJson('', params);
}
