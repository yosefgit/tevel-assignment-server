const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const dotenv = require('dotenv');
const logger = require('./src/utils/logger');
const prometheus = require('./src/utils/prometheus');
const cors = require('cors');

dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router)

prometheus.injectMetricsRoute(app);
prometheus.startCollection();

app.use(function(req, res, next){
    res.status(404).send({error: 'Not found'})
})

app.use(function(err, req, res, next){
    res.status(500).sent({error: 'Something went wrong'})
})

app.listen(process.env.PORT, function(err){
    if(err){
        logger.error(err)
        process.exit(1);
    }

    logger.info(`server is listing on port ${process.env.PORT}`)
})

