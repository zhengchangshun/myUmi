import {queryRoleList, queryBranchCompanyList, queryUserList, deleteUser,resetPwd} from '../../../../services/systemManage'

export default {
    namespace: 'userList',
    state: {
        searchForm: {},
        roleList: [],
        branchCompanyList: [],
        userTableList: [],
        total: 0,                //列表总数
        pageNum: 1,              //页码
        pageSize: 10,           //每页条数
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/systemManage/user') {
                    dispatch({
                        type: 'queryBranchCompanyList'
                    });
                    dispatch({
                        type: 'queryRoleList'
                    });
                    dispatch({
                        type: 'queryUserList'
                    });
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
        /*获取用户列表*/
        * queryUserList({payload}, {call, put, select}) {
            const userList = yield select(state => state.userList);
            let {pageNum, pageSize, searchForm} = userList,
                params = {
                    pageNum,
                    pageSize,
                    ...searchForm,
                    ...payload
                }
            console.log('查询中...', params)
            // const data = yield call(queryUserList, params)
            let data = {}
            data.data = [
                {
                    "companyName": '1',
                    "gmtCreate":'1',
                    "name": '1',
                    "partyName": '1',
                    "phone": '1',
                    "remark": '1',
                    "role": [{
                        "id": '1',
                        "roleName": '大区负责人'
                    }],
                    "status": '1'
                }
            ]
            yield put({
                type: 'updateState',
                payload: {
                    userTableList: data.data || [],
                    total: data.count
                }
            })
        },
        /*获取角色列表*/
        * queryRoleList({payload}, {call, put, select}) {
            // const data = yield call(queryRoleList, payload)

            let data = {}
            data.data = [
                {id:"1",roleName:"大区负责人"},
                {id:"2",roleName:"省负责人"},
                {id:"3",roleName:"市负责人"},
            ]
            yield put({
                type: 'updateState',
                payload: {
                    roleList: data.data || []
                }
            })
        },
        /*获取分公司列表*/
        * queryBranchCompanyList({payload}, {call, put, select}) {
            const data = yield call(queryBranchCompanyList, payload)
            yield put({
                type: 'updateState',
                payload: {
                    branchCompanyList: data.data || []
                }
            })
        },
        /*删除*/
        * deleteUser({payload}, {call, put, select}) {
            let data = yield call(deleteUser, payload);
        },
        /*重置密码*/
        * resetPwd(action, {call, put, select}) {
            yield call(resetPwd);
        }
    },
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },
    }
}
