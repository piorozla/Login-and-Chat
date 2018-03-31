const session = require('express-session');
const mongoStoreFactory = require('connect-mongo');

const mongoose = require('mongoose');

const sessionManagementConfig = app => {
  // persistence store of our session
  const MongoStore = mongoStoreFactory(session);

  app.use(
    session({
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
    })
  );

  // regenerate session id on re authentication
  // session.Session.prototype.login = function login(user, cb) {
  //   console.log('session login');
  //   const { req } = this;
  //   req.session.regenerate(err => {
  //     if (err) {
  //       cb(err);
  //     }
  //   });

  //   req.session.userInfo = user;
  //   cb();
  // };
};

module.exports = sessionManagementConfig;
