// koa packages
const Koa = require('koa');
const cors = require('@koa/cors');

// load config
const { localconfig } = require(`${__dirname}/utils`);

// load routes
const router = require(`${__dirname}/router`);

// init
const app = new Koa();

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
  .listen(localconfig.port, localconfig.address, () => {
    console.log(`Starting server at ${localconfig.address}:${localconfig.port}...`);
  });
