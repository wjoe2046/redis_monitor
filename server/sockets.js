const sockets = (io, socket) => {
  socket.on('perfData', (data) => {
    console.log(data);
  });
};

module.exports = sockets;
