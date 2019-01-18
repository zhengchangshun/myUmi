import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import styles from './index.less';

export default class CertificateUpload extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
    };
    // 关闭预览图片
    handleCancel = () => this.setState({ previewVisible: false });
    // 预览
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    // 数据发生变化
    handleChange = ({ file, fileList, event }) => {
        // console.log('888', file);
        // console.log('000', fileList);
        // console.log('444', event);
    };
    // 上传成功
    handleSuccess = response => {
        if (response.code === 0) {
            this.props.fileList.push({
                uid: response.data,
                url: response.data,
            });
            this.props.onChange && this.props.onChange(this.props.fileList);
        } else {
            message.error(response.msg);
        }
    };
    // 移除
    handleRemove = file => {
        const res = this.props.fileList.filter(item => item.url !== file.url);
        this.props.onChange && this.props.onChange(res);
    };
    // 上传文件之前的钩子
    handleBeforeUpload = file => {
        const isLegal = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isLegal) {
            message.error('图片文件必须是jpg、png！');
        }
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            message.error('图片文件必须小于3MB!');
        }
        return isLegal && isLt3M;
    };

    render() {
        const { previewVisible, previewImage } = this.state;
        const { fileList } = this.props;

        const uploadButton = (
            <div className={styles.defaultUploadWrap}>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const { maxFileList = 5, action = '', accept = '' } = this.props;
        return (
            <div className={styles.tfUploadWrap}>
                <Upload
                    action={action}
                    accept={accept}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    onSuccess={this.handleSuccess}
                    beforeUpload={this.handleBeforeUpload}
                >
                    {fileList.length >= maxFileList ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
