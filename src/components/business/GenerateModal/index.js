import React from 'react'
import {Modal, Button} from 'antd';
import GenerateForm from '../GenerateForm'
import styles from './index.less'

export default class GenerateModal extends React.Component {
    /*确定*/
    handelOk = () => {
        this.generateModal.verify((error, values) => {
            if (error) {
                return
            }
            this.props.onOk && this.props.onOk(values);
        })
    }
    /*取消*/
    handelCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }
    /*对外暴露Form的实例*/
    getForm = () => {
        return this.generateModal.getForm();
    }

    render() {
        const {modalForm, visible, key, title, width = 700, hasOkBtn = true, okText = '确定', hasCancelBtn = true, cancelText = '取消'} = this.props;
        const modalOpts = {
            visible,
            key,
            title,
            width,
            maskClosable: false,
            onCancel: this.handelCancel,
            footer: <div>
                {hasCancelBtn && <Button onClick={this.handelCancel}>{cancelText}</Button>}
                {hasOkBtn && <Button onClick={this.handelOk} type="primary">{okText}</Button>}
            </div>
        };

        /*modal弹窗如果没有设置，默认一行2个*/
        modalForm.forEach(item => {
            if (!item.span) {
                item.span = 12;
            }
        })

        return (
            <Modal {...modalOpts} className={styles.generateModal}>
                <GenerateForm formSet={modalForm} wrappedComponentRef={el => (this.generateModal = el)}/>
            </ Modal>
        )
    }
}

