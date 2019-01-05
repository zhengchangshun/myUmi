import React from 'react'
import {Menu, Icon} from 'antd';
import {TfIcon} from '../../index';
import withRouter from 'umi/withRouter'
import router from 'umi/router'
import styles from './index.less'

const SubMenu = Menu.SubMenu;

// let defaultSelectedMenu = {};

class MySider extends React.Component {
    state = {
        openKeys: [],
        defaultSelectedKey: ['1'],
    };

    componentWillMount() {
        /*菜单匹配Url路径*/
        const {history, menuList} = this.props;
        let path = history.location.pathname
        // 查找选中的目录
        let defaultSelectedMenu = this.getDefaultSelectedMenu(menuList, path) || {}
        let defaultSelectedMenuId = defaultSelectedMenu.menuId || '';
        let openKeys = this.getDefaultOpenKey(defaultSelectedMenuId)
        this.setState({
            defaultSelectedKey: [defaultSelectedMenuId],
            openKeys
        })
    }

    /*获取默认展开的菜单的menuId*/
    getDefaultOpenKey(menuId) {
        if (menuId.length) {
            const menuIdList = menuId.split('-').filter(i => i);
            const newMenuList = menuIdList.map((urlItem, index) => {
                return `${menuIdList.slice(0, index + 1).join('-')}`;
            });
            /*openKey 从根目录到当前层级的父元素*/
            return newMenuList.slice(0, newMenuList.length - 1)
        } else {
            return []
        }

    }

    /* url链接时，展开菜单*/
    getDefaultSelectedMenu = (data, url) => {
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i]
            if (item.children && item.children.length) {
                let selectedItem = this.getDefaultSelectedMenu(item.children, url)
                if (Object.keys(selectedItem).length) {
                    return selectedItem
                }
            } else {
                if (item.url === url) {
                    return item
                } else {
                    return {}
                }
            }
        }
    }
    /*只展开当前点击的菜单*/
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (latestOpenKey && latestOpenKey.indexOf(openKeys[0]) !== -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }
    /*菜单点击*/
    onClickItem = (item) => {
        const {history} = this.props;
        if (history.location.pathname !== item.url) {
            router.push(item.url);
        }
    }
    /*生成菜单项*/
    menuElems = (menuData) => menuData.map((item) => {
        /*存在子菜单*/
        if (item.children && item.children.length > 0) {
            return <SubMenu key={item.menuId} title={<span><TfIcon type={item.icon}/>{item.menuItemName}</span>}>
                {this.menuElems(item.children)}
            </SubMenu>;
        } else {
            /*不存在子菜单*/
            return <Menu.Item key={item.menuId}>
                <div onClick={() => this.onClickItem(item)}><TfIcon type={item.icon}/>{item.menuItemName}</div>
            </Menu.Item>
        }
    });

    render() {
        const {history, menuList} = this.props;
        return (
            <div className={styles.siderWrap}>
                <Menu mode="inline" defaultSelectedKeys={this.state.defaultSelectedKey} openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}>
                    {this.menuElems(menuList)}
                </Menu>
            </div>
        );
    }
}

export default withRouter(MySider)
