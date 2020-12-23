const express = require('express');
const router = express.Router();

const {
  createAlbum,
  getAlbumsByArtist
} = require('../controllers/albums');

const {
  getArtists,
  createArtist,
  deleteArtist,
  updateArtist,
  getArtist
} = require('../controllers/artists');

router.route('/').get(getArtists).post(createArtist);
router.route('/:id').get(getArtist).put(updateArtist).delete(deleteArtist);

// Routes for artist's albums
router.route('/:artistId/albums').get(getAlbumsByArtist).post(createAlbum);

module.exports = router;