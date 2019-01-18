import React from 'react'
import {connect} from 'dva';
import {Button, Table, Modal} from 'antd';
import {ListFilter, SubHeader, GenerateModal} from '../../../components/index'
import {Global_Pagination} from '../../../lib/enum'
import {listFiltles, tableColumns, modalSet} from './map'
import styles from './index.less'


class User extends React.Component {
    constructor(props) {
        super(props)
    }

    //搜索列表
    searchHandel = (searchForm) => {
        this.queryUserList({
            pageNum: 1,
            searchForm
        })
    }
    /*查询角色列表*/
    queryUserList = (params) => {
        this.props.dispatch({
            type: 'userList/changeState',
            payload: {
                ...params
            }
        }).then(() => {
            this.props.dispatch({type: 'userList/queryUserList'})
        })
    }
    /*页码变化*/
    onPageChange = (page) => {
        this.queryUserList({
            pageNum: page
        })
    }
    /*pageSize切换*/
    onShowSizeChange = (current, size) => {
        this.queryUserList({
            pageNum: current,
            pageSize: size
        })
    }
    /*删除*/
    deleteHandel = (record) => {
        let {dispatch} = this.props;

        dispatch({
            type: 'userList/deleteUser',
            payload: {
                partyName: record.partyName
            },
        }).then(() => {
            dispatch({
                type: 'userList/queryUserList'
            })
        })
    }
    /*创建*/
    createHandel = () => {
        this.props.dispatch({
            type: 'userModal/updateState',
            payload: {
                modalVisible: true,
                isEdit: false,
                title: "创建用户",
            }
        })
    }
    /*编辑*/
    editHandel = (record) => {
        let {role} = record
        let roles = role.map(item => {
            return item.id
        })
        this.props.dispatch({
            type: 'userModal/updateState',
            payload: {
                ...record,
                roles,
                modalVisible: true,
                isEdit: true,
                title: '编辑用户'
            }
        })
    }
    /*新增、编辑弹窗 关闭、取消*/
    onModalCancelHandel = () => {
        this.props.dispatch({
            type: 'userModal/resetState',
        })
    }
    /*新增、编辑弹窗 提交*/
    onModalOkHandel = (data) => {
        let {userModal: {isEdit}, userList, dispatch} = this.props;
        /*对角色id的特殊处理*/
        let roles = data.roles.join(',');
        data.roles = roles

        dispatch({
            type: 'userModal/submitFormData',
            payload: {
                flag: isEdit,
                params: data
            },
        }).then(() => {
            /*关闭弹窗,reset数据*/
            dispatch({
                type: 'userModal/resetState'
            })
            dispatch({
                type: 'userList/queryUserList'
            })
        })
    }
    /*重置密码*/
    resetPwdHandel = () => {
        Modal.confirm({
            title: '提示?',
            content: '确认重置用户密码为123456?',
            onOk: () => {
                this.props.dispatch({
                    type: 'userList/resetPwd'
                })
            }
        });

    }
    /*密码二次确认*/
    comfirmPassword = (rule, value, callback) => {
        /*通过ref获取子组件的状态*/
        let generateFormInstance = this.generateModal.generateFormInstance()
        let {getFieldValue} = generateFormInstance;

        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        let {userList, userModal} = this.props,
            {total, pageNum, pageSize, userTableList} = userList,
            {modalKey, modalVisible, title} = userModal,
            filters = listFiltles(this), columns = tableColumns(this), modalForm = modalSet(this)

        const listFilterProps = {
            filters,
            onSearch: this.searchHandel
        }

        const pagination = {
            total: total,
            current: pageNum,
            pageSize: pageSize,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            ...Global_Pagination,
        };

        const modalProps = {
            modalForm, /*表单配置*/
            modalKey, /*modal组件key*/
            visible: modalVisible, /*modal组件visible*/
            title, /*modal组件title*/
            onCancel: this.onModalCancelHandel, /*modal组件取消关闭*/
            onOk: this.onModalOkHandel /*modal组件提交关闭*/
        }
        return (
            <div className={styles.userWrap}>
                <SubHeader title="用户管理">
                    <Button type="primary" onClick={this.createHandel} style={{marginRight: '18px'}}>创建用户</Button>
                    <Button type="primary" onClick={this.resetPwdHandel}>重置密码</Button>
                </SubHeader>
                <ListFilter {...listFilterProps}/>
                <Table columns={columns} dataSource={userTableList} pagination={pagination} rowKey={record => record.partyName}/>
                <GenerateModal {...modalProps} ref={el => this.generateModal = el}/>
            </div>
        )
    }
}

export default connect(({userList, userModal}) => ({userList, userModal}))(User)
