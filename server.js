const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server_log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        maintenanceMessage: 'Will be right back site updating!'
    });
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('Hello Express');
    res.send({
        name: 'Mr. Smith',
        likes: [
            'programming',
            'woodworking',
            'drawing'
        ]
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this handle bar home page'
    });
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        maintenanceMessage: 'Will be right back site updating!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Something went wrong!',
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});