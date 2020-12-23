const mongoose = require('mongoose'), Schema = mongoose.Schema;
const slugify = require('slugify');
require('./Album');
require('./Artist');

const TrackSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxLength: [50, 'Name cannot be longer than 50 characters']
  },
  lyrics: String,
  length: {
    type: Number,
    required: [true, 'Please add the song length in seconds']
  },
  slug: String,
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Please add an album']
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Please add an artist']
  }
});

// Create slug from name
TrackSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Track', TrackSchema);