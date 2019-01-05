/**
 * 全局的model，umi会自动注册，可自行按照类型、模块分成多个文件
 *  production ：按需载入，development ：全量载入
 */
import {queryMenuList, queryUserInfo, exit} from '../services/global';
import menuList from '../lib/menuList'

export default {
    namespace: 'global',
    state: {
        userInfo: {
            userName: '张三',
            carrierName: '飓风物飓风物流飓风物流飓风物流飓风物流飓风物流流',
            userAvatar: 'https://cdn-img.easyicon.net/png/10686/1068661.gif',
        },
        menuList: menuList,
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        }
    },
    effects: {
        /*获取菜单*/
        * queryMenuList(action, {call, put}) {
            const data = yield call(queryMenuList, {});
            yield put({
                type: 'updateState',
                payload: {
                    menuList: data.data || {}
                }
            });
        },
        /*获取消息数量*/
        * queryUserInfo(action, {call, put}) {
            const data = yield call(queryUserInfo);
            yield put({
                type: 'updateState',
                payload: {
                    userInfo: data.data || {}
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
