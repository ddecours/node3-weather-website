const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars template engine and template location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup directory for static files
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Doug DeCoursin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Doug DeCoursin'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is my help message',
        title: 'Help',
        name: 'Doug DeCoursin'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>  {
        if (error) {
            return res.send({ 
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ 
                    error: error
                })
            }
            res.send({ 
                forecast: forecastData,
                location: location, 
                address: req.query.address
            });
            
        });
    });

});

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
         return res.send({ error: 'You must provide a search term'})
    }

    console.log('req.query.search = ' + req.query.search);
    res.send({ 
        product: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'Help article not found',
        name: 'Doug DeCoursin'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Doug DeCoursin'
    });

});

app.listen(3000, () =>  {
    console.log('Server running on port 3000');
});