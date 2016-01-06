var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: __dirname+'/src',
    entry: {
        main:'./js/main.js'
    },
    output: {
        path:'build/js',
        publicPath: '/build',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                //scss 文件编译并且生成css 文件块而不是直接Include到js文件里面
                test: /\.scss$/, loader: ExtractTextPlugin.extract(
                'css?sourceMap!' +
                'autoprefixer!' +
                'sass?sourceMap!'
                ,
                {
                    //我们通过在这里设置publicPath 来覆盖之前我们在output中写的publicPath
                    //我们在output 中设置的publicPath 会影响我们的hot-module的监听
                    publicPath: ''
                }
            )
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        //通过使用ExtractTextPlugin插件，就可以使得js 中require的css 独立出来
        new ExtractTextPlugin(
            '../css/[name].css',
            {
                allChunks: true
            }
        )
    ]
};
