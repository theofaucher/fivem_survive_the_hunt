const path = require('path');
module.exports = {
  entry: {
    'init/cl_init': [
      "./src/cl_main.js",
      "./src/cl_dev.js",
      "./src/deathscreen/deathscreen.js",
      "./src/utils/IplLoader.js"
    ],
    'init/sv_init': [
      "./src/sv_main.js",
      "./src/sv_commands.js"
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'resources')
  },
  watch: true,
  mode: 'production',
}
