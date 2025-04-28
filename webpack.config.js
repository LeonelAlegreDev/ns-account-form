const webpack = require("@nativescript/webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpackDefinePlugin = require("webpack").DefinePlugin;

module.exports = (env) => {
	webpack.init(env); // Initialize webpack with the environment

	// Use chainWebpack to ensure the changes are applied
	webpack.chainWebpack((config) => {
		// Configure resolve.fallback
		config.resolve.merge({
			fallback: {
				"crypto": require.resolve("crypto-browserify"),
				"stream": require.resolve("stream-browserify"),
				"buffer": require.resolve("buffer/"),
				"http": require.resolve("stream-http"),
				"https": require.resolve("https-browserify"),
				"os": require.resolve("os-browserify/browser"),
				"url": require.resolve("url/"),
				"zlib": require.resolve("browserify-zlib"),
				"path": require.resolve("path-browserify"),
				"vm": require.resolve("vm-browserify"),
				"browser": require.resolve("browserify"), // Ensure browser fallback is valid
				"fs": false, // NativeScript no soporta fs
				"net": false, // No es compatible con NativeScript
				"tls": false, // No es compatible con NativeScript
				"utf-8-validate": false,
				"bufferutil": false,
				"http2": false, // Add fallback for http2
				"dns": false, // Add fallback for dns
			},
		});

		// Configure resolve.alias
		config.resolve.merge({
			alias: {
				"stream": require.resolve("stream-browserify"),
				"crypto": require.resolve("crypto-browserify"),
				"buffer": require.resolve("buffer/"),
				"http": require.resolve("stream-http"),
				"https": require.resolve("https-browserify"),
				"os": require.resolve("os-browserify/browser"),
				"url": require.resolve("url/"),
				"zlib": require.resolve("browserify-zlib"),
				"path": require.resolve("path-browserify"),
				"browser": require.resolve("browserify"), // Add alias for browser
			 },
		});

		// Ensure Webpack resolves the "browser" field in package.json
		config.resolve.merge({
			mainFields: ["browser", "module", "main"], // Ensure "browser" is prioritized
			extensions: [".js", ".json"], // Explicitly add extensions
		});
	});

	// Add NodePolyfillPlugin, DefinePlugin, and ProvidePlugin
	webpack.merge({
		plugins: [
			new NodePolyfillPlugin(),
			new webpackDefinePlugin({
                "process.browser": JSON.stringify(true), // Define process.browser como true
            }),
		],
		node: {
			__dirname: true,
		},
		target: "node",
		stats: {
			errorDetails: true,
		},
	});

	// Log the entire resolved Webpack configuration
	const resolvedConfig = webpack.resolveConfig();
	// console.log("Resolved Webpack Configuration (resolve):", JSON.stringify(resolvedConfig.resolve, null, 2)); // Log only resolve section
	// console.log("Resolved Webpack Configuration (full):", JSON.stringify(resolvedConfig, null, 2)); // Log full configuration

	return resolvedConfig; // Return the resolved cronfiguration
};

