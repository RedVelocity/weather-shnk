const axios = require('axios');

exports.handler = async (event) => {
  // console.log(process.env.REACT_APP_DARKSKY_KEY, 'key');
  const { latitude, longitude } = event.queryStringParameters;
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place&language=en&limit=1`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
