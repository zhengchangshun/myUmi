import React, {Component} from 'react'
import {Form, Button, Row, Col, message, Input, Select, DatePicker} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './index.less'

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;

const mapTypeToComponent = {
    'input': {
        WrappedComponent: Input,
        defaultProps: {}
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
    }
}

function ListFilter(props) {
    const {
        filters, /*搜索内容*/
        form: {getFieldDecorator}, /* form组件，getFieldDecorator等方法*/
        formItemLayout = {labelCol: {span: 8}, wrapperCol: {span: 16}}, /* form组件，label与内容的布局*/
        gutter = 8, /* row栅格间距*/
        searchBtnText = '查询', /* 搜索按钮文案*/
        resetBtnText = '清除' /* 清除按钮文案*/
    } = props;

    /*搜索*/
    function onSearch() {
        const values = props.form.getFieldsValue();
        const keys = Object.keys(values);
        let newObj = {};
        for (const key of keys) {
            if (values[key]) {
                newObj[key] = values[key];
            }
        }
        console.log(newObj);
        props.onSearch && props.onSearch(newObj);
    }

    /*重置*/
    function onReset() {
        props.form.resetFields();
    }

    /*通过map文件生成组件*/
    function Generator(formItem) {
        let {type, name, props, rules, initialValue, selectOptions = [], label, span = 8} = formItem
        let options = {};

        options.rules = rules;
        if (initialValue) {
            options.initialValue = initialValue;
        }
        let {WrappedComponent, defaultProps} = mapTypeToComponent[type.toLowerCase()]

        if (type.toLowerCase() === 'select') {
            return (
                <Col span={span}>
                    <FormItem label={label} {...formItemLayout}>
                        {getFieldDecorator(name, options)(
                            <WrappedComponent  {...defaultProps} {...props}>
                                {
                                    selectOptions.length > 0 && selectOptions.map((item, index) => {
                                        return <Option key={index} value={item.value}>{item.label}</Option>
                                    })
                                }
                            </WrappedComponent>
                        )}
                    </FormItem>
                </Col>
            );
        }
        return (
            <Col span={span}>
                <FormItem label={label} {...formItemLayout}>
                    {getFieldDecorator(name, options)(
                        <WrappedComponent  {...defaultProps} {...props}/>
                    )}
                </FormItem>
            </Col>
        );
    }

    return (
        <Form className={styles.listFilterWrap}>
            <div className={styles.filterContent}>
                <Row gutter={gutter} className={styles.filterRow}>
                    {
                        filters.map((formItem, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {Generator(formItem)}
                                </React.Fragment>
                            )
                        })
                    }
                </Row>
            </div>
            <div className={styles.btnGroup}>
                <Button type="primary" onClick={onSearch}>{searchBtnText}</Button>
                <Button type="default" onClick={onReset}>{resetBtnText}</Button>
            </div>
        </Form>
    )
}

export default Form.create()(ListFilter);
