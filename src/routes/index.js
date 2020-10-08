const router = require('express').Router();
const prometheus = require('../utils/prometheus');

router.post('/report', function(req, res, next){
    const type = req.body.malfunctionType;

    prometheus.malfunctionsCount.inc({type});

    res.status(200).send();
})

router.get('/status', function(req, res, next){
    res.json('server is up');
})

module.exports = router;