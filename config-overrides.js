const { override, fixBabelImports, addLessLoader, overrideDevServer } = require('customize-cra');

const CompressionWebpackPlugin = require('compression-webpack-plugin');

const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        // 配置打包后的文件位置
        // config.output.path = __dirname + '../dist/demo/';
        config.output.publicPath = './';
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024,
            }),
        )
    }

    return config;
}

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        // 服务开启gzip
        compress: true,
        proxy: {
            '/api': {
                target: 'https://www.bobsam.club',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                },
            }
        }
    }
}

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1890ff' },
        }),
        addCustomize()
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
};
