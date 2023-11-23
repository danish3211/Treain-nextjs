const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/trains',
    createProxyMiddleware({
      target: 'https://indian-railway-api.cyclic.app',
      changeOrigin: true,
      pathRewrite: {
        '^/trains': '', // Remove the /trains prefix when forwarding the request
      },
    })
  );
};
