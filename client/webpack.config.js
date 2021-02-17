const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: "./src",
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: "./index.html",  //target html
            template: "./src/index.html" //source html
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 4000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
        }
        // proxy: {
        //     "/api/**": {
        //         target: 'http://localhost:3000',
        //         secure: false,
        //         changeOrigin: true
        //     }
        // }
    },
}
