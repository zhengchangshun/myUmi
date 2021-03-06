/**
 * 全局的model，umi会自动注册，可自行按照类型、模块分成多个文件
 *  production ：按需载入，development ：全量载入
 */
import {queryMenuList, queryUserInfo, exit} from '../services/global';
import menuList from '../lib/menuList'
const userInfo = {
    userName: '张三',
    carrierName: '飓风物流',
    userAvatar: 'https://cdn-img.easyicon.net/png/10686/1068661.gif',
}

export default {
    namespace: 'global',
    state: {
        userInfo: {},
        menuList: [],
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        /*获取菜单*/
        * queryMenuList(action, {call, put}) {
           /* const data = yield call(queryMenuList, {});
            yield put({
                type: 'updateState',
                payload: {
                    menuList: data.data || []
                }
            });*/
            yield put({
                type: 'updateState',
                payload: {
                    menuList: menuList || []
                }
            })
        },
        /*获取用户信息*/
        * queryUserInfo(action, {call, put}) {
            // const data = yield call(queryUserInfo);
            yield put({
                type: 'updateState',
                payload: {
                    userInfo: userInfo || {}
                }
            });
        },
        /*退出*/
        * exit(action, {call, put}) {
            const data = yield call(exit);
            action.onComplete && action.onComplete();
        },
    },
};
