const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=792b9cf3ad14e28ec94f48e3200bb664&query=${longitude},${latitude}`;

    request({url, json: true}, (error, {body: {errorBody, current} = {}} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if(errorBody) {
            callback('Unable to find location');
        } else {
            const { temperature, feelslike } = current;
            callback(undefined, `It is currently ${temperature} degrees out. It is feels like ${feelslike} degrees out`)
        }
    })
}

module.exports = forecast;