const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/perfData', { useNewUrlParser: true });

const Machine = require('./models/Machine');

const sockets = (io, socket) => {
  socket.on('clientAuth', (key) => {
    if (key === '552251zwf') {
      socket.join('clients');
    } else if (key === 'asdfasdf') {
      socket.join('ui');
    } else {
      //an invalid client has joined. Goodbye
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', (data) => {
    console.log(data);
  });
  //a machine has connected, check to see if it's new
  socket.on('perfData', (data) => {
    console.log(data);
  });
};

module.exports = sockets;
