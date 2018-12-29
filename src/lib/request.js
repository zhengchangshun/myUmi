import fetch from 'dva/fetch';
import {message} from 'antd';
import qs from 'query-string';

const specialCode = []

let defaultOpts = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

function parseJSON(response) {
    return response.json();
}

/*url拼接参数*/
function stitchUrlParam(url, param) {
    let symbol = url.indexOf('?') === -1 ? '?' : '&';
    return url + symbol + param;
}

/*网络请求错误*/
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/*业务请求错误*/
function checkResult(url, data) {
    const code = data.code;
    if (code != '0' && !specialCode.includes(code)) {
        throwException(url, data, code);
    }
    return data;
}

// 抛出错误信息
function throwException(url, data, code) {
    let msg = data.msg || '未知错误，待排查';
    message.error(`${msg}`, 2);
    throw data;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options, contentType = 'form') {
    if (contentType === 'json') {
        options.headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    options = Object.assign({}, defaultOpts, options);

    console.log(options);

    debugger
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => checkResult(url, data))
}

/*get请求参数拼接在url后*/
export function requestGet(url, params) {
    let {contentType} = params
    delete params.contentType;

    url = stitchUrlParam(url, qs.stringify(params));
    return request(url, {method: "GET"}, contentType)
}

/*post请求参数设置到body上*/
export function requestPost(url, params) {
    let {contentType} = params
    delete params.contentType;

    let options = {
        body: params,
        method: 'POST'
    }
    return  request(url, options, contentType)
}
