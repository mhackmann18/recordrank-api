const express = require('express');
const router = express.Router();
const {
  getAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum
} = require('../controllers/albums');

router.route('/').get(getAlbums);
router.route('/:id').get(getAlbum).delete(deleteAlbum).put(updateAlbum);

module.exports = router;