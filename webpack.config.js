var path = require("path");
var config = {
   entry: './main.js',

   output: {
      path: path.resolve(__dirname, "./"),
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react', 'stage-1']
            }
         },
         { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
   }
}

module.exports = config;
