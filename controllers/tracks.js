const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Track = require('../models/Track');

// @desc    Get all tracks
// @route   GET /api/v1/tracks
// @access  Public
exports.getTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find().populate('artist', 'name').populate('album', 'name releaseDate');

    res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get single track
// @route   GET /api/v1/tracks/:id
// @access  Public
exports.getTrack = async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id).populate('artist', 'name slug').populate('album');

    if(!track)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: track
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get tracks from a specific album
// @route   GET /api/v1/albums/:albumId/tracks
// @access  Public
exports.getTracksByAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.albumId);

    if(!album)
      return next({ kind: 'ObjectIdNotInDB' });

    const tracks = await Track.find({ album: req.params.albumId }).populate('artist', 'name slug');

    res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Get tracks from a specific artist
// @route   GET /api/v1/artist/:artistId/tracks
// @access  Public
exports.getTracksByArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.artistId);

    if(!artist)
      return next({ kind: 'ObjectIdNotInDB' });

    const tracks = await Track.find({ artist: req.params.artistId }).populate('album');

    res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Delete an album
// @route   DELETE /api/v1/tracks/:id
// @access  Private
exports.deleteTrack = async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if(!track)
      return next({ kind: 'ObjectIdNotInDB' });

    track.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Create a track
// @route   POST /api/v1/album/:albumId/tracks
// @access  Private
exports.createTrack = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.albumId);

    if(!album)
      return next({ kind: 'ObjectIdNotInDB' });

    const track = await Track.create(req.body);

    res.status(201).json({
      success: true,
      data: track
    });
  } catch(err) {
    next(err);
  }
}

// @desc    Update an track
// @route   PUT /api/v1/tracks/:id
// @access  Private
exports.updateTrack = async (req, res, next) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!track)
      return next({ kind: 'ObjectIdNotInDB' });

    res.status(200).json({
      success: true,
      data: track
    });
  } catch(err) {
    next(err);
  }
}