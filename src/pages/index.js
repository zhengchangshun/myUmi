import React from 'react';
import {connect} from 'dva';

function Index(props) {
    return (
        <div>
            <p>欢迎来到企业管理后台</p>
        </div>
    );
}

export default connect(({global}) => ({global}))(Index);
