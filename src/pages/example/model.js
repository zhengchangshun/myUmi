import {getMethodsHttp, postMethodsHttp} from '../../services/example'

export default {
    namespace: 'example',
    state: {
        text: 'this is page model',
        getList: {},
        postList: {},
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {

            })
        }
    },

    effects: {
        /*测试get请求*/
        * getMethodsHttp({payload}, {call, put}) {
            const data = yield call(getMethodsHttp, payload);
            yield put({
                type: 'updateState',
                payload: {
                    getList: data.data || []
                }
            });
        },
        /*测试post请求*/
        * postMethodsHttp({payload}, {call, put}) {
            const data = yield call(postMethodsHttp, payload);
            yield put({
                type: 'updateState',
                payload: {
                    postList: data.data || []
                }
            });
        },
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    }
}
