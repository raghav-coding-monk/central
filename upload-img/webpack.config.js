const path = require("path")


module.exports = {
  entry: "./app/Main.js",
  output: {
  filename: 'bundled.js',
  path: path.resolve(__dirname, 'dist'), // or 'public'
  publicPath: '/' // <--- THIS IS CRITICAL
},
  mode: "development",
  devtool: "source-map",
  devServer: {
   static: {
    directory: path.join(__dirname, 'public'),
  },
  historyApiFallback: true, // This helps with routing/refreshing issues
  port: 1000,
  },
   

  module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }]
          ]
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
}
