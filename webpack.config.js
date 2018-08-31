'use strict'

const os = require('os')
const path = require('path')
const connect = require('koa-connect')
const history = require('connect-history-api-fallback')
const proxy = require('http-proxy-middleware')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')

const {
  DefinePlugin,
  NamedModulesPlugin
} = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'
const AVAILABLE_CPUS = Math.max(os.cpus().length - 2, 2) // leave 2 CPUS free

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  context: __dirname,
  entry: path.join(__dirname, 'client/index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  recordsPath: path.join(__dirname, '.cache/records.json'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '.cache/ts')
            }
          },
          {
            loader: 'thread-loader',
            options: {
              workers: Math.min(Math.floor(AVAILABLE_CPUS / 2), 4)
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              configFile: path.join('client/tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
        options: {
          minimize: PRODUCTION,
          ignoreCustomComments: [ /^\s*\/?ko/ ]
        }
      },
    ]
  },
  resolve: {
    alias: {
      client: path.join(__dirname, 'client/'),
      knockout$: path.join(__dirname, 'node_modules/knockout/build/output/', `knockout-latest${PRODUCTION ? '' : '.debug'}.js`)
    },
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: [
    // provide DEBUG constant to app, will be statically analyzable so `if (DEBUG)` statements
    // will be stripped out by the minifier in production builds
    new DefinePlugin({
      DEBUG: !PRODUCTION
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      workers: Math.min(Math.floor(AVAILABLE_CPUS / 2), 4),
      checkSyntacticErrors: true,
      tsconfig: path.join('client/tsconfig.json')
    }),

    new HtmlWebpackPlugin(),

    ...(PRODUCTION
      ? [
        new ScriptExtPlugin({
          defaultAttribute: 'defer',
          prefetch: {
            test: /\.js$/,
            chunks: 'async'
          },
          inline: {
            test: [/runtime/]
          }
        })
      ]
      : [
        // readable HMR output
        new NamedModulesPlugin()
      ]
    )
  ],
  serve: {
    logLevel: 'warn',
    add(app, middleware) {
      middleware.webpack()
      middleware.content()

      app.use(connect(proxy('/api', { target: 'http://localhost:8081' })))
      app.use(connect(history()))
    }
  }
}