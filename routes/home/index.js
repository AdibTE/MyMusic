const express = require('express');
const router = express.Router();
var unirest = require('unirest');

// Set Layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

// Home
router.get('/', (req, res) => {
    let artist = 9568982;
    var reqUrl = unirest('GET', 'https://deezerdevs-deezer.p.rapidapi.com/artist/' + artist + '/top?limit=500');

    // reqUrl.query({
    //     // q: 'Cigarettes After Sex',
    //     limit: 999
    // });

    reqUrl.headers({
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '5aeed90475mshc3f520d456500a2p13ac05jsn1a2fbb9436d9'
    });

    reqUrl.end(function(resp) {
        if (res.error) res.send(resp.error);
        res.send(resp.body);
        // res.render('home/artist', { data: resp.body.data });
    });
});

// Track
router.get('/:artist/:id', (req, res) => {
    var reqUrl = unirest('GET', 'https://deezerdevs-deezer.p.rapidapi.com/track/' + req.params.id);

    // reqUrl.query({
    //     q: req.params.artist,

    // });

    reqUrl.headers({
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '5aeed90475mshc3f520d456500a2p13ac05jsn1a2fbb9436d9'
    });

    reqUrl.end(function(resp) {
        if (res.error) res.send(resp.error);
        // res.send(resp.body);
        res.render('home/track', { data: resp.body });
    });
});

module.exports = router;