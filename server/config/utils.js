'use strict';
const rp = require('request-promise');
const secret = require('./secret.js');
const Promise = require('bluebird');

const clarifai = (url) => {
  return rp({
    uri: `https://api.clarifai.com/v1/tag/?model=food-items-v1.0&url=${url}`,
    method: 'GET',
    json: true,
    headers: {
      Authorization: `Bearer ${secret.CLARIFAI_TOKEN}`,
    },
  })
  .then(res => res.results[0].result.tag)
  .catch(err => console.log('error requesting from clarifai', err));
};

const getPlaces = (lat, long) => {
  const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&rankby=distance&type=restaurant&key=${secret.PLACES_KEY}`;
  console.log(uri);
  return rp({
    uri: uri,
    method: 'GET',
    json: true,
  })
  .then((res) => {
    return res.results.map((place) => {
      return place.name;
    });
  })
  .catch(err => console.log('error getting places', err));
};

const getRestaurant = (brand) => {
  brand = brand.toLowerCase().replace(/[^a-z]+/g, '');
  const brandQuery = `https://api.nutritionix.com/v1_1/brand/search?query=${brand}&type=1&min_score=1&appId=${secret.NUTRITIONIX_ID}&appKey=${secret.NUTRITIONIX_KEY}`;

  return rp({
    uri: brandQuery,
    method: 'GET',
    json: true,
  })
  .then(res => res.hits[0].fields)
  .catch(err => console.log('error getting restaurant', err));
};

const getMenu = (id, tags) => {
  const tagPromises = tags.map((tag) => {
    const menuQuery = `https://api.nutritionix.com/v1_1/search/${tag}?brand_id=${id}&results=0%3A10&cal_min=400&cal_max=50000&fields=item_name&appId=${secret.NUTRITIONIX_ID}&appKey=${secret.NUTRITIONIX_KEY}`;
    console.log(menuQuery);
    return rp({
      uri: menuQuery,
      method: 'GET',
      json: true,
    }).promise();
  });

  return Promise.all(tagPromises)
  .then((menuItems) => {
    const menu = menuItems.reduce((allItems, list) => {
      return allItems.concat(list.hits);
    }, []);

    return menu.map((item) => {
      return {
        id: item._id,
        name: item.fields.item_name,
      };
    });
  })
  .catch(error => console.log('Error with the promise all getting the menu items', error));
};

const getNutritionalInformation = (id) => {
  const itemQuery = `https://api.nutritionix.com/v1_1/item?id=${id}&appId=${secret.NUTRITIONIX_ID}&appKey=${secret.NUTRITIONIX_KEY}`;

  return rp({
    uri: itemQuery,
    method: 'GET',
    json: true,
  });
};


module.exports = { clarifai, getPlaces, getRestaurant, getMenu, getNutritionalInformation };
