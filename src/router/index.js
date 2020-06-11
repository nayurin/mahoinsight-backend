// import koa router
const Router = require('@koa/router');
const router = new Router();

// import routes
const newissue = require(`${__dirname}/apis/newissue.js`)

// apply routes
router.post('/api/newissue', newissue.respond);

// export module
module.exports = router;
