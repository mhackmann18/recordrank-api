const Artist = require('../models/Artist');

// @desc    Get all artists
// @route   GET /api/v1/artists
// @access  Public
exports.getArtists = async (req, res, next) => {
  try {
    let artists = await Artist.find().populate('albums', 'name _id releaseDate');

    if(req.query.name){
      artists = await Artist.find({ slug: req.query.name }).populate('albums');
    }

    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get artist by id
// @route   GET /api/v1/artists/:id
// @access  Public
exports.getArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('albums');

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Remove artist from db
// @route   DELETE /api/v1/artists/:id
// @access  Public
exports.deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    artist.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Update artist in db
// @route   PUT /api/v1/artists/:id
// @access  Private
exports.updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Add new artist to db
// @route   POST /api/v1/artists
// @access  Private
exports.createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({
      success: true,
      data: artist
    });
  } catch(err) {
    next(err);
  }
}