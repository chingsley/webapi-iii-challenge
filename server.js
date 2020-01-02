const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>REST api Challenge</h2>`)
});

server.use('/*', (req, res) => {
  res.status(404).json({
    error: 'The specifield method-path combination does not exist on this server',
  });
});

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} => ${req._startTime}`);
  next();
};

// every time we call next() with an argument,
//e.g next("internal server error"), whether we call it 
// from the controller, the middleware or the router,
// execution will jump to this next line;
// i.e. So long as next is called with an argument, irrespective
// of the location of the call, execution will jump to this next line.
server.use((error, req, res, next) => { // NOTE: THE FOUR PARAMETERS (error, req, res, next) MUST BE AVAILABLE FOR THIS TO WORK
  res.status(500).json({
    error,
  })
})

module.exports = server;