import React from 'react';
import {connect} from 'dva';
import BasicLayout from "./BasicLayout";
import UserLayout from "./UserLayout";
import {userLayoutConfig} from "./config";

class Index extends React.Component {
    render() {
        const {location} = this.props,
            {pathname} = location;

        if (userLayoutConfig && userLayoutConfig.includes(pathname)) {
            return <UserLayout {...this.props} />;
        }

        return (
            <BasicLayout {...this.props} />
        );
    }
}


export default connect(({global}) => ({global}))(Index);
