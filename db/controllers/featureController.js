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
    const lat = req.headers.latitude;
    const long = req.headers.longitude;

    s3.upload(req.file.path, {}, (err, versions, meta) => {
      if (err) {
        return console.log('error uploading file:', err);
      }

      const original = versions.filter(image => image.original)[0];

      // ISN'T RETURNING TAGS
      utils.clarifai(original.url)
      .then((tags) => {
        utils.getPlaces(lat, long)
        .then((places) => {
          const pictureData = {
            tags: tags.classes.slice(0, 5),
            restaurantName: '',
            date: req.headers.date,
            uri: original.url,
            nutritionalInfo: '',
            latitude: lat,
            longitude: long,
          };

          Feature.create(pictureData)
          .then((picture) => {
            res.send('Successfully saved created the geotagged photo');
          })
          .catch((error) => {
            console.log('Error saving to database', error);
            res.status(404).send(error);
          });
        })
        .catch((error) => {
          console.log('Error getting places in featureController', error);
          res.status(404).end();
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
  const long = req.param('longitude');
  const lat = req.param('latitude');

  utils.getPlaces(lat, long)
  .then((places) => {
    console.log(places);
    res.json(places);
  });
};

exports.getMenu = (req, res) => {
  const restaurantName = req.param('name');
  const date = req.param('date');

  Feature.findOne({ date })
  .then((photo) => {
    const tags = photo.tags;
    console.log(restaurantName);
    console.log(date);
    utils.getRestaurant(restaurantName)
    .then((restaurant) => {
      console.log(restaurant);
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
            res.json(menu);
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
  const name = req.param('name');
  const id = req.param('id');
  const date = req.param('date');

  Feature.findOne({ date })
  .then((photo) => {
    utils.getNutritionalInformation(id)
    .then((info) => {
      console.log(info);
      photo.name = name;
      photo.nutritionalInfo = JSON.stringify(info);

      photo.save((error) => {
        if (error) {
          console.log('Error saving nutritional info', error);
          res.status(404).end();
        } else {
          res.json(photo);
        }
      });
    });
  })
  .catch((error) => {
    console.log('Error finding photo in database', error);
    res.status(404).end();
  });
};
