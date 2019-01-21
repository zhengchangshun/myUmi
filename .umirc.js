// ref: https://umijs.org/config/
export default {
    history: 'hash',
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: true,
            title: 'myUmi',
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
}
