import React from 'react'
import {connect} from 'dva';

function TestList({testA, testB, home}) {
    return (
        <div>
            <ul>
                <li>{testA.text}</li>
                <li>{testB.text}</li>
            </ul>
        </div>
    )
}



export default connect(({testA, testB}) => ({testA, testB}))(TestList)
