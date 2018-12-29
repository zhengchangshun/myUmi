import {requestGet,requestPostJson} from '../lib/request';

/*
 * 测试Get请求
 */
export function getMethodsHttp(params) {
    return requestGet('/cdSupplyWeb/mall/spu/getChosenGoods',params);
}

/*
 * 测试Post请求
 */
export function postMethodsHttp(params) {
    return requestPostJson('/cdSupplyWeb/mall/spu/getWithPage',params);
}
