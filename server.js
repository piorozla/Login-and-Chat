require('./config/config');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const sessionInfo = require('./routes/sessionInfo');

// chat
const chat = require('./io/chat');

/* eslint-disable no-unused-vars */
const { mongoose } = require('./db/mongoose');
/* eslint-enable no-unused-vars */
const sessionManagementConfig = require('./config/sessionManagementConfig');

const port = process.env.PORT || 2000;

app.use(bodyParser.json());

sessionManagementConfig(app);

// Allow access for all origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sessionInfo', sessionInfo);

io.on('connection', chat);

http.listen(port, () => {
  console.log(`Started on port ${port}`);
});
