const Promise = require('bluebird');
const Feature = require('../models/featureModel');
const rp = require('request-promise');
const s3 = require('../../server/helpers.js').s3;

// exports.location = (req, res) => {
// // user sends the location to the server
// // grab nearby restaurants through Google Places API

// };

exports.uploadImage = (req, res) => {
  if (!req.file) {
    console.log('File not saved');
    res.status(404).send();
  } else {
    console.log(req.file);
    // s3.upload('uploads/' + req.file.filename, {}, (err, versions, meta) => {
    //   if (err) {
    //     console.log('error uploading file:', err);
    //   }

    //   versions.forEach((image) => {
    //     if (image.original) {

    //     }
    //   });
    // });
  }
};
