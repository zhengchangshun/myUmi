import {queryRoleList, addRole, editRole, deleteRole, queryAuth, setAuth} from '../../../services/systemManage'

export default {
    namespace: 'role',
    state: {
        searchForm: {},
        roleList: [],
        total: 0,                //列表总数
        pageNum: 1,              //页码
        pageSize: 10,           //每页条数
        /*权限*/
        authList: [],
        authModalKey: Math.random(),
        authModalVisible: false,
        /*新增、编辑*/
        isEdit: false,
        title: "创建角色",
        modalVisible: false,
        modalKey: Math.random(),
        roleName: '',           //角色名称
        remark: '',            //备注
        roleStatus: ''         //状态
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/systemManage/role') {
                    dispatch({type: 'queryRoleList'})
                }
            })
        }
    },

    effects: {
        /*改变状态*/
        * changeState({payload}, {call, put, select}) {
            yield put({
                type: 'updateState',
                payload: payload
            });
        },
        /*获取角色列表*/
        * queryRoleList({payload}, {call, put, select}) {
            // const data = yield call(queryRoleList, payload)

            let data = {}
            data.data = [{
                "gmtCreate": '1',
                "permissionStatus": '1',
                "remark": '1',
                "roleName": '1',
                "roleStatus": '1'
            }]
            yield put({
                type: 'updateState',
                payload: {
                    roleList: data.data || []
                }
            })
        },
        /*删除*/
        * deleteRole({payload}, {call, put, select}) {
            let data = yield call(deleteRole, payload);
        },
        /*新增、编辑*/
        * submitFormData({payload}, {call, put, select}) {
            let {flag, params} = payload;
            if (flag) {
                // const data = yield call(editRole, params)
            } else {
                // const data = yield call(addRole, params)
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
        /*获取权限*/
        * queryAuth({payload}, {call, put, select}) {
            // let data = yield call(queryAuth, payload);
            let data ={}
            data.data =  [
                {
                    title: '0-0',
                    key: '0-0',
                    children: [{
                        title: '0-0-0',
                        key: '0-0-0',
                        children: [
                            {title: '0-0-0-0', key: '0-0-0-0', hasAuth: true},
                            {title: '0-0-0-1', key: '0-0-0-1'},
                            {title: '0-0-0-2', key: '0-0-0-2'},
                        ],
                    }, {
                        title: '0-0-1',
                        key: '0-0-1',
                        children: [
                            {title: '0-0-1-0', key: '0-0-1-0'},
                            {title: '0-0-1-1', key: '0-0-1-1', hasAuth: true},
                            {title: '0-0-1-2', key: '0-0-1-2'},
                        ],
                    }, {
                        title: '0-0-2',
                        key: '0-0-2',
                        hasAuth: true
                    }],
                }, {
                    title: '0-1',
                    key: '0-1',
                    children: [
                        {title: '0-1-0-0', key: '0-1-0-0'},
                        {title: '0-1-0-1', key: '0-1-0-1'},
                        {title: '0-1-0-2', key: '0-1-0-2', hasAuth: true},
                    ],
                }, {
                    title: '0-2',
                    key: '0-2',
                }
            ];
            yield put({
                type: 'updateState',
                payload: {
                    authList: data.data || []
                }
            })
        },
        /*设置权限*/
        * setAuth({payload}, {call, put, select}) {
            let data = yield call(setAuth, payload);
        },
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },
        resetModalState(state, {payload}) {
            return {
                ...state,
                ...{
                    title: "创建角色",
                    modalVisible: false,
                    isEdit: false,
                    modalKey: Math.random(),
                    roleName: '',           //角色名称
                    remark: '',            //备注
                    roleStatus: ''         //状态}}
                }
            }
        }
    }
}
