/* eslint-disable global-require */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		open: true,
		historyApiFallback: true,
		stats: 'errors-only',
		host,
		port,
		overlay: {
			errors: true,
			warnings: true,
		},
	},
})

exports.lintTypeScript = ({ options }) => ({
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options,
			},
		],
	},
})

exports.transpileTypeScript = () => ({
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		],
	},
})

exports.loadSass = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.s?css$/,
				include,
				exclude,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
})

exports.extractCSS = ({ include, exclude, use }) => {
	const plugin = new ExtractTextPlugin({
		filename: '[name].css',
	})

	return {
		module: {
			rules: [
				{
					test: /\.s?css$/,
					include,
					exclude,

					loader: plugin.extract({
						use,
						fallback: 'style-loader',
					}),
				},
			],
		},
		plugins: [plugin],
	}
}

exports.autoprefix = () => ({
	loader: 'postcss-loader',
	options: {
		plugins: () => ([
			require('autoprefixer'),
		]),
	},
})

exports.purifyCSS = ({ paths }) => ({
	plugins: [
		new PurifyCSSPlugin({ paths }),
	],
})

exports.lintCSS = ({ include, exclude }) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,
				include,
				exclude,
				enforce: 'pre',
				loader: 'postcss-loader',
				options: {
					plugins: () => ([
						require('stylelint')({
							ignoreFiles: 'node_modules/**/*.css',
						}),
					]),
				},
			},
		],
	},
})

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|svg)$/,
				include,
				exclude,
				use: {
					loader: 'url-loader',
					options,
				},
			},
		],
	},
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				include,
				exclude,
				use: {
					loader: 'file-loader',
					options,
				},
			},
		],
	},
})

exports.generateSourceMaps = ({ type }) => ({
	devtool: type,
})
