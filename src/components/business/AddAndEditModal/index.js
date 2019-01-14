import React from 'react'
import {Form, Modal, Button, Select, DatePicker, Row, Col, Input, Checkbox, Radio} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group
const {RangePicker} = DatePicker;

/*目前支持的form表单类型*/
const mapTypeToComponent = {
    'label': '',
    'input': {
        WrappedComponent: Input,
    },
    'select': {
        WrappedComponent: Select,
        defaultProps: {
            allowClear: true
        },
        optionsData: 'selectOptions',
        SubComponent: Option
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
    'checkboxgroup': {
        WrappedComponent: CheckboxGroup,
        optionsData: 'checkboxOptions',
        SubComponent: Checkbox,
        style: {
            marginLeft: '10px'
        }
    },
    'textarea': {
        WrappedComponent: TextArea,
    },
    'radiogroup': {
        WrappedComponent: RadioGroup,
        optionsData: 'radioOptions',
        SubComponent: Radio,
        style: {
            marginLeft: '10px'
        }
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
            let values = []
            if (errors) {
                return;
            }
            /*剔除key中的"modal_" ，过滤空值*/
            for (let [k, v] of Object.entries(fieldsValue)) {
                let key = k.replace('modal_', '')
                if (v) {
                    values[key] = v
                }
            }
            onOk && onOk(values);
        });
    }

    render() {
        const {modalForm, visible, modalKey, form, onCancel, title, width = 640, okText = '确定', cancelText = '取消'} = this.props;
        const {getFieldDecorator} = form;

        const modalOpts = {
            className: 'oil-modal',
            title,
            visible,
            width,
            maskClosable: false,
            onCancel,
            footer: <div>
                <Button onClick={onCancel}>取消</Button>
                <Button onClick={this.handleOk} type="primary" style={{marginRight:'50px'}}>确定</Button>
            </div>
        };
        return (
            <Modal {...modalOpts} key={modalKey}>
                <Form>
                    <Row gutter={32}>
                        {
                            modalForm.map((item, key) => {
                                const options = {},
                                    {
                                        isShow = true,
                                        rules,
                                        initialValue,
                                        type,
                                        label,
                                        props,
                                        span = 12,
                                        formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 16}}
                                    } = item,
                                    {WrappedComponent, defaultProps} = mapTypeToComponent[type.toLowerCase()],
                                    name = 'modal_' + item.name;   //name添加modal字符串，防止跟列表搜索表单有相同id

                                options.rules = rules;

                                if (initialValue) {
                                    options.initialValue = initialValue;
                                }

                                /*控制编辑、新增时,部分选型是否显示*/
                                if (!isShow) {
                                    return null
                                }

                                if (type.toLowerCase() === 'select' || type.toLowerCase() === 'radiogroup' || type.toLowerCase() === 'checkboxgroup') {
                                    const {optionsData, SubComponent, style} = mapTypeToComponent[type.toLowerCase()]
                                    const subOptionsData = item[optionsData]
                                    const models = item.models;
                                    const [vauleKey = 'value', labelKey = 'label'] = models || [];

                                    return (
                                        <Col span={span} key={key}>
                                            <FormItem label={label} {...formItemLayout} hasFeedback={type.toLowerCase() === 'select' ? true : false}>
                                                {getFieldDecorator(name, options)(
                                                    <WrappedComponent  {...defaultProps} {...props}>
                                                        {
                                                            subOptionsData.length > 0 && subOptionsData.map((v, i) => {
                                                                return <SubComponent key={i} value={v[vauleKey]} style={style}>{v[labelKey]}</SubComponent>
                                                            })
                                                        }
                                                    </WrappedComponent>
                                                )}
                                                {
                                                    item.addonAfter && item.addonAfter
                                                }
                                            </FormItem>
                                        </Col>
                                    );
                                }

                                /*文本*/
                                if (type.toLowerCase() === 'label') {
                                    <Col span={span} key={key}>
                                        <FormItem label={label} {...formItemLayout}>
                                            <span>{item.text}</span>
                                            {
                                                item.addonAfter && <span style={{marginLeft: '5px'}}>{item.addonAfter}</span>
                                            }
                                        </FormItem>
                                    </Col>
                                }
                                return (
                                    <Col span={span} key={key}>
                                        <FormItem label={label} {...formItemLayout} hasFeedback={type.toLowerCase() === 'checkbox' ? false : true}>
                                            {getFieldDecorator(name, options)(
                                                <WrappedComponent {...defaultProps} {...props}></WrappedComponent>
                                            )}
                                            {
                                                item.addonAfter && item.addonAfter
                                            }
                                        </FormItem>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Form>
            </ Modal>
        )
    }
}

export default Form.create()(AddAndEditModal);
