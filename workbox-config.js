const packages = require('./package.json');

module.exports = {
  cacheId: packages.name,
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  swDest: 'public/sw.js',
  importWorkboxFrom: 'local',
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!(\/__)|(\/service-worker\.js)|(\/_bundle-sizes\.html)|(\/_statistic\.html)|(\/_statistic\.json))/]
};
