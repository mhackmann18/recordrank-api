const express = require('express'), router = express.Router();

const {
  getTrack,
  getTracks,
  deleteTrack,
  updateTrack
} = require('../controllers/tracks');

router.route('/').get(getTracks);
router.route('/:id').get(getTrack).delete(deleteTrack).put(updateTrack);

module.exports = router;