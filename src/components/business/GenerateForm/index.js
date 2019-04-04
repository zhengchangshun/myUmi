import React from 'react'
import PropTypes from 'prop-types'
import {Form, Select, DatePicker, Row, Col, Input, InputNumber, Checkbox, Radio} from 'antd';
import {CertificateUpload, NumRange, TimePickerRange} from '../../../components'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './index.less'

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea, Password} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group
const {RangePicker, MonthPicker} = DatePicker;

/*目前支持的form表单类型*/
const mapTypeToComponent = {
    'label': '',
    'input': {
        WrappedComponent: Input,
    },
    'inputnumber': {
        WrappedComponent: InputNumber,
    },
    'password': {
        WrappedComponent: Password,
    },
    'numrange': {
        WrappedComponent: NumRange,
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
    'timepickerrange': {
        WrappedComponent: TimePickerRange
    },
    'datepicker': {
        WrappedComponent: DatePicker,
        defaultProps: {
            locale,
        }
    },
    'monthpicker': {
        WrappedComponent: MonthPicker,
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
        this.props.form.validateFields((errors, fieldsValue) => {
            callback && callback(errors, fieldsValue);
        });
    };
    /*form 实例*/
    getForm = () => {
        return this.props.form
    }

    render() {
        /*formSet代表form表单的配置*/
        const {className = '', formSet, form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Form className={`${styles.generateFormWrap} ${className}`}>
                <Row>
                    {
                        formSet.map((item, key) => {
                            const {
                                    isShow = true,  //该配置项是否显示
                                    rules,          //nt design Form原生校验规则
                                    initialValue,   //nt design Form原生初始值
                                    validate = [],  //ant design Form原生校验属性
                                    type,           //组件类型
                                    label,          //nt design Form原生表单项label
                                    colon = true,   //nt design Form原生：是否显示label后边的冒号
                                    props,          //外部传入给组件的属性
                                    name,           //nt design Form原生name属性
                                    span = 8,       //表单项的布局长度
                                    formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 16}} //表单项lable、表单组件的布局
                                } = item,
                                {WrappedComponent, defaultProps} = mapTypeToComponent[type.toLowerCase()],

                                options = {
                                    rules,
                                    validate
                                };

                            if ('initialValue' in item) {
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
                                const models = item.models; //option项的映射关系，表示value和label的取值字段
                                const [vauleKey = 'value', labelKey = 'label'] = models || [];

                                return (
                                    <Col span={span} key={key}>
                                        <FormItem label={label} colon={colon} {...formItemLayout}  >
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
                                        <FormItem label={label} colon={colon} {...formItemLayout}>
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
                                    <FormItem label={label} colon={colon} {...formItemLayout} >
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


GenerateForm.propTypes = {
    formSet: PropTypes.array, //表单配置项
    className: PropTypes.string, //外部传入的class
}
export default Form.create()(GenerateForm);
