const client = require('prom-client');
const logger = require('./logger');

const register = client.register;
const Counter = client.Counter;

module.exports.startCollection = function(){
    logger.info('started collecting metrics, available at /metrics')
    client.collectDefaultMetrics();
}

module.exports.injectMetricsRoute = function(app){
    app.get('/metrics', function(req, res){
        res.set('Content-Type', register.contentType);
        res.end(register.metrics());
    })
}

module.exports.malfunctionsCount = new Counter({
    name: 'malfunctions_amount',
    help: 'the amount of total malfunctions reported',
    labelNames: ['type']
})