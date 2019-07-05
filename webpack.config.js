const path = require('path');
module.exports = {
  entry: [
    "./src/main.js",
    "./src/dev.js"
  ],
  output: {
    filename: "init/cl_init.js",
    path: path.resolve(__dirname, 'resources')
  },
  watch: true,
  mode: 'production',
}
