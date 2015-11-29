var webpack = require('webpack'),
    path    = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var PROJECT_BASE = __dirname;

var webpackConfig = {
  name   : 'client',
  target : 'web',
  entry  : {
    app : [
      PROJECT_BASE + '/src/app.js'
    ],
    vendor : [
      'react',
      'redux',
      'freezer-js',
      'react-bootstrap',
      'redux-router',
      'rx'
    ]
  },
  output : {
    filename   : '[name].js',
    path       : PROJECT_BASE + '/dist',
    publicPath : '/'
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template : PROJECT_BASE + '/src/index.html',
      hash     : true,
      filename : 'index.html',
      inject   : 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
  ],
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          stage    : 0,
          optional : ['runtime'],
          env      : {
            development : {
              plugins : ['react-transform'],
              extra   : {
                'react-transform' : {
                  transforms : [{
                    transform : 'react-transform-catch-errors',
                    imports   : ['react', 'redbox-react']
                  }]
                }
              }
            }
          }
        }
      },
      {
        test    : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader',
          'autoprefixer?browsers=last 2 version',
          'sass-loader'
        ]
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
      /* eslint-enable */
    ]
  }
};

// Simulate config overrides for dev_hot
webpackConfig.entry.app.push(
  'webpack-dev-server/client?http://0.0.0.0:3000/',
  'webpack/hot/dev-server'
);

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

// We need to apply the react-transform HMR plugin to the Babel configuration,
// but _only_ when HMR is enabled. Putting this in the default development
// configuration will break other tasks such as test:unit because Webpack
// HMR is not enabled there, and these transforms require it.
webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/js(?!on)/.test(loader.test)) {
    loader.query.env.development.extra['react-transform'].transforms.push({
      transform : 'react-transform-hmr',
      imports   : ['react'],
      locals    : ['module']
    });
  }

  return loader;
});

module.exports = webpackConfig;
