const log = require('./chat.log.json');
const moment = require('moment');
// chatSize: how many recent messages to show
const CHAT_SIZE = 3;

const chat = socket => {
  console.log('a user connected');
  console.log(socket.handshake.session);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', msg => {
    const logEntry = {
      date: moment().format('DD:MM:YYYY'),
      time: moment().format('HH:mm'),
      entry: msg,
    };
    saveMsgToLog(logEntry, moment().format());
    const chatContent = getChatContent();
    socket.emit('chat', chatContent);
  });
};

const saveMsgToLog = (logEntry, time) => {
  log[time] = logEntry;
};

const getChatContent = () => {
  const entries = Object.values(log);
  const startAt = entries.length - CHAT_SIZE;
  const chatContent = entries.slice(startAt);
  return chatContent;
};

module.exports = chat;
