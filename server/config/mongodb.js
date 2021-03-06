const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const online = false;

const url = online ? '' : 'mongodb://localhost/alt-tab-challenge';

const options = {
  db: { native_parser: true },
  server: { auto_reconnect: true, poolSize: 5, socketOptions: { keepAlive: 30 } },
};

mongoose.connect(url, options)
.then(() => {
  console.log('Mongodb Connected : )');
  mongoose.connection.on('error', (err) => {
    console.log(`mongoose connection: ${err}`);
  });
  mongoose.connection.on('reconnected', () => {
    console.log('Reconnected to MongoDB');
  });
})
.catch((err) => {
  console.log(`rejected promise ${err}`);
  mongoose.disconnect();
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongodb: bye : )');
    process.exit(0);
  });
});


module.exports = mongoose;
