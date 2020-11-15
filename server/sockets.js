const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/perfData', { useNewUrlParser: true });

const Machine = require('./models/Machine');

const sockets = (io, socket) => {
  let macA;

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

  socket.on('initPerfData', async (data) => {
    //update our socket connect function scoped variables
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log(mongooseResponse);
  });
  //a machine has connected, check to see if it's new
  socket.on('perfData', (data) => {});
};

const checkAndAdd = (data) => {
  //promise
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        //if the record is not in the DB
        let newMachine = new Machine(data);
        newMachine.save(); //actually save the data
        resolve('added');
      } else {
        //if it is in the db, just resolve
        resolve('found');
      }
    });
  });
};

module.exports = sockets;
