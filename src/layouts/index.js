import styles from './index.less';
import React from 'react'
import {connect} from 'dva';
import {LocaleProvider, Layout} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import router from 'umi/router'
import {MyHeader, MySider} from '../components/index'

const {Header, Sider, Content,} = Layout;

/*页面布局，可以理解为一级路由*/
class BasicLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    /* componentWillMount() {
		 if (this.props.location.pathname !== '/login') {
			 this.props.dispatch({
				 type: 'global/queryMenuList'
			 });
			 this.props.dispatch({
				 type: 'global/queryUserInfo'
			 });
		 }
	 }*/

    render() {
        const {global, location, children, dispatch} = this.props
        const {userInfo, menuList} = global
        const headerProps = {
            userInfo,
            onExit: () => {
                dispatch({
                    type: 'global/exit',
                    onComplete: () => {
                        router.push('/login')
                    }
                });
            },
        }
        const siderProps = {
            menuList
        };
        const MyFooter = () => (
            <div className={styles.footerContent}>Copyright © 2018 产品技术部出品</div>
        )

        if (location.pathname === '/login' || location.pathname === '/authorize') {
            return (
                <LocaleProvider locale={zhCN}>
                    <div>{children}</div>
                </LocaleProvider>
            )
        }
        return (
            <LocaleProvider locale={zhCN}>
                <Layout className={styles.normal}>
                    <Header>
                        <MyHeader {...headerProps}/>
                    </Header>
                    <Layout>
                        <Sider width="170">
                            <MySider {...siderProps}/>
                        </Sider>
                        <Content className={styles.contentWrap}>
                            <div className={styles.content}>
                                {children}
                            </div>
                            <MyFooter/>
                        </Content>
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }

}

export default connect(({global}) => ({global}))(BasicLayout)
