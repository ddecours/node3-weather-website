const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/133b1cf98dae047e44e13833aad2380e/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find weather for this location', undefined);
        } else {
            const message = body.daily.data[0].summary + '  It is currently ' + body.currently.temperature + ' degrees outside.  There is ' + body.currently.precipProbability + '% chance of rain today.';
            callback(undefined, message);
        }
    });
    
};

module.exports = forecast;