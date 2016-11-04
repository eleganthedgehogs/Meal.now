const Promise = require('bluebird');
const Feature = require('../models/featureModel');
const s3 = require('../../server/config/helpers.js');
const utils = require('../../server/config/utils.js');
const _ = require('lodash');

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
      .then((tags) => {
        const pictureData = {
          tags: tags.classes.slice(0, 5),
          restaurantName: '',
          date: req.headers.date,
          uri: original.url,
          nutritionalInfo: '',
        };

        Feature.create(pictureData)
        .then((picture) => {
          res.send(picture);
        })
        .catch((error) => {
          console.log('Error saving to database', error);
          res.status(404).send(error);
        });
      })
      .catch((error) => {
        console.log('Error getting tags for picture', error);
        res.status(404).end();
      });
    });
  }
};

exports.getNearbyPlaces = (req, res) => {
  console.log('getting location');
  const lat = req.body.coords.latitude;
  const long = req.body.coords.longitude;

  utils.getPlaces(lat, long)
  .then((places) => {
    res.send({ places });
  })
  .catch((error) => {
    console.log('Error getting places in featureController', error);
    res.status(404).end();
  });
};

exports.getMenu = (req, res) => {
  const restaurantName = req.body.name;
  const date = req.body.date;

  Feature.findOne({ date })
  .then((photo) => {
    const tags = photo.tags;

    utils.getRestaurant(restaurantName)
    .then((restaurant) => {
      const restaurantId = restaurant._id;

      utils.getMenu(restaurantId, tags)
      .then(menu => {
        menu = _.uniq(menu);

        photo.restaurantName = restaurantName;

        photo.save((error) => {
          if (error) {
            console.log('error saving restaurant name', error);
            res.status(404).end();
          } else {
            res.send({ menu });
          }
        });
      })
      .catch((error) => {
        console.log('error getting menu', error);
        res.status(404).end();
      });
    })
    .catch((error) => {
      console.log('error getting restaurant', error);
      res.status(404).end();
    });
  });
};

exports.getItem = (req, res) => {
  const name = req.body.item.name;
  const id = req.body.item._id;
  const date = req.body.date;

  Feature.findOne({ date })
  .then((photo) => {
    utils.getNutritionalInformation(id)
    .then((info) => {
      photo.nutritionalInfo = JSON.stringify(info);

      photo.save((error) => {
        if (error) {
          console.log('Error saving nutritional info', error);
          res.status(404).end();
        } else {
          res.send({ photo });
        }
      });
    });
  })
  .catch((error) => {
    console.log('Error finding photo in database', error);
    res.status(404).end();
  });
};
