require('dotenv').config({ path: './config/config.env' });
require('colors');
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const artistRoutes = require('./routes/artists');
const albumRoutes = require('./routes/albums');
const trackRoutes = require('./routes/tracks');
const app = express();

if(process.env.NODE_ENV === 'development'){
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

connectDB();

app.use(express.json());
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.green);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});