const axios = require('axios');

exports.handler = async (event) => {
  const { latitude, longitude } = event.queryStringParameters;
  // const API_ENDPOINT = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,flags,hourly,alerts]`;
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_OWM_KEY}&units=metric`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    // console.log(data, 'data');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
