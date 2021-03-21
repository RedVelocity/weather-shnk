const axios = require('axios');

exports.handler = async (event) => {
  // console.log(process.env.REACT_APP_DARKSKY_KEY, 'key');
  const { latitude, longitude, place } = event.queryStringParameters;
  let proximity;
  latitude !== null
    ? (proximity = '&proximity=' + longitude + ',' + latitude)
    : (proximity = '');
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place,locality${proximity}&language=en&limit=10`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
