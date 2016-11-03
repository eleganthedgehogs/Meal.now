const Promise = require('bluebird');
const Feature = require('../models/featureModel');
const s3 = require('../../server/config/helpers.js');
const utils = require('../../server/config/utils.js');

// exports.location = (req, res) => {
// // user sends the location to the server
// // grab nearby restaurants through Google Places API

// };

exports.uploadImage = (req, res) => {
  if (!req.file) {
    console.log('File not saved');
    res.status(404).send();
  } else {
    console.log(req.file.path);
    s3.upload(req.file.path, {}, (err, versions, meta) => {
      if (err) {
        return console.log('error uploading file:', err);
      }

      const original = versions.filter(image => image.original)[0];

      // ISN'T RETURNING TAGS
      utils.clarifai(original.url)
      .then(tags => console.log(tags.classes))
      .catch(error => console.log('Error getting tags in featureController', error));
    });
  }
};

exports.getNearbyPlaces = (req, res) => {
  console.log('getting location');
  const lat = req.body.coords.longitude;
  const long = req.body.coords.longitude;

  utils.getPlaces(lat, long)
  .then(places => console.log(places))
  .catch(error => console.log('Error getting places in featureController', error));
  res.end();
};
