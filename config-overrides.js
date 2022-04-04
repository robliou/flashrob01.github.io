module.exports = function override(config, env) {

    config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      });
    //do stuff with the webpack config...
    //this comes from react-app-rewired
    //https://stackoverflow.com/questions/64002604/how-to-make-create-react-app-support-mjs-files-with-webpack
    return config;
  }