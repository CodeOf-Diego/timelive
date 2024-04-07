const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/assets/js/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output file name
  },  
  externals: {
    p: 'p'
  },
  optimization: {
    minimize: false, // Enable minimization
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false // Remove comments
          }
        },
        extractComments: false // Do not extract comments to a separate file
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the loader to all JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for transpiling
          options: {
            presets: ['@babel/preset-env'] // Use @babel/preset-env for ES6+ support
          }
        }
      }
    ]
  }
};