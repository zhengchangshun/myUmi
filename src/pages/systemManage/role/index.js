import React from 'react'
import {connect} from 'dva';
import {Button, Table, Modal} from 'antd';
import {ListFilter, SubHeader, GenerateModal} from '../../../components/index'
import AuthModal from './components/AuthModal'
import {Global_Pagination} from '../../../lib/enum'
import {listFiltles, tableColumns, modalSet} from './map'
import styles from './index.less'

class Role extends React.Component {
    constructor(props) {
        super(props);
    }

    //搜索列表
    searchHandel = (searchForm) => {
        this.queryRoleList({
            pageNum: 1,
            searchForm
        })
    }
    /*查询角色列表*/
    queryRoleList = (params) => {
        this.props.dispatch({
            type: 'role/changeState',
            payload: {
                ...params
            }
        }).then(() => {
            this.props.dispatch({type: 'role/queryRoleList'})
        })
    }
    /*页码变化*/
    onPageChange = (page) => {
        this.queryRoleList({
            pageNum: page
        })
    }
    /*pageSize切换*/
    onShowSizeChange = (current, size) => {
        this.queryRoleList({
            pageNum: current,
            pageSize: size
        })
    }
    /*删除*/
    deleteHandel = (record) => {
        let {dispatch} = this.props;

        dispatch({
            type: 'role/deleteRole',
            payload: {
                id: record.id
            }
        }).then(() => {
            dispatch({
                type: 'role/queryRoleList'
            })
        })
    }
    /*创建*/
    createHandel = () => {
        this.props.dispatch({
            type: 'role/updateState',
            payload: {
                modalVisible: true,
                isEdit: false,
                title: "创建角色",
            }
        })
    }
    /*编辑*/
    editHandel = (record) => {
        this.props.dispatch({
            type: 'role/updateState',
            payload: {
                ...record,
                modalVisible: true,
                isEdit: true,
                title: '编辑角色'
            }
        })
    }
    /*新增、编辑弹窗 关闭、取消*/
    onModalCancelHandel = () => {
        this.props.dispatch({
            type: 'role/resetModalState',
        })
    }
    /*新增、编辑弹窗 提交*/
    onModalOkHandel = (data) => {
        let {role, dispatch} = this.props,
            {isEdit} = role;

        dispatch({
            type: 'role/submitFormData',
            payload: {
                flag: isEdit,
                params: data
            },
        }).then(() => {
            /*关闭弹窗,reset数据*/
            dispatch({
                type: 'resetModalState/resetModalState'
            })
            dispatch({
                type: 'role/queryRoleList'
            })
        })
    }
    /*设置权限*/
    setAuthHandel = (record) => {
        let {dispatch} = this.props,
            {id} = record;
        dispatch({
            type: 'role/queryAuth',
            payload: {
                id
            }
        }).then(() => {
            console.log(this.props.role.authList);
            dispatch({
                type: 'role/updateState',
                payload: {
                    authModalVisible: true
                }
            })
        })
    }
    /*权限弹窗cancel*/
    onAuthModalCancelHandel = (record) => {
        this.props.dispatch({
            type: 'role/updateState',
            payload: {
                authModalVisible: false,
                authModalKey: Math.random(),
            }
        })
    }
    /*权限弹窗Ok*/
    onAuthModalOkHandel = () => {

    }

    render() {
        let {roleList, total, pageNum, pageSize, modalKey, modalVisible, title, authList, authModalKey, authModalVisible} = this.props.role,
            filters = listFiltles(this), columns = tableColumns(this), modalForm = modalSet(this)
        /*搜搜条件*/
        const listFilterProps = {
            filters,
            onSearch: this.searchHandel
        }
        /*分页*/
        const pagination = {
            total: total,
            current: pageNum,
            pageSize: pageSize,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            ...Global_Pagination,
        };
        /*新增、编辑弹窗*/
        const modalProps = {
            modalForm, /*表单配置*/
            modalKey, /*modal组件key*/
            visible: modalVisible, /*modal组件visible*/
            title, /*modal组件title*/
            width: 520,
            onCancel: this.onModalCancelHandel, /*modal组件取消关闭*/
            onOk: this.onModalOkHandel /*modal组件提交关闭*/
        }
        /*权限*/
        const authModalProps = {
            authList,
            modalKey: authModalKey,
            visible: authModalVisible,
            onCancel: this.onAuthModalCancelHandel, /*modal组件取消关闭*/
            onOk: this.onAuthModalOkHandel /*modal组件提交关闭*/
        }
        return (
            <div className={styles.roleWrap}>
                <SubHeader title="角色管理">
                    <Button type="primary" onClick={this.createHandel}>创建用户</Button>
                </SubHeader>
                <ListFilter {...listFilterProps}/>
                <Table columns={columns} dataSource={roleList} pagination={pagination} rowKey={record => record.roleName}/>
                <GenerateModal {...modalProps}/>
                {authModalVisible && <AuthModal {...authModalProps}/>}
            </div>
        )
    }
}

export default connect(({role}) => ({role}))(Role)
