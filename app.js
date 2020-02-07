const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var unirest = require('unirest');

// Static /public
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.engine(
    'handlebars',
    handlebars({
        defaultLayout: 'home'
    })
);
app.set('view engine', 'handlebars');

// Load and use routes
const home = require('./routes/home/index');
app.use('/', home);

// 404 route
app.get('*', function(req, res) {
    res.status(404);
    res.render('404');
});

// Listen
app.listen(2020, () => {
    console.log(`[ LISTENING ON PORT ${2020} ]`);
});