const express = require('express'), router = express.Router();

const {
  getAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum
} = require('../controllers/albums');

const { 
  getTracksByAlbum,
  createTrack 
} = require('../controllers/tracks');
 
router.route('/').get(getAlbums);
router.route('/:id').get(getAlbum).delete(deleteAlbum).put(updateAlbum);

// Get an album's tracks
router.route('/:albumId/tracks').get(getTracksByAlbum).post(createTrack);

module.exports = router;