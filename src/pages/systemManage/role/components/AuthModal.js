import React from 'react';
import {Button, Modal, Tree} from 'antd';

const {TreeNode} = Tree;
export default class AuthModal extends React.Component {
    state = {
        checkedKeys: [],
    }

    constructor(props) {
        super(props)
    }


    componentWillMount() {
        this.getDefaultCheckedKeys(this.props.authList)
    }


    handleOk = () => {

    }

    onCheck = (checkedKeys, info) => {
        console.log(checkedKeys);
        this.setState({
            checkedKeys
        })
    }
    /*获取选中的树节点*/
    getDefaultCheckedKeys = data => data.forEach((item) => {
        if (item.children) {
            this.getDefaultCheckedKeys(item.children)
        } else {
            if (item.hasAuth) {
                let checkedKeys = this.state.checkedKeys;
                checkedKeys.push(item.key);
                this.setState({checkedKeys})
            }
        }
    })

    /*递归生成树结构*/
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} dataRef={item}/>;
    })

    render() {
        const {authList, visible, modalKey, form, onCancel} = this.props;
        const modalOpts = {
            className: 'oil-modal',
            title: '权限',
            visible,
            width: 520,
            maskClosable: false,
            onCancel,
            footer: <div>
                <Button onClick={onCancel}>取消</Button>
                <Button onClick={this.handleOk} type="primary" style={{marginRight: '50px'}}>确定</Button>
            </div>
        };
        const treeProps = {
            checkable: true, /*可选择*/
            defaultExpandAll: true, /*默认展开所有树节点*/
            checkedKeys: this.state.checkedKeys, /*默认选中的树节点*/
            onCheck: this.onCheck
        }

        return (
            <Modal {...modalOpts} key={modalKey}>
                <Tree  {...treeProps}>
                    {this.renderTreeNodes(authList)}
                </Tree>
            </Modal>
        )
    }
}
