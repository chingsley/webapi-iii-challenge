const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>REST api Challenge</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}          ${req._startTime}`);
  next();
};

// server.get('/', (req, res) => {
//   res.send(`
//       <h2>Welcome to my REST API</h2>
//       <p>Visit <a>https://github.com/chingsley/webapi-ii-challenge</a> to see the available endpoints</p>
//   `);
// })

module.exports = server;


// nodemon -r esm index.js"
// import express from 'express';
// import helmet from 'helmet';
// import morgan from 'morgan';

// import postsRouter from './posts/router';

// const server = express();
// server.use(express.json());
// server.use(helmet());
// server.use(morgan('dev'));

// server.use('/api/posts', postsRouter);




// export default server;