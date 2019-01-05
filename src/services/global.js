import {requestGet, requestPostJson} from '../lib/request';

/*
 * 获取用户信息
 */
export function queryUserInfo(params) {
    return requestGet();
}

/*
 * 获取菜单列表
 */
export function queryMenuList(params) {
    return requestPostJson();
}

/*
 * 退出
 */
export function exit(params) {
    return requestPostJson();
}

