import {User_Role_Status} from '../../../lib/enum'
import {patternPhone} from '../../../lib/verify'
import {Popconfirm} from 'antd'

/*搜索条件*/
export function listFiltles(_self) {
    return [
        {
            type: 'input',
            name: 'partyName',
            label: '会员名',
        },
        {
            type: 'input',
            name: 'name',
            label: '姓名',
        },
        {
            type: 'input',
            name: 'phone',
            label: '手机号',
        },
        {
            type: 'select',
            name: 'roleId',
            label: '角色名称',
            selectOptions: _self.props.userList.roleList,
            models: ['id', 'roleName']
        },
        {
            type: 'select',
            name: 'companyPartyId',
            label: '所属分公司',
            selectOptions: _self.props.userList.branchCompanyList
        },
        {
            type: 'select',
            name: 'status',
            label: '状态',
            selectOptions: User_Role_Status,
        },
    ];
}

/*表格*/
export function tableColumns(_self) {
    return [
        {
            title: '用户名',
            dataIndex: 'partyName',
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role, record) => record.role.map((item, key) => (
                <span key={key}>{item.roleName}</span>
            ))
        },
        {
            title: '所属分公司',
            dataIndex: 'companyName',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'button',
            width: '190px',
            render: (button, record) => {
                let deleteText = '确认删除该用户？',
                    buttons = [
                        {name: '编辑', method: 'editHandel',},
                        {name: '删除', method: 'deleteHandel', type: 'confirm', title: deleteText},
                    ];

                return (
                    <div>
                        {
                            buttons.map((item, index) => {
                                return (
                                    item.type == 'confirm' ?
                                        <Popconfirm key={index} placement="topLeft" title={item.title} onConfirm={() => _self[item.method](record)} okText="确定" cancelText="取消">
                                            <a className='mr10' href="javascript:;">{item.name}</a>
                                        </Popconfirm> :
                                        <a key={index} className='mr10' href="javascript:;" onClick={() => _self[item.method](record)}>{item.name}</a>
                                )
                            })
                        }
                    </div>
                )
            }
        },
    ]
}

/*新增、编辑弹窗*/
export function modalSet(_self) {
    return [
        {
            type: 'input',
            name: 'partyName',
            label: '会员名',
            initialValue: _self.props.userModal.partyName,
            props: {
                disabled: _self.props.userModal.isEdit,
            },
            rules: [
                {required: true, message: '请输入会员名'},
                {max: 20, message: '字数为6-20个字'},
                {min: 6, message: '字数为6-20个字'}
            ]
        },
        {
            type: 'input',
            name: 'name',
            label: '姓名',
            initialValue: _self.props.userModal.name,
            rules: [
                {required: true, message: '请输入姓名'},
                {max: 20, message: '字数不能超过20个字'}
            ]
        },
        {
            type: 'input',
            name: 'phone',
            label: '手机号',
            initialValue: _self.props.userModal.phone,
            rules: [
                {required: true, message: '请输入手机号'},
                {pattern: patternPhone, message: '手机号格式不正确'}
            ]
        },
        {
            type: 'checkboxgroup',
            name: 'roles',
            label: '角色名称',
            span: 24,
            formItemLayout: {
                labelCol: {span: 4}, wrapperCol: {span: 20}
            },
            initialValue: _self.props.userModal.roles,
            models: ['id', 'roleName'], // 对应option中value，label取值的key
            checkboxOptions: _self.props.userList.roleList
        },
        {
            type: 'input',
            name: 'password',
            label: '密码',
            props: {
                type: 'password'
            },
            initialValue: _self.props.userModal.password,
            rules: [
                {required: true, message: '请输入密码'},
                {max: 20, message: '字数不能超过20个字'}
            ]
        },
        {
            type: 'input',
            name: 'confirmPassword',
            label: '确认密码',
            props: {
                type: 'password'
            },
            initialValue: _self.props.userModal.confirmPassword,
            rules: [
                {validator: _self.comfirmPassword}
            ]
        },
        {
            type: 'textarea',
            name: 'remark',
            label: '备注',
            span: 24,
            formItemLayout: {
                labelCol: {span: 4}, wrapperCol: {span: 20}
            },
            props: {
                autosize: {minRows: 3, maxRows: 6}
            },
            initialValue: _self.props.userModal.remark,
            rules: [
                {max: 200, message: '字数不能超过200个字'}
            ],
        },
        {
            type: 'radiogroup',
            name: 'status',
            label: '分公司是否有效',
            isShow: _self.props.userModal.isEdit, /*编辑时显示*/
            span: 24,
            formItemLayout: {
                labelCol: {span: 4}, wrapperCol: {span: 20}
            },
            initialValue: _self.props.userModal.status,
            radioOptions: [
                {value: '启用', label: '启用'},
                {value: '禁用', label: '禁用'}
            ],
            rules: [
                {required: true, message: '请选择分公司是否有效'},
            ],
        }
    ]
}
