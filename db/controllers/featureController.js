const Promise = require('bluebird');
const Feature = require('../models/featureModel');
const rp = require('request-promise');
const s3 = require('../../server/config/helpers.js');
const Clarifai = require('clarifai');

const app = new Clarifai.App(
  'bnjpiSFcBcuwIAO5JkPxF60RePGyuEcJkMdV4orj',
  'EmNsQ5M-cfGqELA28fFpSpcEoCfhgV0k5fG12hXT'
);

app.getToken();

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

      var original = versions.filter(image => image.original)[0];
      
      //ISN'T RETURNING TAGS
      app.models.predict('bd367be194cf45149e75f01d59f77ba7', original.url).then(
        function(response) {
          console.log(response);
        },
        function(err) {
          console.log(err);
        }
      );
    });
  }
};
