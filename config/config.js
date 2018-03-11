const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
  });
}
