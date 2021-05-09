const axios = require('axios');

exports.handler = async (event) => {
  const { latitude, longitude } = event.queryStringParameters;
  const API_ENDPOINT = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_TIMEZONEDB_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
