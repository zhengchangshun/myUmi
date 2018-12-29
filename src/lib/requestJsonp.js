import fetchJsonp from 'fetch-jsonp';
import {parseJSON, stitchUrlParam, queryString} from './utils'

/**
 * @param url:请求url
 * @param params：请求参数
 * @returns 返回Promise对象
 */
export function requestJsonp(url, params) {
    url = stitchUrlParam(url, queryString(params));
    return fetchJsonp(url)
        .then(parseJSON)
        .then((data) => data);
}
