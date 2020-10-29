const sockets = (io, socket) => {
  console.log('a socket is connected!', socket.id);
  //   console.log('someone called me! I am socketmain');
};

module.exports = sockets;
