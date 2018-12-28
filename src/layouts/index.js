import styles from './index.css';

/*页面布局，可以理解为一级路由*/
function BasicLayout(props) {
    /*不同的全局 layout你可能需要针对不同路由输出不同的全局 layout，umi 不支持这样的配置，
    但你仍可以在 layouts/index.js 对 location.path 做区分，渲染不同的 layout。*/
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi! (一级路由)</h1>
        { props.children }
    </div>
  );
}

export default BasicLayout;
