const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

function logger(req, res, next) {
  const timestamp = new Date(Date.now())
  console.log(`\n${req.method} method made to ${req.originalUrl} at ${timestamp.toLocaleTimeString('en-US')}`)
  next()
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger)

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
