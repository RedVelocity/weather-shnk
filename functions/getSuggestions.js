const axios = require('axios');

exports.handler = async (event) => {
  const { place, latitude, longitude } = event.queryStringParameters;
  const proximity =
    latitude !== 0 && longitude !== 0
      ? `&proximity=${longitude},${latitude}`
      : '';
  const API_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place,locality&language=en&limit=10${proximity}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(`proximity`, proximity);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
