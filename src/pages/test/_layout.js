import React from 'react'
import {connect} from 'dva';

/*相当于二级路由*/
export default function (props) {
    return (
        <div>
            <h1>this is test layout (二级路由)</h1>
            {props.children}
        </div>
    )
}
