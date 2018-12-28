pages目录下：
    umi 里约定目录下有 _layout.js 时会生成嵌套路由，以 _layout.js 为该目录的 layout 。
    
    符合以下正则的文件夹、文件不会生成路由信息
        /model\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
        /readMe\.md/

    page model 为 page js 所在路径下 models/**/*.js 的文件
    page model 会向上查找，比如 page js 为 pages/a/b.js，他的 page model 为 pages/a/b/models/**/*.js + pages/a/models/**/*.js，依次类推
    约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/**/*.js
