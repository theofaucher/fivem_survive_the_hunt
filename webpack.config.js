const path = require('path');
module.exports = {
  entry: {
    'init/cl_init': [

      "./src/cl_dev.js",
      "./src/deathscreen/deathscreen.js",
      "./src/wantedlevel/wantedlevel.js",
      "./src/utils/IplLoader.js",
      "./src/blips/cl_blips.js",
      "./src/ui/notification.js",
      "./src/cl_main.js",
    ],
    'init/sv_init': [
      "./src/sv_main.js",
      "./src/sv_commands.js",
      "./src/blips/sv_blips.js"
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'resources')
  },
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',

}
