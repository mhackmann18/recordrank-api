const Album = require('../models/Album');
const Artist = require('../models/Artist');

// @desc    Get all albums
// @route   GET /api/v1/albums
// @access  Public
exports.getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find().populate('artist', 'name').populate('tracks', 'name');

    res.status(200).json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get single album
// @route   GET /api/v1/albums/:id
// @access  Public
exports.getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist').populate('tracks');

    if(!album)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: album
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get albums from a specific artist
// @route   GET /api/v1/artist/:artistId/albums
// @access  Public
exports.getAlbumsByArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.artistId);

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    const albums = await Album.find({ artist: req.params.artistId }).populate('tracks', 'name');

    res.status(200).json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Delete an album
// @route   DELETE /api/v1/albums/:id
// @access  Private
exports.deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if(!album)
      return next({ kind: 'ObjectIdNotInDB' });

    album.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Create an album
// @route   POST /api/v1/artist/:artistId/albums
// @access  Public
exports.createAlbum = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.artistId);

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    const album = await Album.create(req.body);

    res.status(201).json({
      success: true,
      data: album
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Update an album
// @route   PUT /api/v1/albums/:id
// @access  Private
exports.updateAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!album)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: album
    });
  } catch(err) {
    next(err);
  }
}