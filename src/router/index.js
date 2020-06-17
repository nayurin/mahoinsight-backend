// import koa router
const Router = require('@koa/router');
const router = new Router();

// import routes
const newissue = require(`${__dirname}/apis/newissue.js`);
const gemCalc = require(`${__dirname}/apis/arena/gemCalc.js`);

// apply routes
router.post('/api/newissue', newissue.respond);
router.post('/api/arena/gemcalc', gemCalc.respond);

// export module
module.exports = router;
