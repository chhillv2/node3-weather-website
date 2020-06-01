const request = require('request')

const geocode = (address, callback) => {
    const url_two = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiY2hoaWxsdjIiLCJhIjoiY2thbDNjcmJoMHFxeTJ6cGlndW56NmF6NiJ9.mqkjk0_57EnwgQazv09RHw&limit=1'

    request({ url: url_two, json: true }, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect", undefined)
        }
        else if (body.features.length === 0) {
            callback("Please try different search. Unable to find the location. ", undefined)
        }
        else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]

            callback(undefined, {
                lat: lat,
                long: long
            })
        }
    })
}

module.exports = geocode;