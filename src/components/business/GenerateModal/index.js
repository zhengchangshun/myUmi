import React from 'react'
import {Modal, Button} from 'antd';
import GenerateForm from '../GenerateForm'

export default class GenerateModal extends React.Component {
    handleOk = () => {
        this.generateForm.verify((error, values) => {
            if (error) {
                return
            }
            this.props.onOk && this.props.onOk(values);
        })
    }
    /*对外暴露form的实例*/
    generateFormInstance = () => {
        return this.generateForm;
    }

    render() {
        const {modalForm, visible, modalKey, onCancel, title, width = 640, hasOkBtn = true,okText = '确定', cancelText = '取消'} = this.props;
        const modalOpts = {
            className: 'oil-modal',
            title,
            visible,
            width,
            maskClosable: false,
            onCancel,
            footer: <div>
                <Button onClick={onCancel}>{cancelText}</Button>
                {hasOkBtn && <Button onClick={this.handleOk} type="primary" style={{marginRight: '50px'}}>{okText}</Button>}
            </div>
        };

        /*modal弹窗如果没有设置，默认一行2个*/
        modalForm.forEach(item => {
            if (!item.span) {
                item.span = 12;
            }
        })

        return (
            <Modal {...modalOpts} key={modalKey}>
                <GenerateForm formSet={modalForm}  wrappedComponentRef={el => (this.generateForm = el)}/>
            </ Modal>
        )
    }
}

