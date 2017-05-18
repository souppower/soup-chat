const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob')

const parts = require('./webpack.parts')

const PATHS = {
	main: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
}

const commonConfig = merge([
	{
		entry: {
			main: PATHS.main,
		},
		output: {
			path: PATHS.dist,
			filename: '[name].js',
		},
		plugins: [
			new HtmlWebpackPlugin({ title: 'Frontend Boilerplate' }),
		],
		resolve: {
			extensions: ['.ts', '.js']
		},
	},
	parts.transpileTypeScript(),
	parts.loadFonts({
		options: {
			name: '[name].[ext]',
		},
	}),
])

const productionConfig = merge([
	parts.extractCSS({
		use: ['css-loader', parts.autoprefix(), 'sass-loader'],
	}),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.main}/**/*`, { nodir: true }),
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: '[name].[ext]',
		},
	}),
	parts.generateSourceMaps({ type: 'source-map' }),
])

const developmentConfig = merge([
	parts.devServer({
		host: '0.0.0.0',
		port: process.env.PORT,
		contentBase: PATHS.dist,
	}),
	parts.loadSass(),
	parts.loadImages(),
	{
		output: {
			devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
		},
	},
	parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
])

module.exports = (env) => {
	if (env === 'production') {
		return merge(commonConfig, productionConfig)
	}
	return merge(commonConfig, developmentConfig)
}
