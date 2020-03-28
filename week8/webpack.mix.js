const mix = require('laravel-mix');

mix.js('src/scramble.js', 'js/master.js');

mix.options({
    hmrOptions: {
        host: 'vue-node',
        port: 80,
    }
});

mix.webpackConfig({
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: "vue-node",
        port: 80,
        watchOptions: {
            poll: true
        }
    },
});