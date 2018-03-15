var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader']},
            { test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: { presets: ['es2015', 'react'] }
            },
            { test: /\.png$/, 
              loader: "url-loader?limit=100000" 
            },
            { test: /\.jpg$/, 
              loader: "file-loader" 
            },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
              loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
              loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
              loader: 'file'
            },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
              loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};