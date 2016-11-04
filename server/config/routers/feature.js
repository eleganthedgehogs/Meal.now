const express = require('express');
const multer = require('multer');
const featureController = require('../../../db/controllers/featureController.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + req.headers.date + '.jpg');
  },
});

const upload = multer({ storage: storage });


const router = new express.Router();

router.route('/')
  .get((req, res) => {
    res.end('mollah');
  });

router.route('/upload').post(upload.single('image'), featureController.uploadImage);
router.route('/location').post(featureController.getNearbyPlaces);
router.route('/menu').post(featureController.getMenu);
router.route('/item').post(featureController.getItem);

module.exports = router;
