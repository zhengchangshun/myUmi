import fetch from 'dva/fetch';
import fetchJsonp from 'fetch-jsonp';
import {message} from 'antd';
import uuid from 'uuid'
import {parseJSON, stitchUrlParam, queryString} from './utils'

const specialCode = []
const contentTypeEnum = ['json', 'form']

let defaultOpts = {
    credentials: 'same-origin', /*携带cookie*/
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
    }
};

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
function request(url, options, contentType) {
    if (contentType === 'json') {
        options.headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    options = Object.assign({}, defaultOpts, options);
    /*随机数*/
    const urlParams = {
        uuid: uuid.v4(),
        timestamp: new Date().getTime(),
    }
    url = stitchUrlParam(url, queryString(urlParams));

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => checkResult(url, data))
        .catch(err => (err));
}

/**
 *  get请求
 * @param url :请求地址
 * @param params:请求参数
 * @returns 返回Promise对象
 */
export function requestGet(url, params = {}) {
    url = stitchUrlParam(url, queryString(params));
    return request(url, {method: "GET"})
}


/**
 *  post请求 ,默认请求 content-Type:form
 * @param url :请求地址
 * @param params:请求参数
 * @param contentType: content-type设置
 * @returns 返回Promise对象
 */
export function requestPost(url, params = {}, contentType = 'form') {
    if (!contentTypeEnum.includes(contentType)) {
        message.error(`请设置正确的请求头【form，json】`, 2);
        return;
    }
    let body = contentType === 'form' ? queryString(params) : JSON.stringify(params);
    let options = {
        body,
        method: 'POST'
    }
    return request(url, options, contentType)
}

/*post请求,设置content-Type:json */
export function requestPostJson(url, params = {}) {
    return requestPost(url, params, 'json')
}

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
