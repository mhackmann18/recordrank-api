require('dotenv').config({ path: './config/config.env' });
require('colors');

const fs = require('fs');
const mongoose = require('mongoose');

// Import mongoose models
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Get JSON data
const artists = JSON.parse(fs.readFileSync('./_data/artists.json', 'utf-8'));
const albums = JSON.parse(fs.readFileSync('./_data/albums.json', 'utf-8'));
const tracks = JSON.parse(fs.readFileSync('./_data/tracks.json', 'utf-8'));

// Import data into MongoDB
const importData = async () => {
  try {
    await Artist.create(artists);
    await Album.create(albums);
    await Track.create(tracks);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch(err) {
    console.log(err.red.bold);
  }
}

// Delete data in MongoDB
const deleteData = async () => {
  try {
    await Artist.deleteMany();
    await Album.deleteMany();
    await Track.deleteMany();
    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch(err) {
    console.log(err.red.bold);
  }
}

if(process.argv[2] === '-i'){
  importData();
} else if(process.argv[2] === '-d'){
  deleteData();
}