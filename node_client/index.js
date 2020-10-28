//node program that cpatures local performance data and sends it up to the socket.io server

const os = require('os');

// - CPU Load (Current)
// - Memory Usage
//     - free
const freeMem = os.freemem();
//     - total
const totalMem = os.totalmem();

// - OS Type

const osType = os.type() == 'Darwin' ? 'Mac' : os.type();

// - UP Time
const upTime = os.uptime();

// - CPU Info
//     - Type
//     - Number of Cores
//     - Clock Speed
