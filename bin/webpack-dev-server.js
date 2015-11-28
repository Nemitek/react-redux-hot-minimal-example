var path             = require('path'),
    chalk            = require('chalk'),
    webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('../webpack.config');

var server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase : path.resolve(__dirname, '/../src'),
  hot    : true,
  quiet  : false,
  noInfo : false,
  lazy   : false,
  stats  : {
    colors : true
  },
  historyApiFallback : true
});

server.listen(3000, '0.0.0.0', function () {
  console.log(chalk.green(
    'webpack-dev-server is now running at 0.0.0.0:3000'
  ));
});
