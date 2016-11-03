const rp = require('request-promise');
const secret = require('./secret.js');
const placesKey = 'AIzaSyBuYAZtxN4i6FRU2azLm4JWm_sC6S5UGGA';

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
  const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&type=restaurant&key=${secret.PLACES_KEY}`;
  return rp({
    uri,
    method: 'GET',
    json: true,
  })
  .then((res) => {
    return res.results.map((place) => {
      return { name: place.name, icon: place.icon };
    });
  })
  .catch(err => console.log('error getting places', err));
};


module.exports = { clarifai, getPlaces };
