const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, 'src');

const config = {
  entry: ['babel-polyfill', path.resolve(sourcePath, 'App.js')],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [sourcePath, path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: sourcePath,
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      }
    ],
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  );
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  config.plugins.push(new webpack.HashedModuleIdsPlugin());
}

module.exports = config;
