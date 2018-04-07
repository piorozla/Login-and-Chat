const chat = socket => {
  console.log('a user connected');
  console.log(socket.handshake.session);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', msg => {
    console.log(msg);
  });
};

module.exports = chat;
