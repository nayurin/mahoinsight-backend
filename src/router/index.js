// import koa router
const Router = require('@koa/router');
const router = new Router();

// import routes
const newissue = require(`${__dirname}/apis/newissue.js`);
const gemCalc = require(`${__dirname}/apis/arena/gemCalc.js`);
const charaStats = require(`${__dirname}/apis/chara/stats.js`);
const charaProfile = require(`${__dirname}/apis/chara/profile.js`);

// apply routes
router.post('/api/newissue', newissue.respond);
router.post('/api/arena/gemcalc', gemCalc.respond);
router.post('/api/chara/stats', charaStats.respond);
router.get('/api/chara/profile', charaProfile.respond);

// export module
module.exports = router;
