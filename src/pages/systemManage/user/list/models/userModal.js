import {addUser, editUser} from '../../../../../services/systemManage'

const initState = () => ({
    partyName: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    roles: [],
    remark: '',
    title: '创建用户',
    modalKey: Math.random(),
    modalVisible: false,
    isEdit: false,
})

export default {
    namespace: 'userModal',
    state: initState(),
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {

            })
        }
    },

    effects: {
        /*新增*/
        * submitFormData({payload}, {call, put, select}) {
            let {flag, params} = payload;
            if (flag) {
                // const data = yield call(editUser, params)
            } else {
                // const data = yield call(addUser, params)
            }

            yield put({
                type: 'updateState',
                payload: {
                    modalVisible: false,
                    isEdit: false,
                    modalKey: Math.random()
                }
            });
        },
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },
        resetState(state, {payload}) {
            return {...initState()}
        }
    }
}
