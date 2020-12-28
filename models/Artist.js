const mongoose = require('mongoose'), Schema = mongoose.Schema;
const slugify = require('slugify');
require('./Album');
require('./Track');

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, 'Name cannot be longer than 50 characters']
  },
  bio: String,
  slug: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from name
ArtistSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Reverse populate with virtuals
ArtistSchema.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'artist',
  justOne: false
});

// Cascade delete albums when an artist is deleted
ArtistSchema.pre('remove', async function(next){
  await this.model('Album').deleteMany({ artist: this._id });
  await this.model('Track').deleteMany({ artist: this._id });
  next();
});

module.exports = mongoose.model('Artist', ArtistSchema);