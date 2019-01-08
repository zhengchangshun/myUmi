import React from 'react'
import {Form, Modal, Button, Select, DatePicker, Row, Col, Input, Checkbox, Radio} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;

/*目前支持的form表单类型*/
const mapTypeToComponent = {
    'input': {
        WrappedComponent: Input,
    },
    'select': {
        WrappedComponent: Select,
        defaultProps: {
            allowClear: true
        }
    },
    'datepicker': {
        WrappedComponent: DatePicker,
        defaultProps: {
            locale,
        }
    },
    'rangepicker': {
        WrappedComponent: RangePicker,
        defaultProps: {
            locale
        }
    },
    'checkbox': {
        WrappedComponent: Checkbox,
    },
    'textarea': {
        WrappedComponent: TextArea,
    },
    'radiogroup': {
        WrappedComponent: RadioGroup,
    },
}

class AddAndEditModal extends React.Component {
    constructor(props) {
        super(props)
    }


    handleOk = () => {
        const {form, onOk} = this.props;
        const {validateFields} = form;

        validateFields((errors, fieldsValue) => {
            if (errors) {
                return;
            }
            let values = {
                ...fieldsValue
            };
            onOk && onOk(values);
        });
    }

    render() {
        const {modalForm, visible, modalKey, form, onCancel, title, width = 700, okText = '确定', cancelText = '取消'} = this.props;
        const {getFieldDecorator} = form;

        const modalOpts = {
            className: 'tf-modal',
            title,
            visible,
            width,
            maskClosable: false,
            onCancel,
            footer: <div>
                <Button onClick={this.handleOk} type="primary">确定</Button>
                <Button onClick={onCancel}>取消</Button>
            </div>
        };
        return (
            <Modal {...modalOpts} key={modalKey}>
                <Form>
                    <Row gutter={32}>
                        {
                            modalForm.map((item, key) => {
                                const {
                                        isShow = true,
                                        rules,
                                        initialValue,
                                        type,
                                        label,
                                        name,
                                        props,
                                        span = 12,
                                        formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 16}}
                                    } = item,
                                    options = {},
                                    {WrappedComponent, defaultProps} = mapTypeToComponent[type.toLowerCase()]

                                options.rules = rules;
                                if (initialValue) {
                                    options.initialValue = initialValue;
                                }

                                /*控制编辑、新增时,部分选型是否显示*/
                                if (!isShow) {
                                    return null
                                }

                                /*select*/
                                if (type.toLowerCase() === 'select') {
                                    const selectOptions = item.selectedOptions
                                    return (
                                        <Col span={span} key={key}>
                                            <FormItem label={label} {...formItemLayout}>
                                                {getFieldDecorator(name, options)(
                                                    <WrappedComponent  {...defaultProps} {...props}>
                                                        {
                                                            selectOptions.length > 0 && selectOptions.map((v, i) => {
                                                                return <Option key={i} value={v.value}>{v.label}</Option>
                                                            })
                                                        }
                                                    </WrappedComponent>
                                                )}
                                                {
                                                    item.addonAfter && <span style={{marginLeft: '5px'}}>{item.addonAfter}</span>
                                                }
                                            </FormItem>
                                        </Col>
                                    );
                                }

                                /*radioGroup*/
                                if (type.toLowerCase() === 'radiogroup') {
                                    const radioOptions = item.radioOptions
                                    return (
                                        <Col span={span} key={key}>
                                            <FormItem label={label} {...formItemLayout}>
                                                {getFieldDecorator(name, options)(
                                                    <WrappedComponent  {...defaultProps} {...props}>
                                                        {
                                                            radioOptions.length > 0 && radioOptions.map((v, i) => {
                                                                return <Radio key={i} value={v.value} style={{marginLeft: '10px'}}>{v.label}</Radio>
                                                            })
                                                        }
                                                    </WrappedComponent>
                                                )}
                                                {
                                                    item.addonAfter && <span style={{marginLeft: '5px'}}>{item.addonAfter}</span>
                                                }
                                            </FormItem>
                                        </Col>
                                    );
                                }

                                return (
                                    <Col span={span} key={key}>
                                        <FormItem label={label} {...formItemLayout} hasFeedback>
                                            {getFieldDecorator(name, options)(
                                                <WrappedComponent {...defaultProps} {...props}></WrappedComponent>
                                            )}
                                            {
                                                item.addonAfter && <span style={{marginLeft: '5px'}}>{item.addonAfter}</span>
                                            }
                                        </FormItem>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(AddAndEditModal);
