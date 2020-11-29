const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {   
    mode: 'development', 
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: [
                            "@babel/preset-react",
                            "@babel/env"]
                    }  
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|otf|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },    
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devtool: 'source-map'
}