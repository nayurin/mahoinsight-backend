// koa packages
const Koa = require('koa');
const cors = require('@koa/cors');

// load config
const loadconfig = require(`${__dirname}/utils/loadconfig.js`);

// routes
const router = require(`${__dirname}/router/index.js`);

// init
const app = new Koa();
const config = loadconfig.load(`${__dirname}/../.local_config.json`).config;

// run app
app
  .use(cors({
    origin: (ctx) => {
      return ctx.headers.origin
    },
    maxAge: 10,
    credentials: true,
    allowMethods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type']
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, config.address, () => {
    console.log(`Starting server at ${config.address}:${config.port}...`);
  });
