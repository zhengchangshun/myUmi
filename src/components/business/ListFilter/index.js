import React, {Component} from 'react'
import {Button} from 'antd';
import GenerateForm from '../GenerateForm'
import styles from './index.less'


export default class ListFilter extends React.Component {
    /*搜索*/
    onSearch = () => {
        this.generateForm.verify((error, values) => {
            if (error) {
                return
            }
            this.props.onSearch && this.props.onSearch(values);
        })
    }

    /*重置*/
    onReset = () => {
        this.generateForm.resetFields();
        /*对外暴露reset方法*/
        this.props.onReset && this.props.onReset()
    }
    /*对外暴露form的实例*/
    generateFormInstance = () => {
        return this.generateForm;
    }

    render() {
        const {
            filters,
            searchBtnText = '查询', /* 搜索按钮文案*/
            resetBtnText = '清除' /* 清除按钮文案*/
        } = this.props;

        /*搜索列表如果没有设置, 默认为一行3个*/
        filters.forEach(item => {
            if (!item.span) {
                item.span = 8;
            }
        })


        return (
            <div>
                <div className={styles.listFilterWrap}>
                    <GenerateForm formSet={filters} wrappedComponentRef={el => (this.generateForm = el)}/>
                    <div className={styles.btnGroup}>
                        <Button type="primary" onClick={this.onSearch}>{searchBtnText}</Button>
                        <Button type="default" onClick={this.onReset}>{resetBtnText}</Button>
                    </div>
                </div>
            </div>
        )
    }
}



