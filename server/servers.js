//Socket IO server that will serve node and react clients
//Entry point for node cluster which will make workers and the workers will do the socket.io handling
const cluster = require('cluster');
const http = require('http');
