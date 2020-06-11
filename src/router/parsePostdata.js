module.exports = {
  parse (ctx) {
    return new Promise((resolve, reject) => {
      try {
        let postdata = '';
        ctx.req.on('data', (chunk) => {
          postdata += chunk;
        });
        ctx.req.on('end', () => {
          resolve(JSON.parse(postdata));
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
