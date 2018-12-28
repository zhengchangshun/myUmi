import React from 'react'
import {connect} from 'dva';
import global from "../models/global";

function Index(props) {
    return (
        <div>
            <h2>this is index page</h2>
            <h3>
                {props.global.text}
            </h3>
        </div>
    )
}

export default connect(({global}) => ({global}))(Index)
