const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/weatherrequest')
const geocode = require('./utils/geocode')

const app = express()

// Define path or Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialPath = path.join(__dirname, 'templates/partials')

//  Sertup  handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vikas Chhillar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Vikas Chhillar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Help text',
        name: 'Vikas Chhillar'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        forecast(data.lat, data.long, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
        res.send([{
            forecast: forecastdata.temperature,
            location: forecastdata.region + ', ' + forecastdata.Country,
            address: req.query.address
        }])
        })

    })

    
})

app.get('/products', (req, res) => {
    console.log("req", req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: '404 Help Page',
        name: 'Vikas Chhillar'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 error page',
        name: 'Vikas Chhillar'

    })
})


app.listen(3000, () => {
    console.log('listening ')
})