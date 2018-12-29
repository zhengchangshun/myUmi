/*公共方法 - 封装*/
import qs from 'query-string';

export function parseJSON(response) {
    return response.json();
}

/*疯转 queryString 类方法 stringify */
export function queryString(params) {
    return qs.stringify(params)
}

/*url拼接参数*/
export function stitchUrlParam(url, param) {
    let symbol = url.indexOf('?') === -1 ? '?' : '&';
    return url + symbol + param;
}
