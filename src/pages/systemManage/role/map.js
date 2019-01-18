import {User_Role_Status, Role_Auth_Type} from '../../../lib/enum'
import {Popconfirm} from 'antd'

export function listFiltles(_self) {
    return [
        {
            type: 'input',
            name: 'roleName',
            label: '角色名称',
        },
        {
            type: 'select',
            name: 'roleStatus',
            label: '状态 ',
            selectOptions: User_Role_Status,
        },
        {
            type: 'select',
            name: 'permissionStatus',
            label: '是否设置权限',
            selectOptions: Role_Auth_Type,
        }
    ];
}

/*表格*/
export function tableColumns(_self) {
    return [
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '状态',
            dataIndex: 'roleStatus'
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '是否设置权限',
            dataIndex: 'permissionStatus',
        },
        {
            title: '创建时间',
            dataIndex: 'gmtCreate',
        },
        {
            title: '操作',
            dataIndex: 'button',
            width: '190px',
            render: (button, record) => {
                let deleteText = '确认删除该用户？',
                    buttons = [
                        {name: '编辑', method: 'editHandel',},
                        {name: '设置权限', method: 'setAuthHandel',},
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
            name: 'roleName',
            label: '角色名称',
            initialValue: _self.props.role.roleName,
            props: {
                disabled: _self.props.role.isEdit,
            },
            rules: [
                {required: true, message: '请输入角色名'},
                {max: 10, message: '字数不能超过10个字'},
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
            initialValue: _self.props.role.remark,
            rules: [
                {max: 200, message: '字数不能超过200个字'}
            ],
        },
        {
            type: 'radiogroup',
            name: 'roleStatus',
            label: '状态',
            isShow: _self.props.role.isEdit, /*编辑时显示*/
            span: 24,
            formItemLayout: {
                labelCol: {span: 4}, wrapperCol: {span: 20}
            },
            initialValue: _self.props.role.roleStatus || '启用',
            radioOptions: [
                {value: '启用', label: '启用'},
                {value: '禁用', label: '禁用'}
            ],
            addonAfter: <div style={{marginLeft: '5px',color:'#9BA0AA',fontSize:'12px'}}>注：角色禁用后，角色下面的用户也会禁用，请先对用户进行管理。</div>,
        }
    ]
}
