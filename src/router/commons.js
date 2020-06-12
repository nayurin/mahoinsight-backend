const { logger4router } = require(`${__dirname}/../log4js`);

module.exports = {
  parse (ctx) {
    return new Promise((resolve, reject) => {
      try {
        let postdata = '';
        ctx.req.on('data', (chunk) => {
          postdata += chunk;
        });
        ctx.req.on('end', () => {
          logger4router.debug('<common> parse:', JSON.parse(postdata));
          resolve(JSON.parse(postdata));
        });
      } catch (e) {
        logger4router.error('<common> parsing error:', e);
        reject(e);
      }
    });
  }
}
