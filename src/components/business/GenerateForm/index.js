import React from 'react'
import {Form, Select, DatePicker, Row, Col, Input, Checkbox, Radio} from 'antd';
import { CertificateUpload} from '../../../components'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './index.less'

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea, Password} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group
const {RangePicker} = DatePicker;

/*目前支持的form表单类型*/
const mapTypeToComponent = {
    'label': '',
    'input': {
        WrappedComponent: Input,
    },
    'password': {
        WrappedComponent: Password,
    },
    'upload': {
        WrappedComponent: CertificateUpload,
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

class GenerateForm extends React.Component {
    //提供给父组件用的校验方法
    verify = callback => {
        let {prefix = 'formData'} = this.props
        this.props.form.validateFields((errors, fieldsValue) => {
            let values = {}

            /*剔除key中的"formData_" ，过滤空值*/
            for (let [k, v] of Object.entries(fieldsValue)) {
                let key = k.replace(`${prefix}_`, '')
                if (v) {
                    values[key] = v
                }
            }
            callback && callback(errors, values);
        });
    };
    //提供给父组件用的 重置表单方法
    resetFields = () => {
        return this.props.form.resetFields();
    }
    //提供给父组件用的 获取表单元素值方法
    getFieldValue = (key) => {
        let {prefix = 'formData'} = this.props
        return this.props.form.getFieldValue(`${prefix}_${key}`);
    }
    //提供给父组件用的 获取表单所有值方法
    getFieldValues = () => {
        let values = {},
            {prefix = 'formData'} = this.props,
            fieldsValue = this.props.form.getFieldsValue();

        /*剔除key中的"formData_" ，过滤空值*/
        for (let [k, v] of Object.entries(fieldsValue)) {
            let key = k.replace(`${prefix}_`, '')
            if (v) {
                values[key] = v
            }
        }
        return values
    }

    render() {
        /*formSet代表form表单的配置*/
        const {className, formSet, form, gutter = 32, prefix = 'formData'} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Form className={`${styles.generateFormWrap} ${className}`}>
                <Row gutter={gutter}>
                    {
                        formSet.map((item, key) => {
                            const options = {},
                                {
                                    isShow = true,
                                    rules,
                                    initialValue,
                                    type,
                                    label,
                                    props,
                                    span = 8,
                                    formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 16}}
                                } = item,
                                {WrappedComponent, defaultProps} = mapTypeToComponent[type.toLowerCase()],
                                name = `${prefix}_${item.name}`;   //name添加`${prefix}_`字符串，防止跟列表搜索表单、弹窗表单有id重复警告

                            options.rules = rules;
                            if (initialValue) {
                                options.initialValue = initialValue;
                            }

                            /*控制编辑、新增时,部分选型是否显示*/
                            if (!isShow) {
                                return null
                            }
                            /*select 、radiogroup、checkboxgroup等含有子项的组件 */
                            if (type.toLowerCase() === 'select' || type.toLowerCase() === 'radiogroup' || type.toLowerCase() === 'checkboxgroup') {
                                const {optionsData, SubComponent, style} = mapTypeToComponent[type.toLowerCase()]
                                const subOptionsData = item[optionsData]
                                const models = item.models;
                                const [vauleKey = 'value', labelKey = 'label'] = models || [];

                                return (
                                    <Col span={span} key={key}>
                                        <FormItem label={label} {...formItemLayout} >
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
                                return (
                                    <Col span={span} key={key}>
                                        <FormItem label={label} {...formItemLayout}>
                                            <span>{initialValue}</span>
                                            {
                                                item.addonAfter && <span style={{marginLeft: '5px'}}>{item.addonAfter}</span>
                                            }
                                        </FormItem>
                                    </Col>
                                )
                            }

                            return (
                                <Col span={span} key={key}>
                                    <FormItem label={label} {...formItemLayout} >
                                        {getFieldDecorator(name, options)(
                                            <WrappedComponent {...defaultProps} {...props} form={form}></WrappedComponent>
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
        )
    }
}

export default Form.create()(GenerateForm);
