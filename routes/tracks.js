const express = require('express'), router = express.Router();

const {
  getTrack,
  getTracks
} = require('../controllers/tracks');

router.route('/').get(getTracks);
router.route('/:id').get(getTrack);

module.exports = router;