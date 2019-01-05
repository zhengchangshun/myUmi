/**
 * title: 测试页面
 */

/*在约定式路由里，注释必须写在文件头，否则将不被识别
title 的":" 与内容需要间隔空格，否则不被识别*/

import React from 'react'
import {connect} from 'dva';
import styles from './index.css';

class Example extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({
            type: "example/getMethodsHttp",
            payload: {
                test: '1111'
            }
        })

        this.props.dispatch({
            type: "example/postMethodsHttp",
            payload: {
                pageNum: 1,
                pageSize: 8
            }
        })
    }


    render() {
        return (
            <div className={styles.normal}>
                <h1>可以自行过react chrome devtool查看接口返回的数据。</h1>
                <div className={styles.welcome}/>
                <ul className={styles.list}>
                    <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
                    <li><a href="https://umijs.org/guide/getting-started.html">Getting Started</a></li>
                </ul>
            </div>
        )
    }
}

/*注入多个model*/
function mapStateToProps(state) {
    return {
        global: state.global,
        example: state.example,
        // loading: state.loading.effects['example/query'],  通过loading.effects注入接口的loading状态。
    };
}

export default connect(mapStateToProps)(Example);
