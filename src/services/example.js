import {requestGet,requestPost} from '../lib/request';

/*
 * 测试Get请求
 */
export function getMethodsHttp(params) {
    params.contentType = 'json'
    return requestGet('/cdSupplyWeb/mall/spu/getChosenGoods',params);
}

/*
 * 测试Post请求
 */
export function postMethodsHttp(params) {
    params.contentType = 'json'
    return requestPost('/cdSupplyWeb/mall/spu/getWithPage',params);
}
