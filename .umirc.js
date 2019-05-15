// ref: https://umijs.org/config/
export default {
    history: 'hash',
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: true,
            title: '企业后台管理',
            routes: {
                exclude: [
                    /map\.(j|t)sx?$/,
                    /model\.(j|t)sx?$/,
                    /service\.(j|t)sx?$/,
                    /models\//,
                    /components\//,
                    /services\//,
                    /readme\.md/
                ],
            },
        }],
    ],
    /*移动端自适应配置，需要自行安装 postcss-flexbugs-fixes （解决移动端flex布局bug）、postcss-px-to-viewport（响应式布局）*/
    /*extraPostCSSPlugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-px-to-viewport')({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px`
        }),
    ],*/
    alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'services': path.resolve(__dirname, 'src/services'),
        'models': path.resolve(__dirname, 'src/models'),
        'lib': path.resolve(__dirname, 'src/lib'),
    }
}
