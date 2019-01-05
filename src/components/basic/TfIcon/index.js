require('./index.less');
/**
 * 图标控件
 * type: ICONFONT
 */

export default function TfIcon(props) {
    let {type, className = '', ...other} = props;
    return <i className={`icon iconfont ${'icon-' + type} ${className}`} {...other}></i>;
}