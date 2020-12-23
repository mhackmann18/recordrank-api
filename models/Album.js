const mongoose = require('mongoose');
const slugify = require('slugify');

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be longer than 50 characters']
  },
  description: String,
  releaseDate: {
    type: Date,
    required: [true, 'Please add a release date']
  },
  genres: {
    type: [String],
    required: [true, 'Please add a genre/genres'],
    enum: [
      'Heavy Metal',
      'Speed Metal',
      'Thrash Metal',
      'Power Metal',
      'Death Metal',
      'Black Metall',
      'Pagan Metal',
      'Viking Metal',
      'Folk Metal',
      'Symphonic Metal',
      'Gothic Metal',
      'Glam Metal',
      'Hair Metal',
      'Doom Metal',
      'Groove Metal',
      'Industrial Metal',
      'Modern Metal',
      'Neoclassical Metal',
      'New Wave Of British Heavy Metal',
      'Post Metal',
      'Progressive Metal',
      'Avantgarde Metal',
      'Sludge',
      'Djent',
      'Drone',
      'Kawaii Metal',
      'Pirate Metal',
      'Nu Metal',
      'Neue Deutsche Härte',
      'Math Metal',
      'Crossover',
      'Grindcore',
      'Hardcore',
      'Metalcore',
      'Deathcore',
      'Post Hardcore',
      'Mathcore',
      'Stoner Rock', 
      'Rock',
      'Psychedelic Rock',
      'Instrumental Rock'
    ]
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add an artist id'],
    ref: 'Artist'
  },
  slug: String
});

AlbumSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true });
  next()
});

module.exports = mongoose.model('Album', AlbumSchema);