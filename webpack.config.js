
const path = require("path");

module.exports = {
    mode: 'development', // or 'production' for production build
    entry: './src/index.ts', // Entry point of your application
    target: 'node', // Bundle for Node.js environment
    output: {
      path: path.resolve(__dirname, 'dist'), // Output directory
      filename: 'bundle.js' // Output filename
    },
    resolve: {
      extensions: ['.ts', '.js'] // Resolve TypeScript and JavaScript files
    },
    module: {
      rules: [
        {
          test: /\.ts$/, // Apply ts-loader for .ts files
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  };