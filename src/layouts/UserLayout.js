import React from 'react';
import {LocaleProvider, Layout} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

export default class UserLayout extends React.Component {
    render() {
        const {children} = this.props;
        return <LocaleProvider locale={zhCN}>{children}</LocaleProvider>;
    }
}
