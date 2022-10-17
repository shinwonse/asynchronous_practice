const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    // webpack-dev-server v4.0.0부터는 HMR이 default로 설정되어있다.
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
  };
};
