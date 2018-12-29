import fetchJsonp from 'fetch-jsonp';
import {parseJSON, stitchUrlParam, queryString} from './utils'

export function requestJsonp(url, params) {
    url = stitchUrlParam(url, queryString(params));
    return fetchJsonp(url)
        .then(parseJSON)
        .then((data) => data);
}
