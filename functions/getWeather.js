const axios = require('axios');

exports.handler = async (event) => {
  // console.log(process.env.REACT_APP_DARKSKY_KEY, 'key');
  const { latitude, longitude } = event.queryStringParameters;
  const API_ENDPOINT = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,flags]`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
