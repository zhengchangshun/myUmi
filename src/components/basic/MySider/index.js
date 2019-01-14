import React from 'react'
import {Menu, Icon} from 'antd';
import {TfIcon} from '../../index';
import withRouter from 'umi/withRouter'
import router from 'umi/router'
import styles from './index.less'

const SubMenu = Menu.SubMenu;

class MySider extends React.Component {
    state = {
        menuIdMapping: {}, //子菜单 - 父菜单 menuId 的映射关系
        openKeys: [],
        defaultSelectedKey: ['1'],
    };

    componentWillReceiveProps(nextProps) {
        /*if(this.props.menuList.length !== nextProps.menuList.length){

        }*/
        /*菜单匹配Url路径*/
        const {history, menuList} = nextProps;
        let path = history.location.pathname
        /*构造菜单父子id映射关系*/
        let menuIdMapping = this.setMenuIdMapping(menuList)
        /*获取当前选中的菜单项*/
        let defaultSelectedMenu = this.getDefaultSelectedMenu(menuList, path) || {}
        /*获取当前选中的菜单项- menuId*/
        let defaultSelectedMenuId = defaultSelectedMenu.menuId || '';
        /*获取当前选中的菜单项的父菜单的menuId的集合- openKey*/
        let openKeys = this.getParentMenuId(menuIdMapping, defaultSelectedMenuId)
        this.setState({
            menuIdMapping,
            defaultSelectedKey: [defaultSelectedMenuId],
            openKeys: openKeys.reverse()
        })
    }

    /*构造菜单父子id映射关系*/
    setMenuIdMapping(data, parentMenuId = '') {
        let mapping = {}
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let currentMenuId = item.menuId;
            mapping = Object.assign({}, mapping, {[currentMenuId]: parentMenuId})
            if (item.children && item.children.length) {
                let subMapping = this.setMenuIdMapping(item.children, currentMenuId)
                mapping = Object.assign({}, mapping, subMapping)
            }
        }
        return mapping
    }
    /*获取父菜单menuId的集合*/
    getParentMenuId(menuIdMapping, key) {
        let openKeys = [],
            parentMenuId = menuIdMapping[key];

        if (parentMenuId) {
            openKeys.push(parentMenuId);
            openKeys.push(...this.getParentMenuId(menuIdMapping, parentMenuId))
        }
        return openKeys
    }
    /* url链接时，展开菜单*/
    getDefaultSelectedMenu = (data, url) => {
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i]
            if (item.children && item.children.length) {
                let selectedItem = this.getDefaultSelectedMenu(item.children, url)
                if (selectedItem && Object.keys(selectedItem).length) {
                    return selectedItem
                }
            } else {
                if (item.url === url) {
                    return item
                }
            }
        }
    }
    /*只展开当前点击的菜单*/
    onOpenChange = (openKeysList) => {
        console.log(openKeysList);
        let lastOpenKey = openKeysList[openKeysList.length - 1];
        /*获取当前最后一个展开菜单的父菜单MenuId集合*/
        let openKeys = this.getParentMenuId(this.state.menuIdMapping, lastOpenKey)
        openKeys.push(lastOpenKey);
        this.setState({openKeys});
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
            return <SubMenu key={item.menuId} title={<span><TfIcon type={item.icon} className={styles.menuIcon}/><span>{item.menuItemName}</span></span>}>
                {this.menuElems(item.children)}
            </SubMenu>;
        } else {
            /*不存在子菜单*/
            return <Menu.Item key={item.menuId}>
                <div onClick={() => this.onClickItem(item)}>
                    <TfIcon type={item.icon} className={styles.menuIcon}/>
                    <span>{item.menuItemName}</span>
                </div>
            </Menu.Item>
        }
    });

    render() {
        const {history, menuList} = this.props;
        return (
            <div className={styles.siderWrap}>
                <Menu mode="inline" selectedKeys={this.state.defaultSelectedKey} openKeys={this.state.openKeys}
                      onOpenChange={this.onOpenChange}>
                    {this.menuElems(menuList)}
                </Menu>
            </div>
        );
    }
}

export default withRouter(MySider)
