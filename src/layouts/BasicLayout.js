import styles from './index.less';
import React from 'react';
import {LocaleProvider, Layout} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import router from 'umi/router';
import {MyHeader, MySider, Authorized} from '../components';

const {Header, Sider, Content} = Layout;

/*页面布局，可以理解为一级路由*/
export default class BasicLayout extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;
       /* /!*查询用户信息*!/
        dispatch({
            type: 'global/queryUserInfo',
        })

        /!*查询菜单数据*!/
        dispatch({
            type: 'global/queryMenuList'
        });*/
    }

    render() {
        const {global, children, dispatch} = this.props;
        const {userInfo, menuList} = global;

        const authProps = {
            userInfo,
            menuList,
        };
        const headerProps = {
            userInfo,
            onExit: () => {
                dispatch({
                    type: 'global/exit',
                }).then(() => {
                    router.push('/login');
                });
            },
        };
        const siderProps = {
            menuList,
        };
        const MyFooter = () => (
            <div className={styles.footerContent}>Copyright © 2018产品技术部出品</div>
        );

        return (
            <LocaleProvider locale={zhCN}>
                <Authorized {...authProps}>
                    <Layout className={styles.normal}>
                        <Header>
                            <MyHeader {...headerProps} />
                        </Header>
                        <Layout>
                            <Sider width="170">
                                <MySider {...siderProps} />
                            </Sider>
                            <Content className={styles.contentWrap}>
                                <div className={styles.content}>{children}</div>
                                <MyFooter/>
                            </Content>
                        </Layout>
                    </Layout>
                </Authorized>
            </LocaleProvider>
        );
    }
}

