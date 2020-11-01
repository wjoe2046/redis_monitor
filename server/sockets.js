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

  //a machine has connected, check to see if it's new
  socket.on('perfData', (data) => {
    console.log(data);
  });
};

module.exports = sockets;
