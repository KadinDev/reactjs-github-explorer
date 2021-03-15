const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map': 'source-map',
    // sempre que tiver __dirname ( ele vai pegar o diretório onde está o file )
    // ae ele coloca a barra de acordo com o sistema operacional. __dirnname, 'src', 'index.jsx'
    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
        // vai ler arquivo js ou jsx
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true
    },

    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),

    module: {
        rules: [
            {   // test recebe expressão regular, pra dizer se o file é js ou não
                test: /\.(j|t)sx$/,
                
                /* excluir todos os files do node_modules pq por padrão eles já
                vem prontos para o browser ler */
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}