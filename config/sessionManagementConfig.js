let session = require('express-session');
const mongoStoreFactory = require('connect-mongo');

const mongoose = require('mongoose');
// persistence store of our session
const MongoStore = mongoStoreFactory(session);

session = session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1 * 60 * 60, // 1 hour
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
  name: 'id',
});

const sessionManagementConfig = app => {
  app.use(session);
};

module.exports = { sessionManagementConfig, session };
