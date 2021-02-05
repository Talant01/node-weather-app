const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFzdGZpbmdlciIsImEiOiJja2txdTJpamowNTJhMnVwbGN4cmJjd3ExIn0.KCyKZuuZ4EuttnC6eEv4LQ`

    request({url, json: true}, (error, {body : {features} = {}} = {}) => {
        if (error) {
            callback('Unable to connect to location service');
        } else if (features.length === 0) {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    });
}

module.exports = geocode;